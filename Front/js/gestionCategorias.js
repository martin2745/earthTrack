let usuarios = [];

/*Ajustamos los valores inciales de la cookies para realizar las búsquedas.*/
function ajustarCookies() {
  setCookie("id_categoria", "");
  setCookie("nombre_categoria", "");
  setCookie("descripcion_categoria", "");
  setCookie("responsable_categoria", "");
  setCookie("id_categoria_padre", "");
  setCookie("nombre_categoria_padre", "");
  setCookie("busquedaVacia", "si");
  setCookie("camposFormularioListado", "no");
  ajustarPaginador();
}

/*Función en la que guardamos los parametros de las busquedas en cookies.*/
function guardarParametrosBusqueda(criterios) {
  setCookie("id_categoria", criterios.id_categoria);
  setCookie("nombre_categoria", criterios.nombre_categoria);
  setCookie("descripcion_categoria", criterios.descripcion_categoria);
  setCookie("id_padre", criterios.id_padre.id_categoria);
  setCookie("responsable", criterios.usuario.usuario);
}

/*Función que comprueba si la busqueda es vacía para todos sus campos.*/
function busquedaVacia() {
  var toret = true;
  if (
    getCookie("id_categoria") != "" ||
    getCookie("nombre_categoria") != "" ||
    getCookie("descripcion_categoria") != "" ||
    getCookie("responsable") != "" ||
    getCookie("id_padre") != ""
  ) {
    toret = false;
  }
  return toret;
}

/*Insertamos campos en el formulario que enviamos a back para realizar la búsqueda. Esto es necesario en caso 
  de que nos desplacemos por varias pestañas de elementos con una paginación relizada.*/
function informacionBusqueda(form) {
  insertacampoParaBusqueda(form, "id_categoria", getCookie("id_categoria"));
  insertacampoParaBusqueda(
    form,
    "nombre_categoria",
    getCookie("nombre_categoria")
  );
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
    document.getElementById("descripcion_categoria_BUSQUEDA").value = getCookie(
      "descripcion_categoria"
    );
  } else {
    document.getElementById("descripcion_categoria_BUSQUEDA").value = "";
  }
}

/*
  ##################################################################################################################
  #############################################Acciones Permitidas##################################################
  ##################################################################################################################
  */

/*Función que establece que acciones tenemos para una funcionalidad determinada.
   En el caso de categoria necesitamos saber si existe el permiso para insertar por ejemplo,
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
    "'" + fila.id_categoria + "'",
    "'" + fila.nombre_categoria + "'",
    "'" + fila.descripcion_categoria + "'",
    "'" + fila.id_padre.id_categoria + "'",
    "'" + fila.id_padre.nombre_categoria + "'",
    "'" + fila.usuario.dni + "'",
    "'" + fila.usuario.usuario + "'",
  ];

  let acciones = getCookie("acciones").split(",");

  var celdaAcciones = "";

  if (acciones.includes("verEnDetalle")) {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
      "'" + fila.id_padre.id_categoria + "'",
      "'" + fila.id_padre.nombre_categoria + "'",
      "'" + fila.usuario.dni + "'",
      "'" + fila.usuario.usuario + "'",
    ];
    var celdaAccionesDetalle =
      '<div class="tooltip6"><img class="detalle ICONO_DETALLE" src="images/detail3.png" onclick="showDetalle(' +
      atributosFunciones +
      ')" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaAcciones = celdaAccionesDetalle;
  } else {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
      "'" + fila.id_padre.id_categoria + "'",
      "'" + fila.id_padre.nombre_categoria + "'",
      "'" + fila.usuario.dni + "'",
      "'" + fila.usuario.usuario + "'",
    ];
    var celdaAccionesDetalle =
      '<div class="tooltip6"><img class="detalle detallePermisoNoAllowed ICONO_DETALLE" id = "denegado" src="images/detail.png" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
    celdaAcciones = celdaAccionesDetalle;
  }
  if (acciones.includes("editar")) {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
      "'" + fila.id_padre.id_categoria + "'",
      "'" + fila.id_padre.nombre_categoria + "'",
      "'" + fila.usuario.dni + "'",
      "'" + fila.usuario.usuario + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip6"><img class="editar ICONO_EDIT" src="images/edit3.png" onclick="showEditar(' +
      atributosFunciones +
      ')" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaAcciones += celdaAccionesEditar;
  } else {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
      "'" + fila.id_padre.id_categoria + "'",
      "'" + fila.id_padre.nombre_categoria + "'",
      "'" + fila.usuario.dni + "'",
      "'" + fila.usuario.usuario + "'",
    ];
    var celdaAccionesEditar =
      '<div class="tooltip6"><img class="editar editarPermisoNoAllowed ICONO_EDIT" id = "denegado" src="images/edit.png" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
    celdaAcciones += celdaAccionesEditar;
  }
  if (acciones.includes("borrar")) {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
      "'" + fila.id_padre.id_categoria + "'",
      "'" + fila.id_padre.nombre_categoria + "'",
      "'" + fila.usuario.dni + "'",
      "'" + fila.usuario.usuario + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="eliminar ICONO_ELIMINAR" src="images/delete3.png" onclick="showEliminar(' +
      atributosFunciones +
      ')" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  } else {
    atributosFunciones = [
      "'" + fila.id_categoria + "'",
      "'" + fila.nombre_categoria + "'",
      "'" + fila.descripcion_categoria + "'",
      "'" + fila.id_padre.id_categoria + "'",
      "'" + fila.id_padre.nombre_categoria + "'",
      "'" + fila.usuario.dni + "'",
      "'" + fila.usuario.usuario + "'",
    ];
    var celdaAccionesEliminar =
      '<div class="tooltip6"><img class="eliminar eliminarPermisoNoAllowed ICONO_ELIMINAR" id = "denegado" src="images/delete.png" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
    celdaAcciones += celdaAccionesEliminar;
  }
  var celdaAccionNavegar =
    '<div class="tooltip6"><img class="eliminar ICONO_NAVEGAR_PROCESO" src="images/rol.png" onclick="navigateToProcesos(' +
    fila.id_categoria +
    ')" alt="Navegar"/><span class="tooltiptext ICONO_NAVEGAR_PROCESO"></span></div>';

  if (fila.tiene_proceso) {
    celdaAcciones += celdaAccionNavegar;
  }

  if (fila.nombre_categoria == "superCategoria") {
    celdaAcciones = "";
  }
  var filaTabla =
    '<tr class="impar" id="datoEntidad">' +
    "</td> <td>" +
    fila.nombre_categoria +
    "</td> <td>" +
    fila.descripcion_categoria +
    "</td> <td>" +
    fila.id_padre.nombre_categoria +
    "</td> <td>" +
    fila.usuario.usuario +
    "</td> <td>" +
    celdaAcciones +
    "</td> </tr>";

  return filaTabla;
}
function navigateToProcesos(id_categoria) {
  setCookie("navigateToProceso", id_categoria);

  window.location.href = "procesoGestion.html";
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
    escogeTamanho("categoria")
  );
  if (getCookie("camposFormularioListado") == "no") {
    informacionBusqueda(document.formularioListado);
    setCookie("camposFormularioListado", "si");
  }

  cargarInformacionBusqueda();
  categoriasSistema();
  usuariosNoResponsablesSistema();

  document.formularioListado.submit();
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
    "errorFormatoCategoriaPadre",
    "errorFormatoResponsableCategoria",
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
  $("#select_padre_insertar_categoria").attr("style", "width: 300px;");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

/**Función para dar una estructura a la ventana modal de buscar.*/
function searchEstructura() {
  limpiarErroresModal();
  activarCamposBlock();
  ocultarObligatorios();
  ocultarLabels();

  $("#input_categoria_id").attr("style", "display: none");
  //$('#select_padre_insertar_categoria').attr("enable","true");
  $("#select_padre_insertar_categoria").attr("style", "width: 300px;");
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
  //$('#select_padre_insertar_categoria').attr("enable","true");
  $("#select_padre_insertar_categoria").attr("style", "width: 300px;");
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
  $("#select_padre_insertar_categoria").attr("style", "width: 300px;");
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
  $("#select_padre_insertar_categoria").attr("style", "width: 300px;");
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
  $("#select_padre_insertar_categoria").attr("style", "width: 300px;");
  $("#select_responsable_insertar_categoria").attr("style", "width: 300px;");
}

function activarCamposInLineBlock() {
  $("#input_categoria_id").attr("style", "display: inline-block");
  $("#input_categoria_nombre").attr("style", "display: inline-block");
  $("#input_categoria_descripcion").attr("style", "display: inline-block");

  habilitaCampos([
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
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
  $("#obligatorio_categoria_padre").attr("style", "display: inline-block");
  $("#obligatorio_responsable_categoria").attr(
    "style",
    "display: inline-block"
  );
}

function ocultarObligatorios() {
  $("#obligatorio_categoria_nombre").attr("style", "display: none");
  $("#obligatorio_categoria_description").attr("style", "display: none");
  $("#obligatorio_categoria_padre").attr("style", "display: none");
  $("#obligatorio_responsable_categoria").attr("style", "display: none");
}

function mostrarLabels() {
  $("#label_categoria_id").attr("style", "display: block");
  $("#label_categoria_nombre").attr("style", "display: block");
  $("#label_categoria_description").attr("style", "display: block");
  $("#label_categoria_padre").attr("style", "display: block");
}

function ocultarLabels() {
  $("#label_categoria_id").attr("style", "display: none");
  $("#label_categoria_nombre").attr("style", "display: none");
  $("#label_categoria_description").attr("style", "display: none");
  $("#label_categoria_padre").attr("style", "display: none");
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
  rellenaSelectCategoriaPadreInit();
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
    "return comprobarSelectCategoriaPadre('select_padre_insertar_categoria', 'errorFormatoCategoriaPadre', 'padreCategoria')",
    "return comprobarSelectResponsableCategoria('select_responsable_insertar_categoria', 'errorFormatoResponsableCategoria', 'responsableCategoria')"
  );
  cambiarIcono("images/add.png", "ICONO_ADD", "iconoAddRol", "Añadir");
  $("#formularioAcciones").modal("show");

  setLang(idioma);
}

/*Función para mostrar modal para buscar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showSearch() {
  var idioma = getCookie("lang");
  rellenaSelectCategoriaPadreInit();
  rellenaSelectResponsableCategoriaInit();
  searchEstructura();
  cambiarFormulario(
    "searchForm",
    "javascript:searchEntidad();",
    "return comprobarSearchCategoria();"
  );
  cambiarOnBlurCampos(
    "",
    "return comprobarNombreCategoriaSearch('input_categoria_nombre', 'errorFormatoNombre', 'nombreCategoria')",
    "return comprobarDescripcionCategoriaSearch('input_categoria_descripcion', 'errorFormatoDescripcion', 'descripcionCategoria')",
    "return comprobarSelectCategoriaPadreSearch('select_padre_insertar_categoria', 'errorFormatoCategoriaPadre', 'padreCategoria')",
    "return comprobarSelectResponsableCategoriaSearch('select_responsable_insertar_categoria', 'errorFormatoResponsableCategoria', 'responsableCategoria')"
  );
  cambiarIcono("images/search.png", "ICONO_SEARCH", "iconoSearchRol", "Buscar");
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para ver en detalle e invoca a la función
 * que carga como corresponda los label, input y campo obligatorio.*/
function showDetalle(
  id,
  nombre_categoria,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre
) {
  rellenaSelectCategoriaPadre(id_padre, nombre_padre);
  rellenaSelectUsuarioResponsable(dni, nombre);

  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ];
  verEnDetalleEstructura();
  cambiarFormulario("detailForm", "javascript:detailEntidad();", "");
  cambiarIcono("images/close2.png", "CERRARMODAL", "iconoCerrar", "Ok");
  rellenarFormulario(id, nombre_categoria, descripcion, dni, nombre);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

function limpiarSelect() {
  const $select = document.querySelector(
    "#select_responsable_insertar_categoria"
  );
  for (let i = $select.options.length; i >= 0; i--) {
    $select.remove(i);
  }

  const $select2 = document.querySelector("#select_padre_insertar_categoria");
  for (let i = $select2.options.length; i >= 0; i--) {
    $select.remove(i);
  }
}
/*Función para mostrar modal para editar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEditar(
  id,
  nombre_categoria,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre
) {
  limpiarSelect();

  rellenaSelectCategoriaPadre(id_padre, nombre_padre);
  rellenaSelectUsuarioResponsable(dni, nombre);
  var idioma = getCookie("lang");
  var campos = ["input_categoria_id", "input_categoria_nombre"];
  var selectPadre = ["select_padre_insertar_categoria"];
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
  rellenarFormulario(id, nombre_categoria, descripcion, id_padre, dni, nombre);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para eliminar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showEliminar(
  id,
  nombre_categoria,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre
) {
  rellenaSelectCategoriaPadre(id_padre, nombre_padre);
  rellenaSelectUsuarioResponsable(dni, nombre);

  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
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
  rellenarFormulario(id, nombre_categoria, descripcion, id_padre, dni, nombre);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función para mostrar modal para reactivar e invoca a la función que
 * carga como corresponda los label, input y campo obligatorio.*/
function showReactivar(
  id,
  nombre,
  descripcion,
  id_padre,
  nombre_padre,
  dni,
  nombre
) {
  var idioma = getCookie("lang");
  var campos = [
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ];
  reactivarEstructura();
  cambiarFormulario("reactivarForm", "javascript:reactivarEntidad();", "");
  cambiarIcono(
    "images/reactivar2.png",
    "ICONO_REACTIVAR",
    "iconoReactivar",
    "Reactivar"
  );
  rellenarFormulario(id, nombre, descripcion, id_padre, dni, nombre);
  deshabilitaCampos(campos);
  $("#formularioAcciones").modal("show");
  setLang(idioma);
}

/*Función que crea según las columnas que le pasemos un div con checkbox 
  para marcar y así ocultar las columnas.*/
function createHideShowColumnsWindow() {
  //class de la tabla
  var arrayColumnas = {
    DESCRIPCION: 2,
    PADRE_CATEGORIA: 3,
    RESPONSABLE_CATEGORIA: 4,
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
    DESCRIPCION: 2,
    PADRE_CATEGORIA: 3,
    RESPONSABLE_CATEGORIA: 4,
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
function rellenarFormulario(id, nombre_categoria, descricion, dni, nombre) {
  $("#input_categoria_id").val(id);
  $("#input_categoria_nombre").val(nombre_categoria);
  $("#input_categoria_descripcion").val(descricion);
  //rellenaSelectCategoriaPadre(dni,nombre);
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
  onBlurId,
  onBlurNombre,
  onBlurdescripcion,
  onBlurCategoriaPadre,
  onBlurResponsable
) {
  if (onBlurId != "") {
    $("#input_categoria_id").attr("onblur", onBlurId);
  }

  if (onBlurNombre != "") {
    $("#input_categoria_nombre").attr("onblur", onBlurNombre);
  }

  if (onBlurdescripcion != "") {
    $("#input_categoria_descripcion").attr("onblur", onBlurdescripcion);
  }
  if (onBlurCategoriaPadre != "") {
    $("#select_padre_insertar_categoria").attr("onblur", onBlurCategoriaPadre);
  }
  if (onBlurResponsable != "") {
    $("#select_responsable_insertar_categoria").attr(
      "onblur",
      onBlurResponsable
    );
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
    "select_padre_insertar_categoria",
    "select_responsable_insertar_categoria",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  categoriasSistema();
  usuariosNoResponsablesSistema();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de busqueda.*/
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
      $("#formularioAcciones").attr("style", "display: none");

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
      $("#formularioAcciones").modal("hide");
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
    "select_responsable_insertar_categoria",
    "select_padre_insertar_categoria",
  ];

  eliminarcampo("empieza");
  eliminarcampo("filaspagina");

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  categoriasSistema();
  usuariosNoResponsablesSistema();
}

/**Función para cerrar la ventana de detalle de rol*/
function detailEntidad() {
  $("#formularioAcciones").modal("hide");

  cerrarModal("formularioAcciones", "", "");
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
    "select_padre_insertar_categoria",
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
  limpiarSelect();
  limpiarModalTitulo();
  categoriasSistema();
  usuariosNoResponsablesSistema();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de eliminar.*/
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
  categoriasSistema();
  usuariosNoResponsablesSistema();
}

/**Función invocadas por los show(Accion) que hacen la petición a back de reactivar.*/
function reactivarEntidadAjaxPromesa() {
  var token = getCookie("token");
  addActionControler(document.formularioGenerico, "reactivar", "categoria");
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
          if (res.code != "CATEGORIA_REACTIVAR_OK") {
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
    "input_categoria_id",
    "input_categoria_nombre",
    "input_categoria_descripcion",
  ];

  buscarEntidades(parseInt(getCookie("pestanaActual")));

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  limpiarModalTitulo();
  categoriasSistema();
  usuariosNoResponsablesSistema();
}

/*
  ##################################################################################################################
  #########################################Acciones necesarias del SELECT###########################################
  ##################################################################################################################
  */

function rellenaSelectCategoriaPadreInit() {
  var select = $("#select_padre_insertar_categoria");

  select.empty();

  var option1 = document.createElement("option");
  option1.setAttribute("value", "");
  option1.setAttribute("label", "-----");
  option1.setAttribute("class", "PADRE_CATEGORIA");
  option1.setAttribute("selected", "true");
  select.append(option1);

  var categoriasArrayCokie = getCookie("categorias");
  var categoriasArray = categoriasArrayCokie.split(",");
  var option2 = document.createElement("option");
  var optionTexto = "";

  for (var i = 0; i < categoriasArray.length; i++) {
    if (categoriasArray[i] != "") {
      option2 = document.createElement("option");
      option2.setAttribute("value", i);
      option2.setAttribute("name", i);
      optionTexto = document.createTextNode(categoriasArray[i]);
      option2.appendChild(optionTexto);
      select.append(option2);
    }
  }
}
function rellenaSelectCategoriaPadre(id_padre, nomre_padre) {
  var select = $("#select_padre_insertar_categoria");

  select.empty();

  var categoriasArrayCokie = getCookie("categorias");
  var categoriasArray = categoriasArrayCokie.split(",");
  var option2 = document.createElement("option");
  var optionTexto = "";

  for (var i = 0; i < categoriasArray.length; i++) {
    if (categoriasArray[i] != "") {
      option2 = document.createElement("option");
      option2.setAttribute("value", i);
      option2.setAttribute("name", i);

      option2.setAttribute("selected", "false");

      optionTexto = document.createTextNode(categoriasArray[i]);
      option2.appendChild(optionTexto);

      select.append(option2);
    }
  }

  //marco como opcion seleccionada el responsable actual
  option2 = document.createElement("option");
  option2.setAttribute("selected", "true");
  option2.setAttribute("value", id_padre);
  option2.setAttribute("name", i);
  optionTexto = document.createTextNode(nomre_padre);
  option2.appendChild(optionTexto);
  select.append(option2);
}
//PETICION PARA ALMACENAR EN UNA COOKIE CATEGORIAS TODAS LAS CATEGORIAS PARA SER PADRE
function categoriasSistemaAjaxPromesa() {
  addActionControler(document.formularioGenerico, "buscar", "categoria");

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

async function categoriasSistema() {
  var idioma = getCookie("lang");

  await categoriasSistemaAjaxPromesa()
    .then((res) => {
      categorias = [];
      res.resource.forEach((element) => {
        categorias[element.id_categoria] = element.nombre_categoria;
      });

      setCookie("categorias", categorias);
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

/****************************************************************
 *
 *
 *   GESTION DE SELECTS E INFORMACIÓN DE RESPONSABLES
 * ********************************************************
 */
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
      option2 = document.createElement("option");
      option2.setAttribute("value", usuario[1]);
      option2.setAttribute("name", i);
      optionTexto = document.createTextNode(usuariosArray[i]);
      option2.appendChild(optionTexto);
      select.append(option2);
    }
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
      option2 = document.createElement("option");

      usuario = usuariosArray[i].split("/");
      option2.setAttribute("value", usuario[1]);
      option2.setAttribute("name", i);

      option2.setAttribute("selected", "false");
      selected = false;

      optionTexto = document.createTextNode(usuariosArray[i]);
      option2.appendChild(optionTexto);
      select.append(option2);

      if (i == usuariosArray.length - 1) {
        select.append(optionSelected);
      }
    }
  }

  //marco como opcion seleccionada el responsable actual
  option2 = document.createElement("option");
  option2.setAttribute("selected", "true");
  option2.setAttribute("value", nombre);
  option2.setAttribute("name", i);
  optionTexto = document.createTextNode(dni + "/" + nombre);
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
      todosUsuarios = [];
      i = 0;
      res.resource.forEach((element) => {
        if (element.borrado_logico == 0) {
          cadena = element.dni + "/" + element.usuario;
          //if(element.id_rol.nombre_rol=="usuario"){

          //}
          usuariosNoResponsables[i] = cadena;

          todosUsuarios[i] = cadena;
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
      "input_categoria_id",
      "input_categoria_nombre",
      "input_categoria_descripcion",
    ];
    resetearFormulario("formularioGenerico", campos);
  });
});
