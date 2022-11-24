arrayGA = {
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////MAPPINGBASE////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Codigos MappingBase
  CONEXION_BD_KO:
    "Error ao conectar coa base de datos. Contacte co seu administrador.",
  SQL_KO: "Error ao executar o sql.",
  RECORDSET_VACIO: "O recordset esta baleiro.",
  RECORDSET_DATOS: "O recordset non esta baleiro.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////index.php////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Excepciones de index.php
  PETICION_INVALIDA: "Petición invalida.",
  ACTION_NO_ENCONTRADA: "Acción non encontrada.",
  PUNTO_ACCESO_TEST_INVALIDO:
    "O punto de acceso para executar o test non existe.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////JWT////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////decode
  TOKEN_CLAVE_VACIA: "Error de sesión. A clave está baleira.",
  TOKEN_NUMERO_INCORRECTO_SEGMENTOS:
    "Error de sesión. Número incorrecto de segmentos que forman o token.",
  TOKEN_HEADER_NO_VALIDO:
    "Error de sesión. Codificación da cabeceira do token JWT non válida.",
  TOKEN_PAYLOAD_NO_VALIDO:
    "Error de sesión. Codificación dos privilexios do token JWT non válida.",
  TOKEN_SIGN_NO_VALIDO:
    "Error de sesión. Codificación da firma do token JWT non válida.",
  TOKEN_FALLO_VERIFICACION_SIGN:
    "Error de sesión. Verificación da firma fallida.",
  TOKEN_USO_FUTURO:
    "Error de sesión. O token creouse nun momento posterior ao actual, isto significa que creouse para uso futuro.",
  TOKEN_CADUCADO: "Error de sesión. O token do sistema está caducado.",

  TOKEN_MAXIMUN_STACK_DEPTH_EXCEEDED:
    "Error de sesión. Superouse a profundidade máxima da pila.",
  TOKEN_INVALID_OR_MALFORMED_JSON:
    "Error de sesión. JSON inválido ou mal formado.",
  TOKEN_UNEXPECTED_CONTROL_CHARACTER_FOUND:
    "Error de sesión. Encontrouse un carácter de control inesperado.",
  TOKEN_SYNTAX_ERROR_MALFORMED_JSON:
    "Error de sesión. Error de sintaxis, JSON mal formado.",
  TOKEN_MALFORMED_UTF8_CHARACTERS:
    "Error de sesión. Caracteres UTF-8 con formato incorrecto.",
  TOKEN_NULL_RESULT_WITH_NON_NULL_INPUT:
    "Error de sesión. Resultado nulo con entrada non nula.",
  TOKEN_ERROR_TOKEN_INTRODUCIDO: "Error de sesión. Error do token introducido.",

  ////encode->sign
  //so se recogen como códigos las excepciones para el JWT con el algoritmo y los casos para lo que lo hemos definido
  TOKEN_ALGORITMO_NO_SOPORTADO:
    "Error de sesión. O algoritmo seleccionado non está soportado.",
  TOKEN_FALLO_FIRMA_OPENSSL: "Error de sesión. OpenSSL non pode firmar datos.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////ATRIBUTO//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////auth_VALIDATION_ATRIBUTO
  //usuario
  LOGIN_USUARIO_VACIO: "O login do usuario é baleiro.",
  LOGIN_MENOR_QUE_3: "O tamaño do nome do usuario non pode ser menor que 3.",
  LOGIN_MAYOR_QUE_15: "O tamaño do nome do usuario non pode ser maior que 15.",
  LOGIN_ALFANUMERICO_INCORRECTO:
    "O nome do usuario non pode conter maís que letras e números, non se aceptan caracteres en branco, ñ, tildes ou carcateres especiais.",
  //contrasena
  CONTRASENA_USUARIO_VACIA: "O contrasinal non pode estar baleiro.",
  CONTRASENA_USUARIO_MENOR_QUE_3:
    "O contrasinal de usuario ten menos de 3 caracteres.",
  CONTRASENA_USUARIO_MAYOR_QUE_45:
    "O contrasinal de usuario ten mais de 45 caracteres.",
  CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA:
    "Seguridad do contrasinal comprometida. Lonxitud do contrasinal incorrecta.",
  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO:
    "O contrasinal do usuario non pode conter maís que letras e números, non se aceptan caracteres en branco, ñ, tildes ou carcateres especiais.",
  //dni
  DNI_VACIO: "O DNI é baleiro.",
  DNI_MENOR_QUE_9: "O DNI non pode ter menos de 9 caracteres.",
  DNI_MAYOR_QUE_9: "O DNI non pode ter maís de 9 caracteres.",
  DNI_FORMATO_INCORRECTO:
    "O formato do DNI é incorrecto, deben ser 8 números e unha letra.",
  DNI_LETRA_INCORRECTA: "A letra introducida no DNI non é a correcta.",
  //nombre
  NOMBRE_VACIO: "O nome non pode ser baleiro.",
  NOMBRE_MENOR_QUE_3: "O nome do usuario non pode ser menor que 3.",
  NOMBRE_MAYOR_QUE_45: "O nome do usuario non pode ser maior que 45.",
  NOMBRE_FORMATO_INCORRECTO:
    "O nome do usuario non pode conter maís que letras.",
  //apellidos
  APELLIDOS_VACIO: "Os apelidos non poden ser baleiros.",
  APELLIDOS_MENOR_QUE_3: "Os apelidos do usuario non poden se menores que 3.",
  APELLIDOS_MAYOR_QUE_45:
    "Os apelidos do usuario non poden ser maiores que 45.",
  APELLIDOS_FORMATO_INCORRECTO:
    "Os apelidos do usuario non poden conter maís que letras.",
  //fechaNacimiento
  FECHA_NACIMIENTO_VACIA: "A data de nacemiento está valeira.",
  FECHA_NACIMIENTO_MENOR_QUE_8:
    "A data de nacemento non pode ter menos de 8 caracteres.",
  FECHA_NACIMIENTO_MAYOR_QUE_8:
    "A data de nacemento non pode ter mais de 8 caracteres.",
  FECHA_NACIMIENTO_NUMERICA_INCORRECTA:
    "A data de nacemento so pode conter números.",
  //direccion
  DIRECCION_VACIA: "A lonxitude da dirección non debe ser baleira.",
  DIRECCION_FORMATO_INCORRECTO:
    "A dirección só debe conter letras, números, /, º e ª.",
  DIRECCION_MENOR_5:
    "A lonxitude da dirección non debe ser maior de 5 caracteres.",
  DIRECCION_MAYOR_200:
    "A lonxitude da dirección non debe ser maior de 200 caracteres.",
  //telefono
  TELEFONO_VACIO: "O número de teléfono non pode ser baleiro.",
  TELEFONO_MENOR_QUE_9:
    "O tamaño do número de teléfono non pode ser menor que 9.",
  TELEFONO_MAYOR_QUE_9:
    "O tamaño do número de teléfono non pode ser maior que 9.",
  TELEFONO_FORMATO_INCORRECTO:
    "O formato do teléfono non é correcto, deben ser 9 números.",
  //email
  EMAIL_VACIO: "O email non pode ser baleiro.",
  EMAIL_LONGITUD_MINIMA: "O email debe ter polo menos 6 caracteres.",
  EMAIL_LONGITUD_MAXIMA: "O email debe ter menos de 40 caracteres.",
  EMAIL_FORMATO_INCORRECTO: "O formato do email non é correcto.",
  RECUPERAR_PASS_VACIO:
    "El email e/o el usuario para recuperar a contrasinal están vacíos",

  //////usuario_VALIDATION_ATRIBUTO
  //Todos recogidos anteriormente en auth_VALIDATION_ATRIBUTO
  //id_rol
  ID_ROL_VACIO: "O id do rol é baleiro.",
  ID_ROL_ERROR_FORMATO: "O formato do id do rol é incorrecto.",
  //borrado_logico_buscar
  BORRADO_LOGICO_DIFERENTE_0_1: "O flag de borrado debe ser 0 o 1.",

  //////rol_VALIDATION_ATRIBUTO
  //id_rol recogido en auth_VALIDATION_ATRIBUTO
  //nombre_rol
  ROL_NOMBRE_VACIO: "O nome do rol está valeiro.",
  ROL_NOMBRE_MENOR_QUE_3: "O nome do rol é menor de 3 caracteres.",
  ROL_NOMBRE_MAYOR_QUE_48: "O nome del rol es maior de 48 caracteres.",
  ROL_NOMBRE_FORMATO_INCORRECTO:
    "O nome do rol ten un formato erroneo, so letras e números.",
  //decripcion_rol
  ROL_DESCRIPCION_VACIO: "A descripción do rol non pode estar valeira.",
  ROL_DESCRIPCION_MENOR_QUE_3: "A descripción do rol é menor de 3 caracteres.",
  ROL_DESCRIPCION_MAYOR_QUE_200:
    "A descripcion do rol é maior de 200 caracteres.",
  ROL_DESCRIPCION_FORMATO_INCORRECTO:
    "A descripción do rol ten un formato erroneo, so letras e números.",

  //////funcionalidad_VALIDATION_ATRIBUTO
  //id_funcionalidad
  ID_FUNCIONALIDAD_VACIO: "O id da funcionalidade está valeiro.",
  ID_FUNCIONALIDAD_ERROR_FORMATO:
    "O formato do id da funcionalidade é incorrecto.",
  //nombre_funcionalidad
  FUNCIONALIDAD_NOMBRE_VACIO: "O nome da funcionalidade está valeiro.",
  FUNCIONALIDAD_NOMBRE_MENOR_QUE_3: "O nome da funcionalidade é menor de 3.",
  FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48: "O nome da funcionalidade é maior de 48.",
  FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO:
    "O nome da funcionalidade ten un formato erroneo, so letras e números.",
  //descripcion_funcionalidad
  FUNCIONALIDAD_DESCRIPCION_VACIO:
    "A descripción da funcionalidad non pode ser vacía.",
  FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3:
    "A descripción da funcionalidad é menor de 3.",
  FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200:
    "A descripción da funcionalidad é maior de 200.",
  FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO:
    "A descripción da funcionalidad ten un formato erroneo, so letras e números.",

  //////accion_VALIDATION_ATRIBUTO
  //id_accion
  ID_ACCION_VACIO: "O id da acción está valeiro.",
  ID_ACCION_ERROR_FORMATO: "O formato do id da acción é incorrecto.",
  //nombre_accion
  ACCION_NOMBRE_VACIO: "O nome da acción está vacio.",
  ACCION_NOMBRE_MENOR_QUE_3: "O nome da acción é menor de 3.",
  ACCION_NOMBRE_MAYOR_QUE_48: "O nome da acción é maior de 48.",
  ACCION_NOMBRE_FORMATO_INCORRECTO:
    "O nome da acción tiene un formato erroneo, so letras e números.",
  //descripcion_accion
  ACCION_DESCRIPCION_VACIO: "A descripción da acción non pode ser vacía.",
  ACCION_DESCRIPCION_MENOR_QUE_3:
    "A descripción da acción é menor de 3 caracteres.",
  ACCION_DESCRIPCION_MAYOR_QUE_200:
    "A descripción da acción é maior de 200 caracteres.",
  ACCION_DESCRIPCION_FORMATO_INCORRECTO:
    "A descripción da acción ten un formato erroneo, so letras e números.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////ACCION///////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  CERRARMODAL: "Cerrar",
  RECUPERAR_CONTRASENA_EMAIL_OK: "CONTRASEÑA RECUPERADA CORRECTAMENTE",
  RECUPERAR_PASS_OK:
    "O contrasinal foi recuperado correctamente. Por favor, revise teu correo para ver a nova contrasinal.",
  CONTRASEÑA_CHANGE_OK: "CONTRASEÑA MODIFICADA CORRECTAMENTE",
  PASSWORD_CAMBIADA: "A contrasinal de usuario foi modificada correctamente.",

  ////auth_VALIDATION_ACCION
  USUARIO_NO_EXISTE: "O usuario non existe no sistema.",
  CONTRASENA_INCORRECTO: "O contrasinal non é correcta.",
  USUARIO_ELIMINADO: "O usuario está eliminado.",
  USUARIO_YA_EXISTE: "Xa existe o usuario no sistema.",
  EMAIL_YA_EXISTE: "Xa existe un usuario con ese email.",
  EMAIL_NO_EXISTE: "Non existe o email.",
  USUARIO_EMAIL_NO_COINCIDEN: "O usuario e o email non coinciden.",

  ////usuario_VALIDATION_ACCION
  //insertar
  USUARIO_ROL_NO_VALIDO: "O usuario non pode darse de alta con ese rol.",
  ACCION_DENEGADA_INSERTAR_USUARIO:
    "So o administrador pode insertar un novo usuario.",

  //editar
  EMAIL_USUARIO_YA_EXISTE: "Xa existe un usuario con ese email.",
  ACCION_DENEGADA_EDITAR_USUARIO:
    "So o administrador pode editar os datos de un usuario e un usuario os seus propios.",

  //borrar
  ADMIN_NO_SE_PUEDE_BORRAR: "Non se pode borrar o administrador do sistema.",
  ACCION_DENEGADA_BORRAR_USUARIO: "So o administrador pode borrar un usuario.",

  //reactivar
  USUARIO_YA_ACTIVO: "Non se pode reactivar un usuario xa activo.",
  ACCION_DENEGADA_REACTIVAR_USUARIO:
    "So o administrador pode reactivar o usuario.",

  //buscar

  //verEnDetalle

  ////rol_VALIDATION_ACCION
  //insertar
  ROL_YA_EXISTE: "Non se pode insertar un rol que xa existe.",
  ACCION_DENEGADA_INSERTAR_ROL: "So o administrador pode insertar un novo rol.",

  //editar
  ROL_NO_EXISTE: "O rol que se pretende editar non existe.",
  ACCION_DENEGADA_EDITAR_ROL:
    "So o administrador pode editar os datos de un rol.",

  //borrar
  ROL_ASOCIADO_PERMISO:
    "Non se pode borrar un rol que está asociado a un permiso.",
  ROL_ASOCIADO_USUARIO_ACTIVO:
    "Non se pode borrar un rol que está asociado a un usuario.",
  ACCION_DENEGADA_BORRAR_ROL: "So o administrador pode borrar un rol.",

  //reactivar
  ROL_YA_ACTIVO: "So o administrador pode reactivar un rol.",
  ACCION_DENEGADA_REACTIVAR_ROL: "So o administrador pode reactivar un rol.",

  //buscar

  //verEnDetalle

  ////funcionalidad_VALIDATION_ACCION
  //insertar
  FUNCIONALIDAD_YA_EXISTE:
    "No se pode insertar unha funcionalidade que xa existe.",
  ACCION_DENEGADA_INSERTAR_FUNCIONALIDAD:
    "So o administrador pode insertar unha nova funcionalidade.",

  //editar
  FUNCIONALIDAD_NO_EXISTE:
    "A funcionalidade que se pretende editar non existe.",
  ACCION_DENEGADA_EDITAR_FUNCIONALIDAD:
    "So o administrador pode editar os datos de unha funcionalidade.",

  //borrar
  FUNCIONALIDAD_ASOCIADO_PERMISO:
    "Non se pode borrar unha funcionalidade que está asociada a un permiso.",
  ACCION_DENEGADA_BORRAR_FUNCIONALIDAD:
    "So o administrador pode borrar unha funcionalidade.",

  //buscar

  //verEnDetalle

  ////accion_VALIDATION_ACCION
  //insertar
  ACCION_YA_EXISTE: "Non se pode insertar unha accion que xa existe.",
  ACCION_DENEGADA_INSERTAR_ACCION:
    "So o administrador pode insertar unha nova accion.",

  //editar
  ACCION_NO_EXISTE: "A accion que se pretende editar non existe.",
  ACCION_DENEGADA_EDITAR_ACCION:
    "So o administrador pode editar os datos de unha accion.",

  //borrar
  ACCION_ASOCIADO_PERMISO:
    "Non se pode borrar unha accion que está asociada a un permiso.",
  ACCION_DENEGADA_BORRAR_ACCION: "So o administrador pode borrar unha accion.",

  //buscar

  //verEnDetalle

  ////accion_VALIDATION_ACCION
  //insertar
  PERMISO_YA_EXISTE: "Non se pode insertar un permiso que xa existe.",
  ACCION_DENEGADA_INSERTAR_PERMISO:
    "So o administrador pode insertar un nuevo permiso.",

  //editar

  //borrar
  PERMISO_NO_EXISTE: "O permiso que se pretende editar non existe.",
  ACCION_DENEGADA_BORRAR_PERMISO: "So o administrador pode borrar un permiso.",

  //buscar

  //verEnDetalle

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////CONTROLLER/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////auth_CONTROLLER
  LOGIN_USUARIO_OK: "Usuario logueado correctamente.",
  REGISTRAR_USUARIO_OK: "Usuario rexistrado correctamente.",
  RECUPERAR_CONTRASENA_EMAIL_OK:
    "A contrasinal foi cambiada, revise o seu correo.",

  ////usuario_CONTROLLER
  USUARIO_INSERTAR_OK: "Usuario insertado con éxito.",
  USUARIO_EDITAR_OK: "Usuario editado con éxito.",
  USUARIO_EDITAR_CONTRASENA_OK: "Contrasinal editada con éxito.",
  USUARIO_BORRAR_OK: "Usuario eliminado con éxito.",
  USUARIO_REACTIVAR_OK: "Usuario reactivado con éxito.",

  ////rol_SERVICE
  ROL_INSERTAR_OK: "O rol foi insertado correctamente.",
  ROL_EDITAR_OK: "O rol foi modificado correctamente.",
  ROL_BORRAR_OK: "O rol foi borrado correctamente.",
  ROL_REACTIVAR_OK: "O rol foi reactivado.",

  ////funcionalidad_SERVICE
  FUNCIONALIDAD_INSERTAR_OK: "A funcionalidad foi insertada correctamente.",
  FUNCIONALIDAD_EDITAR_OK: "A funcionalidad foi modificada correctamente.",
  FUNCIONALIDAD_BORRAR_OK: "A funcionalidad foi borrada correctamente.",
  ACCIONES_FUNCIONALIDAD: "Accións que posue unha funcionalidade.",
  FUNCIONALIDADES_SISTEMA: "Funcionalidades existentes no sistema.",

  ////accion_SERVICE
  ACCION_INSERTAR_OK: "A accion foi insertada correctamente.",
  ACCION_EDITAR_OK: "A accion foi modificada correctamente.",
  ACCION_BORRAR_OK: "A accion foi borrada correctamente.",

  ////permiso_SERVICE
  PERMISO_INSERTAR_OK: "O permiso foi insertada correctamente.",
  PERMISO_EDITAR_OK: "O permiso foi modificada correctamente.",
  PERMISO_BORRAR_OK: "O permiso foi borrada correctamente.",
  PERMISOS_OBTENIDOS: "Permisos obtenidos para unha funcionalidade.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////CORREOS//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////correoGmail
  CONTRASENA_CAMBIADA_EMAIL_KO: "A contrasinal non foi cambiada.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////VALIDACIONES_LOGS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  MENSAJE_MAYOR_QUE_200:
    "A mensaxe de error non pode ser superior a 200 caracteres.",
  CODIGO_MAYOR_QUE_200:
    "O código de error non pode ser superior a 200 caracteres.",
  MENSAJE_FORMATO_INCORRECTO:
    "A mensaxe de error presenta un formato incorrecto, so se admiten letras e números.",
  CODIGO_FORMATO_INCORRECTO:
    "O código de error presenta un formato incorrecto, so se admiten letras e números.",
  TIEMPO_FORMATO_INCORRECTO:
    "A data introducida no respeta el formato, deben de ser números, letras e espacios.",
  TIEMPO_MAYOR_QUE_200:
    "A data debe de tener unha lonxitude menor a 200 caracteres.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////OTROS CODIGOS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //Atributos
  LOGIN_USUARIO: "Nome de Usuario",
  PASS_USUARIO: "Contrasinal de Usuario",
  EMAIL_USUARIO: "Email usuario",
  DNI: "DNI",
  DNI_USUARIO: "DNI",
  NOMBRE_PERSONA: "Nome",
  APELLIDOS_PERSONA: "Apelidos",
  DIRECCION_PERSONA: "Dirección",
  FECHA_NACIMIENTO_PERSONA: "Data de nacemento",
  TELEFONO: "Teléfono",
  EMAIL: "Email",
  PASS_USUARIO_NUEVA: "Nova contrasinal de usuario",
  ORDENAR: "Ordenar",
  TYPE_EXCEPTION: "Tipo excepción",
  DESCRIPTION_EXCEPTION: "Descripción excepción",
  DATE: "Data",
  DATE_INICIO: "Data inicio",
  DATE_FIN: "Data fin",
  SI: "Si",
  NO: "Non",

  //Idiomas
  ESPAÑOL: "Español",
  INGLES: "Inglés",
  GALEGO: "Galego",

  //Warnings bloqueo mayúsculas
  BLOQUEO_MAYUSCULAS: "Bloqueo de mayúsculas activado",

  //Tooltip campos obligatorios
  CAMPO_OBLIGATORIO: "Campo obligatorio",

  //Tooltip iconos
  ICONO_LOGIN: "Login",
  ICONO_REGISTRAR: "Rexistrar",
  ICONO_ENTRAR: "Entrar",
  ICONO_RECUPERAR_PASS: "Recuperar contrasinal",
  ICONO_CERRAR: "Cerrar",
  ICONO_RESET_PASS: "Cambiar contrasinal",
  ICONO_ADD: "Engadir",
  ICONO_SEARCH: "Buscar",
  ICONO_SEARCH_DELETE: "Buscar eliminados",
  ICON_REFRECH_TABLE: "Refrescar tabla",
  ICON_SHOW_HIDE_COLUMNS: "Ocultar/mostrar columnas",
  ICONO_EDIT: "Editar",
  ICONO_ELIMINAR: "Eliminar",
  ICONO_VOLVER: "Menú",
  ICONO_REACTIVAR: "Reactivar",
  ICONO_BACK: "Volver",
  ICON_PERMISOS: "Xestión de permisos",
  ICONO_DETALLE: "Detalle",
  ANTERIOR: "Anterior",
  SIGUIENTE: "Seguinte",
  ACTION: "Accións",

  //Tablas de gestión
  TITULO_MODAL: "Datos da entidade",
  GESTION_ROLES: "Xestión de roles",
  ROL_NOMBRE: "Nome rol",
  ROL_DESCRIPCION: "Descripción rol",
  BORRADO_LOGICO: "Borrado lógico",
  GESTION_FUNCIONALIDADES: "Xestión de funcionalidade",
  FUNCIONALIDAD_NOMBRE: "Nome funcionalidade",
  FUNCIONALIDAD_DESCRIPCION: "Descripción funcionalidade",
  GESTION_ACCIONES: "Xestión de accións",
  ACCION_NOMBRE: "Nome acción",
  ACCION_DESCRIPCION: "Descripción acción",
  PERMISOS: "Permisos",
  LOGATRIBUTOS_GESTION: "Log de atributos",
  LOGACCIONES_GESTION: "Log de accións",
  LOGEXCEPCION_USUARIO: "Usuario",
  LOGEXCEPCION_FUNCIONALIDAD: "Funcionalidade",
  LOGEXCEPCION_ACCION: "Acción",
  LOGEXCEPCION_CODIGO: "Código",
  LOGEXCEPCION_MENSAJE: "Mensaxe",
  LOGEXCEPCION_TIEMPO: "Tempo",
  GESTION_USUARIO: "Xestión de usuarios",
  DATOS_USUARIO: "Datos do usuario",
  TESTS: "Tests",

  //Mensajes error
  ERROR: "ERROR",
  ERROR_AUTENTICACION: "Non tes permiso para acceder. Volve  intentalo",
  ERROR_LISTAR_FUNCIONALIDADES_MENU:
    "Ocurriu un erro ao listar as funcionalidades do usuario",
  STOP: "PROHIBIDO O PASO",
  ERROR_INTERNO: "ERROR INTERNO",
  MENSAJE_ERROR_INTERNO:
    "Error interno da aplicación. Contacte có administrador ou intente acceder nuns minutos.",
  ERR_CONNECTION_REFUSED:
    "Error interno da aplicación. Conexión denegada. Contacte có administrador ou intente acceder nuns minutos.",
  ACCION_NO_ENCONTRADA: "Error ao enviar a petición.",

  //Mensajes de texto
  OLVIDAR_CONTRASENA: "¿Olvidou a sua contrasinal?",
  RELLENAR_FORM_PASS: "Rellene o formulario para recuperala",
  RECUPERAR_PASS: "Recuperar contrasinal",
  ACCEDER_PAGINA: "Accede a earthTrack",
  MENSAJE_BIENVENIDA: "Benvido a earthTrack",
  DATOS_PERSONALES: "Datos Personais",
  DATOS_USUARIO: "Datos de Usuario",
  CONFIRMAR_PASS_USUARIO: "Confirmar contrasinal",
  CONTRASEÑAS_NO_COINCIDEN: "As contrasinais non coinciden",
  SI: "Sí",
  NO: "No",
  FORMATO_DNI: "Formato: 12345678A",
  FORMATO_TELF: "Formato: 123456789",
  FORMATO_EMAIL: "Formato: ejemplo@ejemplo.com",
  REGISTRO_PAGINA: "Rexistrate en earthTrack",
  CAMBIAR_CONTRASEÑA: "CAMBIAR CONTRASINAL",
  CAMBIAR_CONTRASEÑA_MENU: "Cambiar contrasinal",
  MENU: "Menú",
  DESCONECTAR: "Desconectar",
  MENSAJE_TEST: "Tests",
  INSERTAR_ENTIDAD: "Inserción realizada con éxito.",
  EDITAR_ENTIDAD: "Edición realizada con éxito.",
  ELIMINAR_ENTIDAD: "Eliminación realizada con éxito.",
  REACTIVAR_ENTIDAD: "Reactivación realizada con éxito.",
  ERROR_ENTIDAD: "Error na acción.",
  TITULO_NOTICIA_1: "Protocolo de gases de efecto invernadero",
  CONTENIDO_NOTICIA_1:
    "O efecto invernadero é un proceso no que a radiación emitida é absorbida polos gases de efecto invernadero atmosférico. Esto resulta no incremento da temperatura media respecto a había en ausencia dos gie-12.",
  TITULO_NOTICIA_2: "Qué poden facer os usuarios nesta aplicación?",
  CONTENIDO_NOTICIA_2:
    "Os usuarios van a poder elixir que procesos realizan e en base a esto calcular a súa huella de carbono. O total de procesos da como resultado o impacto de cada usuario no planeta.",
  TITULO_NOTICIA_3: "Cal é a nosa meta?",
  CONTENIDO_NOTICIA_3:
    "Que cada usuario poida aportar su grano de area na loita contra o cambio climático. É deber de todos axudar no sostemento do planeta.",
};
