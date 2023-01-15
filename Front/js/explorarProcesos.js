/*Esta función carga la vista de inicio con los procesos historicos de la huella de carbono del
usuario o si es un administrador o no tiene procesos carga la información por defecto de la página.*/
function explorarProcesos() {
    var rol = getCookie("rolUsuario");
    var idioma = getCookie("lang");
    $("#explorarProcesos").html("");

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
  

  function limpiarErroresModal(){
    $('#errorFormatoNombreProceso').attr("style","display:none");
    $('#errorFormatoCategoriaProceso').attr("style","display:none");

    $('#select_categoria_insertar_proceso').attr("style","width: 260px;");
    $('#input_proceso_nombre').attr("style","");
  }
  function showBuscar(){
    limpiarErroresModal();
    rellenaSelectCategoriaPadreInit();
    $('#formularioAcciones').modal('show');

    cambiarFormulario(
      "searchForm",
      "javascript:searchEntidad();",
      "return comprobarNombreProcesoSearch('input_proceso_nombre', 'errorFormatoNombreProceso', 'nombreProceso')"
    );

    setLang(getCookie("lang"));
  }
  function buscarProceso(){
    
  }

  function construyeTarjetaProceso(proceso){
    
    
    tarjeta =
          '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
            '<div class="card">' +
              '<img src="images/rol.png" class="card-img-top" alt="Noticias">' +
                '<div class="card-body-news">' +
                  '<h4 class="card-title">'+proceso.nombre_proceso+'</h4>' +
                  '<p class="card-text description">'+proceso.descripcion_proceso+'</p>'+
                  '<div class="card-text" style="display: flex;">'+
                  '<p class="CATEGORIA_PROCESO_EXPLAIN"></p>&nbsp;'+
                  '<strong>'+proceso.id_categoria.nombre_categoria+'</strong>'+
                  '</div>';

    proceso.parametros.forEach(parametro => {
        
          //recorrer parametros 
          var unidad=parametro.unidad;
          if(unidad==null){
            unidad="";
          }
          var tarjetaParametro='<div class="" style="">' +
          
          '<label class="card-text" id="label_parmetro'+parametro.id_parametro+'">'+parametro.nombre+'</label>&nbsp;' +
          '<input type="text" maxlength="200" placeholder="'+parametro.unidad+'" name="descripcion_categoria" id="input_'+parametro.nombre+'" class="" onblur="javascript:comprobarParametroNumerico('+"'input_"+parametro.nombre+"',"+"'errorFormatoParametro"+parametro.id_parametro+"','parametroFormula');"+'"'+'/>'+
        '</div> <div id="errorFormatoParametro'+parametro.id_parametro+'" style="display:none"></div>';
        tarjeta=tarjeta+tarjetaParametro;
    });
    
    tarjetaFooter= '</br><p class="card-text description">Total</p>'+"</div>"+'<div class="card-footer">' +
                  '<form name="formCategoria'+proceso.id_proceso+'" id="formCategoria'+proceso.id_proceso+'" action="javascript:calcularProceso('+"'"+proceso.id_proceso+"'"+','+"'"+proceso.nombre_proceso+"'"+')" onsubmit="">'+
                    '<input type="hidden" id="'+proceso.id_proceso+'" name="id" value="'+proceso.id_proceso+'">'+
                    '<button type="submit" name="btnCategorias'+proceso.id_proceso+'"  class="btnCategorias'+proceso.id_proceso+' tooltip3" id="btnCategorias'+proceso.id_proceso+'"">'+
                      '<img class="iconoEntrar iconEntrar" src="images/calcular.png"/>'+
                      '<span class="tooltiptext3 CALCULAR_PROCESO"></span>'+
                    '</button>'+
                  '</form>'+    
                  "</div>" +
                  '<small class="text-muted"></small>' + 
              "</div>"+
              "</div>"+
          "</div>";

    tarjeta=tarjeta+tarjetaFooter;
    return(tarjeta);

  };

  function calcularProceso(id_proceso,nombre_proceso){
    console.log("CALCULO");
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

      if(formulario!=undefined){
        deshabilitaCampos([
          "id_categoria",
        ]);
      }else{  
        crearformoculto("formularioCarga", "");
      }

      await procesosSistemaAjaxPromesa()
        .then((res) => {
  
            for (var i = 0; i < res.resource.length; i++) {
              
              var tr = construyeTarjetaProceso(res.resource[i]);
              $("#explorarProcesos").append(tr);
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
      for (var i = 0; i < res.resource.length; i++) {
        var tr = construyeTarjetaProceso(res.resource[i]);
        $("#explorarProcesos").append(tr);
      }

      $("#formularioAcciones").modal("hide");
    })
    .catch((res) => {
      $("#modal-title").addClass("ERROR_ENTIDAD");
      respuestaKOAjax();
      actualizaMensajesRespuestAjax(res.code);
      setLang(idioma);
    });

  let idElementoList = [
      "input_proceso_nombre",
  ];

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
        
          if(element.tiene_proceso){
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