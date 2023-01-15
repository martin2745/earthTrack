/*Metodos para generar el componente y contruir el array. Necesario para saber el número de páginas.*/
/*Ejemplo de Array 
    [ [ [1, 0,10] , [2,10,10] , [3,20,10] ] ], --> Bloque 1 (número de pagina, empieza, filasPagina)
      [ [4,30,10] , [5,40,10] , [6,50,10] ] ], --> Bloque 2
      [ [7,60,10] ]                            --> Bloque 3
    ]*/

/*Función que ajusta el paginador inicialmente.*/
function ajustarPaginador() {
  setCookie("pintarPaginador", "si"); //Bandera para pintar el paginador, solo se pinta una vez.
  setCookie("pestanaActual", "1"); //Indica en que pestaña estoy.
  setCookie("posActual", "0"); //Indica el bloque de tres páginas en el que estoy. <4|5|6> --> posActual = 1
  setCookie("totalElementos", "0"); //Total de elementos del paginador.
  setCookie("numPosicionesArray", "0"); //Total de grupos de 3 pestañas que tiene el array.
  //[ [ [1, 0,10] , [2,10,10] , [3,20,10] ] ], --> Bloque 1 (número de pagina, empieza, filasPagina)
  //[ [4,30,10] , [5,40,10] , [6,50,10] ] ], --> Bloque 2
  //[ [7,60,10] ]                            --> Bloque 3
  //]                                        --> numPosicionesArray = 3 (arrayPaginacion.length)
}

/*Función que nos devuelve el tamaño de pagina en función de una entidad.*/
function escogeTamanho(entidad) {
  var numFilasPagina = 1;
  switch (entidad) {
    case "rol":
      numFilasPagina = 5;
      break;
    case "funcionalidad":
      numFilasPagina = 5;
      break;
    case "accion":
      numFilasPagina = 5;
      break;
    case "logExcepcionAcciones":
      numFilasPagina = 10;
      break;
    case "logExcepcionAtributos":
      numFilasPagina = 10;
      break;
    case "usuario":
      numFilasPagina = 5;
      break;
    case "categoria":
      numFilasPagina = 5;
      break;
    case "proceso":
      numFilasPagina = 5;
        break;
  }
  return numFilasPagina;
}

function paginador(entidad) {
  setCookie("pintarPaginador", "no");
  setCookie("entidad", entidad);
  crearArrayPaginacion(entidad);
  $("#paginacion").html("");

  var paginacionPrevio =
    '<nav aria-label="Page navigation example">' +
    '<ul class="pagination">' +
    '<li id = "anterior" class="page-item disabled tooltip">' +
    '<a class="page-link" href="#" onclick="cargarPosicionAnterior();" aria-label="Previous">' +
    '<span aria-hidden="true">&laquo;</span>' +
    '<span class="sr-only">Previous</span>' +
    '<span class="tooltiptext ANTERIOR"></span>' +
    "</a>" +
    "</li>";

  var paginas = generarBotonesPaginacion(entidad);

  var paginacionSiguiente =
    '<li id = "siguiente" class="page-item navegacion tooltip">' +
    '<a class="page-link" href="#" onclick="cargarPosicionSiguiente();" aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '<span class="sr-only">Next</span>' +
    '<span class="tooltiptext SIGUIENTE"></span>' +
    "</a>" +
    "</li>" +
    "</ul>" +
    "</nav>";

  var pag = paginacionPrevio + paginas + paginacionSiguiente;

  $("#paginacion").append(pag);

  estadoBotonesPrimerBloque();
}

function paginacionInicial(entidad) {
  arrayPaginas = [];
  elem = [];
  elem.push(1);
  elem.push(0);
  elem.push(escogeTamanho(entidad));
  arrayPaginas.push(elem);
  return arrayPaginas;
}

/*Función que crea los botones 1,2,3*/
function generarBotonesPaginacion() {
  var paginas = "";

  for (var i = 0; i < 3; i++) {
    paginas +=
      '<li id ="' +
      (i + 1) +
      '" class="page-item boton' +
      (i + 1) +
      '" style = "display:block">' +
      '<a class="page-link" href="#" ' +
      'onclick ="buscarEntidades(' +
      (i + 1) +
      "); " +
      "activarPestana(" +
      (i + 1) +
      ');">' +
      (i + 1) +
      "</a></li>";
  }

  return paginas;
}

function buscarEntidades(pag) {
  $(".empieza").remove();
  $(".filaspagina").remove();
  var paginas = [];
  var arrayPaginacion = convertirCookieEnArray();
  arrayPaginacion.forEach((element) => {
    paginas.push(element[0]);
    paginas.push(element[1]);
    paginas.push(element[2]);
  });
  var pagina = paginas[pag - 1];

  obtenerListado(pagina[1]);
}

function activarPestana(id) {
  var elemento = getCookie("pestanaActual");
  $("#" + elemento).removeClass("active");
  $("#" + id).addClass("active");
  setCookie("pestanaActual", id);
}

function estadoBotonesPrimerBloque() {
  activarPestana(1);
  $("#1").addClass("active");

  var arrayPaginacion = convertirCookieEnArray();
  /*Si tengo menos elementos que capacidad tengo en los 3 bloques iniciales oculto los que no hagan falta.*/
  //Oculto botón 1, 2 y 3
  if (arrayPaginacion.length == 0) {
    var elemento = document.getElementsByClassName("page-item boton1");
    var elemento2 = document.getElementsByClassName("page-item boton2");
    var elemento3 = document.getElementsByClassName("page-item boton3");
    elemento[0].style.display = "none";
    elemento2[0].style.display = "none";
    elemento3[0].style.display = "none";
    $("#siguiente").removeClass("navegacion");
    $("#siguiente").addClass("disabled");
    $("#anterior").removeClass("navegacion");
    $("#anterior").addClass("disabled");
  }
  //Oculto botón 2 y 3
  else if (arrayPaginacion[0].length == 1) {
    var elemento = document.getElementsByClassName("page-item boton2");
    var elemento2 = document.getElementsByClassName("page-item boton3");
    elemento[0].style.display = "none";
    elemento2[0].style.display = "none";
  }
  //Oculto botón 3
  else if (arrayPaginacion[0].length == 2) {
    var elemento2 = document.getElementsByClassName("page-item boton3");
    elemento2[0].style.display = "none";
  }

  /*En caso de que tenga en el primero grupo de bloques <1|2|3> menos de 3 bloques o en caso de que
                tenga el bloque <1|2|3> completo pero no haya <4>:
                Deshabilito el botón >*/
  if (arrayPaginacion.length != 0) {
    if (
      arrayPaginacion[0].length < 3 ||
      (arrayPaginacion[0].length == 3 &&
        typeof arrayPaginacion[1] === "undefined")
    ) {
      $("#siguiente").removeClass("navegacion");
      $("#siguiente").addClass("disabled");
    }
  }
}

/*Función encargada de crear el array de paginacion*/
function crearArrayPaginacion(entidad) {
  var totalResults = parseInt(getCookie("totalElementos"));
  setCookie("pintarPaginador", "no");
  var tamanho = escogeTamanho(entidad);
  var numeroPaginas = Math.ceil(totalResults / tamanho);

  var arrayPaginas = [];

  //Bloque entero con tres paginas
  if (numeroPaginas % 3 == 0) {
    recorrer = numeroPaginas;
    arrayPaginas = bloquesTresPaginas(recorrer, arrayPaginas, tamanho);
  } //Bloque entero con tres paginas y bloque no entero
  else if (numeroPaginas > 3) {
    recorrer = numeroPaginas - (numeroPaginas % 3);
    arrayPaginas = bloquesTresPaginas(recorrer, arrayPaginas, tamanho);
    recorrer = numeroPaginas % 3;
    arrayPaginas = bloquesMenosTresPaginas(recorrer, arrayPaginas, tamanho);
  } //Bloque no entero
  else {
    recorrer = numeroPaginas % 3;
    arrayPaginas = bloquesMenosTresPaginas(recorrer, arrayPaginas, tamanho);
  }
  if (arrayPaginas != "") {
    setCookie("paginacion", arrayPaginas);
  } else {
    arrayPaginas = paginacionInicial(entidad);
    setCookie("paginacion", arrayPaginas);
  }
  setCookie("numPosicionesArray", arrayPaginas.length);
}

function bloquesTresPaginas(recorrer, arrayPaginas, tamanho) {
  var numElementos = 0;
  var arrayElementos = [];

  for (var i = 0; i <= recorrer; i++) {
    var elementArray = [i + 1, calculaInicio(i, tamanho), tamanho];
    if (numElementos < 3) {
      arrayElementos.push(elementArray);
      numElementos++;
    } else {
      arrayPaginas.push(arrayElementos);
      arrayElementos = [];
      arrayElementos.push(elementArray);
      numElementos = 1;
    }
  }
  return arrayPaginas;
}

function bloquesMenosTresPaginas(recorrer, arrayPaginas, tamanho) {
  arrayElementos = [];
  var arrayElementos = [];
  var empieza = arrayPaginas.length;
  if (empieza == 0) {
    for (var i = 0; i < recorrer; i++) {
      var elementArray = [i + 1, calculaInicio(i, tamanho), tamanho];
      arrayElementos.push(elementArray);
    }

    arrayPaginas.push(arrayElementos);
  } else {
    empieza = empieza * 3;
    for (var i = 0; i < recorrer; i++) {
      var elementArray = [
        i + 1 + empieza,
        calculaInicio(empieza + i, tamanho),
        tamanho,
      ];
      arrayElementos.push(elementArray);
    }

    arrayPaginas.push(arrayElementos);
  }
  return arrayPaginas;
}

/*Función que convierte la cookie en un array de arrays
                cookie --> 1, 0, 10, 2, 10, 10, 3, 20, 10, 4, 30, 10
                [ [1, 0,10] , [2,10,10] , [3,20,10] ] ], --> Bloque 1 (número de pagina, empieza, filasPagina)
                [ [4,30,10]                              --> Bloque 2
                ]*/
function convertirCookieEnArray() {
  var cookie = getCookie("paginacion").split(",");
  arrayPaginas = [];
  arrayElementos = [];
  elemento = [];

  for (var i = 0; i < cookie.length; i++) {
    elemento.push(cookie[i]);
    if (elemento.length == 3) {
      arrayElementos.push(elemento);
      elemento = [];

      if (arrayElementos.length == 3) {
        arrayPaginas.push(arrayElementos);
        arrayElementos = [];
      }
    }
  }

  if (arrayElementos.length != 0) {
    arrayPaginas.push(arrayElementos);
  }

  return arrayPaginas;
}

/*Función que calcula la posición donde se comienza a buscar en BD para una nueva página.*/
function calculaInicio($empieza, $tamanhoPag) {
  return $empieza * $tamanhoPag;
}

function paginacionAdd() {
  var totalElementos = parseInt(getCookie("totalElementos"));
  //var pestanaActual = parseInt(getCookie('pestanaActual'));
  var tamanho = parseInt(escogeTamanho(getCookie("entidad")));
  //var calculoPestanaUltima = Math.ceil(totalElementos/tamanho);   //13/5 = 2,6 -> 3

  /*Añadir un elemento puede implicar modificaciones en la visión del paginador para el usuario.
        El proceso es el siguiente:*/
  totalElementos++;
  setCookie("totalElementos", totalElementos);
  mensajeFilasTabla();
  var longArrayPaginacion = parseInt(getCookie("numPosicionesArray")) - 1;
  var posActual = parseInt(getCookie("posActual"));

  //35 % 5 = 0. Si añado un elemento son 36. Hay que crear otra pagina.
  //Para 35 elementos <|1|2|3> <4|5|6> <7|8> y se va a mostrar <7|8|9>
  //Como % = 0 hemos rellenado la última pestaña
  if ((totalElementos - 1) % tamanho == 0) {
    //Estoy en el último bloque de 3 paginas y se tiene que crear una nueva página y verlo.
    if (longArrayPaginacion == posActual) {
      actualizarNumerosPaginadorInsertar();
    }
    crearArrayPaginacion(getCookie("entidad")); //Reseteo el array de paginación.
  }
  //Hacer refresh si estoy en la última página para ver los cambios.
  //Compruebo que estoy en el último bloque de paginas.
  //Miro si estoy añadiendo elementos estando viendo la última pestaña.
  /*else if(longArrayPaginacion == posActual &&  calculoPestanaUltima == pestanaActual){
                buscarEntidades(parseInt(getCookie('pestanaActual')));
            }*/
}

/*Función que en caso de ser necesario cambia:
                        En caso de que la última pestaña sea la |1| o |2| habilita la siguiente.
                        Habilita |> en caso de que la última pestaña sea la tercera.*/
function actualizarNumerosPaginadorInsertar() {
  var totalElementos = parseInt(getCookie("totalElementos")) - 1;
  var tamanho = escogeTamanho(getCookie("entidad"));
  var ultimaPestana = Math.ceil(totalElementos / tamanho);
  //var ultimaPestana = pestanasPaginador();
  var num = ultimaPestana % 3;
  //Si hay que añadir una página en este bloque
  if (num != 0) {
    if (num == 1) {
      var elemento = document.getElementsByClassName("page-item boton2")[0];
    } else if (num == 2) {
      var elemento = document.getElementsByClassName("page-item boton3")[0];
    }
    elemento.style.display = "block";
    modificarPestanas(ultimaPestana + 1, ultimaPestana - 3 + 1);
  }
  //Si hay que añadir una pagina en el bloque siguiente y por lo tanto habilitar el botón de siguiente |>
  else {
    /*var elemento = document.getElementsByClassName('page-item boton2')[0];
                                elemento.style.display = "none";
                                elemento = document.getElementsByClassName('page-item boton3')[0];
                                elemento.style.display = "none";*/
    $("#siguiente").removeClass("disabled");
    $("#siguiente").addClass("navegacion");
  }
}

function paginacionDelete(tipoBorrado) {
  //El JSON de la respuesta nos devuelve el tipo de borrado.
  //Puede ser lógico o físico, si es físico es posible que deban producirse cambios en el paginador.
  //Si es lógico solo hay que volver a buscar los elementos para esa pestaña y ver los cambios producidos.
  if (tipoBorrado == "borradoFisico") {
    var totalElementos = parseInt(getCookie("totalElementos"));
    totalElementos--;
    setCookie("totalElementos", totalElementos);
    mensajeFilasTabla();
    var longArrayPaginacion = parseInt(getCookie("numPosicionesArray")) - 1;
    var posActual = parseInt(getCookie("posActual"));
    var tamanho = parseInt(escogeTamanho(getCookie("entidad")));

    var totalElementosAnterior = parseInt(getCookie("totalElementos")) + 1;
    var tamanho = escogeTamanho(getCookie("entidad"));
    var ultimaPestana = Math.ceil(totalElementosAnterior / tamanho);
    var pestanaActual = parseInt(getCookie("pestanaActual"));

    //35 % 5 = 0. Hay que eliminar la última página.
    if (totalElementos % tamanho == 0) {
      //Estamos en el último bloque y tengo que ver los cambios
      if (
        longArrayPaginacion > posActual &&
        ultimaPestana % 3 == 1 &&
        longArrayPaginacion - posActual == 1
      ) {
        $("#siguiente").removeClass("navegacion");
        $("#siguiente").addClass("disabled");
      } else if (
        longArrayPaginacion == posActual &&
        ultimaPestana == pestanaActual
      ) {
        actualizarNumerosPaginadorEliminar();
      } else if (
        longArrayPaginacion == posActual &&
        ultimaPestana != pestanaActual
      ) {
        actualizarNumerosMismoBloquePaginadorEliminar(
          pestanaActual,
          ultimaPestana
        );
      }
      crearArrayPaginacion(getCookie("entidad"));
    }
  }
  //buscarEntidades(parseInt(getCookie('pestanaActual')));
}

function actualizarNumerosMismoBloquePaginadorEliminar(
  pestanaActual,
  ultimaPestana
) {
  if (ultimaPestana - pestanaActual == 1) {
    //por estamos en la pestaña 5 y la última es la 6
    if (pestanaActual % 3 == 2) {
      elemento = document.getElementsByClassName("page-item boton3")[0];
      elemento.style.display = "none";
      modificarPestanas(ultimaPestana - 3, ultimaPestana);
    }
    //por estamos en la pestaña 4 y la última es la 5
    else {
      elemento = document.getElementsByClassName("page-item boton2")[0];
      elemento.style.display = "none";
      modificarPestanas(ultimaPestana - 3, ultimaPestana);
    }
  } else if (ultimaPestana - pestanaActual == 2) {
    //por estamos en la pestaña 4 y la última es la 6
    elemento = document.getElementsByClassName("page-item boton3")[0];
    elemento.style.display = "none";
    modificarPestanas(ultimaPestana - 3, ultimaPestana);
  }
}

function actualizarNumerosPaginadorEliminar() {
  var pestanaActual = parseInt(getCookie("pestanaActual"));

  var totalElementos = parseInt(getCookie("totalElementos")) - 1;
  var tamanho = escogeTamanho(getCookie("entidad"));
  var ultimaPestana = Math.ceil(totalElementos / tamanho);

  varPestanaPenultima = ultimaPestana - 1;

  var num = pestanaActual % 3;
  if (num == 1) {
    //7
    var elemento = document.getElementsByClassName("page-item boton2")[0];
    elemento.style.display = "block";
    elemento = document.getElementsByClassName("page-item boton3")[0];
    elemento.style.display = "block";

    $("#" + pestanaActual).removeClass("active");
    modificarPestanas(pestanaActual - 3, pestanaActual);
    pestanaActual = pestanaActual - 1;
    var posActual = parseInt(getCookie("posActual"));
    posActual--;
    if (posActual == 0) {
      setCookie("posActual", "0");
    } else {
      setCookie("posActual", posActual);
    }
    $("#siguiente").removeClass("navegacion");
    $("#siguiente").addClass("disabled");
    setCookie("pestanaActual", pestanaActual);
    activarPestana(pestanaActual);
  } else if (num == 2) {
    //8
    var elemento = document.getElementsByClassName("page-item boton2")[0];
    $("#" + pestanaActual).removeClass("active");
    modificarPestanas(pestanaActual - 3, pestanaActual);
    elemento.style.display = "none";
    pestanaActual--;
    activarPestana(pestanaActual);
    setCookie("pestanaActual", pestanaActual);
  } else if (num == 0) {
    //9
    var elemento = document.getElementsByClassName("page-item boton3")[0];
    $("#" + pestanaActual).removeClass("active"); //9
    modificarPestanas(pestanaActual - 3, pestanaActual);
    elemento.style.display = "none";
    pestanaActual--; //8
    activarPestana(pestanaActual); //8
    setCookie("pestanaActual", pestanaActual);
  }
}

function modificarPestanas(idsSiguiente, idsAnterior) {
  var onclick =
    "buscarEntidades(" +
    idsSiguiente +
    ");" +
    "activarPestana(" +
    idsSiguiente +
    ");";

  $("#" + idsAnterior + " a").attr("onclick", onclick);
  $("#" + idsAnterior + " a").text(idsSiguiente);
  $("#" + idsAnterior).attr("id", idsSiguiente);
}

/*Función que crear el bloque de paginas anterior al darle al botón <
    Funcionamiento análogo a cargarPosicionSiguiente(), ver debajo.*/
function cargarPosicionAnterior() {
  /*Pongo todo a block porque para atrás siempre van a existir todos*/
  var elemento = document.getElementsByClassName("page-item boton2")[0];
  elemento.style.display = "block";
  var elementoDos = document.getElementsByClassName("page-item boton3")[0];
  elementoDos.style.display = "block";

  var arrayPaginacion = convertirCookieEnArray();
  var posActual = parseInt(getCookie("posActual")); // 1
  var posicionesAnteriores = arrayPaginacion[posActual]; //[4,30,10] , [5,40,10] , [6,50,10]
  var idsAnteriores = [];
  var idsSiguientes = [];
  var iniciosSiguientes = [];
  var tamanhosPaginasSiguientes = [];

  for (var i = 0; i < posicionesAnteriores.length; i++) {
    idsAnteriores.push(posicionesAnteriores[i][0]); //[4,5,6]
  }

  var posicionesActuales = arrayPaginacion[posActual - 1]; //[1,0,10] , [2,10,10] , [3,20,10]

  for (var i = 0; i < posicionesActuales.length; i++) {
    idsSiguientes.push(posicionesActuales[i][0]); //[1,2,3]
    iniciosSiguientes.push(posicionesActuales[i][1]); //[0,10,20]
    tamanhosPaginasSiguientes.push(posicionesActuales[i][2]); //[10,10,10]
  }

  for (var i = 0; i < idsSiguientes.length; i++) {
    $("#" + idsAnteriores[i]).removeClass("active"); //[4]
    var pestanaActual = getCookie("pestanaActual");
    //[1]
    var onclick =
      "buscarEntidades(" +
      idsSiguientes[i] +
      ");" +
      "activarPestana(" +
      idsSiguientes[i] +
      ");";
    $("#" + idsAnteriores[i] + " a").attr("onclick", onclick);
    //[4] Metemos un nuevo onclick

    //Cambiamos textos e ids
    $("#" + idsAnteriores[i] + " a").text(idsSiguientes[i]); //Cambiamos texto por -> 1
    $("#" + idsAnteriores[i]).attr("id", idsSiguientes[i]); //Cambiamos id -> 4 por -> 1

    if (idsSiguientes.includes(pestanaActual)) {
      $("#" + pestanaActual).addClass("active");
    }
  }

  posicionActual = parseInt(getCookie("posActual"));
  posicionActual--;
  setCookie("posActual", posicionActual.toString());

  var actual = parseInt(getCookie("posActual"));
  var posArray = parseInt(getCookie("numPosicionesArray"));

  //Al final de todo
  if (posArray - 1 == actual) {
    $("#siguiente").removeClass("navegacion");
    $("#siguiente").addClass("disabled");
    $("#anterior").removeClass("disabled");
    $("#anterior").addClass("navegacion");
  }
  //Al principio de todo
  else if (actual == 0) {
    $("#anterior").removeClass("navegacion");
    $("#anterior").addClass("disabled");
    $("#siguiente").addClass("navegacion");
    $("#siguiente").removeClass("disabled");
  }
  //Estamos en un bloque de tres paginas del medio
  else if (actual != posArray - 1) {
    $("#siguiente").addClass("navegacion");
    $("#siguiente").removeClass("disabled");
    $("#anterior").removeClass("disabled");
    $("#anterior").addClass("navegacion");
  }
  //var activo = parseInt(getCookie('active'));
  //$('#' + activo).addClass('active')
}

/*Función que crear el bloque de paginas siguiente al darle al botón >*/
function cargarPosicionSiguiente() {
  var arrayPaginacion = convertirCookieEnArray();
  var posicionActual = parseInt(getCookie("posActual")); //0
  var posicionesAnteriores = arrayPaginacion[posicionActual]; //[1,0,10] , [2,10,10] , [3,20,10]
  var idsAnteriores = [];
  var idsSiguientes = [];
  var iniciosSiguientes = [];
  var tamanhosPaginasSiguientes = [];

  //Capturamos los ids del bloque de paginas anterior. Si queremos cargar <4|5|6> cogemos 1,2,3
  for (var i = 0; i < posicionesAnteriores.length; i++) {
    idsAnteriores.push(posicionesAnteriores[i][0]); //[1,2,3]
  }

  /*Capturamos el bloque de paginas al que queremos pasar.*/
  var posicionesActuales = arrayPaginacion[posicionActual + 1]; //[4,30,10] , [5,40,10] , [6,50,10]

  /*Para cada posición del bloque de páginas al que quiero pasar recogo el id, inicio y tamaño de pagina.*/
  for (var i = 0; i < posicionesActuales.length; i++) {
    idsSiguientes.push(posicionesActuales[i][0]); //[4,5,6]
    iniciosSiguientes.push(posicionesActuales[i][1]); //[30,40,50]
    tamanhosPaginasSiguientes.push(posicionesActuales[i][2]); //[10,10,10]
  }

  /*Genero un nuevo atributo onClick para los botones.*/
  for (var i = 0; i < idsSiguientes.length; i++) {
    $("#" + idsAnteriores[i]).removeClass("active"); //[1]
    var pestanaActual = getCookie("pestanaActual");
    //[4]
    var onclick =
      "buscarEntidades(" +
      idsSiguientes[i] +
      ");" +
      "activarPestana(" +
      idsSiguientes[i] +
      ");";

    $("#" + idsAnteriores[i] + " a").attr("onclick", onclick);
    //[1] Metemos un nuevo onclick
    //Cambiamos textos e ids
    $("#" + idsAnteriores[i] + " a").text(idsSiguientes[i]); //Cambiamos texto por -> 4
    $("#" + idsAnteriores[i]).attr("id", idsSiguientes[i]); //Cambiamos id -> 1 por -> 4

    if (idsSiguientes.includes(pestanaActual)) {
      $("#" + pestanaActual).addClass("active");
    }
  }

  ocultarBloques(idsSiguientes.length);

  posicionActual++;
  setCookie("posActual", posicionActual.toString());

  var posArray = parseInt(getCookie("numPosicionesArray"));
  //Al final de todo
  if (posArray - 1 == posicionActual) {
    $("#siguiente").removeClass("navegacion");
    $("#siguiente").addClass("disabled");
    $("#anterior").removeClass("disabled");
    $("#anterior").addClass("navegacion");
  }
  //Al principio de todo
  else if (posicionActual == 0) {
    $("#siguiente").removeClass("disabled");
    $("#siguiente").addClass("navegacion");
    $("#anterior").removeClass("navegacion");
    $("#anterior").addClass("disabled");
  }
  //Estamos en un bloque de tres paginas del medio
  else if (posicionActual != posArray - 1) {
    //FALTA ALGO
    $("#siguiente").removeClass("disabled");
    $("#siguiente").addClass("navegacion");
    $("#anterior").removeClass("disabled");
    $("#anterior").addClass("navegacion");
  }
  //var activo = parseInt(getCookie('active'));
  //$('#' + activo).addClass('active');
}

/*Función que oculta bloques en función de las pestañas que haya que mostrar en un bloque de páginas.
            En un bloque que haya que mostrar:
                <4|5> Oculta el |3> del bloque <1|2|3>*/
function ocultarBloques(numeroIdCrear) {
  if (numeroIdCrear == 1) {
    var elemento = document.getElementsByClassName("page-item boton2");
    var elemento2 = document.getElementsByClassName("page-item boton3");
    elemento[0].style.display = "none";
    elemento2[0].style.display = "none";
  } else if (numeroIdCrear == 2) {
    var elemento = document.getElementsByClassName("page-item boton3");
    elemento[0].style.display = "none";
  }
}

/*Función que muestra el mensaje de filas en una tabla*/
function mensajeFilasTabla() {
  var total = parseInt(getCookie("totalElementos"));
  var pestanaActual = getCookie("pestanaActual");
  var tamanho = escogeTamanho(getCookie("entidad"));
  var pestanaEdicion = Math.ceil(total / tamanho);
  if (pestanaActual == "undefined" || total == 0 || isNaN(total)) {
    var mensaje = "0 - 0 total 0";
    document.getElementById("contadorPaginas").innerText = mensaje;
  } else if (pestanaEdicion < parseInt(pestanaActual)) {
    var mensaje = "0 - 0 total " + total;
    document.getElementById("contadorPaginas").innerText = mensaje;
    //Este caso se produce cuando hacemos una edición sobre el campo
    //de busqueda del último elemento de la página.
  } else {
    var totalElementos = parseInt(getCookie("totalElementos"));
    var ultimaPestana = Math.ceil(totalElementos / tamanho);

    var tamanhoPag = escogeTamanho(getCookie("entidad"));
    totalElementos = parseInt(getCookie("totalElementos"));
    var x = (pestanaActual - 1) * tamanhoPag + 1;

    if (pestanaActual == ultimaPestana) {
      var y = totalElementos;
    } else {
      var y = pestanaActual * tamanho;
    }

    var mensaje = x + " - " + y + " total " + total;
    document.getElementById("contadorPaginas").innerText = mensaje;
  }
}

/*Función que devuelve el total de paginas que tiene el paginador*/
function pestanasPaginador() {
  var totalElementos = parseInt(getCookie("totalElementos"));
  var tamanho = escogeTamanho(getCookie("entidad"));
  var numeroPaginas = Math.ceil(totalElementos / tamanho);
  return numeroPaginas;
}
