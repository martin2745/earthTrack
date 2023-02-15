function cargarDatosUsuarioAjaxPromesa() {
  var idioma = getCookie("lang");
  var token = getCookie("token");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGestionUsuarios").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "RECORDSET_DATOS" && res.code != "RECORDSET_VACIO") {
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

async function cargarDatosUsuario() {
  var idioma = getCookie("lang");
  crearformocultoSinAction("formularioGestionUsuarios");
  addActionControler(document.formularioGestionUsuarios, "buscar", "usuario");
  if (getCookie("rolUsuario") != "administrador") {
    insertacampo(
      document.formularioGestionUsuarios,
      "usuario",
      getCookie("usuarioSistema")
    );
  }
  await cargarDatosUsuarioAjaxPromesa()
    .then((res) => {
      if (getCookie("rolUsuario") != "administrador") {
        document.getElementById("personaInfoParaUsuario").style.display =
          "block";
        document.getElementById("cardPersona").style.display = "block";
        document.getElementById("cardUsuario").style.display = "block";
        document.getElementById("accionesCabecera").style.display = "none";
        document.getElementById("tablaDatos").style.display = "none";
        document.getElementById("formularioAcciones").style.display = "none";
        document.getElementById("contadorPaginacion").style.display = "none";
        document.getElementById("paginacion").style.display = "none";
        document.getElementById("tablaDatos").style.display = "none";
        rellenarDatosUsuario(res.resource);
        construyeEditar(res.resource);
      } else {
        document.getElementById("personaInfoParaUsuario").style.display =
          "none";
        document.getElementById("cardPersona").style.display = "none";
        document.getElementById("cardUsuario").style.display = "none";
        document.getElementById("accionesCabecera").style.display = "block";
        document.getElementById("tablaDatos").style.display = "block";
        document.getElementById("formularioAcciones").style.display = "none";
        document.getElementById("contadorPaginacion").style.display = "block";
        document.getElementById("paginacion").style.display = "block";
        document.getElementById("tablaDatos").style.display = "block";
        ajustarCookies();
        rolesSistema();
        obtenerListado(0);
      }
    })
    .catch((res) => {
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
    });
  setLang(idioma);
  deleteActionController();
}

/////////////////////////////////CARGAR DATOS PERSONA USUARIO//////////////////////////////////////

function rellenarDatosUsuario(datosUsuario) {
  $("#user").text(datosUsuario[0].usuario);
  $("#dni-user").text(datosUsuario[0]["dni"].dni);
  $("#rol").text(datosUsuario[0]["id_rol"].nombre_rol);
  var nombreApellidos =
    datosUsuario[0].nombre + " " + datosUsuario[0].apellidos;
  $("#nombreApellidos").text(nombreApellidos);
  $("#dniP").text(datosUsuario[0].dni);
  $("#fechaNacimiento").text(ordenarFechaHora(datosUsuario[0].fechaNacimiento));
  $("#direccion").text(datosUsuario[0].direccion);
  $("#telefono").text(datosUsuario[0].telefono);
  $("#email").text(datosUsuario[0].email);
}

/**
 * Construcción de la opción editar tarjeta con datos de la persona
 */
function construyeEditar(fila) {
  $("#iconoEditarPersona").html("");

  var atributosFunciones = [
    "'" + fila[0]["usuario"] + "'",
    "'" + fila[0]["id_rol"]["nombre_rol"] + "'",
    "'" + fila[0]["dni"] + "'",
    "'" + fila[0]["nombre"] + "'",
    "'" + fila[0]["apellidos"] + "'",
    "'" + fila[0]["fechaNacimiento"] + "'",
    "'" + fila[0]["direccion"] + "'",
    "'" + fila[0]["telefono"] + "'",
    "'" + fila[0]["email"] + "'",
    "'" + borrado_logico_texto(fila[0]["borrado_logico"]) + "'",
  ];

  let acciones = getCookie("acciones").split(",");

  var celdaAcciones = "";

  if (acciones.includes("editar")) {
    atributosFunciones = [
      "'" + fila[0]["usuario"] + "'",
      "'" + fila[0]["id_rol"]["nombre_rol"] + "'",
      "'" + fila[0]["dni"] + "'",
      "'" + fila[0]["nombre"] + "'",
      "'" + fila[0]["apellidos"] + "'",
      "'" + fila[0]["fechaNacimiento"] + "'",
      "'" + fila[0]["direccion"] + "'",
      "'" + fila[0]["telefono"] + "'",
      "'" + fila[0]["email"] + "'",
      "'" + borrado_logico_texto(fila[0]["borrado_logico"]) + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip"><img class="editarCard" src="images/edit3.png" onclick="showEditarUsuario(' +
      atributosFunciones +
      ')" data-toggle="modal" data-target="#form-modal" alt="Editar"/><span class="tooltiptext tooltipDatosPersonaEditar iconEditUser ICONO_EDIT">Editar</span></div>';
    celdaAcciones += celdaAccionesEditar;
  } else {
    atributosFunciones = [
      "'" + fila[0]["usuario"] + "'",
      "'" + fila[0]["id_rol"]["nombre_rol"] + "'",
      "'" + fila[0]["dni"] + "'",
      "'" + fila[0]["nombre"] + "'",
      "'" + fila[0]["apellidos"] + "'",
      "'" + fila[0]["fechaNacimiento"] + "'",
      "'" + fila[0]["direccion"] + "'",
      "'" + fila[0]["telefono"] + "'",
      "'" + fila[0]["email"] + "'",
      "'" + borrado_logico_texto(fila[0]["borrado_logico"]) + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip"><img class="editarCard" src="images/edit.png" data-toggle="modal" data-target="#form-modal" alt="Editar"/><span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span></div>';
    celdaAcciones += celdaAccionesEditar;
  }

  $("#iconoEditarPersona").append(celdaAcciones);
}

///////////////////////////////////////////GESTION ADMINISTRADOR///////////////////////////////////////

/*Ajustamos los valores inciales de la cookies para realizar las búsquedas.*/
function ajustarCookies() {
  setCookie("usuario", "");
  setCookie("id_rol", "");
  setCookie("nombre", "");
  setCookie("apellidos", "");
  setCookie("email", "");
  setCookie("borrado_logico", "");
  setCookie("busquedaVacia", "si");
  setCookie("camposFormularioListado", "no");
  ajustarPaginador();
}

/*Función en la que guardamos los parametros de las busquedas en cookies.*/
function guardarParametrosBusqueda(criterios) {
  setCookie("usuario", criterios.usuario);
  setCookie("id_rol", criterios.id_rol);
  setCookie("nombre", criterios.nombre);
  setCookie("apellidos", criterios.apellidos);
  setCookie("email", criterios.email);
  setCookie("borrado_logico", criterios.borrado_logico);
}

/*Función que comprueba si la busqueda es vacía para todos sus campos.*/
function busquedaVacia() {
  var toret = true;
  if (
    getCookie("usuario") != "" ||
    getCookie("id_rol") != "" ||
    getCookie("nombre") != "" ||
    getCookie("apellidos") != "" ||
    getCookie("email") != "" ||
    getCookie("borrado_logico") != ""
  ) {
    toret = false;
  }
  return toret;
}

/*Insertamos campos en el formulario que enviamos a back para realizar la búsqueda. Esto es necesario en caso 
de que nos desplacemos por varias pestañas de elementos con una paginación relizada.*/
function informacionBusqueda(form) {
  insertacampoParaBusqueda(form, "usuario", getCookie("usuario"));
  insertacampoParaBusqueda(form, "id_rol", getCookie("id_rol"));
  insertacampoParaBusqueda(form, "nombre", getCookie("nombre"));
  insertacampoParaBusqueda(form, "apellidos", getCookie("apellidos"));
  insertacampoParaBusqueda(form, "email", getCookie("email"));
  insertacampoParaBusqueda(form, "borrado_logico", getCookie("borrado_logico"));
}

function cargarInformacionBusqueda() {
  if (getCookie("usuario") != "") {
    document.getElementById("usuario_BUSQUEDA").value = getCookie("usuario");
  } else {
    document.getElementById("usuario_BUSQUEDA").value = "";
  }

  if (getCookie("id_rol") != "") {
    document.getElementById("id_rol_BUSQUEDA").value = getCookie("id_rol");
  } else {
    document.getElementById("id_rol_BUSQUEDA").value = "";
  }
  if (getCookie("nombre") != "") {
    document.getElementById("nombre_BUSQUEDA").value = getCookie("nombre");
  } else {
    document.getElementById("nombre_BUSQUEDA").value = "";
  }

  if (getCookie("apellidos") != "") {
    document.getElementById("apellidos_BUSQUEDA").value =
      getCookie("apellidos");
  } else {
    document.getElementById("apellidos_BUSQUEDA").value = "";
  }

  if (getCookie("email") != "") {
    document.getElementById("email_BUSQUEDA").value = getCookie("email");
  } else {
    document.getElementById("email_BUSQUEDA").value = "";
  }

  if (getCookie("borrado_logico") != "") {
    document.getElementById("borrado_logico_BUSQUEDA").value =
      getCookie("borrado_logico");
  } else {
    document.getElementById("borrado_logico_BUSQUEDA").value = "";
  }
}

/*
##################################################################################################################
#############################################Acciones Permitidas##################################################
##################################################################################################################
*/

/*Función que establece que acciones tenemos para una funcionalidad determinada.
 En el caso de ROL necesitamos saber si existe el permiso para insertar por ejemplo,
 Si existe el permiso colocaremos el icono add3.png y si no existe el permiso add.png.*/
function accionesPermitidasAjaxPromesa() {
  var token = getCookie("token");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioAccionesPermitidas").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "ACCIONES_FUNCIONALIDAD") {
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

async function accionesPermitidas() {
  var idioma = getCookie("lang");

  /*Creamos el formulario que enviamos a Back para obtener
  que acciones tenemos para una funcionalidad.*/
  crearformoculto(
    "formularioAccionesPermitidas",
    "javascript:funcionalidadAcciones()"
  );
  /*Añadimos el controlador (punto de acceso) y la acción
  (método del controlador).*/
  addActionControler(
    document.formularioAccionesPermitidas,
    "accionesFuncionalidad",
    "funcionalidad"
  );
  /*Insertamos el campo nombre_funcionalidad con la funcionalidad
  que nos interesa saber que acciones tiene.*/
  insertacampo(
    document.formularioAccionesPermitidas,
    "nombre_funcionalidad",
    "usuario"
  );

  await accionesPermitidasAjaxPromesa()
    .then((res) => {
      /*Guardamos en una cookie las acciones de la funcionalidad.*/
      setCookie("acciones", res.resource);
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });

  accionesInsertarBuscar();
  /*Eliminamos el controlador que enviamos a back.*/
  deleteActionController();
  eliminarcampo("funcionalidad");
  setLang(idioma);
}

/*Insertamos la cabecera con los botones de Insertar, Buscar, Refrescar y Ocultar columnas.*/
function accionesInsertarBuscar() {
  $("#accionesCabecera").html("");
  let acciones = getCookie("acciones").split(",");

  if (acciones.includes("insertar")) {
    var insertar =
      '<div name="btnAdd" value="Añadir" onclick="showAdd();" class="tooltip6 addIcon">' +
      '<img class="iconoAdd ICONO_ADD" src="images/add3.png" alt="Añadir" />' +
      '<span class="tooltiptext ICONO_ADD ICONO_ADD"></span>' +
      "</div>";

    $("#accionesCabecera").append(insertar);
  } else {
    var insertar =
      '<div name="btnAdd" value="Añadir" class="tooltip6 addIcon">' +
      '<img class="iconoAdd iconoAddNoAllowed ICONO_ADD" id = "denegado" src="images/add.png" alt="Añadir" />' +
      '<span class="tooltiptext ICONO_ADD ICONO_ADD"></span>' +
      "</div>";

    $("#accionesCabecera").append(insertar);
  }
  if (acciones.includes("buscar")) {
    var buscar =
      '<div name="btnSearch" value="Buscar" onclick="showSearch();" class="tooltip6 searchIcon">' +
      '<img class="iconoSearch" src="images/search3.png" alt="Buscar" />' +
      '<span class="tooltiptext ICONO_SEARCH"></span>' +
      "</div>";

    $("#accionesCabecera").append(buscar);
  } else {
    var buscar =
      '<div name="btnSearch" value="Buscar" class="tooltip6 searchIcon">' +
      '<img class="iconoSearch iconoSearchNoAllowed" id = "denegado" src="images/search.png" alt="Buscar" />' +
      '<span class="tooltiptext ICONO_SEARCH"></span>' +
      "</div>";

    $("#accionesCabecera").append(buscar);
  }

  var refrescar =
    '<div name="btnRefresh" value="Buscar" onclick="refresh();" class="tooltip6 refreshIcon">' +
    '<img class="iconoRefresh" src="images/refresh3.png" alt="Refrescar Tabla" />' +
    '<span class="tooltiptext ICON_REFRECH_TABLE tituloBotonRefrescarTabla"></span>' +
    "</div>";

  $("#accionesCabecera").append(refrescar);

  var botonOcultar =
    '<div name="btnHideShowColumns" value="Buscar" onclick="hideShowColumnsWindow();" class="tooltip6 hideShowIcon">' +
    '<img class="iconoHideShow" src="images/hideTable.png" alt="Ocultar/Mostrar Columnas" />' +
    '<span class="tooltiptext ICON_SHOW_HIDE_COLUMNS tituloBotonMostrarOcultarColumnas"></span>' +
    "</div>";

  $("#accionesCabecera").append(botonOcultar);
}

/**Función que construye cada línea que se va a rellenar en la tabla*/
function construyeFila(fila) {
  let atributosFunciones = [
    "'" + fila.usuario + "'",
    "'" + fila.id_rol.nombre_rol + "'",
    "'" + fila.dni + "'",
    "'" + fila.nombre + "'",
    "'" + fila.apellidos + "'",
    "'" + fila.fechaNacimiento + "'",
    "'" + fila.direccion + "'",
    "'" + fila.telefono + "'",
    "'" + fila.email + "'",
    "'" + fila.borrado_logico + "'",
  ];

  let acciones = getCookie("acciones").split(",");

  var celdaAcciones = "";

  if (acciones.includes("verEnDetalle")) {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesDetalle =
      '<div class="tooltip6"><img class="detalle ICONO_DETALLE" src="images/detail3.png" onclick="showDetalle(' +
      atributosFunciones +
      ')" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaAcciones = celdaAccionesDetalle;
  } else {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesDetalle =
      '<div class="tooltip6"><img class="detalle detallePermisoNoAllowed ICONO_DETALLE" id = "denegado" src="images/detail.png" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaAcciones = celdaAccionesDetalle;
  }
  if (acciones.includes("editar")) {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip6"><img class="editar ICONO_EDIT" src="images/edit3.png" onclick="showEditar(' +
      atributosFunciones +
      ')" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaAcciones += celdaAccionesEditar;
  } else {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip6"><img class="editar editarPermisoNoAllowed ICONO_EDIT" id = "denegado" src="images/edit.png" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaAcciones += celdaAccionesEditar;
  }
  if (acciones.includes("borrar")) {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="eliminar ICONO_ELIMINAR" src="images/delete3.png" onclick="showEliminar(' +
      atributosFunciones +
      ')" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  } else {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="eliminar eliminarPermisoNoAllowed ICONO_ELIMINAR" id = "denegado" src="images/delete.png" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  }
  if (acciones.includes("reactivar") && fila.borrado_logico == 1) {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="reactivar ICONO_REACTIVAR" src="images/reactivar.png" onclick="showReactivar(' +
      atributosFunciones +
      ')" alt="Eliminar"/><span class="tooltiptext ICONO_REACTIVAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  } else {
    atributosFunciones = [
      "'" + fila.usuario + "'",
      "'" + fila.id_rol.nombre_rol + "'",
      "'" + fila.dni + "'",
      "'" + fila.nombre + "'",
      "'" + fila.apellidos + "'",
      "'" + fila.fechaNacimiento + "'",
      "'" + fila.direccion + "'",
      "'" + fila.telefono + "'",
      "'" + fila.email + "'",
      "'" + borrado_logico_texto(fila.borrado_logico) + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="reactivar reactivarPermisoNoAllowed ICONO_REACTIVAR" id = "denegado" src="images/reactivar2.png" alt="Eliminar"/><span class="tooltiptext ICONO_REACTIVAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  }

  var filaTabla =
    '<tr class="impar" id="datoEntidad">' +
    "</td> <td>" +
    fila.usuario +
    "</td> <td>" +
    fila.id_rol.nombre_rol +
    "</td> <td>" +
    fila.nombre +
    "</td> <td>" +
    fila.apellidos +
    "</td> <td>" +
    fila.email +
    "</td> <td>" +
    borrado_logico_texto(fila.borrado_logico) +
    "</td> <td>" +
    celdaAcciones +
    "</td> </tr>";

  return filaTabla;
}

/*
##################################################################################################################
##############################################Listado de roles####################################################
##################################################################################################################
*/

/*Nos permite obtener un listado inicial de los datos de la tabla.*/
function obtenerListado(empieza) {
  crearformoculto("formularioListado", "javascript:getListadoEntidades()");
  insertacampo(document.formularioListado, "empieza", empieza);
  insertacampo(
    document.formularioListado,
    "filaspagina",
    escogeTamanho("usuario")
  );
  if (getCookie("camposFormularioListado") == "no") {
    informacionBusqueda(document.formularioListado);
    setCookie("camposFormularioListado", "si");
  }
  cargarInformacionBusqueda();
  let acciones = getCookie("acciones").split(",");
  if (acciones.includes("listar")) {
    document.formularioListado.submit();
  }
}

/**Función que llama al show all de rols*/
function getListadoEntidadesAjaxPromesa() {
  var token = getCookie("token");
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioListado").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "RECORDSET_DATOS" && res.code != "RECORDSET_VACIO") {
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

async function getListadoEntidades() {
  var idioma = getCookie("lang");
  addActionControler(document.formularioListado, "buscar", "usuario");
  await getListadoEntidadesAjaxPromesa()
    .then((res) => {
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("usuario");
      }
      setCookie("totalElementos", res.total);

      mensajeFilasTabla();
      $("#datosEntidades").html("");
      for (var i = 0; i < res.resource.length; i++) {
        var tr = construyeFila(res.resource[i]);
        $("#datosEntidades").append(tr);
      }

      $("#ckeckboxColumnas").html("");
      var div = createHideShowColumnsWindow();
      $("#ckeckboxColumnas").append(div);
      setCookie("ocultarColumnas", "creado");
      resetearHideShowColumnas();
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });

  deleteActionController();
  eliminarcampo("empieza");
  eliminarcampo("filaspagina");
  document.getElementById("formularioListado").reset();
  setLang(idioma);
}

/*
##################################################################################################################
##############################################Estilo ventana modal################################################
##################################################################################################################
*/

function limpiarErroresModal() {
  let errores = [
    "errorFormatoDni",
    "errorFormatoNombre",
    "errorFormatoApellidos",
    "errorFormatoFecha",
    "errorFormatoDireccion",
    "errorFormatoTelefono",
    "errorFormatoEmail",
    "errorFormatoUsuario",
    "errorFormatoPassRegistro",
    "errorFormatoPassRegistro2",
    "bloqueoMayusculasRegistro",
    "error",
  ];
  errores.forEach((element) => {
    eliminarcampoId(element);
  });
}

/**Función para dar una estructura a la ventana modal de insertar.*/
function addEstructura() {
  limpiarErroresModal();
  activarCamposInLineBlock();
  mostrarObligatorios();
  ocultarLabels();
  mostrarAyuda();
  eliminarOnblurContrasena();

  $("#input_rol_usuario").attr("style", "display: none");
  $("#input_usuario_borrado_logico").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#select_id_rol").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de buscar.*/
function searchEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  ocultarLabels();
  mostrarAyuda();
  eliminarOnblurContrasena();

  $("#input_dni_usuario").attr("style", "display: inline-block");
  $("#input_telefono_usuario").attr("style", "display: inline-block");
  $("#input_email_usuario").attr("style", "display: inline-block");
  $("#passwdUsuario1").attr("style", "display: none");
  $("#passwdUsuario2").attr("style", "display: none");
  $("#input_usuario_borrado_logico").attr("style", "display: none");
  $("#input_rol_usuario").attr("style", "display: none");
  $("#label_usuario_rol").attr("style", "display: block");
  $("#label_usuario_borrado_logico").attr("style", "display: block");
  $("#select_borrado_logico").attr("style", "display: block");
  $("#select_id_rol").attr("style", "display: block");
}

/**Función para dar una estructura a la ventana modal de ver en detalle.*/
function verEnDetalleEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();
  ocultarAyuda();
  eliminarOnblurContrasena();

  $("#passwdUsuario1").attr("style", "display: none");
  $("#passwdUsuario2").attr("style", "display: none");
  $("#label_usuario_borrado_logico").attr("style", "display: none");
  $("#input_usuario_borrado_logico").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#select_id_rol").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de editar.*/
function editEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();
  ocultarAyuda();
  eliminarOnblurContrasena();

  $("#passwdUsuario1").attr("style", "display: none");
  $("#passwdUsuario2").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#select_id_rol").attr("style", "display: none");
  $("#label_usuario_borrado_logico").attr("style", "display: none");
  $("#input_usuario_borrado_logico").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de borrar.*/
function deleteEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();
  ocultarAyuda();
  eliminarOnblurContrasena();

  $("#passwdUsuario1").attr("style", "display: none");
  $("#passwdUsuario2").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#select_id_rol").attr("style", "display: none");
  $("#label_usuario_borrado_logico").attr("style", "display: none");
  $("#input_usuario_borrado_logico").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de reactivar.*/
function reactivarEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();
  ocultarAyuda();
  eliminarOnblurContrasena();

  $("#passwdUsuario1").attr("style", "display: none");
  $("#passwdUsuario2").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#select_id_rol").attr("style", "display: none");
  $("#label_usuario_borrado_logico").attr("style", "display: none");
  $("#input_usuario_borrado_logico").attr("style", "display: none");
}

function activarCamposInLineBlock() {
  $("#input_dni_usuario").attr("style", "display: inline-block");
  $("#input_nombre_usuario").attr("style", "display: inline-block");
  $("#input_apellidos_usuario").attr("style", "display: inline-block");
  $("#input_fechaNacimiento_usuario").attr("style", "display: inline-block");
  $("#input_direccion_usuario").attr("style", "display: inline-block");
  $("#input_telefono_usuario").attr("style", "display: inline-block");
  $("#input_email_usuario").attr("style", "display: inline-block");
  $("#input_usuario_usuario").attr("style", "display: inline-block");
  $("#input_rol_usuario").attr("style", "display: inline-block");
  $("#input_usuario_borrado_logico").attr("style", "display: inline-block");
  $("#passwdUsuario1").attr("style", "display: inline-block");
  $("#passwdUsuario2").attr("style", "display: inline-block");
  $("#select_borrado_logico").attr("style", "display: inline-block");
  $("#select_id_rol").attr("style", "display: inline-block");

  habilitaCampos([
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
    "select_borrado_logico",
    "select_id_rol",
  ]);
}

function activarCamposBlock() {
  $("#input_dni_usuario").attr("style", "display: block");
  $("#input_nombre_usuario").attr("style", "display: block");
  $("#input_apellidos_usuario").attr("style", "display: block");
  $("#input_fechaNacimiento_usuario").attr("style", "display: block");
  $("#input_direccion_usuario").attr("style", "display: block");
  $("#input_telefono_usuario").attr("style", "display: block");
  $("#input_email_usuario").attr("style", "display: block");
  $("#input_usuario_usuario").attr("style", "display: block");
  $("#input_rol_usuario").attr("style", "display: block");
  $("#input_usuario_borrado_logico").attr("style", "display: block");
  $("#passwdUsuario1").attr("style", "display: block");
  $("#passwdUsuario2").attr("style", "display: block");
  $("#select_borrado_logico").attr("style", "display: block");
  $("#select_id_rol").attr("style", "display: block");

  habilitaCampos([
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
    "select_borrado_logico",
    "select_id_rol",
  ]);
}

function mostrarObligatorios() {
  $("#obligatorio_usuario_dni").attr("style", "display: inline-block");
  $("#obligatorio_usuario_nombre").attr("style", "display: inline-block");
  $("#obligatorio_usuario_apellidos").attr("style", "display: inline-block");
  $("#obligatorio_usuario_fechaNacimiento").attr(
    "style",
    "display: inline-block"
  );
  $("#obligatorio_usuario_direccion").attr("style", "display: inline-block");
  $("#obligatorio_usuario_telefono").attr("style", "display: inline-block");
  $("#obligatorio_usuario_email").attr("style", "display: inline-block");
  $("#obligatorio_usuario_usuario").attr("style", "display: inline-block");
  $("#obligatorioPass1").attr("style", "display: inline-block");
  $("#obligatorioPass2").attr("style", "display: inline-block");
}

function ocultarObligatorios() {
  $("#obligatorio_usuario_dni").attr("style", "display: none");
  $("#obligatorio_usuario_nombre").attr("style", "display: none");
  $("#obligatorio_usuario_apellidos").attr("style", "display: none");
  $("#obligatorio_usuario_fechaNacimiento").attr("style", "display: none");
  $("#obligatorio_usuario_direccion").attr("style", "display: none");
  $("#obligatorio_usuario_telefono").attr("style", "display: none");
  $("#obligatorio_usuario_email").attr("style", "display: none");
  $("#obligatorio_usuario_usuario").attr("style", "display: none");
  $("#obligatorioPass1").attr("style", "display: none");
  $("#obligatorioPass2").attr("style", "display: none");
}

function mostrarLabels() {
  $("#label_usuario_dni").attr("style", "display: block");
  $("#label_usuario_nombre").attr("style", "display: block");
  $("#label_usuario_apellidos").attr("style", "display: block");
  $("#label_usuario_fechaNacimiento").attr("style", "display: block");
  $("#label_usuario_direccion").attr("style", "display: block");
  $("#label_usuario_telefono").attr("style", "display: block");
  $("#label_usuario_email").attr("style", "display: block");
  $("#label_usuario_usuario").attr("style", "display: block");
  $("#label_usuario_rol").attr("style", "display: block");
  $("#label_usuario_borrado_logico").attr("style", "display: block");
}

function ocultarLabels() {
  $("#label_usuario_dni").attr("style", "display: none");
  $("#label_usuario_nombre").attr("style", "display: none");
  $("#label_usuario_apellidos").attr("style", "display: none");
  $("#label_usuario_fechaNacimiento").attr("style", "display: none");
  $("#label_usuario_direccion").attr("style", "display: none");
  $("#label_usuario_telefono").attr("style", "display: none");
  $("#label_usuario_email").attr("style", "display: none");
  $("#label_usuario_usuario").attr("style", "display: none");
  $("#label_usuario_rol").attr("style", "display: none");
  $("#label_usuario_borrado_logico").attr("style", "display: none");
}

function mostrarAyuda() {
  $("#ayudaDNI").attr("style", "display: inline-block");
  $("#ayudaTEL").attr("style", "display: inline-block");
  $("#ayudaEMAIL").attr("style", "display: inline-block");
}

function ocultarAyuda() {
  $("#ayudaDNI").attr("style", "display: none");
  $("#ayudaTEL").attr("style", "display: none");
  $("#ayudaEMAIL").attr("style", "display: none");
}

function eliminarOnblurContrasena() {
  $("#passwdUsuario1").attr("onblur", "");
  $("#passwdUsuario2").attr("onblur", "");
}

/*
##################################################################################################################
#################################################Funciones show###################################################
##################################################################################################################
*/

/*Función para mostrar modal para añadir e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showAdd() {
  var idioma = getCookie("lang");
  addEstructura();
  cambiarFormulario(
    "addForm",
    "javascript:addEntidad();",
    "return comprobarAddUsuario();"
  );
  cambiarOnBlurCampos(
    "return comprobarDNI('input_dni_usuario', 'errorFormatoDni', 'dniPersona')",
    "return comprobarNombre('input_nombre_usuario', 'errorFormatoNombre', 'nombrePersonaRegistro')",
    "return comprobarApellidos('input_apellidos_usuario', 'errorFormatoApellidos', 'apellidosPersonaRegistro')",
    "return comprobarFechaNacimiento('input_fechaNacimiento_usuario', 'errorFormatoFecha', 'fechaPersonaRegistro')",
    "return comprobarDireccion('input_direccion_usuario', 'errorFormatoDireccion', 'direccionPersonaRegistro')",
    "return comprobarTelefono('input_telefono_usuario', 'errorFormatoTelefono', 'telefonoPersonaRegistro')",
    "return comprobarEmail('input_email_usuario', 'errorFormatoEmail', 'emailPersonaRegistro')",
    "return comprobarUser('input_usuario_usuario', 'errorFormatoUsuario', 'loginUsuario')",
    "return comprobarPass('passwdUsuario1', 'errorFormatoPassRegistro', 'passwdUsuarioRegistro')",
    "return comprobarPassRepetida('passwdUsuario2', 'errorFormatoPassRegistro2', 'passwdUsuarioRegistro')"
  );
  cambiarIcono("images/add.png", "ICONO_ADD", "iconoAddUsuario", "Añadir");
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para buscar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showSearch() {
  var idioma = getCookie("lang");
  searchEstructura();
  cambiarFormulario(
    "searchForm",
    "javascript:searchEntidad();",
    "return comprobarSearchUsuario();"
  );
  cambiarOnBlurCampos(
    "return comprobarDNISearch('input_dni_usuario', 'errorFormatoDni', 'dniPersona')",
    "return comprobarNombreSearch('input_nombre_usuario', 'errorFormatoNombre', 'nombrePersonaRegistro')",
    "return comprobarApellidosSearch('input_apellidos_usuario', 'errorFormatoApellidos', 'apellidosPersonaRegistro')",
    "return comprobarFechaNacimiento('input_fechaNacimiento_usuario', 'errorFormatoFecha', 'fechaPersonaRegistro')",
    "return comprobarDireccionSearch('input_direccion_usuario', 'errorFormatoDireccion', 'direccionPersonaRegistro')",
    "return comprobarTelefonoSearch('input_telefono_usuario', 'errorFormatoTelefono', 'telefonoPersonaRegistro')",
    "return comprobarEmailSearch('input_email_usuario', 'errorFormatoEmail', 'emailPersonaRegistro')",
    "return comprobarUserSearch('input_usuario_usuario', 'errorFormatoUsuario', 'loginUsuario')"
  );
  cambiarIcono(
    "images/search.png",
    "ICONO_SEARCH",
    "iconoSearchUsuario",
    "Buscar"
  );
  rellenaSelect();
  rellenaSelectRol();
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para ver en detalle e invoca a la función
 * que carga como corresponda los label, input y campo obligatorio.*/
function showDetalle(
  usuario,
  rol,
  dni,
  nombre,
  apellidos,
  fechaNacimiento,
  direccion,
  telefono,
  email,
  borrado_logico
) {
  var idioma = getCookie("lang");
  var campos = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
  ];
  verEnDetalleEstructura();
  cambiarFormulario("detailForm", "javascript:detailEntidad();", "");
  cambiarIcono("images/close2.png", "CERRARMODAL", "iconoCerrar", "Ok");
  rellenarFormulario(
    usuario,
    rol,
    dni,
    nombre,
    apellidos,
    fechaNacimiento,
    direccion,
    telefono,
    email,
    borrado_logico
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para editar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEditar(
  usuario,
  rol,
  dni,
  nombre,
  apellidos,
  fechaNacimiento,
  direccion,
  telefono,
  email,
  borrado_logico
) {
  var idioma = getCookie("lang");
  var campos = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_usuario_borrado_logico",
  ];
  editEstructura();
  cambiarFormulario(
    "editForm",
    "javascript:editEntidad();",
    "return comprobarEditUsuario();"
  );
  cambiarOnBlurCampos(
    "return comprobarDNI('input_dni_usuario', 'errorFormatoDni', 'dniPersona')",
    "return comprobarNombre('input_nombre_usuario', 'errorFormatoUsuario', 'nombrePersonaRegistro')",
    "return comprobarApellidos('input_apellidos_usuario', 'errorFormatoApellidos', 'apellidosPersonaRegistro')",
    "return comprobarFechaNacimiento('input_fechaNacimiento_usuario', 'errorFormatoFecha', 'fechaPersonaRegistro')",
    "return comprobarDireccion('input_direccion_usuario', 'errorFormatoDireccion', 'direccionPersonaRegistro')",
    "return comprobarTelefono('input_telefono_usuario', 'errorFormatoTelefono', 'telefonoPersonaRegistro')",
    "return comprobarEmail('input_email_usuario', 'errorFormatoEmail', 'emailPersonaRegistro')",
    "return comprobarUser('input_usuario_usuario', 'errorFormatoUsuario', 'loginUsuario')"
  );
  cambiarIcono("images/edit.png", "ICONO_EDIT", "iconoEditarRol", "Editar");
  rellenarFormulario(
    usuario,
    rol,
    dni,
    nombre,
    apellidos,
    fechaNacimiento,
    direccion,
    telefono,
    email,
    borrado_logico
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para editar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEditarUsuario(
  usuario,
  rol,
  dni,
  nombre,
  apellidos,
  fechaNacimiento,
  direccion,
  telefono,
  email,
  borrado_logico
) {
  var idioma = getCookie("lang");
  var campos = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_usuario_borrado_logico",
  ];
  editEstructura();
  cambiarFormulario(
    "editForm",
    "javascript:editUsuario();",
    "return comprobarEditUsuario();"
  );
  cambiarOnBlurCampos(
    "return comprobarDNI('input_dni_usuario', 'errorFormatoDni', 'dniPersona')",
    "return comprobarNombre('input_nombre_usuario', 'errorFormatoUsuario', 'nombrePersonaRegistro')",
    "return comprobarApellidos('input_apellidos_usuario', 'errorFormatoApellidos', 'apellidosPersonaRegistro')",
    "return comprobarFechaNacimiento('input_fechaNacimiento_usuario', 'errorFormatoFecha', 'fechaPersonaRegistro')",
    "return comprobarDireccion('input_direccion_usuario', 'errorFormatoDireccion', 'direccionPersonaRegistro')",
    "return comprobarTelefono('input_telefono_usuario', 'errorFormatoTelefono', 'telefonoPersonaRegistro')",
    "return comprobarEmail('input_email_usuario', 'errorFormatoEmail', 'emailPersonaRegistro')",
    "return comprobarUser('input_usuario_usuario', 'errorFormatoUsuario', 'loginUsuario')"
  );
  cambiarIcono("images/edit.png", "ICONO_EDIT", "iconoEditarRol", "Editar");
  rellenarFormulario(
    usuario,
    rol,
    dni,
    nombre,
    apellidos,
    fechaNacimiento,
    direccion,
    telefono,
    email,
    borrado_logico
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para eliminar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEliminar(
  usuario,
  rol,
  dni,
  nombre,
  apellidos,
  fechaNacimiento,
  direccion,
  telefono,
  email,
  borrado_logico
) {
  var idioma = getCookie("lang");
  var campos = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
  ];
  deleteEstructura();
  cambiarFormulario("deleteForm", "javascript:deleteEntidad();", "");
  cambiarIcono(
    "images/delete.png",
    "ICONO_ELIMINAR",
    "iconoEliminar",
    "Eliminar"
  );
  rellenarFormulario(
    usuario,
    rol,
    dni,
    nombre,
    apellidos,
    fechaNacimiento,
    direccion,
    telefono,
    email,
    borrado_logico
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para reactivar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showReactivar(
  usuario,
  rol,
  dni,
  nombre,
  apellidos,
  fechaNacimiento,
  direccion,
  telefono,
  email,
  borrado_logico
) {
  var idioma = getCookie("lang");
  var campos = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
  ];
  reactivarEstructura();
  cambiarFormulario("reactivarForm", "javascript:reactivarEntidad();", "");
  cambiarIcono(
    "images/reactivar2.png",
    "ICONO_REACTIVAR",
    "iconoReactivar",
    "Reactivar"
  );
  rellenarFormulario(
    usuario,
    rol,
    dni,
    nombre,
    apellidos,
    fechaNacimiento,
    direccion,
    telefono,
    email,
    borrado_logico
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función que crea según las columnas que le pasemos un div con checkbox 
para marcar y así ocultar las columnas.*/
function createHideShowColumnsWindow() {
  //class de la tabla
  var arrayColumnas = {
    USUARIO_ROL_COLUMN: 2,
    USUARIO_NOMBRE_COLUMN: 3,
    USUARIO_APELLIDOS_COLUMN: 4,
    USUARIO_EMAIL_COLUMN: 5,
    BORRADO_LOGICO_COLUMN: 6,
  };

  var checkbox = "";
  var claveLabel = "";

  for (var clave in arrayColumnas) {
    claveLabel = clave + "_label";
    checkbox =
      checkbox +
      "<input type='checkbox' id='" +
      clave +
      "'name='" +
      clave +
      "'value='" +
      clave +
      "'onclick='hideShow(" +
      clave +
      "," +
      arrayColumnas[clave] +
      ")'><label id = '" +
      claveLabel +
      "' for='" +
      clave.replace("_COLUMN", "") +
      "' class = '" +
      clave +
      "'></label><br>";
  }

  return checkbox;
}

/*Función que resetea el ocultar columnas.*/
function resetearHideShowColumnas() {
  var arrayColumnas = {
    USUARIO_ROL_COLUMN: 2,
    USUARIO_NOMBRE_COLUMN: 3,
    USUARIO_APELLIDOS_COLUMN: 4,
    USUARIO_EMAIL_COLUMN: 5,
    BORRADO_LOGICO_COLUMN: 6,
  };

  for (var clave in arrayColumnas) {
    $("." + clave).show();
  }
}

/**Función para cambiar valores del icono del botón para cada modal de acción.*/
function cambiarIcono(ruta, nombreIcono, estiloIcono, valorIcono) {
  $("#iconoAcciones").removeClass();
  $("#spanAcciones").removeClass();
  $("#spanAcciones").addClass("tooltiptext");

  $("#iconoAcciones").attr("src", ruta);
  $("#iconoAcciones").addClass(nombreIcono);
  $("#iconoAcciones").addClass(estiloIcono);
  $("#spanAcciones").addClass(nombreIcono);
  $("#btnAcciones").attr("value", valorIcono);
}

/**Función que rellenado los datos del formulario para realizar la petición.*/
function rellenarFormulario(
  usuario,
  rol,
  dni,
  nombre,
  apellidos,
  fechaNacimiento,
  direccion,
  telefono,
  email,
  borrado_logico
) {
  $("#input_usuario_usuario").val(usuario);
  $("#input_rol_usuario").val(rol);
  $("#input_dni_usuario").val(dni);
  $("#input_nombre_usuario").val(nombre);
  $("#input_apellidos_usuario").val(apellidos);
  $("#input_fechaNacimiento_usuario").val(fechaNacimiento);
  $("#input_direccion_usuario").val(direccion);
  $("#input_telefono_usuario").val(telefono);
  $("#input_email_usuario").val(email);
  $("#input_usuario_borrado_logico").val(borrado_logico);
}

/*Función que limpia el título de cada modal.*/
function limpiarModalTitulo() {
  var modal = document.getElementById("modal-title");
  if (modal.classList.contains("INSERTAR_ENTIDAD")) {
    $("#modal-title").removeClass("INSERTAR_ENTIDAD");
  }
  if (modal.classList.contains("EDITAR_ENTIDAD")) {
    $("#modal-title").removeClass("EDITAR_ENTIDAD");
  }
  if (modal.classList.contains("ELIMINAR_ENTIDAD")) {
    $("#modal-title").removeClass("ELIMINAR_ENTIDAD");
  }
  if (modal.classList.contains("REACTIVAR_ENTIDAD")) {
    $("#modal-title").removeClass("REACTIVAR_ENTIDAD");
  }
  if (modal.classList.contains("ERROR_ENTIDAD")) {
    $("#modal-title").removeClass("ERROR_ENTIDAD");
  }
}

/*
##################################################################################################################
###########################################Comprobación de accion#################################################
##################################################################################################################
*/

/*Función para cambiar onBlur de los campos. El objetivo es añadir onBlur en los input.*/
function cambiarOnBlurCampos(
  onBlurDni,
  onBlurNombre,
  onBlurApellidos,
  onBlurFechaNaciemiento,
  onBlurDireccion,
  onBlurTelefono,
  onBlurEmail,
  onBlurUsuario,
  onBlurPassword1,
  onBlurPassword2
) {
  if (onBlurDni != "") {
    $("#input_dni_usuario").attr("onblur", onBlurDni);
  }

  if (onBlurNombre != "") {
    $("#input_nombre_usuario").attr("onblur", onBlurNombre);
  }

  if (onBlurApellidos != "") {
    $("#input_apellidos_usuario").attr("onblur", onBlurApellidos);
  }

  if (onBlurFechaNaciemiento != "") {
    $("#input_fechaNacimiento_usuario").attr("onblur", onBlurFechaNaciemiento);
  }

  if (onBlurDireccion != "") {
    $("#input_direccion_usuario").attr("onblur", onBlurDireccion);
  }

  if (onBlurTelefono != "") {
    $("#input_telefono_usuario").attr("onblur", onBlurTelefono);
  }

  if (onBlurEmail != "") {
    $("#input_email_usuario").attr("onblur", onBlurEmail);
  }

  if (onBlurUsuario != "") {
    $("#input_usuario_usuario").attr("onblur", onBlurUsuario);
  }

  if (onBlurPassword1 != "") {
    $("#passwdUsuario1").attr("onblur", onBlurPassword1);
  }

  if (onBlurPassword2 != "") {
    $("#passwdUsuario2").attr("onblur", onBlurPassword2);
  }
}

/*
##################################################################################################################
#################################################Peticiones AJAX##################################################
##################################################################################################################
*/

/**Función invocadas por los show(Accion) que hacen la petición a back de inserción.*/
function addEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "insertar", "usuario");
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    if (verificarPasswd()) {
      encriptar("passwdUsuario1");
      return new Promise(function (resolve, reject) {
        $.ajax({
          method: "POST",
          url: URL,
          data: $("#formularioGenerico").serialize(),
          headers: { Authorization: token },
        })
          .done((res) => {
            if (res.code != "USUARIO_INSERTAR_OK") {
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
}

async function addEntidad() {
  var idioma = getCookie("lang");
  await addEntidadAjaxPromesa()
    .then((res) => {
      $("#modal-title").addClass("INSERTAR_ENTIDAD");
      respuestaOKAjax();
      if (getCookie("busquedaVacia") == "no") {
        setCookie("busquedaVacia", "si");
        refresh();
      } else if (getCookie("busquedaVacia") == "si") {
        paginacionAdd();
      }
      actualizaMensajesRespuestAjax(res.code);
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });
  let idElementoList = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de busqueda.*/
function searchEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "buscar", "usuario");
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenerico").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "RECORDSET_DATOS" && res.code != "RECORDSET_VACIO") {
            reject(res);
          }
          resolve(res);
          guardarParametrosBusqueda(res.criteriosbusqueda);
          if (!busquedaVacia()) {
            setCookie("busquedaVacia", "no");
          }
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

async function searchEntidad() {
  var idioma = getCookie("lang");

  insertacampo(document.formularioGenerico, "empieza", 0);
  insertacampo(
    document.formularioGenerico,
    "filaspagina",
    escogeTamanho("usuario")
  );

  await searchEntidadAjaxPromesa()
    .then((res) => {
      $("#formularioAcciones").attr("style", "display: none");

      setCookie("pintarPaginador", "si");
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("usuario");
      }

      mensajeFilasTabla();
      $("#datosEntidades").html("");
      for (var i = 0; i < res.resource.length; i++) {
        var tr = construyeFila(res.resource[i]);
        $("#datosEntidades").append(tr);
      }

      $("#ckeckboxColumnas").html("");
      var div = createHideShowColumnsWindow();
      $("#ckeckboxColumnas").append(div);
      setCookie("ocultarColumnas", "creado");
      resetearHideShowColumnas();
      $("#formularioAcciones").modal("hide");
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });

  let idElementoList = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
  ];

  eliminarcampo("empieza");
  eliminarcampo("filaspagina");

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función para cerrar la ventana de detalle de usuario*/
function detailEntidad() {
  $("#formularioAcciones").modal("hide");
  cerrarModal("formularioAcciones", "", "");
}

/**Función invocadas por los show(Accion) que hacen la petición a back de editar.*/
function editEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "editar", "usuario");
  habilitaCampos([
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
  ]);
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenerico").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "USUARIO_EDITAR_OK") {
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

async function editEntidad() {
  var idioma = getCookie("lang");

  await editEntidadAjaxPromesa()
    .then((res) => {
      $("#modal-title").addClass("EDITAR_ENTIDAD");
      respuestaOKAjax();
      actualizaMensajesRespuestAjax(res.code);
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });

  let idElementoList = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función para editar los datos de un usuario que no es admin.*/
function editUsuarioAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "editar", "usuario");
  habilitaCampos([
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
  ]);
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenerico").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "USUARIO_EDITAR_OK") {
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

async function editUsuario() {
  var idioma = getCookie("lang");

  await editUsuarioAjaxPromesa()
    .then((res) => {
      $("#modal-title").addClass("EDITAR_ENTIDAD");
      respuestaOKAjax();
      actualizaMensajesRespuestAjax(res.code);
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });

  let idElementoList = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
  ];

  cargarDatosUsuario();
  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de eliminar.*/
function deleteEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "borrar", "usuario");
  habilitaCampos(["input_usuario_usuario"]);
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenerico").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "USUARIO_BORRAR_OK") {
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

async function deleteEntidad() {
  var idioma = getCookie("lang");
  var tipoBorrado = "";

  await deleteEntidadAjaxPromesa()
    .then((res) => {
      $("#modal-title").addClass("ELIMINAR_ENTIDAD");
      tipoBorrado = res.tipoBorrado;
      respuestaOKAjax();

      if (getCookie("busquedaVacia") == "no") {
        setCookie("busquedaVacia", "si");
        refresh();
      } else if (getCookie("busquedaVacia") == "si") {
        paginacionDelete(tipoBorrado);
      }

      actualizaMensajesRespuestAjax(res.code);
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });
  let idElementoList = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de reactivar.*/
function reactivarEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "reactivar", "usuario");
  habilitaCampos(["input_usuario_usuario"]);
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenerico").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "USUARIO_REACTIVAR_OK") {
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

async function reactivarEntidad() {
  var idioma = getCookie("lang");

  await reactivarEntidadAjaxPromesa()
    .then((res) => {
      $("#modal-title").addClass("REACTIVAR_ENTIDAD");
      respuestaOKAjax();
      actualizaMensajesRespuestAjax(res.code);
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });

  let idElementoList = [
    "input_usuario_usuario",
    "input_rol_usuario",
    "input_dni_usuario",
    "input_nombre_usuario",
    "input_apellidos_usuario",
    "input_fechaNacimiento_usuario",
    "input_direccion_usuario",
    "input_telefono_usuario",
    "input_email_usuario",
    "input_usuario_borrado_logico",
    "passwdUsuario1",
    "passwdUsuario2",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/*
##################################################################################################################
#########################################Acciones necesarias del SELECT###########################################
##################################################################################################################
*/

/*Funciones encargadas de rellenar los select*/
function rellenaSelect() {
  var select = $("#select_borrado_logico");

  select.empty();

  var option1 = document.createElement("option");
  option1.setAttribute("value", "");
  option1.setAttribute("label", "-----");
  option1.setAttribute("class", "-----");
  option1.setAttribute("selected", "true");
  select.append(option1);

  var option2 = document.createElement("option");
  option2.setAttribute("value", 1);
  option2.setAttribute("label", "Sí");
  option2.setAttribute("class", "SI");
  select.append(option2);

  var option3 = document.createElement("option");
  option3.setAttribute("value", 0);
  option3.setAttribute("label", "No");
  option3.setAttribute("class", "NO");
  select.append(option3);
}

function rellenaSelectRol() {
  var select = $("#select_id_rol");

  select.empty();

  var option1 = document.createElement("option");
  option1.setAttribute("value", "");
  option1.setAttribute("label", "-----");
  option1.setAttribute("class", "-----");
  option1.setAttribute("selected", "true");
  select.append(option1);

  var rolesArrayCookie = getCookie("roles");
  var rolesArray = rolesArrayCookie.split(",");
  var option2 = document.createElement("option");
  var optionTexto = "";

  for (var i = 0; i < rolesArray.length; i++) {
    if (rolesArray[i] != "") {
      option2 = document.createElement("option");
      option2.setAttribute("value", i);
      option2.setAttribute("name", i);
      optionTexto = document.createTextNode(rolesArray[i]);
      option2.appendChild(optionTexto);
      select.append(option2);
    }
  }
}

function rolesSistemaAjaxPromesa() {
  addActionControler(document.formularioGenerico, "buscar", "rol");

  var token = getCookie("token");
  var idioma = getCookie("lang");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenerico").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "RECORDSET_DATOS" && res.code != "RECORDSET_VACIO") {
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

async function rolesSistema() {
  var idioma = getCookie("lang");

  await rolesSistemaAjaxPromesa()
    .then((res) => {
      roles = [];
      res.resource.forEach((element) => {
        if (element.borrado_logico == 0) {
          roles[element.id_rol] = element.nombre_rol;
        }
      });
      setCookie("roles", roles);
    })
    .catch((res) => {
      $("#modal-title").addClass("modalMensajeError");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
      limpiarModalTitulo();
    });
  deleteActionController();
}

/***********Procedimiento que resetean las modales una vez se cierren*************/
$(document).ready(function () {
  $("#formularioAcciones").on("hidden.bs.modal", function () {
    let errores = [
      "errorFormatoDni",
      "errorFormatoNombre",
      "errorFormatoApellidos",
      "errorFormatoFecha",
      "errorFormatoDireccion",
      "errorFormatoTelefono",
      "errorFormatoEmail",
      "errorFormatoUsuario",
      "errorFormatoPassRegistro",
      "errorFormatoPassRegistro2",
      "bloqueoMayusculasRegistro",
      "error",
    ];
    errores.forEach((element) => {
      eliminarcampoId(element);
    });
    let campos = [
      "input_dni_usuario",
      "input_nombre_usuario",
      "input_apellidos_usuario",
      "input_fechaNacimiento_usuario",
      "input_direccion_usuario",
      "input_telefono_usuario",
      "input_email_usuario",
      "input_usuario_usuario",
      "input_rol_usuario",
      "input_usuario_borrado_logico",
      "passwdUsuario1",
      "passwdUsuario2",
    ];
    resetearFormulario("formularioGenerico", campos);
  });
});
