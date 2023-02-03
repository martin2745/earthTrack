/*Esta función carga la vista de inicio con los procesos historicos de la huella de carbono del
usuario o si es un administrador o no tiene procesos carga la información por defecto de la página.*/
function explorarProcesos() {
  var rol = getCookie("rolUsuario");
  var idioma = getCookie("lang");
  $("#explorarProcesos").html("");

  cargarProcesosCalculados();
  categoriasSistema();
  procesosSistema();

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

function limpiarErroresModal() {
  $("#errorFormatoNombreProceso").attr("style", "display:none");
  $("#errorFormatoCategoriaProceso").attr("style", "display:none");

  $("#select_categoria_insertar_proceso").attr("style", "width: 260px;");
  $("#input_proceso_nombre").attr("style", "");
}
function showBuscar() {
  limpiarErroresModal();
  rellenaSelectCategoriaPadreInit();
  $("#formularioAcciones").modal("show");

  cambiarFormulario(
    "searchForm",
    "javascript:searchEntidad();",
    "return comprobarNombreProcesoSearch('input_proceso_nombre', 'errorFormatoNombreProceso', 'nombreProceso')"
  );

  setLang(getCookie("lang"));
}
function buscarProceso() {}

function construyeTarjetaProceso(proceso) {
  var usuario = getCookie("usuarioSistema");

  var nombre_formulario = "formCategoria" + proceso.id_proceso;
  tarjeta =
    '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
    '<div class="card">' +
    '<form name="formCategoria' +
    proceso.id_proceso +
    '" id="formCategoria' +
    proceso.id_proceso +
    '" action="javascript:if(comprobarParametros(' +
    "'" +
    proceso.id_proceso +
    "'" +
    ")){guardarProceso(" +
    "'" +
    nombre_formulario +
    "'" +
    ')}" onsubmit="">' +
    '<img src="images/rol.png" class="card-img-top" alt="Noticias">' +
    '<div class="card-body-news">' +
    '<h4 class="card-title">' +
    proceso.nombre_proceso +
    "</h4>" +
    '<p class="card-text description">' +
    proceso.descripcion_proceso +
    "</p>" +
    '<div class="card-text" style="display: flex;">' +
    '<p class="CATEGORIA_PROCESO_EXPLAIN"></p>&nbsp;' +
    "<strong>" +
    proceso.id_categoria.nombre_categoria +
    "</strong>" +
    "</div>";

  parametrosId = [];
  proceso.parametros.forEach((parametro) => {
    //recorrer parametros
    var unidad = parametro.unidad;
    if (unidad == null) {
      unidad = "";
    }
    parametrosId.push(parametro.id_parametro);
    var tarjetaParametro =
      '<div class="" style="">' +
      '<label class="card-text" id="label_parmetro' +
      parametro.id_parametro +
      '">' +
      parametro.nombre +
      "</label>&nbsp;" +
      '<input type="text" maxlength="200" placeholder="' +
      parametro.unidad +
      '" name="" id="input_' +
      parametro.id_parametro +
      '" class="" onblur="javascript:if(comprobarParametroNumerico(' +
      "'input_" +
      parametro.id_parametro +
      "'," +
      "'errorFormatoParametro" +
      parametro.id_parametro +
      "','parametroFormula')){calcularProceso(" +
      "'" +
      proceso.formula +
      "'," +
      "'" +
      proceso.id_proceso +
      "')}else{resetTotal(" +
      "'" +
      proceso.id_proceso +
      "')}" +
      '"' +
      "/>" +
      '</div> <div id="errorFormatoParametro' +
      parametro.id_parametro +
      '" style="display:none"></div>';
    tarjeta = tarjeta + tarjetaParametro;
  });
  setCookie(proceso.id_proceso, parametrosId.toString());

  tarjetaFooter =
    '</br><p class="card-text description" id="label_total_formula' +
    proceso.id_proceso +
    '">Total</p>' +
    "</div>" +
    '<div class="card-footer">' +
    //  '<form name="formCategoria'+proceso.id_proceso+'" id="formCategoria'+proceso.id_proceso+'" action="javascript:calcularProceso('+"'"+nombre_formulario+"'"+')" onsubmit="">'+
    '<input type="hidden" id="' +
    proceso.id_proceso +
    '" name="id_proceso" value="' +
    proceso.id_proceso +
    '">' +
    '<input type="hidden" id="valor_parametros_' +
    proceso.id_proceso +
    '" name="parametros" value="">' +
    '<input type="hidden" id="usuario_' +
    proceso.id_proceso +
    '" name="usuario" value="' +
    usuario +
    '">' +
    '<button type="submit" name="btnCategorias' +
    proceso.id_proceso +
    '"  class="btnCategorias' +
    proceso.id_proceso +
    ' tooltip3" id="btnCategorias' +
    proceso.id_proceso +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/calcular.png"/>' +
    '<span class="tooltiptext3 CALCULAR_PROCESO"></span>' +
    "</button>" +
    //  '</form>'+
    "</div>" +
    '<small class="text-muted"></small>' +
    "</div>" +
    "</form>" +
    "</div>" +
    "</div>";

  tarjeta = tarjeta + tarjetaFooter;
  return tarjeta;
}
function resetTotal(id_proceso) {
  $("#label_total_formula" + id_proceso).text("Total");
  $("#valor_parametros_" + id_proceso).val("");
}

function comprobarParametros(id_proceso) {
  parametros = getCookie(id_proceso);
  parametros = parametros.split(",");

  var toret = true;

  parametros.forEach((element) => {
    toret = comprobarParametroNumerico(
      "input_" + element,
      "errorFormatoParametro" + element,
      "parametroFormula"
    );
  });

  return toret;
}

function calcularProceso(formula, id_proceso) {
  parametros = getCookie(id_proceso);
  parametros = parametros.split(",");
  valores = [];

  parametros.forEach((element) => {
    valor = $("#input_" + element).val();
    if (valor == "") {
      valor = "0";
    }
    valores.push(valor);
  });

  caracteres = formula.split("");

  $("#valor_parametros_" + id_proceso).val(valores.toString());

  formulaProcesada = formula;
  dentroDeParametro = false;
  var cadenaAReemplazar = "";
  caracteres.forEach((element) => {
    if (dentroDeParametro) {
      cadenaAReemplazar = cadenaAReemplazar + element;
      if (element == "}") {
        dentroDeParametro = false;
        formulaProcesada = formulaProcesada.replace(
          cadenaAReemplazar,
          valores.shift()
        );
        cadenaAReemplazar = "";
      }
    }
    if (element == "{") {
      dentroDeParametro = true;
      cadenaAReemplazar = cadenaAReemplazar + element;
    }
  });

  //FIX ^ operator
  formulaProcesada = formulaProcesada.replace("^", "**");

  var total = eval(formulaProcesada).toFixed(2);

  if (Number.POSITIVE_INFINITY != total && Number.NEGATIVE_INFINITY != total) {
    $("#label_total_formula" + id_proceso).text(total);
  }
}

function guardarProceso(nombre_formulario) {
  addEntidad(nombre_formulario);
}
function rellenaSelectCategoriaPadreInit() {
  var select = $("#select_categoria_insertar_proceso");

  select.empty();

  var option1 = document.createElement("option");
  option1.setAttribute("value", "");
  option1.setAttribute("label", "-----");
  option1.setAttribute("class", "CATEGORIA_PROCESO");
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

//PETICION PARA ALMACENAR EN UNA COOKIE CATEGORIAS TODAS LAS CATEGORIAS PARA SER PADRE
async function procesosSistema() {
  var idioma = getCookie("lang");

  var formulario = document.getElementById("formularioCarga");

  if (formulario != undefined) {
    deshabilitaCampos(["id_categoria"]);
  } else {
    crearformoculto("formularioCarga", "");
  }

  await procesosSistemaAjaxPromesa()
    .then((res) => {
      procesosYaCalculados = getCookie("procesosCalculados");
      procesosYaCalculados = procesosYaCalculados.split(",");
      for (var i = 0; i < res.resource.length; i++) {
        if (!procesosYaCalculados.includes(res.resource[i].id_proceso)) {
          var tr = construyeTarjetaProceso(res.resource[i]);
          $("#explorarProcesos").append(tr);
        }
      }

      setLang(getCookie("lang"));
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });
  deleteActionController();
}

function procesosSistemaAjaxPromesa() {
  var token = getCookie("token");
  var idioma = getCookie("lang");
  addActionControler(document.formularioCarga, "buscar", "proceso");

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
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

async function searchEntidad() {
  var idioma = getCookie("lang");

  await searchEntidadAjaxPromesa()
    .then((res) => {
      $("#formularioAcciones").attr("style", "display: none");

      $("#explorarProcesos").html("");
      procesosYaCalculados = getCookie("procesosCalculados");
      procesosYaCalculados = procesosYaCalculados.split(",");
      for (var i = 0; i < res.resource.length; i++) {
        if (!procesosYaCalculados.includes(res.resource[i].id_proceso)) {
          var tr = construyeTarjetaProceso(res.resource[i]);
          $("#explorarProcesos").append(tr);
        }
      }

      $("#formularioAcciones").modal("hide");
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });

  let idElementoList = ["input_proceso_nombre"];

  setLang(idioma);
  resetearFormulario("formularioGenerico", idElementoList);
  deleteActionController();
  //limpiarModalTitulo();
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
        if (element.borrado_logico == 0) {
          if (element.tiene_proceso) {
            categorias[element.id_categoria] = element.nombre_categoria;
          }
        }
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

function addEntidadAjaxPromesa(nombre_formulario) {
  var token = getCookie("token");
  var formulario1 = document.forms[nombre_formulario];
  addActionControler(formulario1, "insertar", "proceso_usuario");
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#" + nombre_formulario).serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "PROCESO_USUARIO_INSERTAR_OK") {
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

async function addEntidad(nombre_formulario) {
  var idioma = getCookie("lang");
  await addEntidadAjaxPromesa(nombre_formulario)
    .then((res) => {
      $("#modal-title").addClass("INSERTAR_ENTIDAD");
      respuestaOKAjax();
      actualizaMensajesRespuestAjax(res.code);
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });
  let idElementoList = [];

  setLang(idioma);
  resetearFormulario(nombre_formulario, idElementoList);
  deleteActionController();
  explorarProcesos();
  //usuariosNoResponsablesSistema();
}

async function cargarProcesosCalculados() {
  var idioma = getCookie("lang");

  var formulario = document.getElementById("formCargaProcesos");

  if (formulario != undefined) {
    $("#usuarioSistema").val("");
  } else {
    crearformoculto("formCargaProcesos", "");
  }

  //document.getElementById('formularioCarga').reset();
  insertacampo(
    document.formCargaProcesos,
    "usuario",
    getCookie("usuarioSistema")
  );

  await cargarProcesosCalculadosAjaxPromesa()
    .then((res) => {
      var ids = [];
      res.resource.forEach((element) => {
        ids.push(element.id_proceso.id_proceso);
      });

      setCookie("procesosCalculados", ids.toString());
      setLang(getCookie("lang"));
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });
  deleteActionController();
}
function cargarProcesosCalculadosAjaxPromesa() {
  var token = getCookie("token");
  var idioma = getCookie("lang");
  addActionControler(document.formCargaProcesos, "buscar", "proceso_usuario");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO", idioma);
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formCargaProcesos").serialize(),
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
