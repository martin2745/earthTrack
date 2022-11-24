/* Funcion para cambiar la contraseña */
async function changePass() {
  addActionControler(
    document.formularioChangePass,
    "editarContrasena",
    "usuario"
  );
  await changePassUsuarioAjaxPromesa()
    .then((res) => {
      $("#changePass-modal").modal("toggle");
      setCookie("token", res.resource); //Actualizamos el token de sesión
      respuestaAjaxOK("USUARIO_EDITAR_CONTRASENA_OK", res.code);

      let idElementoList = ["passChangePass1", "passChangePass2"];
      resetearFormulario("formularioChangePass", idElementoList);
      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    })
    .catch((res) => {
      $("#changePass-modal").modal("toggle");

      respuestaAjaxKO(res.code);

      let idElementoList = ["passChangePass1", "passChangePass2"];
      limpiarFormulario(idElementoList);
      resetearFormulario("formularioChangePass", idElementoList);
      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    });
}

/* Función para cambiar la contraseña con ajax y promesas */
function changePassUsuarioAjaxPromesa() {
  var token = getCookie("token");
  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      if (verificarPasswd()) {
        encriptar("passChangePass1");

        $.ajax({
          method: "POST",
          url: URL,
          data: $("#formularioChangePass").serialize(),
          headers: { Authorization: token },
        })
          .done((res) => {
            if (res.code != "USUARIO_EDITAR_CONTRASENA_OK") {
              reject(res);
            }
            resolve(res);
          })
          .fail(function (jqXHR) {
            errorFailAjax(jqXHR.status);
          });
      } else {
        document.getElementById("error").setAttribute("style", "");
      }
    });
  }
}

/**Función verificar passwd**/
function verificarPasswd() {
  passwdUsuario1 = $("#passChangePass1").val();
  passwdUsuario2 = $("#passChangePass2").val();

  if (passwdUsuario1 != passwdUsuario2) {
    addCodeError("error", "CONTRASEÑAS_NO_COINCIDEN");
    return false;
  } else {
    $("#error").removeClass();
    $("#error").html("");
    $("#error").css("display", "none");
    return true;
  }
}

/*En función del rol vamos a añadir en el desplegable una serie de funcionalidades.*/
function rellenarTopMenu() {
  var rol = getCookie("rolUsuario");
  var desplegable = "";
  var arrayfuncionalidades = [];

  $("#listadoFuncionalidades").html("");

  if (rol == "administrador") {
    arrayfuncionalidades = [
      "usuarioGestion",
      "rolGestion",
      "funcionalidadGestion",
      "accionGestion",
      "logExcepcionAtributosGestion",
      "logExcepcionAccionesGestion",
      "testGestion",
    ];

    for (var i = 0; i < arrayfuncionalidades.length; i++) {
      desplegable += opcionesDesplegable(arrayfuncionalidades[i]);
    }
  } else if (rol == "usuario") {
    arrayfuncionalidades = ["usuarioGestion"];

    for (var i = 0; i < arrayfuncionalidades.length; i++) {
      desplegable += opcionesDesplegable(arrayfuncionalidades[i]);
    }
  }

  $("#listadoFuncionalidades").append(desplegable);
  setLang(getCookie("lang"));
}

/**
 * Carga diferentes opciones en función del rol del usuario
 */
function opcionesDesplegable(funcionalidad) {
  var rol = getCookie("rolUsuario");
  var toret = "";

  switch (rol) {
    case "administrador":
      if (funcionalidad == "usuarioGestion") {
        toret =
          '<a class="dropdown-item GESTION_USUARIO" href="usuarioGestion.html"></a>' +
          '<div class="dropdown-divider"></div>';
      }
      if (funcionalidad == "rolGestion") {
        toret =
          '<a class="dropdown-item GESTION_ROLES" href="rolGestion.html"></a>' +
          '<div class="dropdown-divider"></div>';
      }
      if (funcionalidad == "funcionalidadGestion") {
        toret =
          '<a class="dropdown-item GESTION_FUNCIONALIDADES" href="funcionalidadGestion.html"></a>' +
          '<div class="dropdown-divider"></div>';
      }
      if (funcionalidad == "accionGestion") {
        toret =
          '<a class="dropdown-item GESTION_ACCIONES" href="accionGestion.html"></a>' +
          '<div class="dropdown-divider"></div>';
      }
      if (funcionalidad == "logExcepcionAtributosGestion") {
        toret =
          '<a class="dropdown-item LOGATRIBUTOS_GESTION" href="logExcepcionAtributosGestion.html"></a>' +
          '<div class="dropdown-divider"></div>';
      }
      if (funcionalidad == "logExcepcionAccionesGestion") {
        toret =
          '<a class="dropdown-item LOGACCIONES_GESTION" href="logExcepcionAccionesGestion.html"></a>' +
          '<div class="dropdown-divider"></div>';
      }
      if (funcionalidad == "testGestion") {
        toret = '<a class="dropdown-item TESTS" href="testGestion.html"></a>';
      }
      break;
    //Resto de roles de la aplicación
    case "usuario":
      if (funcionalidad == "usuarioGestion") {
        toret =
          '<a class="dropdown-item DATOS_USUARIO datosUsuario" href="usuarioGestion.html"></a>';
      }
      break;
  }

  return toret;
}

$(document).ready(function () {
  $("#changePass-modal").on("hidden.bs.modal", function () {
    let idElementoErrorList = [
      "errorFormatoChangePass1",
      "errorFormatoChangePass2",
      "bloqueoMayusculasChangePass",
      "error",
    ];

    let idElementoList = ["passChangePass1", "passChangePass2"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie("lang"));
  });
});
