/**
 * Funciones para el login y recuperar contraseña
 */

/****************************************Función que valida el formulario de login***********************************************/
function comprobarLogin() {
  if (
    comprobarUser("userLogin", "errorFormatoUser", "loginUsuario") &&
    comprobarPass("passLogin", "errorFormatoPass", "passwdUsuarioLogin")
  ) {
    encriptar("passLogin");
    return true;
  } else {
    return false;
  }
}

function loginAjaxPromesa() {
  addActionControler(document.formularioLogin, "login", "auth");

  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "POST",
      url: URL,
      data: $("#formularioLogin").serialize(),
    })
      .done((res) => {
        if (res.code != "LOGIN_USUARIO_CORRECTO") {
          reject(res);
        }
        resolve(res);
      })
      .fail(function (jqXHR) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function login() {
  await loginAjaxPromesa()
    .then((res) => {
      setCookie("token", res.resource);
      setCookie("usuarioSistema", document.getElementById("userLogin").value);
      window.location.href = "menu.html";
    })
    .catch((res) => {
      $("#login-modal").modal("toggle");
      respuestaAjaxKO(res.code);

      let idElementoList = ["userLogin", "passLogin"];
      resetearFormulario("formularioLogin", idElementoList);
      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    });
  deleteActionController();
}

/**********************************Función que valida el recuperar contraseña por correo********************************************/

/** Función que valida el formulario de recuperación de contraseña **/
function comprobarobtenerNuevaContrasena() {
  if (
    comprobarUser(
      "userRecuperarPass",
      "errorFormatoUserPass",
      "loginUsuarioRecPass"
    ) &&
    comprobarEmail(
      "emailUser",
      "errorFormatoEmailRecPass",
      "emailUsuarioRecPass"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function obtenerNuevaContrasenaAjaxPromesa() {
  addActionControler(
    document.formularioObtenerNuevaContrasena,
    "obtenerNuevaContrasena",
    "auth"
  );

  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "POST",
      url: URL,
      data: $("#formularioObtenerNuevaContrasena").serialize(),
    })
      .done((res) => {
        if (res.code != "RECUPERAR_CONTRASENA_EMAIL_OK") {
          reject(res);
        }
        resolve(res);
      })
      .fail(function (jqXHR) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function obtenerNuevaContrasena() {
  await obtenerNuevaContrasenaAjaxPromesa()
    .then((res) => {
      $("#recuperarcontrasena-modal").modal("toggle");
      $("#login-modal").modal("toggle");
      respuestaAjaxOK("RECUPERAR_CONTRASENA_EMAIL_OK", res.code);
      let idElementoList = ["userRecuperarPass", "emailUser"];
      resetearFormulario("formularioObtenerNuevaContrasena", idElementoList);
      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    })
    .catch((res) => {
      $("#recuperarcontrasena-modal").modal("toggle");
      $("#login-modal").modal("toggle");
      respuestaAjaxKO(res.code);
      let idElementoList = ["userRecuperarPass", "emailUser"];
      resetearFormulario("formularioObtenerNuevaContrasena", idElementoList);
      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    });
  deleteActionController();
}

$(document).ready(function () {
  $("#login-modal").on("hidden.bs.modal", function () {
    let idElementoErrorList = [
      "errorFormatoUser",
      "errorFormatoPass",
      "bloqueoMayusculas",
    ];
    let idElementoList = ["userLogin", "passLogin"];
    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie("lang"));
  });

  $("#recuperarcontrasena-modal").on("hidden.bs.modal", function () {
    let idElementoErrorList = [
      "errorFormatoUserPass",
      "errorFormatoEmailRecPass",
    ];
    let idElementoList = ["userRecuperarPass", "emailUser"];
    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie("lang"));
  });
});
