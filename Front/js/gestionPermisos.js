function gestionPermisos() {
  document.getElementById("accionesCabecera").style.display = "none";
  document.getElementById("tablaDatos").style.display = "none";
  document.getElementById("mensajePaginacion").style.display = "none";
  document.getElementById("paginacion").style.display = "none";
  document.getElementById("permisos").style.display = "block";

  var titulo = document.getElementById("tituloGestionAcciones");
  titulo.classList.remove("GESTION_ACCIONES");
  $("#tituloGestionAcciones").addClass("PERMISOS");
  setLang("");
  limpiarModalTitulo();
  contruirGestionRAFs();
}

function funcionalidadesSistema() {
  crearformoculto(
    "formularioFuncionalidadesSistema",
    "javascript:funcionalidadSistema()"
  );
  document.formularioFuncionalidadesSistema.submit();
}

/**Función ajax con promesas*/
function funcionalidadSistemaAjaxPromesa() {
  var idioma = getCookie("lang");
  var token = getCookie("token");

  addActionControler(
    document.formularioFuncionalidadesSistema,
    "funcionalidadesSistema",
    "funcionalidad"
  );

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioFuncionalidadesSistema").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "FUNCIONALIDADES_SISTEMA") {
            reject(res);
          }
          resolve(res);
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

async function funcionalidadSistema() {
  var idioma = getCookie("lang");

  await funcionalidadSistemaAjaxPromesa()
    .then((res) => {
      rellenarTopMenu(res.resource);
      setCookie("funcionalidadesSistema", res.resource);
    })
    .catch((res) => {
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      //errorAccion(res.code, idioma);
      setLang(idioma);
    });
  deleteActionController();
}

function contruirGestionRAFs() {
  var idioma = getCookie("lang");
  let funcionalidades = getCookie("funcionalidadesSistema").split(",");

  var funcionalidadesMenu = [];

  for (var i = 0; i < funcionalidades.length; i++) {
    if (
      funcionalidades[i] != "test" &&
      funcionalidades[i] != "logExcepcionAcciones" &&
      funcionalidades[i] != "logExcepcionAtributos"
    ) {
      funcionalidadesMenu.push(funcionalidades[i]);
    }
  }

  funcionalidadesMenu.sort();

  if (funcionalidades.includes("logExcepcionAcciones")) {
    funcionalidadesMenu.push("logExcepcionAcciones");
  }

  if (funcionalidades.includes("logExcepcionAtributos")) {
    funcionalidadesMenu.push("logExcepcionAtributos");
  }

  if (funcionalidades.includes("test")) {
    funcionalidadesMenu.push("test");
  }

  funcionalidades = funcionalidadesMenu;

  var permisos = "";
  var collapse = "";
  var gestion = "";
  var funcionalidadGestion = "";

  funcionalidades.forEach(function (funcionalidad) {
    gestion = "gestion" + funcionalidad;
    collapse = "collapse" + funcionalidad;
    onclickFuncionalidad = "'" + funcionalidad + "'";
    funcionalidadGestion = funcionalidad + "Gestion";
    permisos =
      '<div class="card">' +
      '<div class="card-header">' +
      '<a class="collapsed card-link ' +
      funcionalidadGestion +
      '" data-toggle="collapse" href="#' +
      collapse +
      '" onclick="buscarPorFuncionalidad(' +
      onclickFuncionalidad +
      ')">' +
      funcionalidad +
      "</a>" +
      "</div>" +
      '<div id="' +
      collapse +
      '" class="collapse" data-parent="#accordion">' +
      '<div class="card-body" id="' +
      gestion +
      '"></div>' +
      "</div>" +
      "</div>";

    $("#accordion").append(permisos);
  });

  setLang(idioma);
}

/*Función ajax para permisos*/
function buscarPorFuncionalidadAjaxPromesa() {
  var idioma = getCookie("lang");
  var token = getCookie("token");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioPermisos").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PERMISOS_OBTENIDOS") {
            reject(res);
          }
          resolve(res);
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

async function buscarPorFuncionalidad(funcionalidad) {
  setCookie("funcionalidadActual", funcionalidad);

  var idioma = getCookie("lang");
  crearformoculto("formularioPermisos", "");
  addActionControler(document.formularioPermisos, "buscar", "permiso");
  insertacampo(
    document.formularioPermisos,
    "nombre_funcionalidad",
    funcionalidad
  );
  var respuesta = "";
  var gestion = "#gestion" + funcionalidad;

  await buscarPorFuncionalidadAjaxPromesa()
    .then((res) => {
      respuesta = res.resource;
    })
    .catch((res) => {
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      //errorAccion(res.code, idioma);
      setLang(idioma);
    });

  $(gestion).html("");

  cuerpo =
    '<div class="table-responsive">' +
    '<table class="table table-bordered">' +
    '<thead class="cabeceraTablasTest" id="cabeceraPermisos' +
    funcionalidad +
    '">' +
    '<tr id = "roles' +
    funcionalidad +
    '">' +
    "</tr>" +
    "</thead>" +
    '<tbody id="cuerpoPermisos' +
    funcionalidad +
    '"></tbody>' +
    "</table>" +
    "</div>";

  $(gestion).append(cuerpo);

  contruirTabla(respuesta);

  eliminarcampo("controlador");
  eliminarcampo("action");
  eliminarcampo("nombre_funcionalidad");
}

function contruirTabla(respuestas) {
  var rolSistema = getCookie("usuarioSistema");
  var indiceAdmin = 4;
  var pintar = "";
  for (var clave in respuestas) {
    var lineaRol = '<th class="colFirst"></th>';
    var funcionalidad = respuestas[clave];
    var idRoles = "#roles" + clave;
    var cuerpoPermisos = "#cuerpoPermisos" + clave;
    $(idRoles).html("");
    $(cuerpoPermisos).html("");

    //Recorrido roles
    for (var i = 1; i < respuestas[clave][0].length; i++) {
      if ("administrador" != respuestas[clave][0][i]["nombre"]) {
        lineaRol += "<th>" + respuestas[clave][0][i]["nombre"] + "</th>";
      } else if ("administrador" == respuestas[clave][0][i]["nombre"]) {
        indiceAdmin = i;

        if (rolSistema == "admin") {
          lineaRol += "<th>" + respuestas[clave][0][i]["nombre"] + "</th>";
          pintar = "pintar";
        }
      }
    }
    $(idRoles).append(lineaRol);

    //Filas Acciones
    var fila = "";
    for (var i = 1; i < funcionalidad.length; i++) {
      fila = '<tr><td class="columnaAcciones">' + funcionalidad[i][0] + "</td>";
      for (var j = 1; j < funcionalidad[i].length; j++) {
        if (pintar == "pintar") {
          var darPermiso =
            "darPermiso" +
            funcionalidad[i][j]["id_rol"].toString() +
            funcionalidad[i][j]["id_accion"].toString() +
            funcionalidad[i][j]["id_funcionalidad"].toString();
          var quitarPermiso =
            "quitarPermiso" +
            funcionalidad[i][j]["id_rol"] +
            funcionalidad[i][j]["id_accion"] +
            funcionalidad[i][j]["id_funcionalidad"];
          var id_rol = funcionalidad[i][j]["id_rol"];
          var id_accion = funcionalidad[i][j]["id_accion"];
          var id_funcionalidad = funcionalidad[i][j]["id_funcionalidad"];

          if (funcionalidad[i][j]["tienePermiso"] == "SI") {
            fila +=
              '<td class="accionesPermisos">' +
              '<div class="tooltip">' +
              '<img id = "' +
              darPermiso +
              '" class="permisos darPermiso denegado" src="images/ok2.png" data-toggle="modal" data-target="#form-modal" alt="Dar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' +
              "</div>" +
              '<div class="tooltip">' +
              '<img id = "' +
              quitarPermiso +
              '" class="permisos quitarPermiso" src="images/error.png" data-toggle="modal" data-target="#form-modal" onclick="quitarPermiso(' +
              id_rol +
              ", " +
              id_accion +
              ", " +
              id_funcionalidad +
              ", " +
              darPermiso +
              ", " +
              quitarPermiso +
              ')" alt="Quitar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' +
              "</div>" +
              "</td>";
          }
          if (funcionalidad[i][j]["tienePermiso"] == "NO") {
            fila +=
              '<td class="accionesPermisos">' +
              '<div class="tooltip">' +
              '<img id = "' +
              darPermiso +
              '" class="permisos darPermiso" src="images/ok3.png" data-toggle="modal" data-target="#form-modal" onclick="darPermiso(' +
              id_rol +
              ", " +
              id_accion +
              ", " +
              id_funcionalidad +
              ", " +
              darPermiso +
              ", " +
              quitarPermiso +
              ')" alt="Dar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' +
              "</div>" +
              '<div class="tooltip">' +
              '<img id = "' +
              quitarPermiso +
              '" class="permisos quitarPermiso denegado" src="images/error2.png" data-toggle="modal" data-target="#form-modal" alt="Quitar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' +
              "</div>" +
              "</td>";
          }
        } else if (pintar != "pintar" && indiceAdmin != j) {
          var darPermiso =
            "darPermiso" +
            funcionalidad[i][j]["id_rol"].toString() +
            funcionalidad[i][j]["id_accion"].toString() +
            funcionalidad[i][j]["id_funcionalidad"].toString();
          var quitarPermiso =
            "quitarPermiso" +
            funcionalidad[i][j]["id_rol"] +
            funcionalidad[i][j]["id_accion"] +
            funcionalidad[i][j]["id_funcionalidad"];
          var id_rol = funcionalidad[i][j]["id_rol"];
          var id_accion = funcionalidad[i][j]["id_accion"];
          var id_funcionalidad = funcionalidad[i][j]["id_funcionalidad"];

          if (funcionalidad[i][j]["tienePermiso"] == "SI") {
            fila +=
              '<td class="accionesPermisos">' +
              '<div class="tooltip">' +
              '<img id = "' +
              darPermiso +
              '" class="permisos darPermiso denegado" src="images/ok2.png" data-toggle="modal" data-target="#form-modal" alt="Dar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' +
              "</div>" +
              '<div class="tooltip">' +
              '<img id = "' +
              quitarPermiso +
              '" class="permisos quitarPermiso" src="images/error.png" data-toggle="modal" data-target="#form-modal" onclick="quitarPermiso(' +
              id_rol +
              ", " +
              id_accion +
              ", " +
              id_funcionalidad +
              ", " +
              darPermiso +
              ", " +
              quitarPermiso +
              ')" alt="Quitar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' +
              "</div>" +
              "</td>";
          }
          if (funcionalidad[i][j]["tienePermiso"] == "NO") {
            fila +=
              '<td class="accionesPermisos">' +
              '<div class="tooltip">' +
              '<img id = "' +
              darPermiso +
              '" class="permisos darPermiso" src="images/ok3.png" data-toggle="modal" data-target="#form-modal" onclick="darPermiso(' +
              id_rol +
              ", " +
              id_accion +
              ", " +
              id_funcionalidad +
              ", " +
              darPermiso +
              ", " +
              quitarPermiso +
              ')" alt="Dar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' +
              "</div>" +
              '<div class="tooltip">' +
              '<img id = "' +
              quitarPermiso +
              '" class="permisos quitarPermiso denegado" src="images/error2.png" data-toggle="modal" data-target="#form-modal" alt="Quitar permiso" style="cursor: pointer;">' +
              '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' +
              "</div>" +
              "</td>";
          }
        }
      }

      fila += "</tr>";
      $(cuerpoPermisos).append(fila);
    }
  }

  $("#roles").append(lineaRol);
}

/*Función ajax con promesas*/
function darPermisoAjaxPromesa() {
  var idioma = getCookie("lang");
  var token = getCookie("token");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioPermisos").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PERMISO_INSERTAR_OK") {
            reject(res);
          }
          resolve(res);
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

async function darPermiso(
  id_rol,
  id_accion,
  id_funcionalidad,
  imagenDarPermiso,
  imagenQuitarPermiso
) {
  var idioma = getCookie("lang");

  crearformocultoSinAction("formularioPermisos");
  addActionControler(document.formularioPermisos, "insertar", "permiso");
  insertacampo(document.formularioPermisos, "id_rol", id_rol);
  insertacampo(document.formularioPermisos, "id_accion", id_accion);
  insertacampo(
    document.formularioPermisos,
    "id_funcionalidad",
    id_funcionalidad
  );

  var imagenDarPermisoString = imagenDarPermiso.id;
  var imagenQuitarPermisoString = imagenQuitarPermiso.id;

  await darPermisoAjaxPromesa()
    .then((res) => {
      $("#" + imagenDarPermisoString).attr("src", "images/ok2.png"); //gris
      $("#" + imagenQuitarPermisoString).attr("src", "images/error.png");

      $("#" + imagenDarPermisoString).addClass("denegado");
      $("#" + imagenQuitarPermisoString).removeClass("denegado");

      $("#" + imagenQuitarPermisoString).attr(
        "onclick",
        "quitarPermiso(" +
          id_rol +
          ", " +
          id_accion +
          ", " +
          id_funcionalidad +
          ", " +
          imagenDarPermisoString +
          ", " +
          imagenQuitarPermisoString +
          ")"
      );
      $("#" + imagenDarPermisoString).attr("onclick", "null");
    })
    .catch((res) => {
      $("#modal-title").addClass("modalMensajeError");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      //errorAccion(res.code, idioma);
      setLang(idioma);
    });

  accionesInsertarBuscar();
  deleteActionController();
  eliminarcampo("id_rol");
  eliminarcampo("id_accion");
  eliminarcampo("id_funcionalidad");
  setLang(idioma);
  limpiarModalTituloPermisos();

  buscarPorFuncionalidad(getCookie("funcionalidadActual"));
}

/*Función ajax con promesas*/
function quitarPermisoAjaxPromesa() {
  var idioma = getCookie("lang");
  var token = getCookie("token");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioPermisos").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PERMISO_BORRAR_OK") {
            reject(res);
          }
          resolve(res);
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

async function quitarPermiso(
  id_rol,
  id_accion,
  id_funcionalidad,
  imagenDarPermiso,
  imagenQuitarPermiso
) {
  var idioma = getCookie("lang");

  crearformocultoSinAction("formularioPermisos");
  addActionControler(document.formularioPermisos, "borrar", "permiso");
  insertacampo(document.formularioPermisos, "id_rol", id_rol);
  insertacampo(document.formularioPermisos, "id_accion", id_accion);
  insertacampo(
    document.formularioPermisos,
    "id_funcionalidad",
    id_funcionalidad
  );

  var imagenDarPermisoString = imagenDarPermiso.id;
  var imagenQuitarPermisoString = imagenQuitarPermiso.id;

  await quitarPermisoAjaxPromesa()
    .then((res) => {
      $("#" + imagenDarPermisoString).attr("src", "images/ok3.png");
      $("#" + imagenQuitarPermisoString).attr("src", "images/error2.png"); //gris

      $("#" + imagenQuitarPermisoString).addClass("denegado");
      $("#" + imagenDarPermisoString).removeClass("denegado");

      $("#" + imagenDarPermisoString).attr(
        "onclick",
        "darPermiso(" +
          id_rol +
          ", " +
          id_accion +
          ", " +
          id_funcionalidad +
          ", " +
          imagenDarPermisoString +
          ", " +
          imagenQuitarPermisoString +
          ")"
      );
      $("#" + imagenQuitarPermisoString).attr("onclick", "null");
    })
    .catch((res) => {
      $("#modal-title").addClass("modalMensajeError");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      //errorAccion(res.code, idioma);
      setLang(idioma);
    });

  accionesInsertarBuscar();
  deleteActionController();
  eliminarcampo("id_rol");
  eliminarcampo("id_accion");
  eliminarcampo("id_funcionalidad");
  setLang(idioma);
  limpiarModalTituloPermisos();

  buscarPorFuncionalidad(getCookie("funcionalidadActual"));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

/**Función que aplica los cambios necesarios cuando la respuesta de las petición Ajax ha sido KO*/
function respuestaKOAjax() {
  $("#formularioAcciones").modal("hide");
  $(".imagenAviso").attr("src", "images/failed.png");
  $("#cerrar").attr("onclick", "cerrarModal('modal', '', '')");
  $("#modal-title").attr("style", "color: #ff0000;");
}

/**Función que actualiza el mensaje con el código que nos llega de la petición Ajax y aplica estilos*/
function actualizaMensajesRespuestAjax(codigo) {
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigo);
  $(".imagenAviso").attr("style", "width: 16%; margin-top: 0");
  $("#modal").attr("style", "display: block");
}

function limpiarModalTituloPermisos() {
  var modal = document.getElementById("modal-title");
  if (modal.classList.contains("modalMensajeAnadirPermiso")) {
    $("#modal-title").removeClass("modalMensajeAnadirPermiso");
  }
  if (modal.classList.contains("modalMensajeQuitarPermiso")) {
    $("#modal-title").removeClass("modalMensajeQuitarPermiso");
  }
  if (modal.classList.contains("modalMensajeError")) {
    $("#modal-title").removeClass("modalMensajeError");
  }
}
