arrayEN = {
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////MAPPINGBASE////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Codigos MappingBase
  CONEXION_BD_KO:
    "Error connecting to the database. Contact your administrator.",
  SQL_KO: "Error executing sql.",
  RECORDSET_VACIO: "The recordset is empty.",
  RECORDSET_DATOS: "The recordset is not empty.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////ApiRest.php////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Excepciones de ApiRest.php
  PETICION_INVALIDA: "Invalid request.",
  ACTION_NO_ENCONTRADA: "Action not found.",
  PUNTO_ACCESO_TEST_INVALIDO:
    "The access point to run the test does not exist.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////JWT////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////decode
  TOKEN_CLAVE_VACIA: "The key is empty.",
  TOKEN_NUMERO_INCORRECTO_SEGMENTOS:
    "Incorrect number of segments that make up the token.",
  TOKEN_HEADER_NO_VALIDO: "Invalid JWT token header encoding.",
  TOKEN_PAYLOAD_NO_VALIDO: "Invalid JWT token privilege encoding.",
  TOKEN_SIGN_NO_VALIDO: "Invalid JWT token signing encoding.",
  TOKEN_FALLO_VERIFICACION_SIGN: "Signature verification failed.",
  TOKEN_USO_FUTURO:
    "The token has been created at a later time than the current one, this means that it has been created for future use.",
  TOKEN_CADUCADO: "The system token is expired.",

  TOKEN_MAXIMUN_STACK_DEPTH_EXCEEDED: "Maximun stack depth exceeded.",
  TOKEN_INVALID_OR_MALFORMED_JSON: "Invalid or malformed JSON.",
  TOKEN_UNEXPECTED_CONTROL_CHARACTER_FOUND:
    "Unexpected control character found.",
  TOKEN_SYNTAX_ERROR_MALFORMED_JSON: "Syntax error malformed JSON.",
  TOKEN_MALFORMED_UTF8_CHARACTERS: "Malformed UTF-8 characters.",
  TOKEN_NULL_RESULT_WITH_NON_NULL_INPUT: "Null result with non null input.",
  TOKEN_ERROR_TOKEN_INTRODUCIDO: "Error token introducido.",

  ////encode->sign
  //Solo se recogen como códigos las excepciones para el JWT con el algoritmo y los casos para lo que lo hemos definido
  TOKEN_ALGORITMO_NO_SOPORTADO: "The selected algorithm is not supported.",
  TOKEN_FALLO_FIRMA_OPENSSL: "OpenSSL cannot sign data.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////ATRIBUTO//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////auth_VALIDATION_ATRIBUTO
  //usuario
  LOGIN_USUARIO_VACIO: "The user login is empty.",
  LOGIN_USUARIO_MENOR_QUE_3: "The size of the username cannot be less than 3.",
  LOGIN_USUARIO_MAYOR_QUE_15:
    "The size of the username cannot be greater than 15.",
  LOGIN_USUARIO_ALFANUMERICO_INCORRECTO:
    "The username cannot contain more than letters and numbers, blank characters, ñ, accents or special characters are not accepted.",
  //contrasena
  CONTRASENA_USUARIO_VACIA: "The password cannot be empty.",
  CONTRASENA_USUARIO_MENOR_QUE_3: "User password has less than 3 characters.",
  CONTRASENA_USUARIO_MAYOR_QUE_45:
    "User password is longer than 45 characters.",
  CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA:
    "Password security compromised. Incorrect password length.",
  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO:
    "La contraseña de usuario sólo puede contener números y letras",
  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO:
    "User password can only contain numbers and letters.",
  //dni
  DNI_VACIO: "The DNI is empty.",
  DNI_MENOR_QUE_9: "The DNI cannot have less than 9 characters.",
  DNI_MAYOR_QUE_9: "The DNI cannot have more than 9 characters.",
  DNI_FORMATO_INCORRECTO:
    "The DNI format is incorrect, it must be 8 numbers and a letter.",
  DNI_LETRA_INCORRECTA: "The letter entered in the DNI is not correct.",
  //nombre
  NOMBRE_VACIO: "The name cannot be empty.",
  NOMBRE_FORMATO_INCORRECTO: "The username cannot contain more than letters.",
  NOMBRE_MENOR_QUE_3: "The username cannot be less than 3.",
  NOMBRE_MAYOR_QUE_45: "The username cannot be greater than 45.",
  //apellidos
  APELLIDOS_VACIO: "Last names cannot be empty.",
  APELLIDOS_FORMATO_INCORRECTO:
    "The user´s surnames cannot contain more than letters.",
  APELLIDOS_MENOR_QUE_3: "The user´s last names cannot be less than 3.",
  APELLIDOS_MAYOR_QUE_45: "The user´s last names cannot be greater than 45.",
  //fechaNacimiento
  FECHA_NACIMIENTO_VACIA: "Empty date of birth.",
  FECHA_NACIMIENTO_MENOR_QUE_8: "The date of birth has less than 8 characters.",
  FECHA_NACIMIENTO_MAYOR_QUE_8: "The date of birth has more than 8 characters.",
  FECHA_NACIMIENTO_NUMERICA_INCORRECTA:
    "The date of birth can only contain numbers.",
  //direccion
  DIRECCION_VACIA: "The length of the address must not be empty.",
  DIRECCION_FORMATO_INCORRECTO:
    "The address must only contain letters, numbers º and ª.",
  DIRECCION_MENOR_5:
    "The length of the address must not be less than 5 characters.",
  DIRECCION_MAYOR_200:
    "The length of the address must not be greater than 200 characters.",
  //telefono
  TELEFONO_VACIO: "The telephone number cannot be empty.",
  TELEFONO_FORMATO_INCORRECTO:
    "The telephone format is not correct, it must be 9 numbers.",
  TELEFONO_MENOR_QUE_9: "The size of the phone number cannot be less than 9.",
  TELEFONO_MAYOR_QUE_9:
    "The size of the phone number cannot be greater than 9.",
  //email
  EMAIL_VACIO: "The email cannot be empty.",
  EMAIL_LONGITUD_MINIMA: "The email must have at least 6 characters.",
  EMAIL_LONGITUD_MAXIMA: "The email must have less than 40 characters.",
  EMAIL_FORMATO_INCORRECTO: "The email format is not correct.",

  //////usuario_VALIDATION_ATRIBUTO
  //Todos recogidos anteriormente en auth_VALIDATION_ATRIBUTO
  //id_rol
  ID_ROL_VACIO: "The role id is empty.",
  ID_ROL_ERROR_FORMATO: "The role id format is incorrect.",
  //borrado_logico_buscar
  BORRADO_LOGICO_DIFERENTE_0_1: "The deletion flag for person must be 0 or 1.",

  //////rol_VALIDATION_ATRIBUTO
  //id_rol recogido en auth_VALIDATION_ATRIBUTO
  //nombre_rol
  ROL_NOMBRE_VACIO: "The role name is empty.",
  ROL_NOMBRE_MENOR_QUE_3: "The role name is less than 3.",
  ROL_NOMBRE_MAYOR_QUE_48: "The role name is greater than 48.",
  ROL_NOMBRE_FORMATO_INCORRECTO:
    "The role name has a wrong format, only letters and numbers.",
  //decripcion_rol
  ROL_DESCRIPCION_VACIO:
    "The role name has a wrong format, only letters and numbers.",
  ROL_DESCRIPCION_MENOR_QUE_3: "The role description is less than 3.",
  ROL_DESCRIPCION_MAYOR_QUE_200: "The role description is greater than 200.",
  ROL_DESCRIPCION_FORMATO_INCORRECTO:
    "The role description has a wrong format, only letters and numbers.",

  //////funcionalidad_VALIDATION_ATRIBUTO
  //id_funcionalidad
  ID_FUNCIONALIDAD_VACIO: "The id of the functionality is empty.",
  ID_FUNCIONALIDAD_ERROR_FORMATO:
    "The format of the functionality id is incorrect.",
  //nombre_funcionalidad
  FUNCIONALIDAD_NOMBRE_VACIO: "The name of the functionality is empty.",
  FUNCIONALIDAD_NOMBRE_MENOR_QUE_3:
    "The name of the functionality is less than 3.",
  FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48:
    "The name of the functionality is greater than 48.",
  FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO:
    "The name of the functionality has a wrong format, only letters and numbers.",
  //descripcion_funcionalidad
  FUNCIONALIDAD_DESCRIPCION_VACIO:
    "The description of the functionality cannot be empty.",
  FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3:
    "The description of the functionality is less than 3.",
  FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200:
    "The description of the functionality is greater than 200.",
  FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO:
    "The description of the functionality has a wrong format, only letters and numbers.",

  //////accion_VALIDATION_ATRIBUTO
  //id_accion
  ID_ACCION_VACIO: "The id of the action is empty.",
  ID_ACCION_ERROR_FORMATO: "The format of the action id is incorrect.",
  //nombre_accion
  ACCION_NOMBRE_VACIO: "The action name is empty.",
  ACCION_NOMBRE_MENOR_QUE_3: "The action name is less than 3.",
  ACCION_NOMBRE_MAYOR_QUE_48: "The action name is greater than 48.",
  ACCION_NOMBRE_FORMATO_INCORRECTO:
    "The action name has a wrong format, only letters and numbers.",
  //descripcion_accion
  ACCION_DESCRIPCION_VACIO: "The description of the action cannot be empty.",
  ACCION_DESCRIPCION_MENOR_QUE_3:
    "The description of the action is less than 3.",
  ACCION_DESCRIPCION_MAYOR_QUE_200:
    "The description of the action is greater than 200.",
  ACCION_DESCRIPCION_FORMATO_INCORRECTO:
    "The description of the action has a wrong format, only letters and numbers.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////ACCION///////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  CERRARMODAL: "Close",
  RECUPERAR_CONTRASENA_EMAIL_OK:
    "The password has been changed, check your mail.",
  RECUPERAR_PASS_OK:
    "The password has been successfully recovered. Please check your email to see the new password.",
  CONTRASEÑA_CHANGE_OK: "PASSWORD CHANGED CORRECTLY.",
  PASSWORD_CAMBIADA: "User password has been changed successfully.",

  ////auth_VALIDATION_ACCION
  USUARIO_NO_EXISTE: "The user does not exist in the system.",
  CONTRASENA_INCORRECTO: "The password is not correct.",
  USUARIO_ELIMINADO: "User is deleted.",
  USUARIO_YA_EXISTE: "The user already exists in the system.",
  EMAIL_YA_EXISTE: "A user with that email already exists.",
  EMAIL_NO_EXISTE: "The email does not exist.",
  USUARIO_EMAIL_NO_COINCIDEN: "The user and the email do not match.",

  ////usuario_VALIDATION_ACCION
  //insertar
  USUARIO_ROL_NO_VALIDO: "The user cannot register with that role.",
  ACCION_DENEGADA_INSERTAR_USUARIO:
    "Only the administrator can insert a new user.",

  //editar
  EMAIL_USUARIO_YA_EXISTE: "A user with that email already exists.",
  ACCION_DENEGADA_EDITAR_USUARIO:
    "Only the administrator can edit the data of a user and a user their own.",

  //borrar
  ADMIN_NO_SE_PUEDE_BORRAR: "Cannot delete system administrator.",
  ACCION_DENEGADA_BORRAR_USUARIO: "Only the administrator can delete a user.",

  //reactivar
  USUARIO_YA_ACTIVO: "Cannot reactivate an already active user.",
  ACCION_DENEGADA_REACTIVAR_USUARIO:
    "Only the administrator can reactivate the user.",

  //buscar

  //verEnDetalle

  ////rol_VALIDATION_ACCION
  //insertar
  ROL_YA_EXISTE: "This role name already exists in the system.",
  ACCION_DENEGADA_INSERTAR_ROL: "Only the administrator can insert a new role.",

  //editar
  ROL_NO_EXISTE: "This role name does not exist in the system.",
  ACCION_DENEGADA_EDITAR_ROL:
    "Only the administrator can edit the data of a role.",

  //borrar
  ROL_ASOCIADO_PERMISO:
    "Cannot delete a role that is associated with a permission.",
  ROL_ASOCIADO_USUARIO_ACTIVO:
    "Cannot delete a role that is associated with a user.",
  ACCION_DENEGADA_BORRAR_ROL: "Only the administrator can delete a role.",

  //reactivar
  ROL_YA_ACTIVO: "Only the administrator can reactivate a role.",
  ACCION_DENEGADA_REACTIVAR_ROL:
    "Only the administrator can reactivate a role.",

  //buscar

  //verEnDetalle

  ////funcionalidad_VALIDATION_ACCION
  //insertar
  FUNCIONALIDAD_YA_EXISTE: "Cannot insert functionality that already exists.",
  ACCION_DENEGADA_INSERTAR_FUNCIONALIDAD:
    "Only the administrator can insert a new functionality.",

  //editar
  FUNCIONALIDAD_NO_EXISTE: "The functionality to be edited does not exist.",
  ACCION_DENEGADA_EDITAR_FUNCIONALIDAD:
    "Only the administrator can edit the data of a functionality.",

  //borrar
  FUNCIONALIDAD_ASOCIADO_PERMISO:
    "Cannot delete a feature that is associated with a permission.",
  ACCION_DENEGADA_BORRAR_FUNCIONALIDAD:
    "Only the administrator can delete a feature.",

  //buscar

  //verEnDetalle

  ////accion_VALIDATION_ACCION
  //insertar
  ACCION_YA_EXISTE: "Cannot insert an action that already exists.",
  ACCION_DENEGADA_INSERTAR_ACCION:
    "Only the administrator can insert a new action.",

  //editar
  ACCION_NO_EXISTE: "The action to be edited does not exist.",
  ACCION_DENEGADA_EDITAR_ACCION:
    "Only the administrator can edit the data of an action.",

  //borrar
  ACCION_ASOCIADO_PERMISO:
    "Cannot delete an action that is associated with a permission.",
  ACCION_DENEGADA_BORRAR_ACCION: "Only the administrator can delete an action.",

  //buscar

  //verEnDetalle

  ////accion_VALIDATION_ACCION
  //insertar
  PERMISO_YA_EXISTE: "Cannot insert a permission that already exists.",
  ACCION_DENEGADA_INSERTAR_PERMISO:
    "Only the administrator can insert a new permission.",

  //editar

  //borrar
  PERMISO_NO_EXISTE: "The permission to be edited does not exist.",
  ACCION_DENEGADA_BORRAR_PERMISO:
    "Only the administrator can delete a permission.",

  //buscar

  //verEnDetalle

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////CONTROLLER/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////auth_CONTROLLER
  LOGIN_USUARIO_OK: "User logged in correctly.",
  REGISTRAR_USUARIO_OK: "User registered successfully.",
  RECUPERAR_CONTRASENA_EMAIL_OK:
    "The password has been changed, check your email.",

  ////usuario_CONTROLLER
  USUARIO_INSERTAR_OK: "User edited successfully.",
  USUARIO_EDITAR_OK: "User edited successfully.",
  USUARIO_EDITAR_CONTRASENA_OK: "Password edited successfully.",
  USUARIO_BORRAR_OK: "User deleted successfully.",
  USUARIO_REACTIVAR_OK: "User reactivated successfully.",

  ////rol_SERVICE
  ROL_INSERTAR_OK: "The role has been inserted correctly.",
  ROL_EDITAR_OK: "The role has been modified correctly.",
  ROL_BORRAR_OK: "The role has been deleted correctly.",
  ROL_REACTIVAR_OK: "The role has been reactivated.",

  ////funcionalidad_SERVICE
  FUNCIONALIDAD_INSERTAR_OK: "The functionality has been inserted correctly.",
  FUNCIONALIDAD_EDITAR_OK: "The functionality has been modified correctly.",
  FUNCIONALIDAD_BORRAR_OK: "The functionality has been deleted correctly.",
  ACCIONES_FUNCIONALIDAD: "Actions that have a functionality.",
  FUNCIONALIDADES_SISTEMA: "Existing functionalities in the system.",

  ////accion_SERVICE
  ACCION_INSERTAR_OK: "The action has been inserted correctly.",
  ACCION_EDITAR_OK: "The action has been modified correctly.",
  ACCION_BORRAR_OK: "The action has been deleted correctly.",

  ////permiso_SERVICE
  PERMISO_INSERTAR_OK: "The permission has been inserted correctly.",
  PERMISO_EDITAR_OK: "The permission has been modified correctly.",
  PERMISO_BORRAR_OK: "The permission has been deleted correctly.",
  PERMISOS_OBTENIDOS: "Permissions obtained for a functionality.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////CORREOS//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////correoGmail
  CONTRASENA_CAMBIADA_EMAIL_KO: "The password could not be changed.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////VALIDACIONES_LOGS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  MENSAJE_MAYOR_QUE_200:
    "The error message cannot be longer than 200 characters.",
  CODIGO_MAYOR_QUE_200: "The error code cannot be longer than 200 characters.",
  MENSAJE_FORMATO_INCORRECTO:
    "The error message is in the wrong format, only letters and numbers are allowed.",
  CODIGO_FORMATO_INCORRECTO:
    "The error code is in the wrong format, only letters and numbers are allowed.",
  TIEMPO_FORMATO_INCORRECTO:
    "The date entered does not respect the format, they must be numbers, letters and spaces.",
  TIEMPO_MAYOR_QUE_200: "The date must be less than 200 characters long.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////OTROS CODIGOS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //Atributos
  LOGIN_USUARIO: "User Name",
  PASS_USUARIO: "User Password",
  EMAIL_USUARIO: "User email",
  DNI: "DNI",
  DNI_USUARIO: "DNI",
  NOMBRE_PERSONA: "Name",
  APELLIDOS_PERSONA: "Surname",
  DIRECCION_PERSONA: "Address",
  FECHA_NACIMIENTO_PERSONA: "Date of birth",
  TELEFONO: "Telephone",
  EMAIL: "Email",
  PASS_USUARIO_NUEVA: "New user password",
  ORDENAR: "Sort",
  TYPE_EXCEPTION: "Exception type",
  DESCRIPTION_EXCEPTION: "Exception description",
  DATE: "Date",
  DATE_INICIO: "Start date",
  DATE_FIN: "End date",
  SI: "Yes",
  NO: "No",

  //Idiomas
  ESPAÑOL: "Spanish",
  INGLES: "English",
  GALEGO: "Galician",

  //Warnings bloqueo mayúsculas
  BLOQUEO_MAYUSCULAS: "Caps Lock enabled",

  //Tooltip campos obligatorios
  CAMPO_OBLIGATORIO: "Required Field",

  //Tooltip iconos
  ICONO_LOGIN: "Login",
  ICONO_REGISTRAR: "Register",
  ICONO_ENTRAR: "Enter",
  ICONO_RECUPERAR_PASS: "Recover password",
  ICONO_CERRAR: "Close",
  ICONO_RESET_PASS: "Change password",
  ICONO_ADD: "Add",
  ICONO_SEARCH: "Search",
  ICONO_SEARCH_DELETE: "Search Deleted",
  ICON_REFRECH_TABLE: "Refresh table",
  ICON_SHOW_HIDE_COLUMNS: "Hide/show columns",
  ICONO_EDIT: "Edit",
  ICONO_ELIMINAR: "Delete",
  ICONO_VOLVER: "Menu",
  ICONO_REACTIVAR: "Reactivate",
  ICONO_BACK: "Back",
  ICON_PERMISOS: "Permission management",
  ICONO_DETALLE: "Detail",
  ANTERIOR: "Previous",
  SIGUIENTE: "Next",
  ACTION: "Actions",

  //Tablas de gestión
  TITULO_MODAL: "Entity data",
  GESTION_ROLES: "Rol management",
  ROL_NOMBRE: "Rol name",
  ROL_DESCRIPCION: "Rol description",
  BORRADO_LOGICO: "Logical delete",
  GESTION_FUNCIONALIDADES: "Management of functionalities",
  FUNCIONALIDAD_NOMBRE: "Functionality name",
  FUNCIONALIDAD_DESCRIPCION: "Functionality description",
  GESTION_ACCIONES: "Management of actions",
  ACCION_NOMBRE: "Action name",
  ACCION_DESCRIPCION: "Action description",
  PERMISOS: "Permissions",
  LOGATRIBUTOS_GESTION: "Log of attributes",
  LOGACCIONES_GESTION: "Log of actions",
  LOGEXCEPCION_USUARIO: "User",
  LOGEXCEPCION_FUNCIONALIDAD: "Functionality",
  LOGEXCEPCION_ACCION: "Action",
  LOGEXCEPCION_CODIGO: "Code",
  LOGEXCEPCION_MENSAJE: "Message",
  LOGEXCEPCION_TIEMPO: "Time",
  GESTION_USUARIO: "User management",
  DATOS_USUARIO: "User info",
  TESTS: "Tests",

  //Mensajes error
  ERROR: "ERROR",
  ERROR_AUTENTICACION: "You do not have permission to access. Please try again",
  ERROR_LISTAR_FUNCIONALIDADES_MENU:
    "An error occurred while listing user features",
  STOP: "TRESPASSING PROHIBITED",
  ERROR_INTERNO: "INTERNAL ERROR",
  MENSAJE_ERROR_INTERNO:
    "Internal application error. Please contact administrator or try logging in in a few minutes.",
  ERR_CONNECTION_REFUSED:
    "Internal application error. Connection denied. Please contact administrator or try logging in in a few minutes.",
  ACCION_NO_ENCONTRADA: "Error sending request.",

  //Mensajes de texto
  OLVIDAR_CONTRASENA: "Forgot your password?",
  RELLENAR_FORM_PASS: "Fill in the form to retrieve it",
  RECUPERAR_PASS: "Recover password",
  ACCEDER_PAGINA: "Access earthTrack",
  MENSAJE_BIENVENIDA: "Welcome to earthTrack",
  DATOS_PERSONALES: "Personal Data",
  DATOS_USUARIO: "User Data",
  CONFIRMAR_PASS_USUARIO: "Confirm password",
  CONTRASEÑAS_NO_COINCIDEN: "Passwords don't match",
  SI: "Yes",
  NO: "No",
  FORMATO_DNI: "Format: 12345678A",
  FORMATO_TELF: "Format: 123456789",
  FORMATO_EMAIL: "Format: example@example.com",
  REGISTRO_PAGINA: "Register on earthTrack",
  CAMBIAR_CONTRASEÑA: "CHANGE PASSWORD",
  CAMBIAR_CONTRASEÑA_MENU: "Change password",
  MENU: "Menu",
  DESCONECTAR: "Disconnect",
  MENSAJE_TEST: "Tests",
  INSERTAR_ENTIDAD: "Insert successful.",
  EDITAR_ENTIDAD: "Edit successful.",
  ELIMINAR_ENTIDAD: "Deletion successful.",
  REACTIVAR_ENTIDAD: "Reactivation successful.",
  ERROR_ENTIDAD: "Action failed.",
  TITULO_NOTICIA_1: "Greenhouse Gas Protocol",
  CONTENIDO_NOTICIA_1:
    "The greenhouse effect is a process in which emitted radiation is absorbed by atmospheric greenhouse gases. This results in an increase in the mean surface temperature compared to what it was in the absence of the gie-12..",
  TITULO_NOTICIA_2: "What can users do in this app?",
  CONTENIDO_NOTICIA_2:
    "Users will be able to choose which processes they carry out and based on this, calculate their carbon footprint. The totality of processes generates the impact of each user on the planet.",
  TITULO_NOTICIA_3: "What is our goal?",
  CONTENIDO_NOTICIA_3:
    "That each user can contribute their grain of sand in the fight against climate change. It is everyone`s duty to help sustain the planet.",
};
