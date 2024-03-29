/**Función para recuperar los test con ajax y promesas*/
function test(code, codeFracaso, controladorTest, actionTest) {
  var token = getCookie("token");

  crearformocultoSinAction("formularioTest");
  insertacampo(document.formularioTest, "controlador", controladorTest);
  insertacampo(document.formularioTest, "action", actionTest);

  if (token == null) {
    errorAutenticado("ACCESO_DENEGADO");
  } else {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "POST",
        url: URL_TEST,
        data: $("#formularioTest").serialize(),
        headers: { Authorization: token },
      })
        .done((res) => {
          if (res.code != code && res.code != codeFracaso) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////AUTH////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de autenticacion */
async function testAutenticacion(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "autenticacionAtributos";
      switch (accion) {
        case "Login":
          code = "PETICION_TEST_LOGIN_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_LOGIN_ATRIBUTOS_FRACASO";
          actionTest = "login";
          break;
        case "Registro":
          code = "PETICION_TEST_REGISTRO_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_REGISTRO_ATRIBUTOS_FRACASO";
          actionTest = "registrar";
          break;
        case "ObtenerContrasenaCorreo":
          code = "PETICION_TEST_OBTENER_CONTRASENA_CORREO_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_OBTENER_CONTRASENA_CORREO_ATRIBUTOS_FRACASO";
          actionTest = "obtenerContrasenaCorreo";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "autenticacionAcciones";
      switch (accion) {
        case "Login":
          code = "PETICION_TEST_LOGIN_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_LOGIN_ACCIONES_FRACASO";
          actionTest = "login";
          break;
        case "Registro":
          code = "PETICION_TEST_REGISTRO_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_REGISTRO_ACCIONES_FRACASO";
          actionTest = "registrar";
          break;
        case "ObtenerContrasenaCorreo":
          code = "PETICION_TEST_OBTENER_CONTRASENA_CORREO_ACCIONES_EXITO";
          codeFracaso =
            "PETICION_TEST_OBTENER_CONTRASENA_CORREO_ACCIONES_FRACASO";
          actionTest = "obtenerContrasenaCorreo";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestAuth",
        "iconoTestAutenticacion" + tipoTest,
        "iconoTestAutenticacion" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Autenticacion" + accion,
        "cuerpo" + tipoTest + "Autenticacion" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////GESTION DE ROLES/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de rol */
async function testRol(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "rolAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_ROL_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ROL_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_ROL_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ROL_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_ROL_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ROL_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_ROL_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ROL_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_ROL_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ROL_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
        case "Reactivar":
          code = "PETICION_TEST_ROL_REACTIVAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ROL_REACTIVAR_ATRIBUTOS_FRACASO";
          actionTest = "reactivar";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "rolAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_ROL_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ROL_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_ROL_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ROL_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_ROL_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ROL_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_ROL_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ROL_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
        case "Reactivar":
          code = "PETICION_TEST_ROL_REACTIVAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ROL_REACTIVAR_ACCIONES_FRACASO";
          actionTest = "reactivar";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestRol",
        "iconoTestRol" + tipoTest,
        "iconoTestRol" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Rol" + accion,
        "cuerpo" + tipoTest + "Rol" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////GESTION DE FUNCIONALIDAD///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de funcionalidad */
async function testFuncionalidad(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "funcionalidadAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_FUNCIONALIDAD_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_FUNCIONALIDAD_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_FUNCIONALIDAD_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_FUNCIONALIDAD_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_FUNCIONALIDAD_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_FUNCIONALIDAD_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_FUNCIONALIDAD_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "funcionalidadAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_FUNCIONALIDAD_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_FUNCIONALIDAD_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_FUNCIONALIDAD_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_FUNCIONALIDAD_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_FUNCIONALIDAD_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestFuncionalidad",
        "iconoTestFuncionalidad" + tipoTest,
        "iconoTestFuncionalidad" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Funcionalidad" + accion,
        "cuerpo" + tipoTest + "Funcionalidad" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////GESTION DE ACCIONES////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de accion */
async function testAccion(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "accionAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_ACCION_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_ACCION_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_ACCION_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_ACCION_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_ACCION_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "accionAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_ACCION_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_ACCION_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_ACCION_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_ACCION_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_ACCION_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestAccion",
        "iconoTestAccion" + tipoTest,
        "iconoTestAccion" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Accion" + accion,
        "cuerpo" + tipoTest + "Accion" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////GESTION DE PERMISOS//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de permisos */
async function testRolAccionFuncionalidad(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "permisoAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_PERMISO_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PERMISO_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_PERMISO_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PERMISO_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Borrar":
          code = "PETICION_TEST_PERMISO_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PERMISO_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "permisoAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_PERMISO_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PERMISO_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Borrar":
          code = "PETICION_TEST_PERMISO_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PERMISO_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestRolAccionFuncionalidad",
        "iconoTestRolAccionFuncionalidad" + tipoTest,
        "iconoTestRolAccionFuncionalidad" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "RolAccionFuncionalidad" + accion,
        "cuerpo" + tipoTest + "RolAccionFuncionalidad" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GESTION DE USUARIOS///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de usuario */
async function testUsuario(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "usuarioAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_USUARIO_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_USUARIO_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_USUARIO_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_USUARIO_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_USUARIO_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
        case "Reactivar":
          code = "PETICION_TEST_USUARIO_REACTIVAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_REACTIVAR_ATRIBUTOS_FRACASO";
          actionTest = "reactivar";
          break;
        case "EditarContrasena":
          code = "PETICION_TEST_USUARIO_EDITARCONTRASENA_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_USUARIO_EDITARCONTRASENA_ATRIBUTOS_FRACASO";
          actionTest = "editarContrasena";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "usuarioAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_USUARIO_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_USUARIO_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_USUARIO_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_USUARIO_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
        case "Reactivar":
          code = "PETICION_TEST_USUARIO_REACTIVAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_USUARIO_REACTIVAR_ACCIONES_FRACASO";
          actionTest = "reactivar";
          break;
        case "EditarContrasena":
          code = "PETICION_TEST_USUARIO_EDITARCONTRASENA_ACCIONES_EXITO";
          codeFracaso =
            "PETICION_TEST_USUARIO_EDITARCONTRASENA_ACCIONES_FRACASO";
          actionTest = "editarContrasena";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestUsuario",
        "iconoTestUsuario" + tipoTest,
        "iconoTestUsuario" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Usuario" + accion,
        "cuerpo" + tipoTest + "Usuario" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GESTION DE CATEGORIA///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de usuario */
async function testCategoria(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "categoriaAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_CATEGORIA_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_CATEGORIA_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_CATEGORIA_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_CATEGORIA_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_CATEGORIA_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_CATEGORIA_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
        case "Reactivar":
          code = "PETICION_TEST_CATEGORIA_REACTIVAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_REACTIVAR_ATRIBUTOS_FRACASO";
          actionTest = "reactivar";
          break;
        case "EditarContrasena":
          code = "PETICION_TEST_CATEGORIA_EDITARCONTRASENA_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_CATEGORIA_EDITARCONTRASENA_ATRIBUTOS_FRACASO";
          actionTest = "editarContrasena";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "categoriaAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_CATEGORIA_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_CATEGORIA_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_CATEGORIA_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_CATEGORIA_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
        case "Reactivar":
          code = "PETICION_TEST_CATEGORIA_REACTIVAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_CATEGORIA_REACTIVAR_ACCIONES_FRACASO";
          actionTest = "reactivar";
          break;
        case "EditarContrasena":
          code = "PETICION_TEST_CATEGORIA_EDITARCONTRASENA_ACCIONES_EXITO";
          codeFracaso =
            "PETICION_TEST_CATEGORIA_EDITARCONTRASENA_ACCIONES_FRACASO";
          actionTest = "editarContrasena";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestCategoria",
        "iconoTestCategoria" + tipoTest,
        "iconoTestCategoria" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Categoria" + accion,
        "cuerpo" + tipoTest + "Categoria" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GESTION DE PROCESO///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de usuario */
async function testProceso(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "procesoAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_PROCESO_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_PROCESO_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_PROCESO_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_PROCESO_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_PROCESO_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "procesoAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_PROCESO_INSERTAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_PROCESO_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_PROCESO_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_PROCESO_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestProceso",
        "iconoTestProceso" + tipoTest,
        "iconoTestProceso" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "Proceso" + accion,
        "cuerpo" + tipoTest + "Proceso" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GESTION DE PROCESO USUARIO///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Función que obtiene los test de usuario */
async function testProcesoUsuario(accion, tipoTest) {
  imagenErrorTestOcultar();

  var code = "";
  var codeFracaso = "";
  var controladorTest = "";
  var actionTest = "";

  switch (tipoTest) {
    case "Atributos":
      controladorTest = "procesoUsuarioAtributos";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_PROCESO_USUARIO_INSERTAR_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_PROCESO_USUARIO_INSERTAR_ATRIBUTOS_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_PROCESO_USUARIO_BUSCAR_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_PROCESO_USUARIO_BUSCAR_ATRIBUTOS_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_PROCESO_USUARIO_EDITAR_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_PROCESO_USUARIO_EDITAR_ATRIBUTOS_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_PROCESO_USUARIO_BORRAR_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_PROCESO_USUARIO_BORRAR_ATRIBUTOS_FRACASO";
          actionTest = "borrar";
          break;
        case "VerEnDetalle":
          code = "PETICION_TEST_PROCESO_USUARIO_VERENDETALLE_ATRIBUTOS_EXITO";
          codeFracaso =
            "PETICION_TEST_PROCESO_USUARIO_VERENDETALLE_ATRIBUTOS_FRACASO";
          actionTest = "verEnDetalle";
          break;
      }
      break;
    case "Acciones":
      controladorTest = "procesoUsuarioAcciones";
      switch (accion) {
        case "Insertar":
          code = "PETICION_TEST_PROCESO_USUARIO_INSERTAR_ACCIONES_EXITO";
          codeFracaso =
            "PETICION_TEST_PROCESO_USUARIO_INSERTAR_ACCIONES_FRACASO";
          actionTest = "insertar";
          break;
        case "Buscar":
          code = "PETICION_TEST_PROCESO_USUARIO_BUSCAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_USUARIO_BUSCAR_ACCIONES_FRACASO";
          actionTest = "buscar";
          break;
        case "Modificar":
          code = "PETICION_TEST_PROCESO_USUARIO_EDITAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_USUARIO_EDITAR_ACCIONES_FRACASO";
          actionTest = "editar";
          break;
        case "Borrar":
          code = "PETICION_TEST_PROCESO_USUARIO_BORRAR_ACCIONES_EXITO";
          codeFracaso = "PETICION_TEST_PROCESO_USUARIO_BORRAR_ACCIONES_FRACASO";
          actionTest = "borrar";
          break;
      }
      break;
  }

  await test(code, codeFracaso, controladorTest, actionTest)
    .then((res) => {
      let idElementoList = [
        "iconoTestProcesoUsuario",
        "iconoTestProcesoUsuario" + tipoTest,
        "iconoTestProcesoUsuario" + tipoTest + accion,
      ];
      cargarRespuestaOkTest(
        res.datos,
        "cabecera" + tipoTest + "ProcesoUsuario" + accion,
        "cuerpo" + tipoTest + "ProcesoUsuario" + accion,
        "",
        "",
        idElementoList,
        tipoTest.toLowerCase()
      );
    })
    .catch((res) => {
      cargarModalErroresTest();
    });
  eliminarCampos();
}
