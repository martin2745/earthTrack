/*Ajustamos los valores inciales de la cookies para realizar las búsquedas.*/
function ajustarCookies() {
  setCookie("usuario", "");
  setCookie("funcionalidad", "");
  setCookie("accion", "");
  setCookie("codigo", "");
  setCookie("mensaje", "");
  setCookie("tiempo", "");
  setCookie("busquedaVacia", "si");
  setCookie("camposFormularioListado", "no");
  ajustarPaginador();
}

/*Función en la que guardamos los parametros de las busquedas en cookies.*/
function guardarParametrosBusqueda(criterios) {
  setCookie("usuario", criterios.usuario);
  setCookie("funcionalidad", criterios.funcionalidad);
  setCookie("accion", criterios.accion);
  setCookie("codigo", criterios.codigo);
  setCookie("mensaje", criterios.mensaje);
  setCookie("tiempo", criterios.tiempo);
}

/*Función que comprueba si la busqueda es vacía para todos sus campos.*/
function busquedaVacia() {
  var toret = true;
  if (
    getCookie("usuario") != "" ||
    getCookie("funcionalidad") != "" ||
    getCookie("accion") != "" ||
    getCookie("codigo") != "" ||
    getCookie("mensaje") != "" ||
    getCookie("tiempo") != ""
  ) {
    toret = false;
  }
  return toret;
}

/*Insertamos campos en el formulario que enviamos a back para realizar la búsqueda. Esto es necesario en caso 
de que nos desplacemos por varias pestañas de elementos con una paginación relizada.*/
function informacionBusqueda(form) {
  insertacampoParaBusqueda(form, "usuario", getCookie("usuario"));
  insertacampoParaBusqueda(form, "funcionalidad", getCookie("funcionalidad"));
  insertacampoParaBusqueda(form, "accion", getCookie("accion"));
  insertacampoParaBusqueda(form, "codigo", getCookie("codigo"));
  insertacampoParaBusqueda(form, "mensaje", getCookie("mensaje"));
  insertacampoParaBusqueda(form, "tiempo", getCookie("tiempo"));
}

function cargarInformacionBusqueda() {
  if (getCookie("usuario") != "") {
    document.getElementById("usuario_BUSQUEDA").value = getCookie("usuario");
  } else {
    document.getElementById("usuario_BUSQUEDA").value = "";
  }

  if (getCookie("funcionalidad") != "") {
    document.getElementById("funcionalidad_BUSQUEDA").value =
      getCookie("funcionalidad");
  } else {
    document.getElementById("funcionalidad_BUSQUEDA").value = "";
  }

  if (getCookie("accion") != "") {
    document.getElementById("accion_BUSQUEDA").value = getCookie("accion");
  } else {
    document.getElementById("accion_BUSQUEDA").value = "";
  }
  if (getCookie("codigo") != "") {
    document.getElementById("codigo_BUSQUEDA").value = getCookie("codigo");
  } else {
    document.getElementById("codigo_BUSQUEDA").value = "";
  }

  if (getCookie("mensaje") != "") {
    document.getElementById("mensaje_BUSQUEDA").value = getCookie("mensaje");
  } else {
    document.getElementById("mensaje_BUSQUEDA").value = "";
  }

  if (getCookie("tiempo") != "") {
    document.getElementById("tiempo_BUSQUEDA").value = getCookie("tiempo");
  } else {
    document.getElementById("tiempo_BUSQUEDA").value = "";
  }
}

/*
##################################################################################################################
#############################################Acciones Permitidas##################################################
##################################################################################################################
*/

/*Función que establece que acciones tenemos para una funcionalidad determinada.
 En el caso de LOGEXCEPCIONATRIBUTOS necesitamos saber si existe el permiso para insertar por ejemplo,
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
    "logExcepcionAtributo"
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
  var filaTabla =
    '<tr class="impar" id="datoEntidad">' +
    "</td> <td>" +
    fila.usuario +
    "</td> <td>" +
    fila.funcionalidad +
    "</td> <td>" +
    fila.accion +
    "</td> <td>" +
    fila.codigo +
    "</td> <td>" +
    fila.mensaje +
    "</td> <td>" +
    ordenarFechaHora(fila.tiempo) +
    "</td> </tr>";

  return filaTabla;
}

/*
##################################################################################################################
#######################################Listado de logExcepcionAtributos###########################################
##################################################################################################################
*/

/*Nos permite obtener un listado inicial de los datos de la tabla.*/
function obtenerListado(empieza) {
  crearformoculto("formularioListado", "javascript:getListadoEntidades()");
  insertacampo(document.formularioListado, "empieza", empieza);
  insertacampo(
    document.formularioListado,
    "filaspagina",
    escogeTamanho("logExcepcionAtributos")
  );
  if (getCookie("camposFormularioListado") == "no") {
    informacionBusqueda(document.formularioListado);
    setCookie("camposFormularioListado", "si");
  }
  cargarInformacionBusqueda();
  document.formularioListado.submit();
}

/**Función que llama al show all de logExcepcionAtributos*/
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
  addActionControler(
    document.formularioListado,
    "buscar",
    "logExcepcionAtributos"
  );
  await getListadoEntidadesAjaxPromesa()
    .then((res) => {
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("logExcepcionAtributos");
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
    "errorFormatoUsuario",
    "errorFormatoFuncionalidad",
    "errorFormatoAccion",
    "errorFormatoCodigo",
    "errorFormatoMensaje",
  ];
  errores.forEach((element) => {
    eliminarcampoId(element);
  });
}

/**Función para dar una estructura a la ventana modal de buscar.*/
function searchEstructura() {
  limpiarErroresModal();
}

/*
##################################################################################################################
#################################################Funciones show###################################################
##################################################################################################################
*/

/*Función para mostrar modal para buscar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showSearch() {
  let idElementoList = [
    "input_usuario",
    "input_funcionalidad",
    "input_accion",
    "input_codigo",
    "input_mensaje",
    "input_tiempo",
  ];
  resetearFormulario("formularioGenerico", idElementoList);

  var idioma = getCookie("lang");
  searchEstructura();
  cambiarFormulario(
    "searchForm",
    "javascript:searchEntidad();",
    "return comprobarSearchLog();"
  );
  cambiarOnBlurCampos(
    "return comprobarUserLogExcepcion('input_usuario', 'errorFormatoUsuario', 'usuarioLogExcepcion')",
    "return comprobarNombreFuncionalidadSearch('input_funcionalidad', 'errorFormatoFuncionalidad', 'nombreFuncionalidad')",
    "return comprobarNombreAccionSearch('input_accion', 'errorFormatoAccion', 'nombreAccion')",
    "return comprobarCodigoSearch('input_codigo', 'errorFormatoCodigo', 'codigoLogExcepcion')",
    "return comprobarMensajeSearch('input_mensaje', 'errorFormatoMensaje', 'mensajeLogExcepcion')"
  );
  cambiarIcono(
    "images/search.png",
    "ICONO_SEARCH",
    "iconoSearchLogExcepciones",
    "Buscar"
  );
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función que crea según las columnas que le pasemos un div con checkbox 
para marcar y así ocultar las columnas.*/
function createHideShowColumnsWindow() {
  //class de la tabla
  var arrayColumnas = {
    LOGEXCEPCION_FUNCIONALIDAD_COLUMN: 2,
    LOGEXCEPCION_ACCION_COLUMN: 3,
    LOGEXCEPCION_CODIGO_COLUMN: 4,
    LOGEXCEPCION_MENSAJE_COLUMN: 5,
    LOGEXCEPCION_TIEMPO_COLUMN: 6,
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
    LOGEXCEPCION_FUNCIONALIDAD_COLUMN: 2,
    LOGEXCEPCION_ACCION_COLUMN: 3,
    LOGEXCEPCION_CODIGO_COLUMN: 4,
    LOGEXCEPCION_MENSAJE_COLUMN: 5,
    LOGEXCEPCION_TIEMPO_COLUMN: 6,
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
function cambiarOnBlurCampos(
  onBlurUsuario,
  onBlurFuncionalidad,
  onBlurAccion,
  onBlurCodigo,
  onBlurMensaje
) {
  if (onBlurUsuario != "") {
    $("#input_usuario").attr("onblur", onBlurUsuario);
  }
  if (onBlurFuncionalidad != "") {
    $("#input_funcionalidad").attr("onblur", onBlurFuncionalidad);
  }
  if (onBlurAccion != "") {
    $("#input_accion").attr("onblur", onBlurAccion);
  }
  if (onBlurCodigo != "") {
    $("#input_codigo").attr("onblur", onBlurCodigo);
  }
  if (onBlurMensaje != "") {
    $("#input_mensaje").attr("onblur", onBlurMensaje);
  }
}

/*
##################################################################################################################
#################################################Peticiones AJAX##################################################
##################################################################################################################
*/

/**Función invocadas por los show(Accion) que hacen la petición a back de busqueda.*/
function searchEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(
    document.formularioGenerico,
    "buscar",
    "logExcepcionAtributos"
  );
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
    escogeTamanho("logExcepcionAtributos")
  );

  await searchEntidadAjaxPromesa()
    .then((res) => {
      $("#formularioAcciones").attr("style", "display: none");

      setCookie("pintarPaginador", "si");
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("logExcepcionAtributos");
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
    "input_usuario",
    "input_funcionalidad",
    "input_accion",
    "input_codigo",
    "input_mensaje",
    "input_tiempo",
  ];

  eliminarcampo("empieza");
  eliminarcampo("filaspagina");

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/***********Procedimiento que resetean las modales una vez se cierren*************/
$(document).ready(function () {
  $("#formularioAcciones").on("hidden.bs.modal", function () {
    let errores = [
      "errorFormatoUsuario",
      "errorFormatoFuncionalidad",
      "errorFormatoAccion",
      "errorFormatoCodigo",
      "errorFormatoMensaje",
    ];
    errores.forEach((element) => {
      eliminarcampoId(element);
    });
    let campos = [
      "input_usuario",
      "input_funcionalidad",
      "input_accion",
      "input_codigo",
      "input_mensaje",
      "input_tiempo",
    ];
    resetearFormulario("formularioGenerico", campos);
  });
});
