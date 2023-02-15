//Permisos de categoria
function accionesPermitidasCategoriaAjaxPromesa() {
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

async function accionesPermitidasCategoria() {
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
    "categoria"
  );

  await accionesPermitidasCategoriaAjaxPromesa()
    .then((res) => {
      /*Guardamos en una cookie las acciones de la funcionalidad.*/
      setCookie("accionesCategoria", res.resource);
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });

  /*Eliminamos el controlador que enviamos a back.*/
  deleteActionController();
  eliminarcampo("funcionalidad");
  setLang(idioma);
}

//Permisos de proceso
function accionesPermitidasProcesoAjaxPromesa() {
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

async function accionesPermitidasProceso() {
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
    "proceso"
  );

  await accionesPermitidasProcesoAjaxPromesa()
    .then((res) => {
      /*Guardamos en una cookie las acciones de la funcionalidad.*/
      setCookie("accionesProceso", res.resource);
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });

  /*Eliminamos el controlador que enviamos a back.*/
  deleteActionController();
  eliminarcampo("funcionalidad");
  setLang(idioma);
}

//////////////////////////

function recuperarCategoriaResponsable() {
  usuariosNoResponsablesSistema();
  var rol = getCookie("rolUsuario");

  var idioma = getCookie("lang");

  $("#miCategoria").html("");
  if (rol == "responsable" || rol == "administrador") {
    accionesPermitidas();
  }
  setLang(idioma);
}
function gestionContextInfo() {
  var categoria = JSON.parse(getCookie("categoriaActual"));

  setCookie("id_padre_actual", categoria.id_padre.id_categoria);
  var arrayPadresPervios = [categoria.id_padre.id_categoria];
  setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));
}

$(document).ready(function () {
  $(".iconCerrar").on("click", function () {
    if (
      $("#modal-title").attr("class") === "STOP" ||
      $("#modal-title").attr("class") === "ERROR_INTERNO"
    ) {
      cerrarModalNoToken("modal");
    } else {
      cerrarModal("modal");
    }
  });
});

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
    "categoria"
  );

  await accionesPermitidasAjaxPromesa()
    .then((res) => {
      /*Guardamos en una cookie las acciones de la funcionalidad.*/
      setCookie("acciones", res.resource);
      var usuario = getCookie("usuarioSistema");
      recuperarCategoria(usuario);
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });

  /*Eliminamos el controlador que enviamos a back.*/
  deleteActionController();
  eliminarcampo("funcionalidad");
  setLang(idioma);
}
function construyeTarjetaCategoria(categoria) {
  var atributosFunciones;

  let acciones = getCookie("accionesCategoria").split(",");
  let accionesProceso = getCookie("accionesProceso").split(",");

  //CUANDO SE CAMBIE EAGER HAY QUE CAMBIAR ESTO TAMBIÉN
  var id_categoria_padre;
  if (categoria.id_padre instanceof Object) {
    id_categoria_padre = categoria.id_padre.id_categoria;
  } else {
    id_categoria_padre = categoria.id_padre;
  }

  atributosFunciones = [
    "'" + categoria.id_categoria + "'",
    "'" + categoria.nombre_categoria + "'",
    "'" + categoria.descripcion_categoria + "'",
    "'" + categoria.id_padre.id_categoria + "'",
    "'" + categoria.id_padre.nombre_categoria + "'",
    "'" + categoria.usuario.dni + "'",
    "'" + categoria.usuario.usuario + "'",
    "'" + borrado_logico_texto(categoria.borrado_logico) + "'",
  ];

  var tarjetaInical =
    '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
    '<div class="card">' +
    '<img src="images/categorias.png" class="card-img-top" alt="Noticias">' +
    '<div class="card-body-news">' +
    '<h4 class="card-title">' +
    categoria.nombre_categoria +
    "</h4>" +
    '<p class="card-text description">' +
    categoria.descripcion_categoria +
    "</p>" +
    '<p class="card-text responsable" style="font-style: italic;">' +
    categoria.usuario.email +
    "</p>" +
    "</div>" +
    '<div class="card-footer">';

  var opcionAdd =
    '<form name="formCategoria' +
    categoria.id_categoria +
    '" id="formCategoriaAñadir' +
    categoria.id_categoria +
    '" action="javascript:showAdd(' +
    atributosFunciones +
    ')" onsubmit="">' +
    '<input type="hidden" id="' +
    categoria.id_categoria +
    '" name="id" value="' +
    categoria.id_categoria +
    '">' +
    '<button type="submit" name="btnCategoriasAñadir' +
    categoria.id_categoria +
    '"  class="btnCategorias' +
    categoria.id_categoria +
    ' tooltip3" id="btnCategoriasAñadir' +
    categoria.id_categoria +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/add.png"/>' +
    '<span class="tooltiptext3 NUEVA_CATEGORIA"></span>' +
    "</button>" +
    "</form>";

  var opcionEdit =
    '<form name="formCategoria' +
    categoria.id_categoria +
    '" id="formCategoriaEditar' +
    categoria.id_categoria +
    '" action="javascript:showEditar(' +
    atributosFunciones +
    ')" onsubmit="">' +
    '<button type="submit" name="btnCategoriasEditar' +
    categoria.id_categoria +
    '"  class="btnCategorias' +
    categoria.id_categoria +
    ' tooltip3" id="btnCategoriasEditar' +
    categoria.id_categoria +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/edit.png"/>' +
    '<span class="tooltiptext3 EDITAR_CATEGORIA"></span>' +
    "</button>" +
    "</form>";

  var opcionDelete =
    '<form name="formCategoria' +
    categoria.id_categoria +
    '" id="formCategoriaEliminar' +
    categoria.id_categoria +
    '" action="javascript:showEliminar(' +
    atributosFunciones +
    ')" onsubmit="">' +
    '<button type="submit" name="btnCategoriasEliminar' +
    categoria.id_categoria +
    '"  class="btnCategorias' +
    categoria.id_categoria +
    ' tooltip3" id="btnCategoriasEliminar' +
    categoria.id_categoria +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/delete.png"/>' +
    '<span class="tooltiptext3 ELIMINAR_CATEGORIA"></span>' +
    "</button>" +
    "</form>";

  var opcionCrearProceso =
    '<form name="formProcesodeCategoria' +
    categoria.id_categoria +
    '" id="formProcesoInsertar' +
    categoria.id_categoria +
    '" action="javascript:showAddProceso(' +
    "'" +
    categoria.id_categoria +
    "'" +
    "," +
    "'" +
    categoria.nombre_categoria +
    "'" +
    ')" onsubmit="">' +
    '<button type="submit" name="btnCrearProceso' +
    categoria.id_categoria +
    '"  class="btnProcesos' +
    categoria.id_categoria +
    ' tooltip3" id="btnProcesosInsertar' +
    categoria.id_categoria +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/rol.png"/>' +
    '<span class="tooltiptext3 INSERTAR_PROCESO"></span>' +
    "</button>" +
    "</form>";

  var opcionVerProceso =
    '<form name="formProcesodeCategoria' +
    categoria.id_categoria +
    '" id="formProcesoInsertar' +
    categoria.id_categoria +
    '" action="javascript:actualizarConProceso(' +
    atributosFunciones +
    ')" onsubmit="">' +
    '<button type="submit" name="btnCrearProceso' +
    categoria.id_categoria +
    '"  class="btnProcesos' +
    categoria.id_categoria +
    ' tooltip3" id="btnProcesosInsertar' +
    categoria.id_categoria +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/rol.png"/>' +
    '<span class="tooltiptext3 ICONO_NAVEGAR_PROCESO"></span>' +
    "</button>" +
    "</form>";

  var opcionSeguirNavegando =
    '<form name="formCategoria' +
    categoria.id_categoria +
    '" id="formCategoria' +
    categoria.id_categoria +
    '" action="javascript:actualizarPaginaConNuevasCategorias(' +
    "'" +
    categoria.id_categoria +
    "'" +
    "," +
    "'" +
    id_categoria_padre +
    "'" +
    ')" onsubmit="">' +
    '<button type="submit" name="btnCategorias' +
    categoria.id_categoria +
    '"  class="btnCategorias' +
    categoria.id_categoria +
    ' tooltip3" id="btnCategorias' +
    categoria.id_categoria +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/enterLogin.png"/>' +
    '<span class="tooltiptext3 ACLARACION_CATEGORIA"></span>' +
    "</button>" +
    "</form>";

  var tarjetaFinal =
    "</form>" +
    "</div>" +
    '<small class="text-muted"></small>' +
    "</div>" +
    "</div>" +
    "</div>";

  var tarjeta2 = tarjetaInical;
  if (acciones.includes("insertar") && categoria.id_categoria != 1) {
    tarjeta2 = tarjeta2 + opcionAdd;
  }
  if (acciones.includes("editar") && categoria.id_categoria != 1) {
    tarjeta2 = tarjeta2 + opcionEdit;
  }
  if (
    acciones.includes("borrar") &&
    categoria.id_categoria != 1 &&
    !categoria.tiene_proceso &&
    !categoria.tiene_hijos
  ) {
    tarjeta2 = tarjeta2 + opcionDelete;
  }

  if (
    accionesProceso.includes("insertar") &&
    categoria.id_categoria != 1 &&
    !categoria.tiene_proceso &&
    !categoria.tiene_hijos
  ) {
    tarjeta2 = tarjeta2 + opcionCrearProceso;
  }
  if (categoria.tiene_proceso) {
    tarjeta2 = tarjeta2 + opcionVerProceso;
  }
  if (categoria.tiene_hijos) {
    tarjeta2 = tarjeta2 + opcionSeguirNavegando;
  }

  tarjeta2 = tarjeta2 + tarjetaFinal;

  return tarjeta2;
}

function construyeTarjetaProceso(proceso) {
  var atributosFunciones;

  let acciones = getCookie("accionesProceso").split(",");

  //CUANDO SE CAMBIE EAGER HAY QUE CAMBIAR ESTO TAMBIÉN
  var id_proceso_padre;
  if (proceso.id_padre instanceof Object) {
    id_proceso_padre = proceso.id_padre.id_proceso;
  } else {
    id_proceso_padre = proceso.id_padre;
  }

  atributosFunciones = [
    "'" + proceso.id_proceso + "'",
    "'" + proceso.nombre_proceso + "'",
    "'" + proceso.descripcion_proceso + "'",
    "'" + proceso.formula + "'",
    "'" + proceso.id_categoria.id_categoria + "'",
    "'" + proceso.id_categoria.nombre_categoria + "'",
    "'" + borrado_logico_texto(proceso.borrado_logico) + "'",
  ];

  var tarjetaInical =
    '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
    '<div class="card">' +
    '<img src="images/news.png" class="card-img-top" alt="Noticias">' +
    '<div class="card-body-news">' +
    '<h4 class="card-title">' +
    proceso.nombre_proceso +
    "</h4>" +
    '<p class="card-text description">' +
    proceso.descripcion_proceso +
    "</p>" +
    '<p class="card-text responsable" style="font-style: italic;">' +
    proceso.formula +
    "</p>" +
    '<p class="card-text responsable" style="font-style: italic;">' +
    proceso.id_categoria.nombre_categoria +
    "</p>" +
    "</div>" +
    '<div class="card-footer">';

  var opcionEdit =
    '<form name="formproceso' +
    proceso.id_proceso +
    '" id="formprocesoEditar' +
    proceso.id_proceso +
    '" action="javascript:showEditarProceso(' +
    atributosFunciones +
    ')" onsubmit="">' +
    '<button type="submit" name="btnprocesosEditar' +
    proceso.id_proceso +
    '"  class="btnprocesos' +
    proceso.id_proceso +
    ' tooltip3" id="btnprocesosEditar' +
    proceso.id_proceso +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/edit.png"/>' +
    '<span class="tooltiptext3 EDITAR_PROCESO"></span>' +
    "</button>" +
    "</form>";

  var opcionDelete =
    '<form name="formproceso' +
    proceso.id_proceso +
    '" id="formprocesoEliminar' +
    proceso.id_proceso +
    '" action="javascript:showBorrarProceso(' +
    atributosFunciones +
    ')" onsubmit="">' +
    '<button type="submit" name="btnprocesosEliminar' +
    proceso.id_proceso +
    '"  class="btnprocesos' +
    proceso.id_proceso +
    ' tooltip3" id="btnprocesosEliminar' +
    proceso.id_proceso +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/delete.png"/>' +
    '<span class="tooltiptext3 BORRAR_PROCESO"></span>' +
    "</button>" +
    "</form>";

  var tarjetaFinal =
    "</form>" +
    "</div>" +
    '<small class="text-muted"></small>' +
    "</div>" +
    "</div>" +
    "</div>";

  var tarjeta2 = tarjetaInical;
  if (acciones.includes("editar")) {
    tarjeta2 = tarjeta2 + opcionEdit;
  }
  if (acciones.includes("borrar")) {
    tarjeta2 = tarjeta2 + opcionDelete;
  }

  tarjeta2 = tarjeta2 + tarjetaFinal;

  return tarjeta2;
}

//funcion para actualizar el titulo de la pagina
function actualizarTitulo(accion) {
  //$("#bienvenida").val(nombre_categoria);
  if (accion == "categoria") {
    $("#bienvenida").attr("class", "bienvenida MI_CATEGORIA");
  } else {
    $("#bienvenida").attr("class", "bienvenida MI_PROCESO");
  }
}
function actualizarConProceso(
  id,
  nombre,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre_responsable,
  borrado_logico
) {
  setCookie("id_padre_actual", id);

  var arrayPadresPervios = JSON.parse(getCookie("id_padre_previo"));
  if (id_padre == 0) {
    id_padre = 1;
  }
  arrayPadresPervios.push(id_padre);

  setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));

  actualizarTitulo("proceso");
  setCookie("procesoUltimoBuscado", id);
  buscarProceso(id);
}

function limpiarErroresModal() {
  let errores = [
    "errorFormatoId",
    "errorFormatoNombre",
    "errorFormatoDescripcion",
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
  //ocultarLabels();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: none");
  $("#input_categoria_borrado_logico").attr("style", "display: none");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

/**Función para dar una estructura a la ventana modal de buscar.*/
function searchEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  //ocultarLabels();

  $("#input_categoria_id").attr("style", "display: none");
  $("#input_categoria_borrado_logico").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: block");
  $("#select_borrado_logico").attr("style", "display: block");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

/**Función para dar una estructura a la ventana modal de ver en detalle.*/
function verEnDetalleEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: none");
  $("#input_categoria_borrado_logico").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

/**Función para dar una estructura a la ventana modal de editar.*/
function editEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: none");
  $("#input_categoria_borrado_logico").attr("style", "display: none");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

/**Función para dar una estructura a la ventana modal de borrar.*/
function deleteEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: none");
  $("#input_categoria_borrado_logico").attr("style", "display: none");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

/**Función para dar una estructura a la ventana modal de reactivar.*/
function reactivarEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
  $("#select_borrado_logico").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: none");
  $("#input_categoria_borrado_logico").attr("style", "display: none");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

function activarCamposInLineBlock() {
  $("#input_categoria_id").attr("style", "display: inline-block");
  $("#input_categoria_nombre").attr("style", "display: inline-block");
  $("#input_categoria_descripcion").attr("style", "display: inline-block");
  $("#input_categoria_borrado_logico").attr("style", "display: inline-block");

  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ]);
}

function activarCamposBlock() {
  $("#input_categoria_id").attr("style", "display: block");
  $("#input_categoria_nombre").attr("style", "display: block");
  $("#input_categoria_descripcion").attr("style", "display: block");
  $("#input_categoria_borrado_logico").attr("style", "display: block");

  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ]);
}

function mostrarObligatorios() {
  $("#obligatorio_categoria_nombre").attr("style", "display: inline-block");
  $("#obligatorio_categoria_description").attr(
    "style",
    "display: inline-block"
  );
}

function ocultarObligatorios() {
  $("#obligatorio_categoria_nombre").attr("style", "display: none");
  $("#obligatorio_categoria_description").attr("style", "display: none");
}

function mostrarLabels() {
  $("#label_categoria_id").attr("style", "display: block");
  $("#label_categoria_nombre").attr("style", "display: block");
  $("#label_categoria_description").attr("style", "display: block");
  $("#label_categoria_borrado_logico").attr("style", "display: block");
  $("#label_categoria_padre").attr("style", "display: block");
}

function ocultarLabels() {
  $("#label_categoria_id").attr("style", "display: none");
  $("#label_categoria_nombre").attr("style", "display: none");
  $("#label_categoria_description").attr("style", "display: none");
  $("#label_categoria_borrado_logico").attr("style", "display: none");
  $("#label_categoria_padre").attr("style", "display: none");
}
function cambiarOnBlurCampos(onBlurId, onBlurNombre, onBlurdescripcion) {
  if (onBlurId != "") {
    $("#input_categoria_id").attr("onblur", onBlurId);
  }

  if (onBlurNombre != "") {
    $("#input_categoria_nombre").attr("onblur", onBlurNombre);
  }

  if (onBlurdescripcion != "") {
    $("#input_categoria_descripcion").attr("onblur", onBlurdescripcion);
  }
}

function cambiarOnBlurCamposProceso(
  onBlurNombre,
  onBlurDescripcion,
  onBlurFormula,
  onBlurCategoriaProceso
) {
  if (onBlurNombre != "") {
    $("#input_proceso_nombre").attr("onblur", onBlurNombre);
  }
  if (onBlurDescripcion != "") {
    $("#input_proceso_descripcion").attr("onblur", onBlurDescripcion);
  }
  if (onBlurFormula != "") {
    $("#input_proceso_formula").attr("onblur", onBlurFormula);
  }
  if (onBlurCategoriaProceso != "") {
    $("#select_categoria_insertar_proceso").attr(
      "onblur",
      onBlurCategoriaProceso
    );
  }
}
/**Función que rellenado los datos del formulario para realizar la petición.*/
function rellenarFormulario(id, nombre, descricion, padre, borrado_logico) {
  $("#input_categoria_id").val(id);
  $("#input_categoria_nombre").val(nombre);
  $("#input_categoria_descripcion").val(descricion);
  $("#input_categoria_borrado_logico").val(borrado_logico);
  //rellenaSelectCategoriaPadre(padre);
}
function rellenarFormularioProcesos(
  id,
  nombre,
  descripcion,
  formula,
  id_categoria,
  nombre_categoria,
  borrado_logico
) {
  $("#input_proceso_id").val(id);
  $("#input_proceso_nombre").val(nombre);
  $("#input_proceso_descripcion").val(descripcion);
  $("#input_proceso_formula").val(formula);
  $("#input_proceso_borrado_logico").val(borrado_logico);
  var select = $("#select_categoria_insertar_proceso");

  select.empty();

  var option2 = document.createElement("option");
  var optionTexto = "";

  option2 = document.createElement("option");
  option2.setAttribute("value", id_categoria);
  option2.setAttribute("name", nombre_categoria);

  option2.setAttribute("selected", "true");

  optionTexto = document.createTextNode(nombre_categoria);
  option2.appendChild(optionTexto);

  select.append(option2);
}
function borrarContenidoFormulario() {
  var contenido = "";
  $("#input_categoria_id").val(contenido);
  $("#input_categoria_nombre").val(contenido);
  $("#input_categoria_descripcion").val(contenido);
  $("#input_categoria_borrado_logico").val(contenido);
  $("#select_padre_insertar_categoria").val(contenido);
  $("#select_padre_insertar_categoria").val(contenido);
}

/**Función para cambiar valores del formulario.*/
function cambiarFormularioProceso(tituloForm, action, onsubmit) {
  $("#formularioAccionesProceso").attr("style", "display: block");
  $("#cerrarForm").attr("onclick", "cerrarModal('formularioAcciones', '', '')");
  $("#tituloForms").addClass(tituloForm);

  if (action != "") {
    $("#formularioGenericoProcesos").attr("action", action);
  }

  if (onsubmit != "") {
    $("#formularioGenericoProcesos").attr("onsubmit", onsubmit);
  } else {
    $("#formularioGenericoProcesos").attr("onsubmit", "");
  }
}

function limpiarErroresModalProceso() {
  let errores = [
    "errorFormatoNombreProceso",
    "errorFormatoDescripcionProceso",
    "errorFormatoFormulaProceso",
  ];
  errores.forEach((element) => {
    eliminarcampoId(element);
  });

  $("#input_proceso_nombre").val("");
  $("#input_proceso_descripcion").val("");
  $("#input_proceso_formula").val("");
  //vacio el formulario
}

function formatoAddProceso(id_categoria, nombre_categoria) {
  $("#input_proceso_nombre").attr("style", "display: inline-block");
  $("#input_proceso_descripcion").attr(
    "style",
    "display: inline-block;WIDTH:300px;"
  );
  $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");
  $("#label_proceso_id").attr("style", "display: none");
  $("#input_proceso_id").attr("style", "display: none");
  $("#select_proceso_borrado_logico").attr("style", "display: none");
  $("#label_proceso_borrado_logico").attr("style", "display: none");
  $("#input_proceso_borrado_logico").attr("style", "display: none");
  $("#select_categoria_insertar_proceso").attr("style", "width: 300px;");
  $("#label_proceso_categoria").attr("style", "");
  $("#label_nota").attr("style", "");

  var select = $("#select_categoria_insertar_proceso");

  select.empty();

  var option2 = document.createElement("option");
  var optionTexto = "";

  option2 = document.createElement("option");
  option2.setAttribute("value", id_categoria);
  option2.setAttribute("name", nombre_categoria);

  option2.setAttribute("selected", "true");

  optionTexto = document.createTextNode(nombre_categoria);
  option2.appendChild(optionTexto);

  select.append(option2);
}
function showAddProceso(id_categoria, nombre_categoria) {
  var idioma = getCookie("lang");
  $("#formularioAccionesProcesoTitulo").attr("class", "INSERTAR_PROCESO");
  $("#input_proceso_nombre").attr("style", "display: inline-block");
  $("#input_proceso_descripcion").attr(
    "style",
    "display: inline-block;WIDTH:300px;"
  );
  $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");

  formatoAddProceso(id_categoria, nombre_categoria);

  var camposHabilitados = [
    "input_proceso_nombre",
    "input_proceso_descripcion",
    "input_proceso_formula",
    "select_categoria_insertar_proceso",
  ];
  limpiarErroresModalProceso();
  cambiarFormularioProceso(
    "addForm",
    "javascript:addEntidadProceso();",
    "return comprobarAddProceso();"
  );
  cambiarOnBlurCamposProceso(
    "return comprobarNombreProceso('input_proceso_nombre', 'errorFormatoNombreProceso', 'nombreProceso')",
    "return comprobarDescripcionProceso('input_proceso_descripcion', 'errorFormatoDescripcionProceso', 'descripcionProceso')",
    "return comprobarFormulaProceso('input_proceso_formula', 'errorFormatoFormulaProceso', 'formulaProceso')"
  );
  habilitaCampos(camposHabilitados);
  cambiarIconoProceso("images/add.png", "ICONO_ADD", "iconoAddRol", "Añadir");
  $("#formularioAccionesProceso").modal("show");

  setLang(idioma);
}

function cambiarIconoProceso(ruta, nombreIcono, estiloIcono, valorIcono) {
  $("#iconoAccionesProceso").attr("src", ruta);
  $("#iconoAccionesProceso").removeClass();
  $("#iconoAccionesProceso").addClass(nombreIcono);
  $("#iconoAccionesProceso").addClass(estiloIcono);
  $("#spanAccionesProceso").removeClass();
  $("#spanAccionesProceso").addClass("tooltiptext");
  $("#spanAccionesProceso").addClass(nombreIcono);
  $("#btnAccionesProceso").attr("value", valorIcono);
}
function showEditarProceso(
  id,
  nombre_proceso,
  descripcion,
  formula,
  id_categoria,
  nombre_categoria,
  borrado_logico
) {
  $("#formularioAccionesProcesoTitulo").attr("class", "EDITAR_PROCESO");

  $("#input_proceso_nombre").attr("style", "display: inline-block");
  $("#input_proceso_descripcion").attr(
    "style",
    "display: inline-block;WIDTH:300px;"
  );
  $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");
  $("#label_proceso_id").attr("style", "display: none");
  $("#input_proceso_id").attr("style", "display: none");
  $("#select_proceso_borrado_logico").attr("style", "display: none");
  $("#label_proceso_borrado_logico").attr("style", "display: none");
  $("#input_proceso_borrado_logico").attr("style", "display: none");
  $("#obligatorio_proceso_formula").attr("style", "display: none");
  $("#select_categoria_insertar_proceso").attr("style", "width: 300px;");
  $("#label_proceso_categoria").attr("style", "");
  $("#label_nota").attr("style", "");
  //rellenaSelectCategoriaPadre(id,nombre);
  //addEstructura();
  var idioma = getCookie("lang");
  var campos = [
    "input_proceso_id",
    "input_proceso_nombre",
    "input_proceso_borrado_logico",
  ];
  var camposHabilitados = [
    "input_proceso_descripcion",
    "input_proceso_formula",
    "select_categoria_insertar_proceso",
  ];
  limpiarErroresModalProceso();
  cambiarFormularioProceso(
    "editForm",
    "javascript:editEntidadProceso();",
    "return comprobarEditProceso();"
  );
  cambiarOnBlurCamposProceso(
    "return comprobarNombreProceso('input_proceso_nombre', 'errorFormatoNombre', 'nombreProceso')",
    "return comprobarDescripcionProceso('input_proceso_descripcion', 'errorFormatoDescripcion', 'descripcionProceso')",
    "return comprobarFormulaProceso('input_proceso_formula', 'errorFormatoFormulaProceso', 'formulaProceso')",
    "return comprobarSelectCategoriaProceso('select_categoria_insertar_proceso', 'errorFormatoCategoriaProceso', 'categoriaProceso')"
  );
  cambiarIconoProceso(
    "images/edit.png",
    "ICONO_EDIT",
    "iconoEditarRol",
    "Editar"
  );
  rellenarFormularioProcesos(
    id,
    nombre_proceso,
    descripcion,
    formula,
    id_categoria,
    nombre_categoria,
    borrado_logico
  );
  deshabilitaCampos(campos);
  habilitaCampos(camposHabilitados);

  $("#formularioAccionesProceso").modal("show");

  setLang(idioma);
}
function showBorrarProceso(
  id,
  nombre_proceso,
  descripcion,
  formula,
  id_categoria,
  nombre_categoria,
  borrado_logico
) {
  $("#formularioAccionesProcesoTitulo").attr("class", "BORRAR_PROCESO");

  $("#input_proceso_nombre").attr("style", "display: inline-block");
  $("#input_proceso_descripcion").attr(
    "style",
    "display: inline-block;WIDTH:300px;"
  );
  $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");
  $("#label_proceso_id").attr("style", "display: none");
  $("#input_proceso_id").attr("style", "display: none");
  $("#select_proceso_borrado_logico").attr("style", "display: none");
  $("#label_proceso_borrado_logico").attr("style", "display: none");
  $("#input_proceso_borrado_logico").attr("style", "display: none");
  $("#obligatorio_proceso_formula").attr("style", "display: none");

  $("#select_categoria_insertar_proceso").attr("style", "width: 300px;");
  $("#label_proceso_categoria").attr("style", "");
  $("#label_nota").attr("style", "");
  //rellenaSelectCategoriaPadre(id,nombre);
  //addEstructura();

  var idioma = getCookie("lang");
  var campos = [
    "input_proceso_id",
    "input_proceso_nombre",
    "input_proceso_descripcion",
    "input_proceso_borrado_logico",
    "select_categoria_insertar_proceso",
    "input_proceso_formula",
  ];
  limpiarErroresModalProceso();
  cambiarFormularioProceso(
    "deleteForm",
    "javascript:deleteEntidadProceso();",
    ""
  );
  cambiarIconoProceso(
    "images/delete.png",
    "ICONO_ELIMINAR",
    "iconoEliminar",
    "Eliminar"
  );
  rellenarFormularioProcesos(
    id,
    nombre_proceso,
    descripcion,
    formula,
    id_categoria,
    nombre_categoria,
    borrado_logico
  );
  deshabilitaCampos(campos);

  $("#formularioAccionesProceso").modal("show");

  setLang(idioma);
}

function parsearFormula() {
  var valid = false;

  const formula = eliminarEspacios($("#input_proceso_formula").val());
  //comprobador de que no hay errores
  var valid = true;

  if (!comprobarLLavesParentesis(formula)) {
    valid = false;
  }

  formulaTransformada = reemplazarLlaves(formula, "p");

  if (!checkCaractetesFormula(formulaTransformada)) {
    valid = false;
  }

  //EXTRACCION DE PARAMETROS

  if (valid) {
    const variables = formula.match(/{(.*?)}/g);
    const names = variables.map((v) => v.replace(/[{}]/g, ""));

    var parametros = [];
    var unidades = [];

    names.forEach((element) => {
      const matchUnidades = element.match(/\(([^)]+)\)/); //extrae las unidades
      const matchParametro = element.match(/^([^(]+)/);
      if (matchUnidades && matchParametro) {
        var unidad = matchUnidades[1]; // Esto da la unidad
        var parametro = matchParametro[1]; // Esto da el parametro
        parametros.push(parametro);
        unidades.push(unidad);
      } else {
        console.log("ERROR formato parametros");
      }
    });
  }
}

/*Función para mostrar modal para añadir e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showAdd(id, nombre) {
  var idioma = getCookie("lang");
  borrarContenidoFormulario();
  rellenaSelectCategoriaPadre(id, nombre);
  rellenaSelectResponsableCategoriaInit();
  addEstructura();
  cambiarFormulario(
    "addForm",
    "javascript:addEntidad();",
    "return comprobarAddCategoria();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreCategoria('input_categoria_nombre', 'errorFormatoNombre', 'nombreCategoria')",
    "return comprobarDescripcionCategoria('input_categoria_descripcion', 'errorFormatoDescripcion', 'descripcionCategoria')",
    "return comprobarSelectCategoriaPadre('select_padre_insertar_categoria', 'errorFormatoCategoriaPadre', 'categoriaPadre')",
    "return comprobarSelectResponsableCategoria('select_responsable_insertar_categoria', 'errorFormatoResponsableCategoria', 'responableCategoria')"
  );
  cambiarIcono("images/add.png", "ICONO_ADD", "iconoAddRol", "Añadir");
  $("#formularioAcciones").modal("show");

  setLang(idioma);
}

function rellenaSelectCategoriaPadre(id, nombre) {
  var select = $("#select_padre_insertar_categoria");

  select.empty();
  padre = { id_categoria: id, nombre_categoria: nombre };

  var option2 = document.createElement("option");
  var optionTexto = "";

  option2 = document.createElement("option");
  option2.setAttribute("value", id);
  option2.setAttribute("name", nombre);

  option2.setAttribute("selected", "true");

  optionTexto = document.createTextNode(nombre);
  option2.appendChild(optionTexto);

  select.append(option2);
}
function rellenaSelectResponsableCategoriaInit() {
  var select = $("#select_responsable_insertar_categoria");

  select.empty();

  var option1 = document.createElement("option");
  option1.setAttribute("value", "");
  option1.setAttribute("label", "-----");
  option1.setAttribute("class", "RESPONSABLE_CATEGORIA");
  option1.setAttribute("selected", "true");
  select.append(option1);

  var usuariosArrayCokie = getCookie("usuarios");
  var usuariosArray = usuariosArrayCokie.split(",");
  var option2 = document.createElement("option");
  var optionTexto = "";

  for (var i = 0; i < usuariosArray.length; i++) {
    if (usuariosArray[i] != "") {
      usuario = usuariosArray[i].split("/");
      if (usuario[1] != getCookie("usuarioSistema")) {
        option2 = document.createElement("option");
        option2.setAttribute("value", usuario[1]);
        option2.setAttribute("name", i);
        optionTexto = document.createTextNode(usuariosArray[i]);
        option2.appendChild(optionTexto);
        select.append(option2);
      }
    }
  }

  //añado el responsable actual
  responsableActual = getCookie("usuarioSistema");
  option2 = document.createElement("option");
  option2.setAttribute("value", responsableActual);
  option2.setAttribute("name", i);
  optionTexto = document.createTextNode(responsableActual);
  option2.appendChild(optionTexto);
  select.append(option2);
}
/*Función para mostrar modal para editar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEditar(
  id,
  nombre,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre_responsable,
  borrado_logico
) {
  usuariosNoResponsablesSistema();

  rellenaSelectCategoriaPadre(id_padre, nombre_padre);
  rellenaSelectUsuarioResponsable(dni, nombre_responsable);
  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
  ];
  editEstructura();
  cambiarFormulario(
    "editForm",
    "javascript:editEntidad();",
    "return comprobarEditCategoria();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreCategoria('input_categoria_nombre', 'errorFormatoNombre', 'nombreCategoria')",
    "return comprobarDescripcionCategoria('input_categoria_descripcion', 'errorFormatoDescripcion', 'descripcionCategoria')",
    "return comprobarSelectCategoriaPadre('select_padre_insertar_categoria', 'errorFormatoCategoriaPadre', 'categoriaPadre')",
    "return comprobarSelectResponsableCategoria('select_responsable_insertar_categoria', 'errorFormatoResponsableCategoria', 'responableCategoria')"
  );
  cambiarIcono("images/edit.png", "ICONO_EDIT", "iconoEditarRol", "Editar");

  rellenarFormulario(
    id,
    nombre,
    descripcion,
    id_padre,
    borrado_logico,
    dni,
    nombre_responsable
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para eliminar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEliminar(
  id,
  nombre,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre_responsable,
  borrado_logico,
  id_padre
) {
  rellenaSelectCategoriaPadre(id_padre, nombre_padre);
  rellenaSelectUsuarioResponsable(dni, nombre_responsable);
  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
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
    id,
    nombre,
    descripcion,
    id_padre,
    borrado_logico,
    dni,
    nombre_responsable
  );
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

//PETICION PARA ALMACENAR EN UNA COOKIE CATEGORIAS TODAS LAS CATEGORIAS PARA SER PADRE
async function recuperarCategoria(responsable) {
  var idioma = getCookie("lang");

  var formulario = document.getElementById("formularioCarga");

  if (formulario != undefined) {
    deshabilitaCampos(["usuario"]);
  } else {
    crearformoculto("formularioCarga", "");
  }

  //document.getElementById('formularioCarga').reset();
  insertacampo(document.formularioCarga, "usuario", responsable);
  insertacampo(document.formularioCarga, "id_categoria", "");

  await recuperarCategoriaAjaxPromesa()
    .then((res) => {
      var done = false;
      res.resource.forEach((element) => {
        if (!done) {
          setCookie("categoriaActual", JSON.stringify(element));
          done = true;
        }
        gestionContextInfo();
        $("#miCategoria").append(construyeTarjetaCategoria(element));
        setLang(getCookie("lang"));
        //gestionContextInfo();
      });
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });
  deleteActionController();
}

function recuperarCategoriaAjaxPromesa() {
  var token = getCookie("token");
  var idioma = getCookie("lang");
  addActionControler(document.formularioCarga, "buscar", "categoria");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioCarga").serialize(),
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
/*Esta función carga la vista de inicio con los procesos historicos de la huella de carbono del
usuario o si es un administrador o no tiene procesos carga la información por defecto de la página.*/
function explorarCategorias() {
  var rol = getCookie("rolUsuario");
  var idioma = getCookie("lang");
  $("#miCategoria").html("");

  /*setCookie("id_padre_actual",id);
     arrayPadresPervios=JSON.parse(getCookie("id_padre_previo"));
     arrayPadresPervios.push(padre);
     //arrayPadresPervios.push(JSON.stringify(arrayPadresPervios));
     setCookie("id_padre_previo",JSON.stringify(arrayPadresPervios));
    */
  var categoria_padre = JSON.parse(getCookie("categoriaActual"));

  if (
    !$.isEmptyObject(getCookie("id_padre_actual")) &&
    getCookie("id_padre_actual") !== categoria_padre.id
  ) {
    categoria_padre.id = getCookie("id_padre_actual");
    $("#btnBackFather").attr("style", "display: inline");
  } else {
    setCookie("id_padre_actual", categoria_padre.id);

    var arrayPadresPervios = [categoria_padre.id];
    setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));
    $("#btnBackFather").attr("style", "display: none");
  }

  categoriasSistema(categoria_padre.id);

  setLang(idioma);
}

$(document).ready(function () {
  $(".iconCerrar").on("click", function () {
    if (
      $("#modal-title").attr("class") === "STOP" ||
      $("#modal-title").attr("class") === "ERROR_INTERNO"
    ) {
      cerrarModalNoToken("modal");
    } else {
      cerrarModal("modal");
    }
  });
});

//funcion para navegar hacia atrás en el arbol
function volverAnteriorPadre() {
  /*var arrayPadresPervios=JSON.parse(getCookie('id_padre_previo'));
    var id_padre_previo=arrayPadresPervios.pop();
    setCookie('id_padre_previo',JSON.stringify(arrayPadresPervios));
    */
  var categoriaActual = JSON.parse(getCookie("categoriaActual"));

  var arrayPadresPervios = JSON.parse(getCookie("id_padre_previo"));
  var id_padre_previo = arrayPadresPervios.pop();

  setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));

  setCookie("id_padre_actual", id_padre_previo);

  if (id_padre_previo != categoriaActual.id_padre.id_categoria) {
    setCookie("id_padre_actual", id_padre_previo);
    // explorarCategorias(id_padre_previo);
    explorarCategorias();
  } else {
    id_padre_previo = arrayPadresPervios.push(
      categoriaActual.id_padre.id_categoria
    );
    setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));
    recuperarCategoriaResponsable();
  }
}

function actualizarPaginaConNuevasCategorias(id, id_padre) {
  setCookie("id_padre_actual", id);

  var arrayPadresPervios = JSON.parse(getCookie("id_padre_previo"));
  if (id_padre == 0) {
    id_padre = 1;
  }
  arrayPadresPervios.push(id_padre);

  setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));

  //lamada a función que ejecute consulta
  explorarCategorias();
}

//PETICION PARA ALMACENAR EN UNA COOKIE CATEGORIAS TODAS LAS CATEGORIAS PARA SER PADRE
async function categoriasSistema(id_categoria) {
  $("#miCategoria").html("");
  var idioma = getCookie("lang");

  var formulario = document.getElementById("formularioCarga");

  if (formulario != undefined) {
    deshabilitaCampos(["id_categoria"]);
  } else {
    crearformoculto("formularioCarga", "");
  }

  //document.getElementById('formularioCarga').reset();
  insertacampo(document.formularioCarga, "id_categoria", id_categoria);

  await categoriasSistemaAjaxPromesa()
    .then((res) => {
      if (getCookie("tiene_hijos") === "true") {
        for (var i = 0; i < res.resource.length; i++) {
          var tr = construyeTarjetaCategoria(res.resource[i]);
          $("#miCategoria").append(tr);
        }
        setLang(idioma);
      }
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });
  deleteActionController();
}

function categoriasSistemaAjaxPromesa() {
  var token = getCookie("token");
  var idioma = getCookie("lang");
  addActionControler(document.formularioCarga, "devolverHijos", "categoria");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioCarga").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          setCookie("tiene_hijos", "true");
          if (res.code == "CATEGORIA_NO_HIJOS") {
            setCookie("tiene_hijos", "false");
          } else if (
            res.code != "RECORDSET_DATOS" &&
            res.code != "RECORDSET_VACIO" &&
            res.code != "CATEGORIA_DEVOLVER_HIJOS"
          ) {
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

function rellenaSelectUsuarioResponsable(dni, nombre) {
  var select = $("#select_responsable_insertar_categoria");

  select.empty();

  var usuariosArrayCokie = getCookie("usuarios");
  var usuariosArray = usuariosArrayCokie.split(",");
  var option2 = document.createElement("option");
  var optionTexto = "";
  var selected = false;
  var optionSelected;

  for (var i = 0; i < usuariosArray.length; i++) {
    if (usuariosArray[i] != "") {
      usuario = usuariosArray[i].split("/");

      option2 = document.createElement("option");

      option2.setAttribute("value", usuario[1]);
      option2.setAttribute("name", i);

      option2.setAttribute("selected", "false");
      selected = false;

      optionTexto = document.createTextNode(usuario[1]);
      option2.appendChild(optionTexto);
      select.append(option2);

      if (i == usuariosArray.length - 1) {
        select.append(optionSelected);
      }
    }
  }

  responsableActual = getCookie("usuarioSistema");
  //añado el responsable actual
  if (responsableActual != nombre) {
    option2 = document.createElement("option");
    option2.setAttribute("value", responsableActual);
    option2.setAttribute("name", i);
    optionTexto = document.createTextNode(responsableActual);
    option2.appendChild(optionTexto);
    select.append(option2);
  }

  //marco como opcion seleccionada el responsable actual
  option2 = document.createElement("option");
  option2.setAttribute("selected", "true");
  option2.setAttribute("value", nombre);
  option2.setAttribute("name", i);
  optionTexto = document.createTextNode(nombre);
  option2.appendChild(optionTexto);
  select.append(option2);
}

//PETICION PARA ALMACENAR EN UNA COOKIE CATEGORIAS TODAS LAS CATEGORIAS PARA SER PADRE
function usuariosNoResponsablesSistemaAjaxPromesa() {
  addActionControler(document.formularioGenerico, "buscar", "usuario");

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

async function usuariosNoResponsablesSistema() {
  var idioma = getCookie("lang");

  await usuariosNoResponsablesSistemaAjaxPromesa()
    .then((res) => {
      usuariosNoResponsables = [];
      i = 0;
      res.resource.forEach((element) => {
        if (
          element.borrado_logico == 0 &&
          element.id_rol.nombre_rol == "usuario"
        ) {
          cadena = element.dni + "/" + element.usuario;
          usuariosNoResponsables[i] = cadena;
          i++;
        }
      });
      usuarios = usuariosNoResponsables;

      setCookie("usuarios", usuariosNoResponsables);
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

function deleteEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "borrar", "categoria");
  habilitaCampos(["input_categoria_id"]);
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
          if (res.code != "CATEGORIA_BORRAR_OK") {
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
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ];

  volverAnteriorPadre();

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  usuariosNoResponsablesSistema();
}
function addEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "insertar", "categoria");
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
          if (res.code != "CATEGORIA_INSERTAR_OK") {
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
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
    "select_padre_insertar_categoria",
  ];

  recuperarCategoriaResponsable();

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  usuariosNoResponsablesSistema();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de editar.*/
function editEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "editar", "categoria");
  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
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
          if (res.code != "CATEGORIA_EDITAR_OK") {
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
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "input_categoria_borrado_logico",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ];

  recuperarCategoriaResponsable();

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  usuariosNoResponsablesSistema();
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

//PETICIONES DE PROCESOS
function addEntidadProcesoAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(
    document.formularioGenericoProcesos,
    "insertar",
    "proceso"
  );
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenericoProcesos").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PROCESO_INSERTAR_OK") {
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

async function addEntidadProceso() {
  var idioma = getCookie("lang");
  await addEntidadProcesoAjaxPromesa()
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
    "input_proceso_id",
    "input_proceso_nombre",
    "input_proceso_descripcion",
    "input_proceso_formula",
    "input_proceso_borrado_logico",
  ];

  volverAnteriorPadre();
  $("#formularioAccionesProceso").modal("hide");

  setLang(idioma);
  resetearFormulario("formularioGenericoProcesos", idElementoList);
  deleteActionController();
  limpiarModalTitulo();

  usuariosNoResponsablesSistema();
}

async function buscarProceso(id_categoria) {
  var idioma = getCookie("lang");
  $("#miCategoria").html("");
  var formulario = document.getElementById("formularioCargaProceso");

  if (formulario != undefined) {
    /*deshabilitaCampos([
        "id_categoria",
      ]);*/

    $("#id_categoria").val("");
  } else {
    crearformoculto("formularioCargaProceso", "");
  }

  //document.getElementById('formularioCarga').reset();
  insertacampo(document.formularioCargaProceso, "id_categoria", id_categoria);

  await buscarProcesoAjaxPromesa()
    .then((res) => {
      for (var i = 0; i < res.resource.length; i++) {
        var tr = construyeTarjetaProceso(res.resource[i]);
        $("#miCategoria").append(tr);
      }
      setLang(getCookie("lang"));
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });
  deleteActionController();
}
function buscarProcesoAjaxPromesa() {
  var token = getCookie("token");
  var idioma = getCookie("lang");
  addActionControler(document.formularioCargaProceso, "buscar", "proceso");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioCargaProceso").serialize(),
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

/**Función invocadas por los show(Accion) que hacen la petición a back de editar.*/
function editEntidadProcesoAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenericoProcesos, "editar", "proceso");
  habilitaCampos([
    "input_proceso_id",
    "input_proceso_nombre",
    "input_proceso_descripcion",
    "select_categoria_insertar_proceso",
    "input_proceso_formula",
  ]);
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenericoProcesos").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PROCESO_EDITAR_OK") {
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

async function editEntidadProceso() {
  var idioma = getCookie("lang");

  await editEntidadProcesoAjaxPromesa()
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
    "input_proceso_id",
    "input_proceso_nombre",
    "input_proceso_descripcion",
    "input_proceso_borrado_logico",
    "select_categoria_insertar_proceso",
    "input_proceso_formula",
  ];

  buscarProceso(getCookie("procesoUltimoBuscado"));
  $("#formularioAccionesProceso").modal("hide");

  setLang(idioma);
  resetearFormulario("formularioGenericoProcesos", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  usuariosNoResponsablesSistema();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de eliminar.*/
function deleteEntidadProcesoAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenericoProcesos, "borrar", "proceso");
  habilitaCampos(["input_proceso_id"]);
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioGenericoProcesos").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PROCESO_BORRAR_OK") {
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

async function deleteEntidadProceso() {
  var idioma = getCookie("lang");
  var tipoBorrado = "";

  await deleteEntidadProcesoAjaxPromesa()
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
    "input_proceso_id",
    "input_proceso_nombre",
    "input_proceso_descripcion",
    "select_categoria_insertar_proceso",
    "input_proceso_borrado_logico",
    "input_proceso_formula",
  ];

  $("#formularioAccionesProceso").modal("hide");
  volverAnteriorPadre();

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  usuariosNoResponsablesSistema();
}
