/**
 * Funciones para registro.html
 */

/**Función ajax con promesas*/
function registroAjaxPromesa() {
  addActionControler(document.formularioRegistro, "registrar", "auth");

  return new Promise(function (resolve, reject) {
    if (verificarPasswd()) {
      encriptar("passwdUsuario1");
      $.ajax({
        method: "POST",
        url: URL,
        data: $("#formularioRegistro").serialize(),
      })
        .done((res) => {
          if (res.code != "REGISTRAR_USUARIO_OK") {
            reject(res);
          }
          resolve(res);
        })
        .fail(function (jqXHR) {
          errorFailAjax(jqXHR.status);
        });
    }
  });
}

async function registro() {
  await registroAjaxPromesa()
    .then((res) => {
      $("#registro-modal").modal("toggle");

      respuestaAjaxOK("REGISTRAR_USUARIO_OK", res.code);

      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    })
    .catch((res) => {
      $("#registro-modal").modal("toggle");
      respuestaAjaxKO(res.code);

      let idElementoList = [
        "dniP",
        "nombreP",
        "apellidosP",
        "fechaNacP",
        "direccionP",
        "telefonoP",
        "emailP",
        "usuario",
        "passwdUsuario1",
        "passwdUsuario2",
      ];
      resetearFormulario("formularioRegistro", idElementoList);
      setLang(getCookie("lang"));
      document.getElementById("modal").style.display = "block";
    });
}

/** Función que valida el formulario de registro **/
function comprobarRegistro() {
  if (
    comprobarDNI("dniP", "errorFormatoDni", "dniPersona") &&
    comprobarNombre(
      "nombreP",
      "errorFormatoNombrePersona",
      "nombrePersonaRegistro"
    ) &&
    comprobarApellidos(
      "apellidosP",
      "errorFormatoApellidosP",
      "apellidosPersonaRegistro"
    ) &&
    comprobarFechaNacimiento(
      "fechaNacP",
      "errorFormatoFecha",
      "fechaPersonaRegistro"
    ) &&
    comprobarDireccion(
      "direccionP",
      "errorFormatoDireccion",
      "direccionPersonaRegistro"
    ) &&
    comprobarTelefono(
      "telefonoP",
      "errorFormatoTelefono",
      "telefonoPersonaRegistro"
    ) &&
    comprobarEmail("emailP", "errorFormatoEmail", "emailPersonaRegistro") &&
    comprobarUser("usuario", "errorFormatoUserRegistro", "loginUsuario") &&
    comprobarPass(
      "passwdUsuario1",
      "errorFormatoPassRegistro",
      "passwdUsuarioRegistro"
    ) &&
    comprobarPassRepetida(
      "passwdUsuario2",
      "errorFormatoPassRegistro2",
      "passwdUsuarioRegistro"
    )
  ) {
    return true;
  } else {
    comprobarErroresTabs();
    return false;
  }
}

/**Función verificar passwd**/
function verificarPasswd() {
  passwdUsuario1 = $("#passwdUsuario1").val();
  passwdUsuario2 = $("#passwdUsuario2").val();

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

$(document).ready(function () {
  $("#registro-modal").on("hidden.bs.modal", function () {
    let idElementoErrorList = [
      "errorFormatoDni",
      "errorFormatoNombrePersona",
      "errorFormatoApellidosP",
      "errorFormatoFecha",
      "errorFormatoDireccion",
      "errorFormatoTelefono",
      "errorFormatoEmail",
      "errorFormatoUserRegistro",
      "errorFormatoPassRegistro",
      "errorFormatoPassRegistro2",
    ];

    let idElementoList = [
      "dniP",
      "nombreP",
      "apellidosP",
      "fechaNacP",
      "direccionP",
      "telefonoP",
      "emailP",
      "usuario",
      "passwdUsuario1",
      "passwdUsuario2",
    ];

    limpiarFormulario(idElementoList);
    $("#error").removeClass();
    $("#error").html("");
    $("#error").css("display", "none");

    $("#iconoTabDatosPersonales").attr("hidden", true);
    $("#iconoTabDatosUsuario").attr("hidden", true);

    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie("lang"));
  });
});
