/** Función que valida el formulario de cambio de contraseña **/
function comprobarChangePass() {
  if (
    comprobarPass(
      "passChangePass1",
      "errorFormatoChangePass1",
      "passwordChange"
    ) &&
    comprobarPass(
      "passChangePass2",
      "errorFormatoChangePass2",
      "passwordChange"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/**Función que valida el login de usuario*/
function comprobarUser(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 15, idElementoError, campo) &&
    comprobarEnhe(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/**Función que valida la password de usuario*/
function comprobarPass(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 45, idElementoError, campo) &&
    comprobarEnhe(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/**Función que valida el cambio de contraseña de un  usuario*/
function comprobarPassChanguePassword() {
  document.getElementById("passCambiarPass1").style.borderWidth = "2px";

  if (
    validaNoVacio(
      "passCambiarPass1",
      "errorFormatoPassCambiarRegistro",
      "passwordChange"
    ) &&
    comprobarLetrasNumeros(
      "passCambiarPass1",
      "errorFormatoPassCambiarRegistro",
      "passwordChange"
    ) &&
    comprobarTamañoMinimo(
      "passCambiarPass1",
      3,
      "errorFormatoPassCambiarRegistro",
      "passwordChange"
    ) &&
    comprobarTamañoMaximo(
      "passCambiarPass1",
      45,
      "errorFormatoPassCambiarRegistro",
      "passwordChange"
    ) &&
    comprobarEnhe(
      "passCambiarPass1",
      "errorFormatoPassCambiarRegistro",
      "passwordChange"
    )
  ) {
    validacionOK("passCambiarPass1", "errorFormatoPassCambiarRegistro");
    return true;
  } else {
    validacionKO("passCambiarPass1", "errorFormatoPassCambiarRegistro");
    return false;
  }
}

function comprobarPassRepetida(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 45, idElementoError, campo) &&
    comprobarEnhe(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    if ($("#passwdUsuario1").val() != $("#passwdUsuario2").val()) {
      addCodeError("error", "CONTRASEÑAS_NO_COINCIDEN");
      return false;
    } else {
      $("#error").removeClass();
      $("#error").html("");
      $("#error").css("display", "none");
      return true;
    }
  } else {
    validacionKO(idElemento, idElementoError);
    if ($("#passwdUsuario1").val() != $("#passwdUsuario2").val()) {
      addCodeError("error", "CONTRASEÑAS_NO_COINCIDEN");
      return false;
    } else {
      $("#error").removeClass();
      $("#error").html("");
      $("#error").css("display", "none");
    }
    return false;
  }
}

function comprobarPassConfirmChangePass(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 45, idElementoError, campo) &&
    comprobarEnhe(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    if ($("#passChangePass1").val() != $("#passChangePass2").val()) {
      addCodeError("error", "CONTRASEÑAS_NO_COINCIDEN");
      return false;
    } else {
      $("#error").removeClass();
      $("#error").html("");
      $("#error").css("display", "none");
      return true;
    }
  } else {
    validacionKO(idElemento, idElementoError);
    if ($("#passChangePass1").val() != $("#passChangePass2").val()) {
      addCodeError("error", "CONTRASEÑAS_NO_COINCIDEN");
      return false;
    } else {
      $("#error").removeClass();
      $("#error").html("");
      $("#error").css("display", "none");
    }
    return false;
  }
}

/** Función que valida el email **/
function comprobarEmail(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarFormatoEmail(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 6, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 40, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato del DNI **/
function comprobarDNI(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarFormatoDNI(idElemento, idElementoError, campo) &&
    comprobarEnhe(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 9, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 9, idElementoError, campo) &&
    comprobarDNICorrecto(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato del Nombre **/
function comprobarNombre(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarSoloLetras(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 45, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato de los apellidos **/
function comprobarApellidos(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarSoloLetras(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 45, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato de la fecha de nacimiento **/
function comprobarFechaNacimiento(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 10, idElementoError, campo) &&
    comprobarFormatoFechas(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato de la fecha de nacimiento **/
function comprobarDireccion(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 5, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 200, idElementoError, campo) &&
    comprobarLetrasNumerosCaracteres(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato del telefono**/
function comprobarTelefono(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 9, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 9, idElementoError, campo) &&
    comprobarSoloNumeros(idElemento, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/**Función que valida si un campo está vacío*/
function validaNoVacio(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;
  var longitud = document.getElementById(idElemento).value.length;

  if (valor == null || longitud == 0) {
    switch (campo) {
      case "loginUsuario":
        codigo = "LOGIN_USUARIO_VACIO";
        break;
      case "passwdUsuarioLogin":
        codigo = "CONTRASENA_USUARIO_VACIA";
        break;
      case "loginUsuarioRecPass":
        codigo = "LOGIN_USUARIO_VACIO";
        break;
      case "emailUsuarioRecPass":
        codigo = "EMAIL_VACIO";
        break;
      case "dniPersona":
        codigo = "DNI_VACIO";
        break;
      case "nombrePersonaRegistro":
        codigo = "NOMBRE_VACIO";
        break;
      case "apellidosPersonaRegistro":
        codigo = "APELLIDOS_VACIO";
        break;
      case "fechaPersonaRegistro":
        codigo = "FECHA_NACIMIENTO_VACIA";
        break;
      case "direccionPersonaRegistro":
        codigo = "DIRECCION_VACIA";
        break;
      case "telefonoPersonaRegistro":
        codigo = "TELEFONO_VACIO";
        break;
      case "emailPersonaRegistro":
        codigo = "EMAIL_VACIO";
        break;
      case "passwdUsuarioRegistro":
        codigo = "CONTRASENA_USUARIO_VACIA";
        break;
      case "passwordChange":
        codigo = "CONTRASENA_USUARIO_VACIA";
        break;
      case "nombreRol":
        codigo = "ROL_NOMBRE_VACIO";
        break;
      case "descripcionRol":
        codigo = "ROL_DESCRIPCION_VACIO";
        break;
      case "nombreFuncionalidad":
        codigo = "FUNCIONALIDAD_NOMBRE_VACIO";
        break;
      case "descripcionFuncionalidad":
        codigo = "FUNCIONALIDAD_DESCRIPCION_VACIO";
        break;
      case "nombreAccion":
        codigo = "ACCION_NOMBRE_VACIO";
        break;
      case "descripcionAccion":
        codigo = "ACCION_DESCRIPCION_VACIO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida la longitud del texto y que esté compuesto por letras**/
function comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+$/g;

  if (!patron.test(valor)) {
    switch (campo) {
      case "descripcionRol":
        codigo = "ROL_DESCRIPCION_FORMATO_INCORRECTO";
        break;
      case "descripcionFuncionalidad":
        codigo = "FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO";
        break;
      case "descripcionAccion":
        codigo = "ACCION_DESCRIPCION_FORMATO_INCORRECTO";
        break;
      case "mensajeLogExcepcion":
        codigo = "MENSAJE_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función que valida el tamaño minimo de un campo**/
function comprobarTamañoMinimo(idElemento, sizeMin, idElementoError, campo) {
  var codigo = "";

  var longitud = document.getElementById(idElemento).value.length;

  if (longitud < sizeMin) {
    switch (campo) {
      case "loginUsuario":
        codigo = "LOGIN_USUARIO_MENOR_QUE_3";
        break;
      case "passwdUsuarioLogin":
        codigo = "CONTRASENA_USUARIO_MENOR_QUE_3";
        break;
      case "loginUsuarioRecPass":
        codigo = "LOGIN_USUARIO_MENOR_QUE_3";
        break;
      case "emailUsuarioRecPass":
        codigo = "EMAIL_LONGITUD_MINIMA";
        break;
      case "dniPersona":
        codigo = "DNI_MENOR_QUE_9";
        break;
      case "nombrePersonaRegistro":
        codigo = "NOMBRE_MENOR_QUE_3";
        break;
      case "apellidosPersonaRegistro":
        codigo = "APELLIDOS_MENOR_QUE_3";
        break;
      case "fechaPersonaRegistro":
        codigo = "FECHA_NACIMIENTO_MENOR_QUE_8";
        break;
      case "direccionPersonaRegistro":
        codigo = "DIRECCION_MENOR_5";
        break;
      case "telefonoPersonaRegistro":
        codigo = "TELEFONO_MENOR_QUE_9";
        break;
      case "emailPersonaRegistro":
        codigo = "EMAIL_LONGITUD_MINIMA";
        break;
      case "passwdUsuarioRegistro":
        codigo = "CONTRASENA_USUARIO_MENOR_QUE_3";
        break;
      case "passwordChange":
        codigo = "CONTRASENA_USUARIO_MENOR_QUE_3";
        break;
      case "nombreRol":
        codigo = "ROL_NOMBRE_MENOR_QUE_3";
        break;
      case "descripcionRol":
        codigo = "ROL_DESCRIPCION_MENOR_QUE_3";
        break;
      case "nombreFuncionalidad":
        codigo = "FUNCIONALIDAD_NOMBRE_MENOR_QUE_3";
        break;
      case "descripcionFuncionalidad":
        codigo = "FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3";
        break;
      case "nombreAccion":
        codigo = "ACCION_NOMBRE_MENOR_QUE_3";
        break;
      case "descripcionAccion":
        codigo = "ACCION_DESCRIPCION_MENOR_QUE_3";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida el tamaño maximo de un campo**/
function comprobarTamañoMaximo(idElemento, sizeMax, idElementoError, campo) {
  var codigo = "";

  var longitud = document.getElementById(idElemento).value.length;

  if (longitud > sizeMax) {
    switch (campo) {
      case "loginUsuario":
        codigo = "LOGIN_USUARIO_MAYOR_QUE_15";
        break;
      case "passwdUsuarioLogin":
        codigo = "CONTRASENA_USUARIO_MAYOR_QUE_45";
        break;
      case "loginUsuarioRecPass":
        codigo = "LOGIN_USUARIO_VACIO";
        break;
      case "emailUsuarioRecPass":
        codigo = "EMAIL_LONGITUD_MAXIMA";
        break;
      case "dniPersona":
        codigo = "DNI_MAYOR_QUE_9";
        break;
      case "nombrePersonaRegistro":
        codigo = "NOMBRE_MAYOR_QUE_45";
        break;
      case "apellidosPersonaRegistro":
        codigo = "APELLIDOS_MAYOR_QUE_45";
        break;
      case "fechaPersonaRegistro":
        codigo = "FECHA_NACIMIENTO_MAYOR_QUE_8";
        break;
      case "direccionPersonaRegistro":
        codigo = "DIRECCION_MAYOR_200";
        break;
      case "telefonoPersonaRegistro":
        codigo = "TELEFONO_MAYOR_QUE_9";
        break;
      case "emailPersonaRegistro":
        codigo = "EMAIL_LONGITUD_MAXIMA";
        break;
      case "passwdUsuarioRegistro":
        codigo = "CONTRASENA_USUARIO_MAYOR_QUE_45";
        break;
      case "passwordChange":
        codigo = "CONTRASENA_USUARIO_MAYOR_QUE_45";
        break;
      case "nombreRol":
        codigo = "ROL_NOMBRE_MAYOR_QUE_48";
        break;
      case "descripcionRol":
        codigo = "ROL_DESCRIPCION_MAYOR_QUE_200";
        break;
      case "nombreFuncionalidad":
        codigo = "FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48";
        break;
      case "descripcionFuncionalidad":
        codigo = "FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200";
        break;
      case "nombreAccion":
        codigo = "ACCION_NOMBRE_MAYOR_QUE_48";
        break;
      case "descripcionAccion":
        codigo = "ACCION_DESCRIPCION_MAYOR_QUE_200";
        break;
      case "codigoLogExcepcion":
        codigo = "CODIGO_MAYOR_QUE_200";
        break;
      case "mensajeLogExcepcion":
        codigo = "MENSAJE_MAYOR_QUE_200";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida que un campo esté compuesto por letras y números**/
function comprobarLetrasNumeros(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[a-zA-Z0-9\u00f1\u00d1]+$/;

  if (!patron.test(valor)) {
    switch (campo) {
      case "loginUsuario":
        codigo = "LOGIN_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "passwdUsuarioLogin":
        codigo = "  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "loginUsuarioRecPass":
        codigo = "LOGIN_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "passwdUsuarioRegistro":
        codigo = "  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "passwordChange":
        codigo = "  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "nombreRol":
        codigo = "ROL_NOMBRE_FORMATO_INCORRECTO";
        break;
      case "nombreFuncionalidad":
        codigo = "FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO";
        break;
      case "nombreAccion":
        codigo = "ACCION_NOMBRE_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida que un campo esté compuesto por letras y números**/
function comprobarLetrasNumerosCaracteres(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\u00AA\u00BA///-\s]+$/;

  if (!patron.test(valor)) {
    switch (campo) {
      case "direccionPersonaRegistro":
        codigo = "DIRECCION_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida que un campo esté compuesto por letras y números**/
function comprobarUserLog(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[a-zA-Z0-9_\u00f1\u00d1]+$/;

  if (!patron.test(valor)) {
    switch (campo) {
      case "usuarioLogExcepcion":
        codigo = "LOGIN_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida que un campo esté compuesto por letras y números**/
function comprobarSoloNumeros(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[0-9]+$/;

  if (!patron.test(valor)) {
    switch (campo) {
      case "telefonoPersonaRegistro":
        codigo = "TELEFONO_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**Función que valida que un campo no contenga ñ **/
function comprobarEnhe(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /[ñÑ]/;

  if (patron.test(valor)) {
    switch (campo) {
      case "loginUsuario":
        codigo = "LOGIN_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "passwdUsuarioLogin":
        codigo = "  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "loginUsuarioRecPass":
        codigo = "LOGIN_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "dniPersona":
        codigo = "DNI_FORMATO_INCORRECTO";
        break;
      case "passwdUsuarioRegistro":
        codigo = "  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
      case "passwordChange":
        codigo = "  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  } else {
    return true;
  }
}

/**
 * Función para comprobar el formato de los códigos de los log de excepciones de atributos y acciones
 */
function comprobarCodigo(idElemento, idElementoError, campo) {
  var codigo = "";
  var valor = document.getElementById(idElemento).value;
  var patron = /^[a-zA-ZÀ-ÿ0-9_. \u00f1\u00d1]+$/s;

  if (!patron.test(valor)) {
    switch (campo) {
      case "codigoLogExcepcion":
        codigo = "CODIGO_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función que valida la longitud del texto y que esté compuesto por letras**/
function comprobarSoloLetras(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/g;

  if (!patron.test(valor)) {
    switch (campo) {
      case "nombrePersonaRegistro":
        codigo = "NOMBRE_FORMATO_INCORRECTO";
        break;
      case "apellidosPersonaRegistro":
        codigo = "APELLIDOS_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función que valida la longitud del texto y que esté compuesto por letras**/
function comprobarSoloLetrasSinEspacios(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

  if (!patron.test(valor)) {
    switch (campo) {
      case "porDefinir":
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función que valida las fechas **/
function comprobarFormatoFechas(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}/g;

  if (!patron.test(valor)) {
    switch (campo) {
      case "fechaPersonaRegistro":
        codigo = "FECHA_NACIMIENTO_NUMERICA_INCORRECTA";
        break;
      case "fecha":
        codigo = "FECHA_NUMERICA_INCORRECTA";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función para comprobar el formato del Email*/
function comprobarFormatoEmail(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; // establecemos un patron para un email
  if (!patron.test(valor)) {
    switch (campo) {
      case "emailUsuarioRecPass":
        codigo = "EMAIL_ALFANUMERICO_INCORRECTO";
        break;
      case "emailPersonaRegistro":
        codigo = "EMAIL_ALFANUMERICO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función para comprobar el formato del DNI **/
function comprobarFormatoDNI(idElemento, idElementoError, campo) {
  var codigo = "";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[0-9]{8}[A-Z]{1}$/; // establecemos un patron para un email
  if (!patron.test(valor)) {
    switch (campo) {
      case "dniPersona":
        codigo = "DNI_FORMATO_INCORRECTO";
        break;
    }
    addCodeError(idElementoError, codigo);
    return false;
  }

  return true;
}

/**Función para comprobar el DNI correcto **/
function comprobarDNICorrecto(idElemento, idElementoError, campo) {
  var codigo = "";

  var letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKET";

  var valor = document.getElementById(idElemento).value;

  var patron = /^[0-9]{8}[A-Z]{1}$/; // establecemos un patron para el DNI

  if (patron.test(valor)) {
    var dniSinLetra = valor.substring(0, valor.length - 1);
    var letraIntroUsuario = valor.substring(valor.length - 1, valor.length);
    var posicion = dniSinLetra % 23;
    var letra = letrasDNI.substring(posicion, posicion + 1);

    if (letra != letraIntroUsuario) {
      switch (campo) {
        case "dniPersona":
          codigo = "DNI_LETRA_INCORRECTA";
          break;
      }

      addCodeError(idElementoError, codigo);
      return false;
    }
  }

  return true;
}

function validacionOK(idElemento, idElementoError) {
  document.getElementById(idElementoError).style.display = "none";
  document.getElementById(idElemento).style.borderColor = "#00e600";
}

/**Función que muestra el mensaje de error y colorea el borde del input del formulario de rojo*/
function validacionKO(idElemento, idElementoError) {
  document.getElementById(idElementoError).setAttribute("style", "");
  document.getElementById(idElemento).style.borderColor = "#ff0000";
}

/**Función para añadir los mensajes de error*/
function addCodeError(idElementoError, codigo) {
  var idioma = getCookie("lang");

  $("#" + idElementoError).removeClass();
  $("#" + idElementoError).addClass(codigo);
  $("#" + idElementoError).addClass("alert alert-danger");

  setLang(idioma);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////ROL////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Función que valida el formulario add rol **/
function comprobarAddRol() {
  if (
    comprobarNombreRol("input_rol_nombre", "errorFormatoNombre", "nombreRol") &&
    comprobarDescripcionRol(
      "input_rol_descripcion",
      "errorFormatoDescripcion",
      "descripcionRol"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function comprobarSearchRol() {
  if (
    comprobarNombreRolSearch(
      "input_rol_descripcion",
      "errorFormatoNombre",
      "nombreRol"
    ) &&
    comprobarDescripcionRolSearch(
      "input_rol_descripcion",
      "errorFormatoDescripcion",
      "descripcionRol"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Función que valida el formulario add rol **/
function comprobarEditRol() {
  if (
    comprobarNombreRol("input_rol_nombre", "errorFormatoNombre", "nombreRol") &&
    comprobarDescripcionRol(
      "input_rol_descripcion",
      "errorFormatoDescripcion",
      "descripcionRol"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Funcion que valida el formato del Nombre del rol **/
function comprobarNombreRol(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 48, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato de la descripcion del rol **/
function comprobarDescripcionRol(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 200, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/**Función que valida el nombre del rol en el buscar*/
function comprobarNombreRolSearch(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumeros(idElemento, idElementoError, campo)) {
      if (!comprobarTamañoMaximo(idElemento, 48, idElementoError, campo)) {
        validacionKO(idElemento, idElementoError);
        return false;
      } else {
        validacionOK(idElemento, idElementoError);
        return true;
      }
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

/**Función que valida la descripcion del rol en el buscar*/
function comprobarDescripcionRolSearch(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo)) {
      validacionOK(idElemento, idElementoError);
      return true;
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////FUNCIONALIDAD///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Función que valida el formulario add funcionalidad **/
function comprobarAddFuncionalidad() {
  if (
    comprobarNombreFuncionalidad(
      "input_funcionalidad_nombre",
      "errorFormatoNombre",
      "nombreFuncionalidad"
    ) &&
    comprobarDescripcionFuncionalidad(
      "input_funcionalidad_descripcion",
      "errorFormatoDescripcion",
      "descripcionFuncionalidad"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function comprobarSearchFuncionalidad() {
  if (
    comprobarNombreFuncionalidadSearch(
      "input_funcionalidad_descripcion",
      "errorFormatoNombre",
      "nombreFuncionalidad"
    ) &&
    comprobarDescripcionFuncionalidadSearch(
      "input_funcionalidad_descripcion",
      "errorFormatoDescripcion",
      "descripcionFuncionalidad"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Función que valida el formulario add funcionalidad **/
function comprobarEditFuncionalidad() {
  if (
    comprobarNombreFuncionalidad(
      "input_funcionalidad_nombre",
      "errorFormatoNombre",
      "nombreFuncionalidad"
    ) &&
    comprobarDescripcionFuncionalidad(
      "input_funcionalidad_descripcion",
      "errorFormatoDescripcion",
      "descripcionFuncionalidad"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Funcion que valida el formato del Nombre del funcionalidad **/
function comprobarNombreFuncionalidad(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 48, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato de la descripcion del funcionalidad **/
function comprobarDescripcionFuncionalidad(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 200, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/**Función que valida el nombre del funcionalidad en el buscar*/
function comprobarNombreFuncionalidadSearch(
  idElemento,
  idElementoError,
  campo
) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumeros(idElemento, idElementoError, campo)) {
      if (!comprobarTamañoMaximo(idElemento, 48, idElementoError, campo)) {
        validacionKO(idElemento, idElementoError);
        return false;
      } else {
        validacionOK(idElemento, idElementoError);
        return true;
      }
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

/**Función que valida la descripcion del funcionalidad en el buscar*/
function comprobarDescripcionFuncionalidadSearch(
  idElemento,
  idElementoError,
  campo
) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo)) {
      validacionOK(idElemento, idElementoError);
      return true;
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////ACCION///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Función que valida el formulario add rol **/
function comprobarAddAccion() {
  if (
    comprobarNombreAccion(
      "input_accion_nombre",
      "errorFormatoNombre",
      "nombreAccion"
    ) &&
    comprobarDescripcionAccion(
      "input_accion_descripcion",
      "errorFormatoDescripcion",
      "descripcionAccion"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function comprobarSearchAccion() {
  if (
    comprobarNombreAccionSearch(
      "input_accion_descripcion",
      "errorFormatoNombre",
      "nombreAccion"
    ) &&
    comprobarDescripcionAccionSearch(
      "input_accion_descripcion",
      "errorFormatoDescripcion",
      "descripcionAccion"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Función que valida el formulario add accion **/
function comprobarEditAccion() {
  if (
    comprobarNombreAccion(
      "input_accion_nombre",
      "errorFormatoNombre",
      "nombreAccion"
    ) &&
    comprobarDescripcionAccion(
      "input_accion_descripcion",
      "errorFormatoDescripcion",
      "descripcionAccion"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Funcion que valida el formato del Nombre del accion **/
function comprobarNombreAccion(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumeros(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 48, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/** Funcion que valida el formato de la descripcion del accion **/
function comprobarDescripcionAccion(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (
    validaNoVacio(idElemento, idElementoError, campo) &&
    comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo) &&
    comprobarTamañoMinimo(idElemento, 3, idElementoError, campo) &&
    comprobarTamañoMaximo(idElemento, 200, idElementoError, campo)
  ) {
    validacionOK(idElemento, idElementoError);
    return true;
  } else {
    validacionKO(idElemento, idElementoError);
    return false;
  }
}

/**Función que valida el nombre del accion en el buscar*/
function comprobarNombreAccionSearch(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumeros(idElemento, idElementoError, campo)) {
      if (!comprobarTamañoMaximo(idElemento, 48, idElementoError, campo)) {
        validacionKO(idElemento, idElementoError);
        return false;
      } else {
        validacionOK(idElemento, idElementoError);
        return true;
      }
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

/**Función que valida la descripcion del accion en el buscar*/
function comprobarDescripcionAccionSearch(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo)) {
      validacionOK(idElemento, idElementoError);
      return true;
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////LOGS////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

function comprobarSearchLog() {
  if (
    comprobarUserLogExcepcion(
      "input_usuario",
      "errorFormatoUsuario",
      "usuarioLogExcepcion"
    ) &&
    comprobarNombreFuncionalidadSearch(
      "input_funcionalidad",
      "errorFormatoFuncionalidad",
      "nombreFuncionalidad"
    ) &&
    comprobarNombreAccionSearch(
      "input_accion",
      "errorFormatoAccion",
      "nombreAccion"
    ) &&
    comprobarCodigoSearch(
      "input_codigo",
      "errorFormatoCodigo",
      "codigoLogExcepcion"
    ) &&
    comprobarMensajeSearch(
      "input_mensaje",
      "errorFormatoMensaje",
      "mensajeLogExcepcion"
    )
  ) {
    return true;
  } else {
    return false;
  }
}

/** Funcion que valida el formato del Nombre del usuario en el log **/
function comprobarUserLogExcepcion(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarUserLog(idElemento, idElementoError, campo)) {
      validacionOK(idElemento, idElementoError);
      return true;
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

/** Funcion que valida el formato del Nombre del usuario en el log **/
function comprobarUserLogExcepcion(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarCodigo(idElemento, idElementoError, campo)) {
      validacionOK(idElemento, idElementoError);
      return true;
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

/**Función que valida el nombre del accion en el buscar*/
function comprobarCodigoSearch(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarCodigo(idElemento, idElementoError, campo)) {
      if (!comprobarTamañoMaximo(idElemento, 200, idElementoError, campo)) {
        validacionKO(idElemento, idElementoError);
        return false;
      } else {
        validacionOK(idElemento, idElementoError);
        return true;
      }
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}

/**Función que valida el nombre del accion en el buscar*/
function comprobarMensajeSearch(idElemento, idElementoError, campo) {
  document.getElementById(idElemento).style.borderWidth = "2px";

  if (validaNoVacio(idElemento, idElementoError, campo)) {
    if (comprobarLetrasNumerosEspacios(idElemento, idElementoError, campo)) {
      if (!comprobarTamañoMaximo(idElemento, 200, idElementoError, campo)) {
        validacionKO(idElemento, idElementoError);
        return false;
      } else {
        validacionOK(idElemento, idElementoError);
        return true;
      }
    } else {
      validacionKO(idElemento, idElementoError);
      return false;
    }
  } else {
    validacionOK(idElemento, idElementoError);
    return true;
  }
}
