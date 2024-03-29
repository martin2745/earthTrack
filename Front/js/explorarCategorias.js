/*Esta función carga la vista de inicio con los procesos historicos de la huella de carbono del
usuario o si es un administrador o no tiene procesos carga la información por defecto de la página.*/
function explorarCategorias() {
  var rol = getCookie("rolUsuario");
  var idioma = getCookie("lang");
  cargarProcesosCalculados();
  $("#explorarCategorias").html("");

  var categoria_padre = { id: "1", id_padre: "1" };

  if (
    !$.isEmptyObject(getCookie("id_padre_actual")) &&
    getCookie("id_padre_actual") !== "1"
  ) {
    categoria_padre.id = getCookie("id_padre_actual");
    $("#btnBackFather").attr("style", "display: inline");
  } else {
    setCookie("id_padre_actual", "1");
    var arrayPadresPervios = ["1"];
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

//funcion para actualizar el titulo de la pagina
function actualizarTitulo(accion) {
  //$("#bienvenida").val(nombre_categoria);
  if (accion == "categoria") {
    $("#bienvenida").attr("class", "bienvenida EXPLORAR_CATEGORIA");
  } else {
    $("#bienvenida").attr("class", "bienvenida CALCULAR_PROCESO");
  }
}

//funcion para navegar hacia atrás en el arbol
function volverAnteriorPadre() {
  actualizarTitulo("categoria");
  var arrayPadresPervios = JSON.parse(getCookie("id_padre_previo"));
  var id_padre_previo = arrayPadresPervios.pop();

  setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));

  setCookie("id_padre_actual", id_padre_previo);
  explorarCategorias();
}
function construyeTarjetaCategoria(categoria) {
  tarjeta =
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
    '<p class="card-text ">' +
    categoria.usuario.email +
    "</p>" +
    "</div>" +
    '<div class="card-footer">';

  var icono = "";
  if (categoria.tiene_proceso) {
    icono =
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
      categoria.nombre_categoria +
      "'" +
      "," +
      "'" +
      categoria.id_padre.id_categoria +
      "'" +
      "," +
      "'" +
      categoria.tiene_proceso +
      "'" +
      ')" onsubmit="">' +
      '<input type="hidden" id="' +
      categoria.id_categoria +
      '" name="id" value="' +
      categoria.id_categoria +
      '">' +
      '<button type="submit" name="btnCategorias' +
      categoria.id_categoria +
      '"  class="btnCategorias' +
      categoria.id_categoria +
      ' tooltip3" id="btnCategorias' +
      categoria.id_categoria +
      '"">' +
      '<img class="iconoEntrar iconEntrar" src="images/rol.png"/>' +
      '<span class="tooltiptext3 ICONO_NAVEGAR_PROCESO"></span>' +
      "</button>" +
      "</form>";
  } else if (categoria.tiene_hijos) {
    icono =
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
      categoria.nombre_categoria +
      "'" +
      "," +
      "'" +
      categoria.id_padre.id_categoria +
      "'" +
      "," +
      "'" +
      categoria.tiene_proceso +
      "'" +
      ')" onsubmit="">' +
      '<input type="hidden" id="' +
      categoria.id_categoria +
      '" name="id" value="' +
      categoria.id_categoria +
      '">' +
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
  }

  var tarjetaFooter =
    "</div>" +
    '<small class="text-muted"></small>' +
    "</div>" +
    "</div>" +
    "</div>";

  tarjeta = tarjeta + icono + tarjetaFooter;

  return tarjeta;
}

function construyeTarjetaProceso(proceso) {
  var usuario = getCookie("usuarioSistema");

  tarjeta =
    '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
    '<div class="card">' +
    '<form name="formProceso" id="formProceso" action="javascript:if(comprobarParametros()){addParametrosProceso()}" onsubmit="">' +
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
      "'" +
      ")}else{resetTotal()}" +
      '"' +
      "/>" +
      '</div> <div id="errorFormatoParametro' +
      parametro.id_parametro +
      '" style="display:none"></div>';
    tarjeta = tarjeta + tarjetaParametro;
  });

  setCookie("parametros", parametrosId.toString());

  tarjetaFooter =
    '</br><p class="card-text description" id="label_total_formula">Total</p>' +
    "</div>" +
    '<div class="card-footer">' +
    //  '<form name="formCategoria'+proceso.id_proceso+'" id="formCategoria'+proceso.id_proceso+'" action="javascript:calcularProceso('+"'"+nombre_formulario+"'"+')" onsubmit="">'+
    '<input type="hidden" id="' +
    proceso.id_proceso +
    '" name="id_proceso" value="' +
    proceso.id_proceso +
    '">' +
    '<input type="hidden" id="valor_parametros" name="parametros" value="">' +
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

function construyeTarjetaProcesoYaCalculado(proceso) {
  var usuario = getCookie("usuarioSistema");

  tarjeta =
    '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
    '<div class="card">' +
    '<form name="formProceso" id="formProceso" action="javascript:navegarMisProcesos()" onsubmit="">' +
    '<img src="images/rol.png" class="card-img-top" alt="Noticias">' +
    '<div class="card-body-news">' +
    '<h4 class="card-title">' +
    proceso.nombre_proceso +
    "</h4>" +
    '<p class="card-text description PROCESO_CALCULADO">' +
    proceso.descripcion_proceso +
    "</p>" +
    '<div class="card-text" style="display: flex;">' +
    "</div>";

  tarjetaFooter =
    "</div>" +
    '<div class="card-footer">' +
    '<button type="submit" name="btnCategorias' +
    proceso.id_proceso +
    '"  class="btnCategorias' +
    proceso.id_proceso +
    ' tooltip3" onClick="" id="btnCategorias' +
    proceso.id_proceso +
    '"">' +
    '<img class="iconoEntrar iconEntrar" src="images/enterLogin.png"/>' +
    '<span class="tooltiptext3 NAVEGAR_MIS_PROCESOS"></span>' +
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

function navegarMisProcesos() {
  window.location.href = "misProcesos.html";
}
function resetTotal() {
  $("#label_total_formula").text("Total");
  $("#valor_parametros").val("");
}

function comprobarParametros() {
  parametros = getCookie("parametros");
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
function calcularProceso(formula) {
  parametros = getCookie("parametros");
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

  $("#valor_parametros").val(valores.toString());
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
    $("#label_total_formula").text(total);
  }
}

function actualizarPaginaConNuevasCategorias(
  id,
  nombre,
  id_padre,
  tiene_proceso
) {
  setCookie("id_padre_actual", id);

  var arrayPadresPervios = JSON.parse(getCookie("id_padre_previo"));
  arrayPadresPervios.push(id_padre);
  setCookie("id_padre_previo", JSON.stringify(arrayPadresPervios));

  //CONDICION IF TIENE HIJOS O TIENE PROCESO

  if (tiene_proceso == "false") {
    actualizarTitulo("categoria");
    //lamada a función que ejecute consulta
    explorarCategorias();
  } else {
    actualizarTitulo("proceso");
    $("#explorarCategorias").html("");
    buscarProceso(id);
  }
}

async function buscarProceso(id_categoria) {
  var idioma = getCookie("lang");

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
      procesosCalculados = getCookie("procesosCalculados");
      procesosCalculados = procesosCalculados.split(",");
      for (var i = 0; i < res.resource.length; i++) {
        if (!procesosCalculados.includes(res.resource[i].id_proceso)) {
          var tr = construyeTarjetaProceso(res.resource[i]);
        } else {
          var tr = construyeTarjetaProcesoYaCalculado(res.resource[i]);
        }

        $("#explorarCategorias").append(tr);
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

//PETICION PARA ALMACENAR EN UNA COOKIE CATEGORIAS TODAS LAS CATEGORIAS PARA SER PADRE
async function categoriasSistema(id_categoria) {
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
          $("#explorarCategorias").append(tr);
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

function addParametrosProcesoAjaxPromesa() {
  var token = getCookie("token");
  var formulario1 = document.forms["formProceso"];
  addActionControler(formulario1, "insertar", "proceso_usuario");
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formProceso").serialize(),
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

async function addParametrosProceso() {
  var idioma = getCookie("lang");
  await addParametrosProcesoAjaxPromesa()
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
  let idElementoList = ["valor_parametros"];
  setLang(idioma);
  resetearFormulario("formProceso", idElementoList);
  deleteActionController();
  volverAnteriorPadre();
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
        ids.push(element.id_proceso);
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
  addActionControler(
    document.formCargaProcesos,
    "devolverProcesos",
    "proceso_usuario"
  );

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
          if (
            res.code != "PROCESO_USUARIO_DEVOLVER_PROCESOS_OK" &&
            res.code != "RECORDSET_DATOS" &&
            res.code != "RECORDSET_VACIO"
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
