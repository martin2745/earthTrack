/*Ajustamos los valores inciales de la cookies para realizar las búsquedas.*/
function ajustarCookies() {
  setCookie("id_funcionalidad", "");
  setCookie("nombre_funcionalidad", "");
  setCookie("descripcion_funcionalidad", "");
  setCookie("busquedaVacia", "si");
  setCookie("camposFormularioListado", "no");
  ajustarPaginador();
}

/*Función en la que guardamos los parametros de las busquedas en cookies.*/
function guardarParametrosBusqueda(criterios) {
  setCookie("id_funcionalidad", criterios.id_funcionalidad);
  setCookie("nombre_funcionalidad", criterios.nombre_funcionalidad);
  setCookie("descripcion_funcionalidad", criterios.descripcion_funcionalidad);
}

/*Función que comprueba si la busqueda es vacía para todos sus campos.*/
function busquedaVacia() {
  var toret = true;
  if (
    getCookie("id_funcionalidad") != "" ||
    getCookie("nombre_funcionalidad") != "" ||
    getCookie("descripcion_funcionalidad") != ""
  ) {
    toret = false;
  }
  return toret;
}

/*Insertamos campos en el formulario que enviamos a back para realizar la búsqueda. Esto es necesario en caso 
de que nos desplacemos por varias pestañas de elementos con una paginación relizada.*/
function informacionBusqueda(form) {
  insertacampoParaBusqueda(
    form,
    "id_funcionalidad",
    getCookie("id_funcionalidad")
  );
  insertacampoParaBusqueda(
    form,
    "nombre_funcionalidad",
    getCookie("nombre_funcionalidad")
  );
  insertacampoParaBusqueda(
    form,
    "descripcion_funcionalidad",
    getCookie("descripcion_funcionalidad")
  );
}

function cargarInformacionBusqueda() {
  if (getCookie("id_funcionalidad") != "") {
    document.getElementById("id_funcionalidad_BUSQUEDA").value =
      getCookie("id_funcionalidad");
  } else {
    document.getElementById("id_funcionalidad_BUSQUEDA").value = "";
  }

  if (getCookie("nombre_funcionalidad") != "") {
    document.getElementById("nombre_funcionalidad_BUSQUEDA").value = getCookie(
      "nombre_funcionalidad"
    );
  } else {
    document.getElementById("nombre_funcionalidad_BUSQUEDA").value = "";
  }

  if (getCookie("descripcion_funcionalidad") != "") {
    document.getElementById("descripcion_funcionalidad_BUSQUEDA").value =
      getCookie("descripcion_funcionalidad");
  } else {
    document.getElementById("descripcion_funcionalidad_BUSQUEDA").value = "";
  }
}

/*
##################################################################################################################
#############################################Acciones Permitidas##################################################
##################################################################################################################
*/

/*Función que establece que acciones tenemos para una funcionalidad determinada.
 En el caso de FUNCIONALIDAD necesitamos saber si existe el permiso para insertar por ejemplo,
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
    "funcionalidad"
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
    "'" + fila.id_funcionalidad + "'",
    "'" + fila.nombre_funcionalidad + "'",
    "'" + fila.descripcion_funcionalidad + "'",
  ];

  let acciones = getCookie("acciones").split(",");

  var celdaAcciones = "";

  if (acciones.includes("verEnDetalle")) {
    atributosFunciones = [
      "'" + fila.id_funcionalidad + "'",
      "'" + fila.nombre_funcionalidad + "'",
      "'" + fila.descripcion_funcionalidad + "'",
    ];
    var celdaAccionesDetalle =
      '<div class="tooltip6"><img class="detalle ICONO_DETALLE" src="images/detail3.png" onclick="showDetalle(' +
      atributosFunciones +
      ')" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaAcciones = celdaAccionesDetalle;
  } else {
    atributosFunciones = [
      "'" + fila.id_funcionalidad + "'",
      "'" + fila.nombre_funcionalidad + "'",
      "'" + fila.descripcion_funcionalidad + "'",
    ];
    var celdaAccionesDetalle =
      '<div class="tooltip6"><img class="detalle detallePermisoNoAllowed ICONO_DETALLE" id = "denegado" src="images/detail.png" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaAcciones = celdaAccionesDetalle;
  }
  if (acciones.includes("editar")) {
    atributosFunciones = [
      "'" + fila.id_funcionalidad + "'",
      "'" + fila.nombre_funcionalidad + "'",
      "'" + fila.descripcion_funcionalidad + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip6"><img class="editar ICONO_EDIT" src="images/edit3.png" onclick="showEditar(' +
      atributosFunciones +
      ')" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaAcciones += celdaAccionesEditar;
  } else {
    atributosFunciones = [
      "'" + fila.id_funcionalidad + "'",
      "'" + fila.nombre_funcionalidad + "'",
      "'" + fila.descripcion_funcionalidad + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip6"><img class="editar editarPermisoNoAllowed ICONO_EDIT" id = "denegado" src="images/edit.png" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaAcciones += celdaAccionesEditar;
  }
  if (acciones.includes("borrar")) {
    atributosFunciones = [
      "'" + fila.id_funcionalidad + "'",
      "'" + fila.nombre_funcionalidad + "'",
      "'" + fila.descripcion_funcionalidad + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="eliminar ICONO_ELIMINAR" src="images/delete3.png" onclick="showEliminar(' +
      atributosFunciones +
      ')" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  } else {
    atributosFunciones = [
      "'" + fila.id_funcionalidad + "'",
      "'" + fila.nombre_funcionalidad + "'",
      "'" + fila.descripcion_funcionalidad + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="eliminar eliminarPermisoNoAllowed ICONO_ELIMINAR" id = "denegado" src="images/delete.png" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  }

  var filaTabla =
    '<tr class="impar" id="datoEntidad">' +
    "</td> <td>" +
    fila.nombre_funcionalidad +
    "</td> <td>" +
    fila.descripcion_funcionalidad +
    "</td> <td>" +
    celdaAcciones +
    "</td> </tr>";

  return filaTabla;
}

/*
##################################################################################################################
##########################################Listado de funcionalidades##############################################
##################################################################################################################
*/

/*Nos permite obtener un listado inicial de los datos de la tabla.*/
function obtenerListado(empieza) {
  crearformoculto("formularioListado", "javascript:getListadoEntidades()");
  insertacampo(document.formularioListado, "empieza", empieza);
  insertacampo(
    document.formularioListado,
    "filaspagina",
    escogeTamanho("funcionalidad")
  );
  if (getCookie("camposFormularioListado") == "no") {
    informacionBusqueda(document.formularioListado);
    setCookie("camposFormularioListado", "si");
  }
  cargarInformacionBusqueda();
  document.formularioListado.submit();
}

/**Función que llama al show all de funcionalidades*/
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
  addActionControler(document.formularioListado, "buscar", "funcionalidad");
  await getListadoEntidadesAjaxPromesa()
    .then((res) => {
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("funcionalidad");
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
  ocultarLabels();

  $("#input_funcionalidad_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de buscar.*/
function searchEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  ocultarLabels();

  $("#input_funcionalidad_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de ver en detalle.*/
function verEnDetalleEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_funcionalidad_id").attr("style", "display: none");
  $("#input_funcionalidad_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de editar.*/
function editEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_funcionalidad_id").attr("style", "display: none");
  $("#input_funcionalidad_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de borrar.*/
function deleteEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_funcionalidad_id").attr("style", "display: none");
  $("#input_funcionalidad_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de reactivar.*/
function reactivarEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_funcionalidad_id").attr("style", "display: none");
  $("#input_funcionalidad_id").attr("style", "display: none");
}

function activarCamposInLineBlock() {
  $("#input_funcionalidad_id").attr("style", "display: inline-block");
  $("#input_funcionalidad_nombre").attr("style", "display: inline-block");
  $("#input_funcionalidad_descripcion").attr("style", "display: inline-block");

  habilitaCampos([
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ]);
}

function activarCamposBlock() {
  $("#input_funcionalidad_id").attr("style", "display: block");
  $("#input_funcionalidad_nombre").attr("style", "display: block");
  $("#input_funcionalidad_descripcion").attr("style", "display: block");

  habilitaCampos([
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ]);
}

function mostrarObligatorios() {
  $("#obligatorio_funcionalidad_nombre").attr("style", "display: inline-block");
  $("#obligatorio_funcionalidad_description").attr(
    "style",
    "display: inline-block"
  );
}

function ocultarObligatorios() {
  $("#obligatorio_funcionalidad_nombre").attr("style", "display: none");
  $("#obligatorio_funcionalidad_description").attr("style", "display: none");
}

function mostrarLabels() {
  $("#label_funcionalidad_id").attr("style", "display: block");
  $("#label_funcionalidad_nombre").attr("style", "display: block");
  $("#label_funcionalidad_description").attr("style", "display: block");
}

function ocultarLabels() {
  $("#label_funcionalidad_id").attr("style", "display: none");
  $("#label_funcionalidad_nombre").attr("style", "display: none");
  $("#label_funcionalidad_description").attr("style", "display: none");
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
    "return comprobarAddFuncionalidad();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreFuncionalidad('input_funcionalidad_nombre', 'errorFormatoNombre', 'nombreFuncionalidad')",
    "return comprobarDescripcionFuncionalidad('input_funcionalidad_descripcion', 'errorFormatoDescripcion', 'descripcionFuncionalidad')"
  );
  cambiarIcono(
    "images/add.png",
    "ICONO_ADD",
    "iconoAddFuncionalidad",
    "Añadir"
  );
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
    "return comprobarSearchFuncionalidad();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreFuncionalidadSearch('input_funcionalidad_nombre', 'errorFormatoNombre', 'nombreFuncionalidad')",
    "return comprobarDescripcionFuncionalidadSearch('input_funcionalidad_descripcion', 'errorFormatoDescripcion', 'descripcionFuncionalidad')"
  );
  cambiarIcono(
    "images/search.png",
    "ICONO_SEARCH",
    "iconoSearchFuncionalidad",
    "Buscar"
  );
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para ver en detalle e invoca a la función
 * que carga como corresponda los label, input y campo obligatorio.*/
function showDetalle(id, nombre, descripcion) {
  var idioma = getCookie("lang");
  var campos = [
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ];
  verEnDetalleEstructura();
  cambiarFormulario("detailForm", "javascript:detailEntidad();", "");
  cambiarIcono("images/close2.png", "CERRARMODAL", "iconoCerrar", "Ok");
  rellenarFormulario(id, nombre, descripcion);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para editar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEditar(id, nombre, descripcion) {
  var idioma = getCookie("lang");
  var campos = ["input_funcionalidad_id", "input_funcionalidad_nombre"];
  editEstructura();
  cambiarFormulario(
    "editForm",
    "javascript:editEntidad();",
    "return comprobarEditFuncionalidad();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreFuncionalidad('input_funcionalidad_nombre', 'errorFormatoNombre', 'nombreFuncionalidad')",
    "return comprobarDescripcionFuncionalidad('input_funcionalidad_descripcion', 'errorFormatoDescripcion', 'descripcionFuncionalidad')"
  );
  cambiarIcono(
    "images/edit.png",
    "ICONO_EDIT",
    "iconoEditarFuncionalidad",
    "Editar"
  );
  rellenarFormulario(id, nombre, descripcion);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para eliminar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEliminar(id, nombre, descripcion) {
  var idioma = getCookie("lang");
  var campos = [
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ];
  deleteEstructura();
  cambiarFormulario("deleteForm", "javascript:deleteEntidad();", "");
  cambiarIcono(
    "images/delete.png",
    "ICONO_ELIMINAR",
    "iconoEliminar",
    "Eliminar"
  );
  rellenarFormulario(id, nombre, descripcion);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función que crea según las columnas que le pasemos un div con checkbox 
para marcar y así ocultar las columnas.*/
function createHideShowColumnsWindow() {
  //class de la tabla
  var arrayColumnas = {
    FUNCIONALIDAD_DESCRIPCION_COLUMN: 2,
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
    FUNCIONALIDAD_DESCRIPCION_COLUMN: 2,
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
function rellenarFormulario(id, nombre, descricion) {
  $("#input_funcionalidad_id").val(id);
  $("#input_funcionalidad_nombre").val(nombre);
  $("#input_funcionalidad_descripcion").val(descricion);
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
function cambiarOnBlurCampos(onBlurId, onBlurNombre, onBlurdescripcion) {
  if (onBlurId != "") {
    $("#input_funcionalidad_id").attr("onblur", onBlurId);
  }

  if (onBlurNombre != "") {
    $("#input_funcionalidad_nombre").attr("onblur", onBlurNombre);
  }

  if (onBlurdescripcion != "") {
    $("#input_funcionalidad_descripcion").attr("onblur", onBlurdescripcion);
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
  addActionControler(document.formularioGenerico, "insertar", "funcionalidad");
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
          if (res.code != "FUNCIONALIDAD_INSERTAR_OK") {
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
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
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
  addActionControler(document.formularioGenerico, "buscar", "funcionalidad");
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
    escogeTamanho("funcionalidad")
  );

  await searchEntidadAjaxPromesa()
    .then((res) => {
      $("#formularioAcciones").attr("style", "display: none");

      setCookie("pintarPaginador", "si");
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("funcionalidad");
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
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ];

  eliminarcampo("empieza");
  eliminarcampo("filaspagina");

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función para cerrar la ventana de detalle de funcionalidad*/
function detailEntidad() {
  $("#formularioAcciones").modal("hide");
  cerrarModal("formularioAcciones", "", "");
}

/**Función invocadas por los show(Accion) que hacen la petición a back de editar.*/
function editEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "editar", "funcionalidad");
  habilitaCampos([
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
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
          if (res.code != "FUNCIONALIDAD_EDITAR_OK") {
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
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de eliminar.*/
function deleteEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "borrar", "funcionalidad");
  habilitaCampos(["input_funcionalidad_id"]);
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
          if (res.code != "FUNCIONALIDAD_BORRAR_OK") {
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
    "input_funcionalidad_id",
    "input_funcionalidad_nombre",
    "input_funcionalidad_descripcion",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/***********Procedimiento que resetean las modales una vez se cierren*************/
$(document).ready(function () {
  $("#formularioAcciones").on("hidden.bs.modal", function () {
    let errores = [
      "errorFormatoId",
      "errorFormatoNombre",
      "errorFormatoDescripcion",
    ];
    errores.forEach((element) => {
      eliminarcampoId(element);
    });
    let campos = [
      "input_funcionalidad_id",
      "input_funcionalidad_nombre",
      "input_funcionalidad_descripcion",
    ];
    resetearFormulario("formularioGenerico", campos);
  });
});
