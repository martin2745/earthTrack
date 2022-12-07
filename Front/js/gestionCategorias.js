/*Ajustamos los valores inciales de la cookies para realizar las búsquedas.*/
function ajustarCookies() {
  setCookie("id_categoria", "");
  setCookie("nombre_categoria", "");
  setCookie("descripcion_categoria", "");
  setCookie("busquedaVacia", "si");
  setCookie("camposFormularioListado", "no");
  ajustarPaginador();
}

/*Función en la que guardamos los parametros de las busquedas en cookies.*/
function guardarParametrosBusqueda(criterios) {
  setCookie("id_categoria", criterios.id_categoria);
  setCookie("nombre_categoria", criterios.nombre_categoria);
  setCookie("descripcion_categoria", criterios.descripcion_categoria);
}

/*Función que comprueba si la busqueda es vacía para todos sus campos.*/
function busquedaVacia() {
  var toret = true;
  if (
    getCookie("id_categoria") != "" ||
    getCookie("nombre_categoria") != "" ||
    getCookie("descripcion_categoria") != ""
  ) {
    toret = false;
  }
  return toret;
}

/*Insertamos campos en el formulario que enviamos a back para realizar la búsqueda. Esto es necesario en caso 
de que nos desplacemos por varias pestañas de elementos con una paginación relizada.*/
function informacionBusqueda(form) {
  insertacampoParaBusqueda(form, "id_categoria", getCookie("id_categoria"));
  insertacampoParaBusqueda(form, "nombre_categoria", getCookie("nombre_categoria"));
  insertacampoParaBusqueda(
    form,
    "descripcion_categoria",
    getCookie("descripcion_categoria")
  );
}

function cargarInformacionBusqueda() {
  if (getCookie("id_categoria") != "") {
    document.getElementById("id_categoria_BUSQUEDA").value =
      getCookie("id_categoria");
  } else {
    document.getElementById("id_categoria_BUSQUEDA").value = "";
  }

  if (getCookie("nombre_categoria") != "") {
    document.getElementById("nombre_categoria_BUSQUEDA").value =
      getCookie("nombre_categoria");
  } else {
    document.getElementById("nombre_categoria_BUSQUEDA").value = "";
  }

  if (getCookie("descripcion_categoria") != "") {
    document.getElementById("descripcion_categoria_BUSQUEDA").value =
      getCookie("descripcion_categoria");
  } else {
    document.getElementById("descripcion_categoria_BUSQUEDA").value = "";
  }
}

/*
##################################################################################################################
#############################################Categorias Permitidas##################################################
##################################################################################################################
*/

/*Función que establece que categorias tenemos para una categoria determinada.
 En el caso de categoria necesitamos saber si existe el permiso para insertar por ejemplo,
 Si existe el permiso colocaremos el icono add3.png y si no existe el permiso add.png.*/
function categoriasPermitidasAjaxPromesa() {
  var token = getCookie("token");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioCategoriasPermitidas").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "CATEGORIAS_FUNCIONALIDAD") {
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

async function categoriasPermitidas() {
  var idioma = getCookie("lang");

  /*Creamos el formulario que enviamos a Back para obtener
  que categorias tenemos para una categoria.*/
  crearformoculto(
    "formularioCategoriasPermitidas",
    "javascript:funcionalidadCategorias()"
  );
  /*Añadimos el controlador (punto de acceso) y la acción
  (método del controlador).*/
  addActionControler(
    document.formularioCategoriasPermitidas,
    "categoriasFuncionalidad",
    "funcionalidad"
  );
  /*Insertamos el campo nombre_categoria con la categoria
  que nos interesa saber que categorias tiene.*/
  insertacampo(
    document.formularioCategoriasPermitidas,
    "nombre_funcionalidad",
    "categoria"
  );

  await categoriasPermitidasAjaxPromesa()
    .then((res) => {
      /*Guardamos en una cookie las categorias de la categoria.*/
      setCookie("categorias", res.resource);
    })
    .catch((res) => {
      errorCategoria(res.code);
      setLang(idioma);
    });

  categoriasInsertarBuscar();
  /*Eliminamos el controlador que enviamos a back.*/
  deleteActionController();
  eliminarcampo("funcionalidad");
  setLang(idioma);
}

/*Insertamos la cabecera con los botones de Insertar, Buscar, Refrescar y Ocultar columnas.*/
function categoriasInsertarBuscar() {
  $("#categoriasCabecera").html("");
  let categorias = getCookie("categorias").split(",");

  if (categorias.includes("insertar")) {
    var insertar =
      '<div name="btnAdd" value="Añadir" onclick="showAdd();" class="tooltip6 addIcon">' +
      '<img class="iconoAdd ICONO_ADD" src="images/add3.png" alt="Añadir" />' +
      '<span class="tooltiptext ICONO_ADD ICONO_ADD"></span>' +
      "</div>";

    $("#categoriasCabecera").append(insertar);
  } else {
    var insertar =
      '<div name="btnAdd" value="Añadir" class="tooltip6 addIcon">' +
      '<img class="iconoAdd iconoAddNoAllowed ICONO_ADD" id = "denegado" src="images/add.png" alt="Añadir" />' +
      '<span class="tooltiptext ICONO_ADD ICONO_ADD"></span>' +
      "</div>";

    $("#categoriasCabecera").append(insertar);
  }
  if (categorias.includes("buscar")) {
    var buscar =
      '<div name="btnSearch" value="Buscar" onclick="showSearch();" class="tooltip6 searchIcon">' +
      '<img class="iconoSearch" src="images/search3.png" alt="Buscar" />' +
      '<span class="tooltiptext ICONO_SEARCH"></span>' +
      "</div>";

    $("#categoriasCabecera").append(buscar);
  } else {
    var buscar =
      '<div name="btnSearch" value="Buscar" class="tooltip6 searchIcon">' +
      '<img class="iconoSearch iconoSearchNoAllowed" id = "denegado" src="images/search.png" alt="Buscar" />' +
      '<span class="tooltiptext ICONO_SEARCH"></span>' +
      "</div>";

    $("#categoriasCabecera").append(buscar);
  }

  var permisos =
    '<div name="btnPermisos" value="Buscar" onclick="gestionPermisos();" class="tooltip6 searchIcon">' +
    '<img class="iconoPermisos" src="images/permisos.png" alt="Gestion permisos" />' +
    '<span class="tooltiptext PERMISOS"></span>' +
    "</div>";

  $("#categoriasCabecera").append(permisos);

  var refrescar =
    '<div name="btnRefresh" value="Buscar" onclick="refresh();" class="tooltip6 refreshIcon">' +
    '<img class="iconoRefresh" src="images/refresh3.png" alt="Refrescar Tabla" />' +
    '<span class="tooltiptext ICON_REFRECH_TABLE tituloBotonRefrescarTabla"></span>' +
    "</div>";

  $("#categoriasCabecera").append(refrescar);

  var botonOcultar =
    '<div name="btnHideShowColumns" value="Buscar" onclick="hideShowColumnsWindow();" class="tooltip6 hideShowIcon">' +
    '<img class="iconoHideShow" src="images/hideTable.png" alt="Ocultar/Mostrar Columnas" />' +
    '<span class="tooltiptext ICON_SHOW_HIDE_COLUMNS tituloBotonMostrarOcultarColumnas"></span>' +
    "</div>";

  $("#categoriasCabecera").append(botonOcultar);
}

/**Función que construye cada línea que se va a rellenar en la tabla*/
function construyeFila(fila) {
  let atributosFunciones = [
    "'" + fila.id_categoria + "'",
    "'" + fila.nombre_categoria + "'",
    "'" + fila.descripcion_categoria + "'",
  ];

  let categorias = getCookie("categorias").split(",");

  var celdaCategorias = "";

  if (categorias.includes("verEnDetalle")) {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
    ];
    var celdaCategoriasDetalle =
      '<div class="tooltip6"><img class="detalle ICONO_DETALLE" src="images/detail3.png" onclick="showDetalle(' +
      atributosFunciones +
      ')" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaCategorias = celdaCategoriasDetalle;
  } else {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
    ];
    var celdaCategoriasDetalle =
      '<div class="tooltip6"><img class="detalle detallePermisoNoAllowed ICONO_DETALLE" id = "denegado" src="images/detail.png" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaCategorias = celdaCategoriasDetalle;
  }
  if (categorias.includes("editar")) {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
    ];
    var celdaCategoriasEditar =
      '<div class="tooltip6"><img class="editar ICONO_EDIT" src="images/edit3.png" onclick="showEditar(' +
      atributosFunciones +
      ')" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaCategorias += celdaCategoriasEditar;
  } else {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
    ];
    var celdaCategoriasEditar =
      '<div class="tooltip6"><img class="editar editarPermisoNoAllowed ICONO_EDIT" id = "denegado" src="images/edit.png" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaCategorias += celdaCategoriasEditar;
  }
  if (categorias.includes("borrar")) {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
    ];
    var celdaCategoriasEliminar =
      '<div class="tooltip6"><img class="eliminar ICONO_ELIMINAR" src="images/delete3.png" onclick="showEliminar(' +
      atributosFunciones +
      ')" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaCategorias += celdaCategoriasEliminar;
  } else {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
    ];
    var celdaCategoriasEliminar =
      '<div class="tooltip6"><img class="eliminar eliminarPermisoNoAllowed ICONO_ELIMINAR" id = "denegado" src="images/delete.png" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaCategorias += celdaCategoriasEliminar;
  }

  var filaTabla =
    '<tr class="impar" id="datoEntidad">' +
    "</td> <td>" +
    fila.nombre_categoria +
    "</td> <td>" +
    fila.descripcion_categoria +
    "</td> <td>" +
    celdaCategorias +
    "</td> </tr>";

  return filaTabla;
}

/*
##################################################################################################################
##########################################Listado de categorias##############################################
##################################################################################################################
*/

/*Nos permite obtener un listado inicial de los datos de la tabla.*/
function obtenerListado(empieza) {
  crearformoculto("formularioListado", "javascript:getListadoEntidades()");
  insertacampo(document.formularioListado, "empieza", empieza);
  insertacampo(
    document.formularioListado,
    "filaspagina",
    escogeTamanho("categoria")
  );
  if (getCookie("camposFormularioListado") == "no") {
    informacionBusqueda(document.formularioListado);
    setCookie("camposFormularioListado", "si");
  }
  cargarInformacionBusqueda();
  let categorias = getCookie("categorias").split(",");
  if (categorias.includes("listar")) {
    document.formularioListado.submit();
  }
}

/**Función que llama al show all de categorias*/
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
  addActionControler(document.formularioListado, "buscar", "categoria");
  await getListadoEntidadesAjaxPromesa()
    .then((res) => {
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("categoria");
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
      errorCategoria(res.code);
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

  $("#input_categoria_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de buscar.*/
function searchEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  ocultarLabels();

  $("#input_categoria_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de ver en detalle.*/
function verEnDetalleEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de editar.*/
function editEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de borrar.*/
function deleteEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
}

/**Función para dar una estructura a la ventana modal de reactivar.*/
function reactivarEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  mostrarLabels();

  $("#label_categoria_id").attr("style", "display: none");
  $("#input_categoria_id").attr("style", "display: none");
}

function activarCamposInLineBlock() {
  $("#input_categoria_id").attr("style", "display: inline-block");
  $("#input_categoria_nombre").attr("style", "display: inline-block");
  $("#input_categoria_descripcion").attr("style", "display: inline-block");

  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
  ]);
}

function activarCamposBlock() {
  $("#input_categoria_id").attr("style", "display: block");
  $("#input_categoria_nombre").attr("style", "display: block");
  $("#input_categoria_descripcion").attr("style", "display: block");

  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
  ]);
}

function mostrarObligatorios() {
  $("#obligatorio_categoria_nombre").attr("style", "display: inline-block");
  $("#obligatorio_categoria_description").attr("style", "display: inline-block");
}

function ocultarObligatorios() {
  $("#obligatorio_categoria_nombre").attr("style", "display: none");
  $("#obligatorio_categoria_description").attr("style", "display: none");
}

function mostrarLabels() {
  $("#label_categoria_id").attr("style", "display: block");
  $("#label_categoria_nombre").attr("style", "display: block");
  $("#label_categoria_description").attr("style", "display: block");
}

function ocultarLabels() {
  $("#label_categoria_id").attr("style", "display: none");
  $("#label_categoria_nombre").attr("style", "display: none");
  $("#label_categoria_description").attr("style", "display: none");
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
    "return comprobarAddCategoria();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreCategoria('input_categoria_nombre', 'errorFormatoNombre', 'nombreCategoria')",
    "return comprobarDescripcionCategoria('input_categoria_descripcion', 'errorFormatoDescripcion', 'descripcionCategoria')"
  );
  cambiarIcono("images/add.png", "ICONO_ADD", "iconoAddCategoria", "Añadir");
  $("#formularioCategorias").modal("show");
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
    "return comprobarSearchCategoria();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreCategoriaSearch('input_categoria_nombre', 'errorFormatoNombre', 'nombreCategoria')",
    "return comprobarDescripcionCategoriaSearch('input_categoria_descripcion', 'errorFormatoDescripcion', 'descripcionCategoria')"
  );
  cambiarIcono(
    "images/search.png",
    "ICONO_SEARCH",
    "iconoSearchCategoria",
    "Buscar"
  );
  $("#formularioCategorias").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para ver en detalle e invoca a la función
 * que carga como corresponda los label, input y campo obligatorio.*/
function showDetalle(id, nombre, descripcion) {
  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
  ];
  verEnDetalleEstructura();
  cambiarFormulario("detailForm", "javascript:detailEntidad();", "");
  cambiarIcono("images/close2.png", "CERRARMODAL", "iconoCerrar", "Ok");
  rellenarFormulario(id, nombre, descripcion);
  deshabilitaCampos(campos);
  $("#formularioCategorias").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para editar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEditar(id, nombre, descripcion) {
  var idioma = getCookie("lang");
  var campos = ["input_categoria_id", "input_categoria_nombre"];
  editEstructura();
  cambiarFormulario(
    "editForm",
    "javascript:editEntidad();",
    "return comprobarEditCategoria();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreCategoria('input_categoria_nombre', 'errorFormatoNombre', 'nombreCategoria')",
    "return comprobarDescripcionCategoria('input_categoria_descripcion', 'errorFormatoDescripcion', 'descripcionCategoria')"
  );
  cambiarIcono("images/edit.png", "ICONO_EDIT", "iconoEditarCategoria", "Editar");
  rellenarFormulario(id, nombre, descripcion);
  deshabilitaCampos(campos);
  $("#formularioCategorias").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para eliminar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEliminar(id, nombre, descripcion) {
  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
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
  $("#formularioCategorias").modal("show");
  setLang(idioma);
}

/*Función que crea según las columnas que le pasemos un div con checkbox 
para marcar y así ocultar las columnas.*/
function createHideShowColumnsWindow() {
  //class de la tabla
  var arrayColumnas = {
    CATEGORIA_DESCRIPCION_COLUMN: 2,
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
    CATEGORIA_DESCRIPCION_COLUMN: 2,
  };

  for (var clave in arrayColumnas) {
    $("." + clave).show();
  }
}

/**Función para cambiar valores del icono del botón para cada modal de acción.*/
function cambiarIcono(ruta, nombreIcono, estiloIcono, valorIcono) {
  $("#iconoCategorias").removeClass();
  $("#spanCategorias").removeClass();
  $("#spanCategorias").addClass("tooltiptext");

  $("#iconoCategorias").attr("src", ruta);
  $("#iconoCategorias").addClass(nombreIcono);
  $("#iconoCategorias").addClass(estiloIcono);
  $("#spanCategorias").addClass(nombreIcono);
  $("#btnCategorias").attr("value", valorIcono);
}

/**Función que rellenado los datos del formulario para realizar la petición.*/
function rellenarFormulario(id, nombre, descricion) {
  $("#input_categoria_id").val(id);
  $("#input_categoria_nombre").val(nombre);
  $("#input_categoria_descripcion").val(descricion);
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
###########################################Comprobación de categoria#################################################
##################################################################################################################
*/

/*Función para cambiar onBlur de los campos. El objetivo es añadir onBlur en los input.*/
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

/*
##################################################################################################################
#################################################Peticiones AJAX##################################################
##################################################################################################################
*/

/**Función invocadas por los show(Categoria) que hacen la petición a back de inserción.*/
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
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función invocadas por los show(Categoria) que hacen la petición a back de busqueda.*/
function searchEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "buscar", "categoria");
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
    escogeTamanho("categoria")
  );

  await searchEntidadAjaxPromesa()
    .then((res) => {
      $("#formularioCategorias").attr("style", "display: none");

      setCookie("pintarPaginador", "si");
      if (getCookie("pintarPaginador") == "si") {
        setCookie("totalElementos", res.total);
        paginador("categoria");
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
      $("#formularioCategorias").modal("hide");
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
  ];

  eliminarcampo("empieza");
  eliminarcampo("filaspagina");

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función para cerrar la ventana de detalle de categoria*/
function detailEntidad() {
  $("#formularioCategorias").modal("hide");
  cerrarModal("formularioCategorias", "", "");
}

/**Función invocadas por los show(Categoria) que hacen la petición a back de editar.*/
function editEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "editar", "categoria");
  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
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
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/**Función invocadas por los show(Categoria) que hacen la petición a back de eliminar.*/
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
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
}

/***********Procedimiento que resetean las modales una vez se cierren*************/
$(document).ready(function () {
  $("#formularioCategorias").on("hidden.bs.modal", function () {
    let errores = [
      "errorFormatoId",
      "errorFormatoNombre",
      "errorFormatoDescripcion",
    ];
    errores.forEach((element) => {
      eliminarcampoId(element);
    });
    let campos = [
      "input_categoria_id",
      "input_categoria_nombre",
      "input_categoria_descripcion",
    ];
    resetearFormulario("formularioGenerico", campos);
  });
});
