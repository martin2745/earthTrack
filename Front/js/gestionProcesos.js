
let usuarios=[];

/*Ajustamos los valores inciales de la cookies para realizar las búsquedas.*/
function ajustarCookies() {
    setCookie("id_proceso", "");
    setCookie("nombre_proceso", "");
    setCookie("descripcion_proceso", "");
    setCookie("formula", "");
    setCookie("categoria_proceso", "");
    //setCookie("borrado_logico", "");
    setCookie("busquedaVacia", "si");
    setCookie("camposFormularioListado", "no");
    ajustarPaginador();
  }
  
  /*Función en la que guardamos los parametros de las busquedas en cookies.*/
  function guardarParametrosBusqueda(criterios) {
    
    console.log(criterios);

    setCookie("id_proceso", criterios.id_proceso);
    setCookie("nombre_proceso", criterios.nombre_proceso);
    setCookie("descripcion_proceso", criterios.descripcion_proceso);
    setCookie("categoria_proceso", criterios.id_categoria);
    //setCookie("borrado_logico", criterios.borrado_logico);
    setCookie("formula",criterios.formula);
  }
  
  /*Función que comprueba si la busqueda es vacía para todos sus campos.*/
  function busquedaVacia() {
    var toret = true;
    if (
      getCookie("id_proceso") != "" ||
      getCookie("nombre_proceso") != "" ||
      getCookie("descripcion_proceso") != "" ||
      //getCookie("borrado_logico") != "" ||
      getCookie("formula") != "" ||
      getCookie("categoria_proceso") != ""
    ) {
      toret = false;
    }
    return toret;
  }
  
  /*Insertamos campos en el formulario que enviamos a back para realizar la búsqueda. Esto es necesario en caso 
  de que nos desplacemos por varias pestañas de elementos con una paginación relizada.*/
  function informacionBusqueda(form) {
    insertacampoParaBusqueda(form, "id_proceso", getCookie("id_proceso"));
    insertacampoParaBusqueda(form, "nombre_proceso", getCookie("nombre_proceso"));
    insertacampoParaBusqueda(form, "id_categoria", getCookie("id_categoria"));
    insertacampoParaBusqueda(
      form,
      "descripcion_proceso",
      getCookie("descripcion_proceso")
    );
    insertacampoParaBusqueda(form, "borrado_logico", getCookie("borrado_logico"));
  }
  
  function cargarInformacionBusqueda() {
    if (getCookie("id_proceso") != "") {
      document.getElementById("id_proceso_BUSQUEDA").value = getCookie("id_proceso");
    } else {
      document.getElementById("id_proceso_BUSQUEDA").value = "";
    }
  
    if (getCookie("nombre_proceso") != "") {
      document.getElementById("nombre_proceso_BUSQUEDA").value =
        getCookie("nombre_proceso");
    } else {
      document.getElementById("nombre_proceso_BUSQUEDA").value = "";
    }
    if (getCookie("id_categoria") != "") {
      document.getElementById("id_categoria_BUSQUEDA").value =
        getCookie("id_categoria");
    } else {
      document.getElementById("id_categoria_BUSQUEDA").value = "";
    }
  
    if (getCookie("descripcion_proceso") != "") {
      document.getElementById("descripcion_proceso_BUSQUEDA").value =
        getCookie("descripcion_proceso");
    } else {
      document.getElementById("descripcion_proceso_BUSQUEDA").value = "";
    }
  
    /*
    if (getCookie("borrado_logico") != "") {
      document.getElementById("borrado_logico_BUSQUEDA").value =
        getCookie("borrado_logico");
    } else {
      document.getElementById("borrado_logico_BUSQUEDA").value = "";
    }*/
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
      "rol"
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
    

    console.log(fila);

    let atributosFunciones = [
      "'" + fila.id_proceso + "'",
      "'" + fila.nombre_proceso + "'",
      "'" + fila.descripcion_proceso + "'",
      "'" + fila.formula + "'",
      "'" + fila.id_categoria.id_categoria + "'",
      "'" + fila.id_categoria.nombre_categoria + "'",
      //"'" + fila.borrado_logico + "'",
    ];
  
    let acciones = getCookie("acciones").split(",");
  
    var celdaAcciones = "";
  
    if (acciones.includes("verEnDetalle")) {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesDetalle =
        '<div class="tooltip6"><img class="detalle ICONO_DETALLE" src="images/detail3.png" onclick="showDetalle(' +
        atributosFunciones +
        ')" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
      celdaAcciones = celdaAccionesDetalle;
    } else {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesDetalle =
        '<div class="tooltip6"><img class="detalle detallePermisoNoAllowed ICONO_DETALLE" id = "denegado" src="images/detail.png" alt="Detalle"/><span class="tooltiptext ICONO_DETALLE"></span></div>';
      celdaAcciones = celdaAccionesDetalle;
    }
    if (acciones.includes("editar")) {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesEditar =
        '<div class="tooltip6"><img class="editar ICONO_EDIT" src="images/edit3.png" onclick="showEditar(' +
        atributosFunciones +
        ')" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
      celdaAcciones += celdaAccionesEditar;
    } else {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesEditar =
        '<div class="tooltip6"><img class="editar editarPermisoNoAllowed ICONO_EDIT" id = "denegado" src="images/edit.png" alt="Editar"/><span class="tooltiptext ICONO_EDIT"></span></div>';
      celdaAcciones += celdaAccionesEditar;
    }
    if (acciones.includes("borrar")) {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesEliminar =
        '<div class="tooltip6"><img class="eliminar ICONO_ELIMINAR" src="images/delete3.png" onclick="showEliminar(' +
        atributosFunciones +
        ')" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
      celdaAcciones += celdaAccionesEliminar;
    } else {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesEliminar =
        '<div class="tooltip6"><img class="eliminar eliminarPermisoNoAllowed ICONO_ELIMINAR" id = "denegado" src="images/delete.png" alt="Eliminar"/><span class="tooltiptext ICONO_ELIMINAR"></span></div>';
      celdaAcciones += celdaAccionesEliminar;
    }
    /*
    if (acciones.includes("reactivar") && fila.borrado_logico == 1) {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesEliminar =
        '<div class="tooltip6"><img class="reactivar ICONO_REACTIVAR" src="images/reactivar.png" onclick="showReactivar(' +
        atributosFunciones +
        ')" alt="Eliminar"/><span class="tooltiptext ICONO_REACTIVAR"></span></div>';
      celdaAcciones += celdaAccionesEliminar;
    } else {
      atributosFunciones = [
        "'" + fila.id_proceso + "'",
        "'" + fila.nombre_proceso + "'",
        "'" + fila.descripcion_proceso + "'",
        "'" + fila.formula + "'",
        "'" + fila.id_categoria.id_categoria + "'",
        "'" + fila.id_categoria.nombre_categoria + "'",
        //"'" + borrado_logico_texto(fila.borrado_logico) + "'",
      ];
      var celdaAccionesEliminar =
        '<div class="tooltip6"><img class="reactivar reactivarPermisoNoAllowed ICONO_REACTIVAR" id = "denegado" src="images/reactivar2.png" alt="Eliminar"/><span class="tooltiptext ICONO_REACTIVAR"></span></div>';
      celdaAcciones += celdaAccionesEliminar;
    }*/
  
    if(fila.nombre_proceso=="superCategoria"){
      celdaAcciones="";
    }
    var filaTabla =
      '<tr class="impar" id="datoEntidad">' +
      "</td> <td>" +
      fila.nombre_proceso +
      "</td> <td>" +
      fila.descripcion_proceso +
      "</td> <td>" +
      fila.formula +
      "</td> <td>" +
      fila.id_categoria.nombre_categoria +
    /*"</td> <td>" +
      borrado_logico_texto(fila.borrado_logico) +*/
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

    //COMPROBAR SI TENGO QUE BUSCADOR TODOS O SOLO UN PAR
    
    var categoriaConcreta=getCookie("navigateToProceso");
    var busquedaConcreta=false;
    if((categoriaConcreta!=undefined && categoriaConcreta!="")){
        setCookie("navigateToProceso","");
        setCookie("id_categoria",categoriaConcreta);
        busquedaConcreta=true;
    }


    crearformoculto("formularioListado", "javascript:getListadoEntidades()");
    insertacampo(document.formularioListado, "empieza", empieza);
    insertacampo(document.formularioListado, "filaspagina", escogeTamanho("categoria"));
    if (getCookie("camposFormularioListado") == "no") {
      informacionBusqueda(document.formularioListado);
      setCookie("camposFormularioListado", "si");
    }
    
    cargarInformacionBusqueda();
    categoriasSistema();
   
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
    addActionControler(document.formularioListado, "buscar", "proceso");
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
      "errorFormatoNombreProceso",
      "errorFormatoDescripcionProceso",
      "errorFormatoFormulaProceso",
      "errorFormatoCategoriaProceso",
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
    mostrarSpanObligatorio();
    mostrarElementosFormula();

    $("#input_proceso_id").attr("style", "display: none");
    $("#input_proceso_borrado_logico").attr("style", "display: none");
    $("#select_borrado_logico").attr("style", "display: none");
    $('#select_categoria_insertar_proceso').attr("style", "width: 300px;");
    $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");
    $("#label_proceso_categoria").attr("style", "display: none");

    //vaciar campos
    $("#input_proceso_id").val("");
    $("#input_proceso_descripcion").val("");
    $("#input_proceso_nombre").val("");
    $("#input_proceso_formula").val("");
    
    
  }

  function ocultarSpanObligatorio(){
    $("#obligatorio_proceso_categoria").attr("style", "display: none");
    $("#obligatorio_proceso_description").attr("style", "display: none");
    $("#obligatorio_proceso_nombre").attr("style", "display: none");
    $("#obligatorio_proceso_formula").attr("style", "display: none");
    
  }
  function mostrarSpanObligatorio(){
    $("#obligatorio_proceso_categoria").attr("style", "");
    $("#obligatorio_proceso_description").attr("style", "");
    $("#obligatorio_proceso_nombre").attr("style", "");
    $("#obligatorio_proceso_formula").attr("style", "");
  }

  /**Función para dar una estructura a la ventana modal de buscar.*/
  function searchEstructura() {
    limpiarErroresModal();
    activarCamposBlock();
    ocultarObligatorios();
    ocultarLabels();
    ocultarElementosFormula();
    ocultarSpanObligatorio();

    $("#input_proceso_id").attr("style", "display: none");
    $("#input_proceso_borrado_logico").attr("style", "display: none");
    $("#label_proceso_borrado_logico").attr("style", "display: none");
    $("#select_borrado_logico").attr("style", "display: none");
    
    $("#input_proceso_descripcion").attr("style", "display: none");
    $("#label_proceso_categoria").attr("style", "");
    //$('#select_categoria_insertar_proceso').attr("enable","true");
    //$('#select_categoria_insertar_proceso').attr("style", "width: 300px;");
    
  }

  function ocultarElementosFormula(){
    $("#input_proceso_formula").attr("style", "display: none");
    $("#label_nota").attr("style", "display: none");
    $("#label_proceso_formula").attr("style", "display: none");
    $("#obligatorio_proceso_formula").attr("style", "display: none");
   
  }
  function mostrarElementosFormula(){
    $("#input_proceso_formula").attr("style","WIDTH:450px; HEIGHT: 100px");
    $("#label_nota").attr("style", "");
    $("#label_proceso_formula").attr("style", "");
    $("#obligatorio_proceso_formula").attr("style", "");
  }
  
  /**Función para dar una estructura a la ventana modal de ver en detalle.*/
  function verEnDetalleEstructura() {
    limpiarErroresModal();
    activarCamposBlock();
    ocultarObligatorios();
    mostrarLabels();
    ocultarSpanObligatorio();
    mostrarElementosFormula();

    $("#label_proceso_id").attr("style", "display: none");
    $("#input_proceso_id").attr("style", "display: none");
    $("#label_proceso_borrado_logico").attr("style", "display: none");
    $("#input_proceso_borrado_logico").attr("style", "display: none");
    $("#select_borrado_logico").attr("style", "display: none");
    //$('#select_categoria_insertar_proceso').attr("enable","true");
    $('#select_categoria_insertar_proceso').attr("style", "width: 300px;");
    //$('#input_proceso_formula').attr("style", "width: 300px;");
    $("#label_proceso_categoria").attr("style", "");
    $("#label_nota").attr("style", "display:none");
   
  }
  
  /**Función para dar una estructura a la ventana modal de editar.*/
  function editEstructura() {

    limpiarErroresModal();
    activarCamposBlock();
    ocultarObligatorios();
    mostrarLabels();
    //mostrarElementosFormula();
    ocultarSpanObligatorio();

    $("#label_proceso_id").attr("style", "display: none");
    $("#input_proceso_id").attr("style", "display: none");
    $("#select_borrado_logico").attr("style", "display: none");
    $("#label_proceso_borrado_logico").attr("style", "display: none");
    $("#input_proceso_borrado_logico").attr("style", "display: none");
    $('#select_categoria_insertar_proceso').attr("style", "width: 300px;");
    $("#label_proceso_categoria").attr("style", "");
    $("#label_nota").attr("style", "");
    $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");
    
  }
  
  /**Función para dar una estructura a la ventana modal de borrar.*/
  function deleteEstructura() {
    limpiarErroresModal();
    activarCamposBlock();
    ocultarObligatorios();
    mostrarLabels();
    ocultarSpanObligatorio();
    
    $("#label_proceso_id").attr("style", "display: none");
    $("#input_proceso_id").attr("style", "display: none");
    $("#select_borrado_logico").attr("style", "display: none");
    $("#label_proceso_borrado_logico").attr("style", "display: none");
    $("#input_proceso_borrado_logico").attr("style", "display: none");
    $('#select_categoria_insertar_proceso').attr("style", "width: 300px;");
    $('#select_responsable_insertar_categoria').attr("style", "width: 300px;");
    $("#label_proceso_categoria").attr("style", "");
    $("#label_nota").attr("style", "display:none");
    $("#input_proceso_formula").attr("style", "WIDTH:450px; HEIGHT: 100px");
    
  }
  
  /**Función para dar una estructura a la ventana modal de reactivar.*/
  function reactivarEstructura() {
    limpiarErroresModal();
    activarCamposBlock();
    ocultarObligatorios();
    mostrarLabels();
  
    $("#label_proceso_id").attr("style", "display: none");
    $("#input_proceso_id").attr("style", "display: none");
    $("#select_borrado_logico").attr("style", "display: none");
    $("#label_proceso_borrado_logico").attr("style", "display: none");
    $("#input_proceso_borrado_logico").attr("style", "display: none");
    $('#select_categoria_insertar_proceso').attr("style", "width: 300px;");
    $("#label_proceso_categoria").attr("style", "");
  }
  
  function activarCamposInLineBlock() {
    $("#input_proceso_id").attr("style", "display: inline-block");
    $("#input_proceso_nombre").attr("style", "display: inline-block;WIDTH:300px;");
    $("#input_proceso_descripcion").attr("style", "display: inline-block;WIDTH:300px;");
    $("#input_proceso_formula").attr("style", "display: inline-block");
    $("#input_proceso_borrado_logico").attr("style", "display: inline-block");
  
    habilitaCampos([
      "input_proceso_id",
      "input_proceso_nombre",
      "input_proceso_descripcion",
      "input_proceso_borrado_logico",
      "select_categoria_insertar_proceso",
      "input_proceso_formula"
    ]);
  }
  
  function activarCamposBlock() {
    $("#input_proceso_id").attr("style", "display: block");
    $("#input_proceso_nombre").attr("style", "display: block");
    $("#input_proceso_descripcion").attr("style", "display: block;WIDTH:300px;");
    $("#input_proceso_borrado_logico").attr("style", "display: block");
  
    habilitaCampos([
      "input_proceso_id",
      "input_proceso_nombre",
      "input_proceso_descripcion",
      "input_proceso_borrado_logico",
      "select_categoria_insertar_proceso",
      "input_proceso_formula",
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
    $("#label_proceso_id").attr("style", "display: block");
    $("#label_proceso_nombre").attr("style", "display: block");
    $("#label_proceso_description").attr("style", "display: block");
    $("#label_proceso_borrado_logico").attr("style", "display: block");
    $("#label_categoria_padre").attr("style", "display: block");
    
  }
  
  function ocultarLabels() {
    $("#label_proceso_id").attr("style", "display: none");
    $("#label_proceso_nombre").attr("style", "display: none");
    $("#label_proceso_description").attr("style", "display: none");
    $("#label_proceso_borrado_logico").attr("style", "display: none");
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

    addEstructura();
    cambiarFormulario(
      "addForm",
      "javascript:addEntidad();",
      "return comprobarAddProceso();"
    );
    cambiarOnBlurCampos(
      "",
      "return comprobarNombreProceso('input_proceso_nombre', 'errorFormatoNombreProceso', 'nombreProceso')",
      "return comprobarDescripcionProceso('input_proceso_descripcion', 'errorFormatoDescripcionProceso', 'descripcionProceso')",
      "return comprobarFormulaProceso('input_proceso_formula', 'errorFormatoFormulaProceso', 'formulaProceso')",
      "return comprobarSelectCategoriaProceso('select_categoria_insertar_proceso', 'errorFormatoCategoriaProceso', 'categoriaProceso')",
      
    );
    cambiarIcono("images/add.png", "ICONO_ADD", "iconoAddRol", "Añadir");
    $("#formularioAcciones").modal("show");

    
    setLang(idioma);
  }
 
  /*Función para mostrar modal para buscar e invoca a la función que
   * carga como corresponda los label, input y campo obligatorio.*/
  function showSearch() {
    var idioma = getCookie("lang");
    rellenaSelectCategoriaPadreInit("buscar");

    searchEstructura();
    cambiarFormulario(
      "searchForm",
      "javascript:searchEntidad();",
      "return comprobarSearchProceso();"
    );
    cambiarOnBlurCampos(
      "",
      "return comprobarNombreProcesoSearch('input_proceso_nombre', 'errorFormatoNombreProceso', 'nombreProceso')",
      "return comprobarDescripcionProcesoSearch('input_proceso_descripcion', 'errorFormatoDescripcion', 'descripcionProceso')",
      "",
      "return comprobarSelectCategoriaProcesoSearch('select_categoria_insertar_proceso', 'errorFormatoCategoriaProceso', 'categoriaProceso')",
      
    );
    cambiarIcono("images/search.png", "ICONO_SEARCH", "iconoSearchRol", "Buscar");
    rellenaSelect();
    $("#formularioAcciones").modal("show");
    setLang(idioma);
  }
  
  /*Función para mostrar modal para ver en detalle e invoca a la función
   * que carga como corresponda los label, input y campo obligatorio.*/
  function showDetalle(id, nombre_proceso, descripcion,formula,id_categoria,nombre_categoria,borrado_logico) {

  
    rellenaSelectCategoriaPadre(id_categoria,nombre_categoria);
   
    var idioma = getCookie("lang");
    var campos = [
      "input_proceso_id",
      "input_proceso_nombre",
      "input_proceso_descripcion",
      "input_proceso_borrado_logico",
      "input_proceso_formula",
      "select_categoria_insertar_proceso",
      "select_responsable_insertar_categoria",
    ];
    verEnDetalleEstructura();
    cambiarFormulario("detailForm", "javascript:detailEntidad();", "");
    cambiarIcono("images/close2.png", "CERRARMODAL", "iconoCerrar", "Ok");
    rellenarFormulario(id, nombre_proceso, descripcion,formula,id_categoria,borrado_logico);
    deshabilitaCampos(campos);
    $("#formularioAcciones").modal("show");
    setLang(idioma);
  }
  
  function limpiarSelect(){
    const $select = document.querySelector("#select_responsable_insertar_categoria");
    for (let i = $select.options.length; i >= 0; i--) {
      $select.remove(i);
    }

    const $select2 = document.querySelector("#select_categoria_insertar_proceso");
    for (let i = $select2.options.length; i >= 0; i--) {
      $select.remove(i);
    }
    
  }
  /*Función para mostrar modal para editar e invoca a la función que
   * carga como corresponda los label, input y campo obligatorio.*/
  function showEditar(id, nombre_proceso, descripcion,formula,id_categoria,nombre_categoria,borrado_logico) {
    //limpiarSelect();
    
    rellenaSelectCategoriaPadre(id_categoria,nombre_categoria);

    var idioma = getCookie("lang");
    var campos = ["input_proceso_id", "input_proceso_nombre", "input_proceso_borrado_logico"];
    
    editEstructura();
    cambiarFormulario(
      "editForm",
      "javascript:editEntidad();",
      "return comprobarEditProceso();"
    );
    cambiarOnBlurCampos(
      "",
      "return comprobarNombreProceso('input_proceso_nombre', 'errorFormatoNombre', 'nombreProceso')",
      "return comprobarDescripcionProceso('input_proceso_descripcion', 'errorFormatoDescripcion', 'descripcionProceso')",
      "return comprobarFormulaProceso('input_proceso_formula', 'errorFormatoFormulaProceso', 'formulaProceso')",
      "return comprobarSelectCategoriaProceso('select_categoria_insertar_proceso', 'errorFormatoCategoriaProceso', 'categoriaProceso')"
    );
    cambiarIcono("images/edit.png", "ICONO_EDIT", "iconoEditarRol", "Editar");
    rellenarFormulario(id, nombre_proceso, descripcion,formula,id_categoria,borrado_logico);
    deshabilitaCampos(campos);
    $("#formularioAcciones").modal("show");
    setLang(idioma);
  }
  
  /*Función para mostrar modal para eliminar e invoca a la función que
   * carga como corresponda los label, input y campo obligatorio.*/
  function showEliminar(id, nombre_proceso, descripcion,formula,id_categoria,nombre_categoria,borrado_logico) {

    rellenaSelectCategoriaPadre(id_categoria,nombre_categoria);
    

    var idioma = getCookie("lang");
    var campos = [
      "input_proceso_id",
      "input_proceso_nombre",
      "input_proceso_descripcion",
      "input_proceso_borrado_logico",
      "select_categoria_insertar_proceso",
      "input_proceso_formula",
    ];
    deleteEstructura();
    cambiarFormulario("deleteForm", "javascript:deleteEntidad();", "");
    cambiarIcono(
      "images/delete.png",
      "ICONO_ELIMINAR",
      "iconoEliminar",
      "Eliminar"
    );
    rellenarFormulario(id, nombre_proceso, descripcion,formula,id_categoria,borrado_logico);
    deshabilitaCampos(campos);
    $("#formularioAcciones").modal("show");
    setLang(idioma);
  }
  
  /*Función para mostrar modal para reactivar e invoca a la función que
   * carga como corresponda los label, input y campo obligatorio.*/
  function showReactivar(id, nombre_proceso, descripcion,formula,id_categoria,nombre_categoria,borrado_logico) {
    var idioma = getCookie("lang");
    var campos = [
        "input_proceso_id",
        "input_proceso_nombre",
        "input_proceso_descripcion",
        "input_proceso_borrado_logico",
        "select_categoria_insertar_proceso",
        "input_formula",
    ];
    reactivarEstructura();
    cambiarFormulario("reactivarForm", "javascript:reactivarEntidad();", "");
    cambiarIcono(
      "images/reactivar2.png",
      "ICONO_REACTIVAR",
      "iconoReactivar",
      "Reactivar"
    );
    rellenarFormulario(id, nombre_proceso, descripcion,id_padre,dni,nombre,borrado_logico);
    deshabilitaCampos(campos);
    $("#formularioAcciones").modal("show");
    setLang(idioma);
  }
  
  /*Función que crea según las columnas que le pasemos un div con checkbox 
  para marcar y así ocultar las columnas.*/
  function createHideShowColumnsWindow() {
    //class de la tabla
    var arrayColumnas = {
      PROCESO_DESCRIPCION_COLUMN: 2,
      BORRADO_LOGICO_COLUMN: 3,
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
        PROCESO_DESCRIPCION_COLUMN: 2,
      BORRADO_LOGICO_COLUMN: 3,
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
  function rellenarFormulario(id, nombre_proceso, descricion,formula,id_categoria,borrado_logico) {
    
    $("#input_proceso_id").val(id);
    $("#input_proceso_nombre").val(nombre_proceso);
    $("#input_proceso_descripcion").val(descricion);
    $("#input_proceso_borrado_logico").val(borrado_logico);
    $("#input_proceso_formula").val(formula);
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
  function cambiarOnBlurCampos(onBlurId, onBlurNombre, onBlurdescripcion,onBlurFormula,onBlurCategoriaProceso) {
    if (onBlurId != "") {
      $("#input_proceso_id").attr("onblur", onBlurId);
    }
  
    if (onBlurNombre != "") {
      $("#input_proceso_nombre").attr("onblur", onBlurNombre);
    }
  
    if (onBlurdescripcion != "") {
      $("#input_proceso_descripcion").attr("onblur", onBlurdescripcion);
    }    
    if (onBlurFormula != "") {
        $("#input_proceso_formula").attr("onblur", onBlurFormula);
      }
      if (onBlurCategoriaProceso != "") {
        $("#select_categoria_insertar_proceso").attr("onblur", onBlurCategoriaProceso);
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
    addActionControler(document.formularioGenerico, "insertar", "proceso");
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
      "input_proceso_id",
      "input_proceso_nombre",
      "input_proceso_descripcion",
      "input_proceso_borrado_logico",
      "select_categoria_insertar_proceso",
      "input_proceso_formula",
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
    addActionControler(document.formularioGenerico, "buscar", "proceso");
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
      escogeTamanho("proceso")
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
        "input_proceso_id",
        "input_proceso_nombre",
        "input_proceso_descripcion",
        "input_proceso_borrado_logico",
        "select_categoria_insertar_proceso",
        "input_proceso_formula",
    ];
  
    eliminarcampo("empieza");
    eliminarcampo("filaspagina");
  
    setLang(idioma);
    resetearFormulario("formularioGenerico", idElementoList);
    deleteActionController();
    limpiarModalTitulo();
  }
  
  /**Función para cerrar la ventana de detalle de rol*/
  function detailEntidad() {
    $("#formularioAcciones").modal("hide");

    cerrarModal("formularioAcciones", "", "");
  }
  
  /**Función invocadas por los show(Accion) que hacen la petición a back de editar.*/
  function editEntidadAjaxPromesa() {
    var token = getCookie("token");
    addActionControler(document.formularioGenerico, "editar", "proceso");
    habilitaCampos(["input_proceso_id", "input_proceso_nombre", "input_proceso_descripcion","select_categoria_insertar_proceso","input_proceso_formula"]);
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
        "input_proceso_id",
        "input_proceso_nombre",
        "input_proceso_descripcion",
        "input_proceso_borrado_logico",
        "select_categoria_insertar_proceso",
        "input_proceso_formula",
    ];
  
    buscarEntidades(parseInt(getCookie("pestanaActual")));
  
    setLang(idioma);
    resetearFormulario("formularioGenerico", idElementoList);
    deleteActionController();
    limpiarSelect();
    limpiarModalTitulo();
  }
  
  /**Función invocadas por los show(Accion) que hacen la petición a back de eliminar.*/
  function deleteEntidadAjaxPromesa() {
    var token = getCookie("token");
    addActionControler(document.formularioGenerico, "borrar", "proceso");
    habilitaCampos(["input_proceso_id"]);
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
        "input_proceso_id",
        "input_proceso_nombre",
        "input_proceso_descripcion",
        "select_categoria_insertar_proceso",
        "input_proceso_borrado_logico",
        "input_proceso_formula",
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
  
  function rellenaSelectCategoriaPadreInit(accion) {
    var select = $("#select_categoria_insertar_proceso");
  
    select.empty();
    
      var option1 = document.createElement("option");
      option1.setAttribute("value", "");
      option1.setAttribute("label", "-----");
      option1.setAttribute("class", "CATEGORIA_PROCESO");
      option1.setAttribute("selected", "true");
      select.append(option1);
    
      var categoriasArrayCokie="";
    if(accion=="buscar"){
      categoriasArrayCokie = getCookie("categoriasGenerales");
    }else{
      categoriasArrayCokie = getCookie("categorias");
    }
    
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
  function rellenaSelectCategoriaPadre(id_padre,nomre_padre) {
    var select = $("#select_categoria_insertar_proceso");
  
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
        todasCategorias=[];
        res.resource.forEach((element) => {
          if (element.borrado_logico == 0) {

            if(element.tiene_proceso){
              todasCategorias[element.id_categoria] = element.nombre_categoria;
            }
            

            if(!element.tiene_proceso && !element.tiene_hijos){
              categorias[element.id_categoria] = element.nombre_categoria;
            }
          }
        });
        
        setCookie("categorias", categorias);
        setCookie("categoriasGenerales",todasCategorias);
       
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
        "errorFormatoNombreProceso",
        "errorFormatoDescripcionProceso",
      ];
      errores.forEach((element) => {
        eliminarcampoId(element);
      });
      let campos = [
        "input_proceso_id",
        "input_proceso_nombre",
        "input_proceso_descripcion",
        "select_categoria_insertar_proceso",
        "input_proceso_formula",
      ];
      resetearFormulario("formularioGenerico", campos);
    });
  });
  