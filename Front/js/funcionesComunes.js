/**Función para cambiar las banderas de idiomas*/
function cargarIdioma(idioma) {
  if (idioma == "spanish") {
    document.getElementById("imagenIdioma").src = "images/Spain.png";
    setCookie("lang", "ES");
    setLang("ES");
  } else if (idioma == "english") {
    document.getElementById("imagenIdioma").src = "images/United-Kingdom.png";
    setCookie("lang", "EN");
    setLang("EN");
  } else if (idioma == "galego") {
    document.getElementById("imagenIdioma").src = "images/Galicia.png";
    setCookie("lang", "GA");
    setLang("GA");
  }
}

/**Función para incluir el footer*/
function includeFooter() {
  $("#footer").html("");

  var footer =
    '<footer class="fixed-bottom page-footer font-small footer">' +
    '<div class="footer-copyright text-center py-3">© 2022 Copyright:' +
    '<a href="#"> PDP: fullStacks</a>' +
    "</div>" +
    "</footer>";

  $("#footer").append(footer);
}

/**Función para incluir el menú superior*/
function includeTopMenu() {
  $("#topMenu").html("");

  var topMenu =
    '<nav class="fixed-top navbar navbar-expand-md navbar-dark menuIdioma">' +
    '<a class="navbar-brand" href="#">' +
    '<img src="images/iconoIndex2.png" alt="Logo" class="imagenLogo">' +
    "</a>" +
    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">' +
    '<span class="navbar-toggler-icon"></span>' +
    "</button>" +
    '<div class="collapse navbar-collapse" id="collapsibleNavbar">' +
    '<ul class="navbar-nav">' +
    '<li class="nav-item dropdown">' +
    '<a class="nav-link dropdown-toggle" href="#" id="navbardrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '<img class="nav-link dropdown-toggle" id="imagenIdioma" src=""/>' +
    "</a>" +
    '<div class="dropdown-menu" aria-labelledby="navbarDropdown">' +
    '<a class="dropdown-item" href="#" onclick="cargarIdioma(\'spanish\');">' +
    '<input type="submit" name="btnEspanol" id="btnEspanol" value="" onclick="cargarIdioma(\'spanish\');" />' +
    "</a>" +
    '<div class="dropdown-divider"></div>' +
    '<a class="dropdown-item" href="#" onclick="cargarIdioma(\'english\');">' +
    '<input type="submit" name="btnIngles" id="btnIngles" value="" onclick="cargarIdioma(\'english\');" />' +
    "</a>" +
    '<div class="dropdown-divider"></div>' +
    '<a class="dropdown-item" href="#" onclick="cargarIdioma(\'galego\');">' +
    '<input type="submit" name="btnGallego" id="btnGallego" value="" onclick="cargarIdioma(\'galego\');" />' +
    "</a>" +
    "</div>" +
    "</li>" +
    '<li class="nav-item dropdown">' +
    '<a class="nav-link dropdown-toggle" href="#" id="navbardrop3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '<img id="imagenHome" src="images/home.png"/>' +
    '<div class="home MENU">Menú</div>' +
    "</a>" +
    '<div class="dropdown-menu" id="listadoFuncionalidades">' +
    "</div>" +
    "</li>" +
    '<li class="nav-item dropdown">' +
    '<a class="nav-link dropdown-toggle" href="#" id="navbardrop2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '<img id="imagenUsuario" src="images/usuario.png"/>' +
    '<div class="usuarioConectado">' +
    getCookie("usuarioSistema") +
    "</div>" +
    "</a>" +
    '<div class="dropdown-menu">' +
    '<a class="dropdown-item CAMBIAR_CONTRASEÑA_MENU" href="#" data-toggle="modal" data-target="#changePass-modal" onclik="javascript:modalCambioPass()">Cambiar Contraseña</a>' +
    '<div class="dropdown-divider"></div>' +
    '<a class="dropdown-item DESCONECTAR" href="index.html" onclick="javascript:desconectar()">Desconectar</a>' +
    "</div>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</nav>";

  $("#topMenu").append(topMenu);

  setLang(getCookie("lang"));
}

/**Función ajax con promesas*/
function rolUsuarioAjaxPromesa() {
  var token = getCookie("token");

  addActionControler(document.formularioRolUsuario, "buscar", "usuario");

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioRolUsuario").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != "RECORDSET_DATOS") {
            reject(res);
          }
          resolve(res);
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });

      deleteActionController();
    });
  }
}

async function rolUsuario() {
  var idioma = getCookie("lang");
  crearformoculto("formularioRolUsuario", "javascript:rolUsuario()");
  insertacampo(
    document.formularioRolUsuario,
    "usuario",
    getCookie("usuarioSistema")
  );

  await rolUsuarioAjaxPromesa()
    .then((res) => {
      setCookie("rolUsuario", res.resource[0].id_rol.nombre_rol);
    })
    .catch((res) => {
      errorAccion(res.code);
      setLang(idioma);
    });
  deleteActionController();
}

/**Función que genera la modal para que el usuario pueda cambiar su contraseña*/
function modalCambioPass() {
  $("#changePass-modal").html("");

  var contenidoModal =
    '<div class="modal-dialog">' +
    '<div class="changePassmodal-container">' +
    '<h1 class="CAMBIAR_CONTRASEÑA"></h1><br>' +
    '<form name="formularioChangePass" id="formularioChangePass" action="javascript:changePass()" onsubmit="return comprobarChangePass()">' +
    '<input type="password" name="contrasena" class="PASS_USUARIO_NUEVA" maxlength="45" size="45" id="passChangePass1" placeholder="Usuario" placeholder="Contraseña" onKeyPress="capLock(event,\'bloqueoMayusculasChangePass\');" onblur="return comprobarPass(\'passChangePass1\', \'errorFormatoChangePass1\', \'passwordChange\')"; autocomplete="new-password">' +
    '<div style="display:none" id="errorFormatoChangePass1"></div>' +
    '<input type="password" name="contrasenaConfirm" class="CONFIRMAR_PASS_USUARIO" id="passChangePass2" maxlength="45" size="45" placeholder="Contraseña" onKeyPress="capLock(event,\'bloqueoMayusculasChangePass\');" onblur="return comprobarPassConfirmChangePass(\'passChangePass2\', \'errorFormatoChangePass2\', \'passwordChange\')" autocomplete="new-password">' +
    '<div style="display:none" class="BLOQUEO_MAYUSCULAS alert alert-warning" id="bloqueoMayusculasChangePass"></div>' +
    '<div style="display:none" id="errorFormatoChangePass2" class="alert alert-danger ocultar"></div>' +
    '<div id="error" class="alert alert-danger ocultar" role="alert" class="CONTRASEÑAS_NO_COINCIDEN"></div>' +
    '<button type="submit" name="btnChangePass" value="Cambiar contraseña" class="btnChangePass tooltip3">' +
    '<img class=iconoResetPass iconResetPass" src="images/resetPass.png" alt="CAMBIAR_CONTRASEÑA" />' +
    '<span class="tooltiptext3 ICONO_RESET_PASS"></span>' +
    "</button>" +
    "</form>" +
    "</div>" +
    "</div>";

  $("#changePass-modal").append(contenidoModal);

  setLang(getCookie("lang"));
}

/**Función para ordenar una tabla por columna*/
function sortTable(n, idTable) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;

  table = document.getElementById(idTable);
  switching = true;

  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

/*Función para establecer el valor de la cookie*/
function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/*Función para obtener el valor de la cookie*/
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * Función que comprueba que el usuario no tenga el bloqueo de mayúsculas activado
 */
function capLock(e, idElemento) {
  kc = e.keyCode ? e.keyCode : e.which;
  sk = e.shiftKey ? e.shiftKey : kc == 16 ? true : false;
  if ((kc >= 65 && kc <= 90 && !sk) || (kc >= 97 && kc <= 122 && sk)) {
    document.getElementById(idElemento).style.display = "block";
  } else {
    document.getElementById(idElemento).style.display = "none";
  }
}

/**Función que resetear los valores del formulario*/
function resetearFormulario(idFormulario, idElementoList) {
  document.getElementById(idFormulario).reset();

  idElementoList.forEach(function (idElemento) {
    document.getElementById(idElemento).style.borderColor = "#c8c8c8";
  });
}

/**Función para cerrar las ventanas modales*/
function cerrarModal(idElement) {
  document.getElementById(idElement).style.display = "none";
}

/**Función que cierra la ventana modal*/
function cerrarModal(idElemento, accion, operacion) {
  var metodoEjecutar = operacion;

  document.getElementById(idElemento).style.display = "none";

  if (accion != "" && accion != undefined) {
    window.location.href = accion;
  }

  if (operacion != "" && operacion != undefined) {
    metodoEjecutar();
  }
}

/**Función para cerrar las ventanas modales*/
function cerrarModalNoToken(idElement) {
  document.getElementById(idElement).style.display = "none";
  window.location.href = "index.html";
}

/**Función para desconectarse del sistema */
function desconectar() {
  deleteAllCookies();
}

/*Función que elimina las cookies del navegador cuando cambiamos de pestaña html*/
function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    setCookie(name, "");
  }
}

/*Función que elimina todas las cookies para que no quede basura en ellas*/
function deleteCookiesEntrePaginas(vista) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (
      name == "token" ||
      name == " token" ||
      name == "lang" ||
      name == " lang" ||
      name == "rolUsuario" ||
      name == " rolUsuario" ||
      name == "usuarioSistema" ||
      name == " usuarioSistema"
    ) {
    } else {
      setCookie(name, "");
    }
  }
}

/*Coloca el Si o No de Borrado lógico en el idioma que corresponda.*/
function borrado_logico_texto(x) {
  var idioma = getCookie("lang");
  if (idioma == "ES") {
    if (x == "0") return "No";
    if (x == "1") return "Si";
  } else if (idioma == "GA") {
    if (x == "0") return "Non";
    if (x == "1") return "Si";
  } else if (idioma == "EN") {
    if (x == "0") return "Non";
    if (x == "1") return "Yes";
  }
}

/**
 * Función que transforma fechas del formato americano al español
 */
function formatoFechas(texto) {
  return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
}

/**
 * Convierte una fecha con hora en formato europeo
 */
function ordenarFechaHora(fechaHora) {
  var fecha = formatoFechas(fechaHora.substring(0, 10));
  var hora = fechaHora.substring(10, 19);
  return fecha + hora;
}

/*Refresca los datos de la tabla de una gestión.*/
function refresh() {
  ajustarCookies();
  setCookie("camposFormularioListado", "si");
  obtenerListado(0);
}

/**Función para eliminar los mensajes de validación de error*/
function eliminarMensajesValidacionError(idElementoErrorList, idElementoList) {
  idElementoErrorList.forEach(function (idElementoError) {
    $("#" + idElementoError).removeClass();
    $("#" + idElementoError).html("");
    $("#" + idElementoError).css("display", "none");
  });

  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).removeAttr("style");
    $("#" + idElemento).css("border", "1px solid #4DB6AC");
    $("#" + idElemento).css("borderTop", "2px solid #00897B");
  });
}

/**Función para eliminar los mensajes de validación de error*/
function eliminarMensajesValidacionErrorUnElemento(
  idElementoError,
  idElemento
) {
  $("#" + idElementoError).removeClass();
  $("#" + idElementoError).html("");
  $("#" + idElementoError).css("display", "none");

  $("#" + idElemento).removeAttr("style");
  $("#" + idElemento).css("border", "1px solid #4DB6AC");
  $("#" + idElemento).css("borderTop", "2px solid #00897B");
}

/**Función para limpiar los campos de un formulario*/
function limpiarFormulario(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).val("");
  });
}

/**Función para encriptar la pass en md5*/
function encriptar(idElemento) {
  document.getElementById(idElemento).value = hex_md5(
    document.getElementById(idElemento).value
  );
  return true;
}

/**Función que va a rellena los select **/
function rellenaSelect(select, datos) {
  var lista = datos;

  for (var i = 0; i < lista.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].idEmpresa);
    option.setAttribute("label", datos[i].nombreEmpresa);

    select.append(option);
  }

  var option = document.createElement("option");
  option.setAttribute("value", "default");
  option.setAttribute("label", " --- Añadir nueva empresa --- ");

  select.append(option);

  setLang(getCookie("lang"));
}

/**Función que va a eliminar los options de los select **/
function limpiaSelect(select) {
  select.empty();
}

/*Funcion para limpiar los radio button */
function limpiaRadioButton(idElementos) {
  idElementos.forEach(function (idElemento) {
    $("#" + idElemento).prop("checked", false);
  });
}

/*Función que muestra el error de acceso por no estar autenticado**/
function errorAutenticado(codigoResponse) {
  var idioma = getCookie("lang");
  $("#modal-title").removeClass();
  $("#modal-title").addClass("STOP");
  document.getElementById("modal-title").style.color = "#a50707";
  document.getElementById("modal-title").style.top = "13%";
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigoResponse);
  $(".imagenAviso").attr("src", "images/stop.png");
  document.getElementById("modal").style.display = "block";
  setLang(idioma);
}

/**Función que muestra el error de fallo interno de la aplicación*/
function errorInternal(codigoResponse) {
  var idioma = getCookie("lang");
  $("#modal-title").removeClass();
  $("#modal-title").addClass("ERROR_INTERNO");
  document.getElementById("modal-title").style.color = "#a50707";
  document.getElementById("modal-title").style.top = "10%";
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigoResponse);
  $(".imagenAviso").attr("src", "images/caution.png");
  document.getElementById("modal").style.display = "block";
  setLang(idioma);
}

/**Función que aplica los cambios necesarios cuando la respuesta de las petición Ajax ha sido OK*/
function respuestaOKAjax() {
  $("#formularioAcciones").modal("hide");
  $(".imagenAviso").attr("src", "images/ok.png");
  $("#cerrar").attr("onclick", "cerrarModal('modal', '', '')");
  $("#modal-title").attr("style", "color: #005200;");
}

/**Función que aplica los cambios necesarios cuando la respuesta de las petición Ajax ha sido KO*/
function respuestaKOAjax() {
  $("#formularioAcciones").modal("hide");
  $(".imagenAviso").attr("src", "images/failed.png");
  $("#cerrar").attr("onclick", "cerrarModal('modal', '', '')");
  $("#modal-title").attr("style", "color: #ff0000;");
}

/**Función que actualiza el mensaje con el código que nos llega de la petición Ajax y aplica estilos*/
function actualizaMensajesRespuestAjax(codigo) {
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigo);
  $(".imagenAviso").attr("style", "width: 16%; margin-top: 0");
  $("#modal").attr("style", "display: block");
}

/**Función que crea según las columnas que le pasemos un div con checkbox para marcar y así ocultar las columnas*/
function createHideShowColumnsWindow(arrayColumnas) {
  var checkbox = "";

  for (var clave in arrayColumnas) {
    checkbox =
      checkbox +
      "<input type='checkbox' id='" +
      clave +
      "' name='" +
      clave +
      "' value='" +
      clave +
      "' onclick='hideShow(" +
      clave +
      ", " +
      arrayColumnas[clave] +
      ")'><label for='" +
      clave.replace("_COLUMN", "") +
      "'></label><br>";
  }

  setLang(getCookie("lang"));

  return checkbox;
}

/**Función que muestra la ventana con las columnas a ocultar o mostrar*/
function hideShowColumnsWindow() {
  var estado = $("#showHideColumns").css("display");

  if (estado == "none") {
    $("#showHideColumns").attr("style", "display: block");
  } else {
    $("#showHideColumns").attr("style", "display: none");
  }
}

/**Función que oculta o muestra las columnas de una tabla*/
function hideShow(classElement, posElement) {
  claveLabel = classElement.id + "_label";

  $("." + classElement.name).toggle();
  $("#" + claveLabel).toggle();
  $("td:nth-child(" + posElement + ")").toggle();
}

/**Función que oculta o muestra las columnas de una tabla*/
function hideShowRevert(clase, posElement) {
  $("." + clase).toggle();
  $("td:nth-child(" + posElement + ")").toggle();
}

/**Función que oculta o muestra las columnas de una tabla*/
function hideShowRevertWithoutClase(posElement) {
  $("td:nth-child(" + posElement + ")").toggle();
}

function comprobarOcultos() {
  $("#tablaDatos tr th").each(function (index) {
    var clase = $(this).attr("class");
    var display = $(this).attr("style");
    if (clase.includes("colFirst")) {
      if (
        typeof display != "undefined" &&
        display !== false &&
        display.split(": ")[1] == "none;"
      ) {
        var claseColumn = clase.split(" ");
        hideShowRevert(claseColumn[1], index + 1);
      }
    } else {
      var claseColumn = clase;
      if (
        typeof display != "undefined" &&
        display !== false &&
        display.split(": ")[1] == "none;"
      ) {
        hideShowRevert(claseColumn, index + 1);
      }
    }
  });

  $("#tablaDatos tbody tr td").each(function (index) {
    var display = $(this).attr("style");

    if (
      typeof display != "undefined" &&
      display !== false &&
      display.split(": ")[1] == "none;"
    ) {
      hideShowRevertWithoutClase(index + 1);
    }
  });
}

/*Función para cambiar el título de las gestiones*/
/*function cambiarTituloGestion(funcionalidad) {
  var rol = getCookie("rolUsuario");

  switch (funcionalidad) {
    case "empresa":
      if (rol !== "admin") {
        $("#gestion").addClass("GESTION_EMPRESAS_NO_ADMIN");
        document.getElementById("gestion").style.left = "44.5%";
      } else {
        $("#gestion").addClass("GESTION_EMPRESAS");
      }
      break;
    case "persona":
      if (rol !== "admin") {
        $("#gestion").addClass("GESTION_PERSONAS_NO_ADMIN");
        document.getElementById("gestion").style.left = "40%";
      } else {
        $("#gestion").addClass("GESTION_PERSONAS");
      }
      break;
    case "usuario":
      if (rol !== "admin") {
        $("#gestion").addClass("GESTION_USUARIOS_NO_ADMIN");
      } else {
        $("#gestion").addClass("GESTION_USUARIOS");
      }
      break;
  }

  setLang(getCookie("lang"));
}*/

/**Función para cambiar valores del formulario.*/
function cambiarFormulario(tituloForm, action, onsubmit) {
  $("#formularioAcciones").attr("style", "display: block");
  $("#cerrarForm").attr("onclick", "cerrarModal('formularioAcciones', '', '')");
  $("#tituloForms").addClass(tituloForm);

  if (action != "") {
    $("#formularioGenerico").attr("action", action);
  }

  if (onsubmit != "") {
    $("#formularioGenerico").attr("onsubmit", onsubmit);
  } else {
    $("#formularioGenerico").attr("onsubmit", "");
  }
}

/**Función para cambiar valores del icono **/
function cambiarIcono(ruta, nombreIcono, estiloIcono, valorIcono) {
  $("#iconoAcciones").attr("src", ruta);
  $("#iconoAcciones").removeClass();
  $("#iconoAcciones").addClass(nombreIcono);
  $("#iconoAcciones").addClass(estiloIcono);
  $("#spanAcciones").removeClass();
  $("#spanAcciones").addClass("tooltiptext");
  $("#spanAcciones").addClass(nombreIcono);
  $("#btnAcciones").attr("value", valorIcono);
}

/**Función para volver al menu **/
function volver() {
  window.location.href = "menu.html";
  limpiaCookiesBusquedas();
}

/** Función que limpia las cookies de las busquedas **/
function limpiaCookiesBusquedas() {
  setCookie("nombreRol", "");
  setCookie("descripcionRol", "");
}

/**Función para insertar campos en el formulario a mayores*/
function insertacampo(form, name, value) {
  formulario = form;
  var element = document.getElementById(name);

  if (element == "" || element == null) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    input.className = name;
    input.id = name;
    formulario.appendChild(input);
  } else {
    element.value = value;
  }
}

/**Función que deshabilita los campos de un formulario*/
function deshabilitaCampos(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).attr("disabled", true);
  });
}

/**Función que habilita los campos de un formulario*/
function habilitaCampos(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).attr("disabled", false);
  });
}

/** Función para ocultar el símbolo obligatorio **/
function ocultarObligatorios(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).attr("style", "display: none");
  });
}

/** Función para mostrar el símbolo obligatorio **/
function mostrarObligatorios(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).attr("style", "");
  });
}

/** Función para anadir propiedad readonly **/
function anadirReadonly(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).prop("readonly", true);
  });
}

/** Función para eliminar propiedad readonly **/
function eliminarReadonly(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    $("#" + idElemento).prop("readonly", false);
  });
}

/** Función para guardar los parámetros de las búsquedas **/
function guardarParametrosBusqueda(idElementoList) {
  idElementoList.forEach(function (idElemento) {
    var datosBusqueda = idElemento.split(": ");
    setCookie(datosBusqueda[0], datosBusqueda[1]);
  });
}
/**Función para mostrar mensaje de error cuando fallan las peticiones ajax*/
function errorFailAjax(status) {
  if (status === 500) {
    errorInternal("MENSAJE_ERROR_INTERNO");
  } else if (status === 403 || status === 412) {
    errorAutenticado("ERROR_AUTENTICACION");
  } else if (status === 0 || status === 404) {
    errorInternal("ERR_CONNECTION_REFUSED");
  }
}

/*Función que muestra el error en una acción y devuelve al usuario a index.html.*/
function errorAccion(codigoResponse) {
  $("#modal-title").addClass("ERROR");
  $("#formularioAcciones").modal("hide");
  $(".imagenAviso").attr("src", "images/failed.png");
  $("#cerrar").attr("onclick", "cerrarModal('modal', 'index.html', '')");
  $("#modal-title").attr("style", "color: #ff0000;");
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigoResponse);
  $(".imagenAviso").attr("style", "width: 16%; margin-top: 0");
  $("#modal").attr("style", "display: block");
  deleteAllCookies();
}

/** Función para formar las modales de éxito **/
function respuestaAjaxOK(clase, codigo) {
  $(".imagenAviso").attr("src", "images/ok.png");
  document.getElementById("modal-title").style.color = "#238f2a";
  document.getElementById("modal-title").style.top = "13%";
  $("#modal-title").removeClass();
  $("#modal-title").addClass(clase);
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigo);
  setLang(getCookie("lang"));
}

/** Función para mostrar las modales de error **/
function respuestaAjaxKO(codigo) {
  $("#modal-title").removeClass();
  $("#modal-title").addClass("ERROR");
  document.getElementById("modal-title").style.color = "#a50707";
  document.getElementById("modal-title").style.top = "13%";
  $(".imagenAviso").attr("src", "images/failed.png");
  $("#modal-mensaje").removeClass();
  $("#modal-mensaje").addClass(codigo);
  setLang(getCookie("lang"));
}

/** Función para mostrar las modales de error **/
function respuestaAjaxContinuarProcedimiento(identificadorProcedimiento) {
  $("#modal-titleContinuar").removeClass();
  $("#modal-titleContinuar").addClass("ERROR");
  document.getElementById("modal-titleContinuar").style.color = "#a50707";
  document.getElementById("modal-titleContinuar").style.top = "13%";
  $(".imagenAviso").attr("src", "images/failed.png");
  $("#seguir").attr(
    "onclick",
    "iniciarProcedimientoUsuario(" +
      identificadorProcedimiento +
      ", 'volverGuardar')"
  );

  setLang(getCookie("lang"));
}

/** Función que ejecuta la comprobacion de una fucnion cada cierto tiempo **/
function ejecutaFuncion(funcion, tiempo) {
  return setInterval(funcion, tiempo);
}

/** Funcion para convertir a tipo Date **/
function convert(str) {
  var mnths = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    },
    date = str.split(" ");

  return [date[5], mnths[date[1]], date[2]].join("-");
}

/** Funcion para tratar las fechas **/
function convertirFecha(fecha) {
  var fechaCorrecta = "";

  var fechaSeparada = fecha.split(" ");

  var mesLetras = fechaSeparada[1];

  var mes = convierteMes(mesLetras);

  fechaCorreta = fechaSeparada[2] + "-" + mes + "-" + fechaSeparada[3];

  return fechaCorreta;
}
/** Funcion para tratar las fechas en formato SAT MAY 01 HH:MM:SS CET YYYY **/
function convierteFecha(fecha) {
  var fechaSeparada = fecha.split(" ");

  var mes = convierteMes(fechaSeparada[1]);

  var fechaCorrecta = "";

  fechaCorrecta = fechaSeparada[5] + "-" + mes + "-" + fechaSeparada[2];

  return fechaCorrecta;
}

/** Funcion para tratar las fechas en formato yyyy-mm-dd **/
function convierteFechaGuion(fecha) {
  var fechaSeparada = fecha.split("-");

  var mes = convierteMes(fechaSeparada[1]);

  var fechaCorrecta = "";

  fechaCorrecta =
    fechaSeparada[0] + "-" + fechaSeparada[1] + "-" + fechaSeparada[2];

  return fechaCorrecta;
}

/**Función para convertir los meses de letras a números **/
function convierteMes(mes) {
  var mesNumero = "";

  switch (mes) {
    case "Jan":
      mesNumero = "01";
      break;
    case "Feb":
      mesNumero = "02";
      break;
    case "Mar":
      mesNumero = "03";
      break;
    case "Apr":
      mesNumero = "04";
      break;
    case "May":
      mesNumero = "05";
      break;
    case "Jun":
      mesNumero = "06";
      break;
    case "Jul":
      mesNumero = "07";
      break;
    case "Aug":
      mesNumero = "08";
      break;
    case "Sep":
      mesNumero = "09";
      break;
    case "Oct":
      mesNumero = "10";
      break;
    case "Nov":
      mesNumero = "11";
      break;
    case "Dec":
      mesNumero = "12";
      break;
  }

  return mesNumero;
}

/** Funcion para sustituir lo caracteres por asteriscos **/
function convertirPass(passwd) {
  var passAsterisco = "";

  for (var i = 0; i < passwd.length; i++) {
    passAsterisco += "*";
  }

  return passAsterisco;
}

/** Función para ocultar los iconos de error de los tabs de los formularios **/
function ocultarIconoErroresTabs(iconos) {
  iconos.forEach(function (icono) {
    $("#" + icono).attr("hidden", true);
  });
}

/**Funcion para ocultar los mensajes de ayuda en las ventanas de add **/
function ocultaFormatos(idFormato) {
  idFormato.forEach(function (id) {
    $("#" + id).attr("hidden", true);
  });
}

/**Funcion para ocultar los mensajes de ayuda en las ventanas de add **/
function muestraFormatos(idFormato) {
  idFormato.forEach(function (id) {
    $("#" + id).attr("hidden", false);
  });
}

/** Función que oculta los datos de la empresa en el formulario **/
function ocultarDatos(idsElementos) {
  idsElementos.forEach(function (idElemento) {
    $("#" + idElemento).attr("hidden", true);
  });
}

/** Función que muestra los datos de la empresa en el formulario **/
function mostrarDatos(idsElementos) {
  idsElementos.forEach(function (idElemento) {
    $("#" + idElemento).attr("hidden", true);
  });
}

/**Función para limpiar los textarea*/
function limpiarTextArea(idElemento) {
  $("#" + idElemento).val("");
}

/*Esta función carga la vista de inicio con los procesos historicos de la huella de carbono del
usuario o si es un administrador o no tiene procesos carga la información por defecto de la página.*/
function inicioUsuario() {
  var rol = getCookie("rolUsuario");
  var idioma = getCookie("lang");

  $("#inicioUsuario").html("");
  var contenidoModal = "";

  switch (rol) {
    case "administrador":
      contenidoModal =
        '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
        '<div class="card">' +
        '<img src="images/news.png" class="card-img-top" alt="Noticias">' +
        '<div class="card-body-news">' +
        '<h4 class="card-title TITULO_NOTICIA_1"></h4>' +
        '<p class="card-text CONTENIDO_NOTICIA_1"></p>' +
        "</div>" +
        '<div class="card-footer">' +
        '<small class="text-muted"></small>' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
        '<div class="card">' +
        '<img src="images/news.png" class="card-img-top" alt="Noticias">' +
        '<div class="card-body-news">' +
        '<h4 class="card-title TITULO_NOTICIA_2"></h4>' +
        '<p class="card-text CONTENIDO_NOTICIA_2"></p>' +
        "</div>" +
        '<div class="card-footer">' +
        '<small class="text-muted"></small>' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
        '<div class="card">' +
        '<img src="images/news.png" class="card-img-top" alt="Noticias">' +
        '<div class="card-body-news">' +
        '<h4 class="card-title TITULO_NOTICIA_3"></h4>' +
        '<p class="card-text CONTENIDO_NOTICIA_3"></p>' +
        "</div>" +
        '<div class="card-footer">' +
        '<small class="text-muted"></small>' +
        "</div>" +
        "</div>" +
        "</div>";
      break;
    case "usuario":
      contenidoModal =
        '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' +
        '<div class="card">' +
        '<img src="images/news.png" class="card-img-top" alt="Noticias">' +
        '<div class="card-body-news">' +
        '<h4 class="card-title">Vuelo Madrid-Vigo</h4>' +
        '<p class="card-text">Para la distancia de 500 km, en un boing 747 el total de CO2 por persona en este proceso corresponde a 1,5KG de C02.</p>' +
        "</div>" +
        '<div class="card-footer">' +
        '<small class="text-muted">Fecha de emisión: 12/07/2022</small>' +
        "</div>" +
        "</div>" +
        "</div>";
      break;
  }

  $("#inicioUsuario").append(contenidoModal);
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
