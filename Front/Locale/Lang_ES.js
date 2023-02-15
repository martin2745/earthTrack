arrayES = {
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////MAPPINGBASE////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Codigos MappingBase
  CONEXION_BD_KO:
    "Error al conectar con la base de datos. Contacte con su administrador.",
  SQL_KO: "Error al ejecutar el sql.",
  RECORDSET_VACIO: "El recordset esta vacío.",
  RECORDSET_DATOS: "El recordset no esta vacío.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////index.php////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Excepciones de index.php
  PETICION_INVALIDA: "Petición inválida.",
  ACTION_NO_ENCONTRADA: "Acción no encontrada.",
  PUNTO_ACCESO_TEST_INVALIDO:
    "El punto de acceso para ejecutar el test no existe.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////JWT////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////decode
  TOKEN_CLAVE_VACIA: "Error de sesión. La clave está vacía.",
  TOKEN_NUMERO_INCORRECTO_SEGMENTOS:
    "Error de sesión. Número incorrecto de segmentos que forman el token.",
  TOKEN_HEADER_NO_VALIDO:
    "Error de sesión. Codificación de encabezado del token JWT no válida.",
  TOKEN_PAYLOAD_NO_VALIDO:
    "Error de sesión. Codificación de privilegios del token JWT no válida.",
  TOKEN_SIGN_NO_VALIDO:
    "Error de sesión. Codificación de firma de token JWT no válida.",
  TOKEN_FALLO_VERIFICACION_SIGN:
    "Error de sesión. Verificación de firma fallida.",
  TOKEN_USO_FUTURO:
    "Error de sesión. El token se ha creado en un momento posterior al actual, esto significa que se ha creado para uso futuro.",
  TOKEN_CADUCADO: "Error de sesión. El token del sistema está caducado.",

  TOKEN_MAXIMUN_STACK_DEPTH_EXCEEDED:
    "Error de sesión. Se superó la profundidad máxima de pila.",
  TOKEN_INVALID_OR_MALFORMED_JSON:
    "Error de sesión. JSON inválido o mal formado.",
  TOKEN_UNEXPECTED_CONTROL_CHARACTER_FOUND:
    "Error de sesión. Se encontró un carácter de control inesperado.",
  TOKEN_SYNTAX_ERROR_MALFORMED_JSON:
    "Error de sesión. Error de sintaxis, JSON mal formado.",
  TOKEN_MALFORMED_UTF8_CHARACTERS:
    "Error de sesión. Caracteres UTF-8 con formato incorrecto.",
  TOKEN_NULL_RESULT_WITH_NON_NULL_INPUT:
    "Error de sesión. Resultado nulo con entrada no nula.",
  TOKEN_ERROR_TOKEN_INTRODUCIDO:
    "Error de sesión. Error del token introducido.",

  ////encode->sign
  //Solo se recogen como códigos las excepciones para el JWT con el algoritmo y los casos para lo que lo hemos definido
  TOKEN_ALGORITMO_NO_SOPORTADO:
    "Error de sesión. El algoritmo seleccionado no está soportado.",
  TOKEN_FALLO_FIRMA_OPENSSL: "Error de sesión. OpenSSL no puede firmar datos.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////ATRIBUTO//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////auth_VALIDATION_ATRIBUTO
  //usuario
  LOGIN_USUARIO_VACIO: "El login de usuario es vacio.",
  LOGIN_USUARIO_MENOR_QUE_3:
    "El tamaño del nombre de usuario no puede ser menor que 3.",
  LOGIN_USUARIO_MAYOR_QUE_15:
    "El tamaño del nombre de usuario no puede ser mayor que 15.",
  LOGIN_USUARIO_ALFANUMERICO_INCORRECTO:
    "El nombre de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.",
  //contrasena
  CONTRASENA_USUARIO_VACIA: "Contraseña de usuario vacía",
  CONTRASENA_USUARIO_MENOR_QUE_3:
    "La contraseña de usuario tiene menos de 3 caracteres",
  CONTRASENA_USUARIO_MAYOR_QUE_45:
    "La contraseña de usuario tiene más de 45 caracteres",
  CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA:
    "Seguridad de la contraseña comprometida. Longitud de contraseña incorrecta.",
  CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO:
    "La contraseña de usuario sólo puede contener números y letras",
  //dni
  DNI_VACIO: "El DNI de la persona es vacío",
  DNI_MENOR_QUE_9: "El DNI de la persona tiene menos que 9 caracteres",
  DNI_MAYOR_QUE_9: "El DNI de la persona tiene más que 9 caracteres",
  DNI_FORMATO_INCORRECTO:
    "El DNI de la persona solo puede contener números y letras y tener el formato 12345678A",
  DNI_LETRA_INCORRECTA: "El DNI de la persona no es válido",
  //nombre
  NOMBRE_VACIO: "Nombre Persona vacío",
  NOMBRE_FORMATO_INCORRECTO:
    "El nombre de la persona solo puede contener letras",
  NOMBRE_MENOR_QUE_3: "El nombre de la persona es menor que 3 caraceteres",
  NOMBRE_MAYOR_QUE_45: "El nombre de la persona mayor que 45 caracteres",
  //apellidos
  APELLIDOS_VACIO: "Apellidos persona vacíos",
  APELLIDOS_MENOR_QUE_3:
    "Los apellidos de la persona tienen menos de 3 caracteres",
  APELLIDOS_MAYOR_QUE_45:
    "Los apellidos de la persona tienen más de 3 caracteres",
  APELLIDOS_FORMATO_INCORRECTO:
    "Los apellidos de la persona sólo pueden contener letras",
  //fechaNacimiento
  FECHA_NACIMIENTO_VACIA: "Fecha de nacimiento vacía",
  FECHA_NACIMIENTO_MENOR_QUE_8:
    "La fecha de nacimiento tiene menos de 8 caracteres",
  FECHA_NACIMIENTO_MAYOR_QUE_8:
    "La fecha de nacimiento tiene más de 8 caracteres",
  FECHA_NACIMIENTO_NUMERICA_INCORRECTA:
    "La fecha de nacimiento sólo puede contener números",
  //direccion
  DIRECCION_VACIA: "Dirección  vacía",
  DIRECCION_MENOR_5: "La dirección tiene menos de 5 caracteres",
  DIRECCION_MAYOR_200: "La dirección tiene más de 128 caracteres",
  DIRECCION_FORMATO_INCORRECTO:
    "La dirección sólo puede contener números, letras y º ª / -",
  //telefono
  TELEFONO_VACIO: "Teléfono de la persona vacío",
  TELEFONO_MENOR_QUE_9: "El teléfono de la persona tiene menos de 9 números",
  TELEFONO_MAYOR_QUE_9: "El teléfono de la persona tiene más de 9 números",
  TELEFONO_FORMATO_INCORRECTO:
    "El teléfono de la persona sólo puede contener números",
  //email
  EMAIL_VACIO: "Email de usuario vacío",
  EMAIL_LONGITUD_MINIMA: "El email del usuario tiene menos de 6 caracteres",
  EMAIL_LONGITUD_MAXIMA: "El email de usuario tiene más de 40 caracteres",
  EMAIL_ALFANUMERICO_INCORRECTO:
    "El email de usuario debe seguir el siguiente formato ejemplo@ejemplo.com",
  RECUPERAR_PASS_VACIO:
    "El email y/o el usuario para recuperar la contraseña están vacíos",

  //////usuario_VALIDATION_ATRIBUTO
  //Todos recogidos anteriormente en auth_VALIDATION_ATRIBUTO
  //id_rol
  ID_ROL_VACIO: "El id del rol está vacío",
  ID_ROL_ERROR_FORMATO: "El formato del id del rol es incorrecto",
  //borrado_logico_buscar
  BORRADO_LOGICO_DIFERENTE_0_1: "El flag de borrado debe ser 0 o 1.",

  //////rol_VALIDATION_ATRIBUTO
  //id_rol recogido en auth_VALIDATION_ATRIBUTO
  //nombre_rol
  ROL_NOMBRE_VACIO: "El nombre del rol está vacio",
  ROL_NOMBRE_MENOR_QUE_3: "El nombre del rol es menor de 3",
  ROL_NOMBRE_MAYOR_QUE_48: "El nombre del rol es mayor de 48",
  ROL_NOMBRE_FORMATO_INCORRECTO:
    "El nombre del rol tiene un formato erroneo, solo letras y números",
  //decripcion_rol
  ROL_DESCRIPCION_VACIO: "La descripción del rol no puede ser vacía",
  ROL_DESCRIPCION_MENOR_QUE_3: "La descripción del rol es menor de 3",
  ROL_DESCRIPCION_MAYOR_QUE_200: "La descripcion del rol es mayor de 200",
  ROL_DESCRIPCION_FORMATO_INCORRECTO:
    "La descripción del rol tiene un formato erroneo, solo letras y números",

  //////funcionalidad_VALIDATION_ATRIBUTO
  //id_funcionalidad
  ID_FUNCIONALIDAD_VACIO: "El id del funcionalidad está vacío",
  ID_FUNCIONALIDAD_ERROR_FORMATO:
    "El formato del id del funcionalidad es incorrecto",
  //nombre_funcionalidad
  FUNCIONALIDAD_NOMBRE_VACIO: "El nombre de la funcionalidad está vacio",
  FUNCIONALIDAD_NOMBRE_MENOR_QUE_3:
    "El nombre de la funcionalidad es menor de 3",
  FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48:
    "El nombre de la funcionalidad es mayor de 48",
  FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO:
    "El nombre de la funcionalidad tiene un formato erroneo, solo letras y números",
  //descripcion_funcionalidad
  FUNCIONALIDAD_DESCRIPCION_VACIO:
    "La descripción de la funcionalidad no puede ser vacía",
  FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3:
    "La descripción de la funcionalidad es menor de 3",
  FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200:
    "La descripcion de la funcionalidad es mayor de 200",
  FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO:
    "La descripción de la funcionalidad tiene un formato erroneo, solo letras y números",

  //////accion_VALIDATION_ATRIBUTO
  //id_accion
  ID_ACCION_VACIO: "El id del accion está vacío",
  ID_ACCION_ERROR_FORMATO: "El formato del id del accion es incorrecto",
  //nombre_accion
  ACCION_NOMBRE_VACIO: "El nombre de la accion está vacio",
  ACCION_NOMBRE_MENOR_QUE_3: "El nombre de la accion es menor de 3",
  ACCION_NOMBRE_MAYOR_QUE_48: "El nombre de la accion es mayor de 48",
  ACCION_NOMBRE_FORMATO_INCORRECTO:
    "El nombre de la accion tiene un formato erroneo, solo letras y números",
  //descripcion_accion
  ACCION_DESCRIPCION_VACIO: "La descripción de la accion no puede ser vacía",
  ACCION_DESCRIPCION_MENOR_QUE_3: "La descripción de la accion es menor de 3",
  ACCION_DESCRIPCION_MAYOR_QUE_200:
    "La descripcion de la accion es mayor de 200",
  ACCION_DESCRIPCION_FORMATO_INCORRECTO:
    "La descripción de la accion tiene un formato erroneo, solo letras y números",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////ACCION///////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  CERRARMODAL: "Cerrar",
  RECUPERAR_CONTRASENA_EMAIL_OK: "CONTRASEÑA RECUPERADA CORRECTAMENTE",
  RECUPERAR_PASS_OK:
    "La contraseña ha sido recuperada correctamente. Por favor revisa tu correo para ver la nueva contraseña",
  CONTRASEÑA_CHANGE_OK: "CONTRASEÑA MODIFICADA CORRECTAMENTE",
  PASSWORD_CAMBIADA: "La contraseña de usuario se ha modificado correctamente",

  ////auth_VALIDATION_ACCION
  USUARIO_NO_EXISTE: "El usuario no existe en el sistema.",
  CONTRASENA_INCORRECTO: "La contraseña no es correcta.",
  USUARIO_ELIMINADO: "El usuario está eliminado.",
  USUARIO_YA_EXISTE: "Ya existe el usuario en el sistema.",
  EMAIL_YA_EXISTE: "Ya existe un usuario con ese email.",
  EMAIL_NO_EXISTE: "No existe el email.",
  USUARIO_EMAIL_NO_COINCIDEN: "El usuario y el email no coinciden.",

  ////usuario_VALIDATION_ACCION
  //insertar
  USUARIO_ROL_NO_VALIDO: "El usuario no puede darse de alta con ese rol.",
  ACCION_DENEGADA_INSERTAR_USUARIO:
    "Solo el administrador puede insertar un nuevo usuario.",

  //editar
  EMAIL_USUARIO_YA_EXISTE: "Ya existe un usuario con ese email.",
  RESPONSABLE_TIENE_CATEGORIA:
    "Un administrador con categoría no se puede eliminar, primero elimine su categoría.",
  ACCION_DENEGADA_EDITAR_USUARIO:
    "Solo el administrador puede editar los datos de un usuario y un usuario los suyos propios.",

  //borrar
  ADMIN_NO_SE_PUEDE_BORRAR: "No se puede borrar el administrador del sistema.",
  ACCION_DENEGADA_BORRAR_USUARIO:
    "Solo el administrador puede borrar un usuario.",

  //reactivar
  USUARIO_YA_ACTIVO: "No se puede reactivar un usuario ya activo.",
  ACCION_DENEGADA_REACTIVAR_USUARIO:
    "Solo el administrador puede reactivar el usuario.",

  //buscar

  //verEnDetalle

  ////rol_VALIDATION_ACCION
  //insertar
  ROL_YA_EXISTE: "No se puede insertar un rol que ya existe.",
  ACCION_DENEGADA_INSERTAR_ROL:
    "Solo el administrador puede insertar un nuevo rol.",

  //editar
  ROL_NO_EXISTE: "El rol que se pretende editar no existe.",
  ACCION_DENEGADA_EDITAR_ROL:
    "Solo el administrador puede editar los datos de un rol.",

  //borrar
  ROL_ASOCIADO_PERMISO:
    "No se puede borrar un rol que está asociado a un permiso.",
  ROL_ASOCIADO_USUARIO_ACTIVO:
    "No se puede borrar un rol que está asociado a un usuario.",
  ACCION_DENEGADA_BORRAR_ROL: "Solo el administrador puede borrar un rol.",

  //reactivar
  ROL_YA_ACTIVO: "Solo el administrador puede reactivar un rol.",
  ACCION_DENEGADA_REACTIVAR_ROL:
    "Solo el administrador puede reactivar un rol.",

  //buscar

  //verEnDetalle

  ////funcionalidad_VALIDATION_ACCION
  //insertar
  FUNCIONALIDAD_YA_EXISTE:
    "No se puede insertar una funcionalidad que ya existe.",
  ACCION_DENEGADA_INSERTAR_FUNCIONALIDAD:
    "Solo el administrador puede insertar una nueva funcionalidad.",

  //editar
  FUNCIONALIDAD_NO_EXISTE: "La funcionalidad que se pretende editar no existe.",
  ACCION_DENEGADA_EDITAR_FUNCIONALIDAD:
    "Solo el administrador puede editar los datos de una funcionalidad.",

  //borrar
  FUNCIONALIDAD_ASOCIADO_PERMISO:
    "No se puede borrar una funcionalidad que está asociada a un permiso.",
  ACCION_DENEGADA_BORRAR_FUNCIONALIDAD:
    "Solo el administrador puede borrar una funcionalidad.",

  //buscar

  //verEnDetalle

  ////accion_VALIDATION_ACCION
  //insertar
  ACCION_YA_EXISTE: "No se puede insertar una accion que ya existe.",
  ACCION_DENEGADA_INSERTAR_ACCION:
    "Solo el administrador puede insertar una nueva accion.",

  //editar
  ACCION_NO_EXISTE: "La accion que se pretende editar no existe.",
  ACCION_DENEGADA_EDITAR_ACCION:
    "Solo el administrador puede editar los datos de una accion.",

  //borrar
  ACCION_ASOCIADO_PERMISO:
    "No se puede borrar una accion que está asociada a un permiso.",
  ACCION_DENEGADA_BORRAR_ACCION:
    "Solo el administrador puede borrar una accion.",

  //buscar

  //verEnDetalle

  ////accion_VALIDATION_ACCION
  //insertar
  PERMISO_YA_EXISTE: "No se puede insertar un permiso que ya existe.",
  ACCION_DENEGADA_INSERTAR_PERMISO:
    "Solo el administrador puede insertar un nuevo permiso.",

  //editar

  //borrar
  PERMISO_NO_EXISTE: "El permiso que se pretende editar no existe.",
  ACCION_DENEGADA_BORRAR_PERMISO:
    "Solo el administrador puede borrar un permiso.",

  //buscar

  //verEnDetalle

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////CONTROLLER/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////auth_CONTROLLER
  LOGIN_USUARIO_OK: "Usuario logueado correctamente.",
  REGISTRAR_USUARIO_OK: "Usuario registrado correctamente.",
  RECUPERAR_CONTRASENA_EMAIL_OK:
    "La contraseña ha sido cambiada, revise su correo.",

  ////usuario_CONTROLLER
  USUARIO_INSERTAR_OK: "Usuario insertado con éxito.",
  USUARIO_EDITAR_OK: "Usuario editado con éxito.",
  USUARIO_EDITAR_CONTRASENA_OK: "Contraseña editada con éxito.",
  USUARIO_BORRAR_OK: "Usuario eliminado con éxito.",
  USUARIO_REACTIVAR_OK: "Usuario reactivado con éxito.",

  ////rol_SERVICE
  ROL_INSERTAR_OK: "El rol ha sido insertado correctamente",
  ROL_EDITAR_OK: "El rol ha sido modificado correctamente",
  ROL_BORRAR_OK: "El rol ha sido borrado correctamente",
  ROL_REACTIVAR_OK: "El rol ha sido reactivado",

  ////funcionalidad_SERVICE
  FUNCIONALIDAD_INSERTAR_OK: "La funcionalidad ha sido insertada correctamente",
  FUNCIONALIDAD_EDITAR_OK: "La funcionalidad ha sido modificada correctamente",
  FUNCIONALIDAD_BORRAR_OK: "La funcionalidad ha sido borrada correctamente",
  ACCIONES_FUNCIONALIDAD: "Acciones que posee una funcionalidad.",
  FUNCIONALIDADES_SISTEMA: "Funcionalidades existentes en el sistema.",

  ////accion_SERVICE
  ACCION_INSERTAR_OK: "La accion ha sido insertada correctamente",
  ACCION_EDITAR_OK: "La accion ha sido modificada correctamente",
  ACCION_BORRAR_OK: "La accion ha sido borrada correctamente",

  ////permiso_SERVICE
  PERMISO_INSERTAR_OK: "El permiso ha sido insertada correctamente",
  PERMISO_EDITAR_OK: "El permiso ha sido modificada correctamente",
  PERMISO_BORRAR_OK: "El permiso ha sido borrada correctamente",
  PERMISOS_OBTENIDOS: "Permisos obtenidos para una funcionalidad",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////CORREOS//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////correoGmail
  CONTRASENA_CAMBIADA_EMAIL_KO: "La contraseña no se ha podido cambiar.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////VALIDACIONES_LOGS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  MENSAJE_MAYOR_QUE_200:
    "El mensaje de error no puede ser superior a 200 caracteres.",
  CODIGO_MAYOR_QUE_200:
    "El código de error no puede ser superior a 200 caracteres.",
  MENSAJE_FORMATO_INCORRECTO:
    "El mensaje de error presenta un formato incorrecto, solo se admiten letras y números.",
  CODIGO_FORMATO_INCORRECTO:
    "El código de error presenta un formato incorrecto, solo se admiten letras y números.",
  TIEMPO_FORMATO_INCORRECTO:
    "La fecha introducida no respeta el formato, deben de ser numeros, letras y espacios.",
  TIEMPO_MAYOR_QUE_200:
    "La fecha debe de tener una longitud menos a 200 caracteres.",

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////OTROS CODIGOS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //Atributos
  LOGIN_USUARIO: "Nombre de Usuario",
  PASS_USUARIO: "Contraseña de Usuario",
  EMAIL_USUARIO: "Email usuario",
  DNI: "DNI",
  DNI_USUARIO: "DNI",
  NOMBRE_PERSONA: "Nombre",
  APELLIDOS_PERSONA: "Apellidos",
  DIRECCION_PERSONA: "Dirección",
  FECHA_NACIMIENTO_PERSONA: "Fecha de nacimiento",
  TELEFONO: "Teléfono",
  EMAIL: "Email",
  PASS_USUARIO_NUEVA: "Nueva contraseña de usuario",
  ORDENAR: "Ordenar",
  TYPE_EXCEPTION: "Tipo excepción",
  DESCRIPTION_EXCEPTION: "Descripción excepción",
  DATE: "Fecha",
  DATE_INICIO: "Fecha inicio",
  DATE_FIN: "Fecha fin",
  SI: "Si",
  NO: "No",
  ACTION: "Acciones",

  //Tablas de gestión
  TITULO_MODAL: "Datos de la entidad",
  GESTION_ROLES: "Gestión de roles",
  ID: "Identificador",
  ROL_NOMBRE: "Nombre rol",
  ROL_DESCRIPCION: "Descripción rol",
  BORRADO_LOGICO: "Borrado lógico",
  GESTION_FUNCIONALIDADES: "Gestión de funcionalidades",
  FUNCIONALIDAD_NOMBRE: "Nombre funcionalidad",
  FUNCIONALIDAD_DESCRIPCION: "Descripción funcionalidad",
  GESTION_ACCIONES: "Gestión de acciones",
  ACCION_NOMBRE: "Nombre acción",
  ACCION_DESCRIPCION: "Descripción acción",
  PERMISOS: "Permisos",
  LOGATRIBUTOS_GESTION: "Log de atributos",
  LOGACCIONES_GESTION: "Log de acciones",
  LOGEXCEPCION_USUARIO: "Usuario",
  LOGEXCEPCION_FUNCIONALIDAD: "Funcionalidad",
  LOGEXCEPCION_ACCION: "Acción",
  LOGEXCEPCION_CODIGO: "Código",
  LOGEXCEPCION_MENSAJE: "Mensaje",
  LOGEXCEPCION_TIEMPO: "Tiempo",
  GESTION_USUARIO: "Gestión de usuarios",
  DATOS_USUARIO: "Datos del usuario",
  USUARIO_DNI: "DNI",
  USUARIO_USUARIO: "Usuario",
  USUARIO_ROL: "Rol",
  USUARIO_NOMBRE: "Nombre",
  USUARIO_APELLIDOS: "Apellidos",
  USUARIO_FECHANACIMIENTO: "Fecha de nacimiento",
  USUARIO_DIRECCION: "Direccion",
  USUARIO_EMAIL: "Email",
  USUARIO_TELEFONO: "Telefono",
  TESTS: "Tests",

  //Idiomas
  ESPAÑOL: "Español",
  INGLES: "Inglés",
  GALEGO: "Gallego",

  //Warnings bloqueo mayúsculas
  BLOQUEO_MAYUSCULAS: "Bloqueo de Mayúsculas activado",

  //Tooltip campos obligatorios
  CAMPO_OBLIGATORIO: "Campo Obligatorio",

  //Tooltip iconos
  ICONO_LOGIN: "Login",
  ICONO_REGISTRAR: "Registrar",
  ICONO_ENTRAR: "Entrar",
  ICONO_RECUPERAR_PASS: "Recuperar contraseña",
  ICONO_CERRAR: "Cerrar",
  ICONO_RESET_PASS: "Cambiar contraseña",
  ICONO_ADD: "Añadir",
  ICONO_SEARCH: "Buscar",
  ICONO_SEARCH_DELETE: "Buscar Eliminados",
  ICON_REFRECH_TABLE: "Refrescar tabla",
  ICON_SHOW_HIDE_COLUMNS: "Ocultar/mostrar columnas",
  ICONO_EDIT: "Editar",
  ICONO_ELIMINAR: "Eliminar",
  ICONO_VOLVER: "Menú",
  ICONO_REACTIVAR: "Reactivar",
  ICONO_BACK: "Volver",
  ICON_PERMISOS: "Gestión de permisos",
  ICONO_DETALLE: "Detalle",
  ICONO_NAVEGAR_PROCESO: "Ver sus procesos",
  ANTERIOR: "Anterior",
  SIGUIENTE: "Siguiente",

  //Mensajes error
  ERROR: "ERROR",
  ERROR_TEST: "Error en la realización del test",
  ERROR_AUTENTICACION: "No tienes permiso para acceder. Vuelve  intentarlo",
  ERROR_LISTAR_FUNCIONALIDADES_MENU:
    "Ha ocurrido un error al listar las funcionalidades del usuario",
  STOP: "PROHIBIDO EL PASO",
  ERROR_INTERNO: "ERROR INTERNO",
  MENSAJE_ERROR_INTERNO:
    "Error interno de la aplicación. Contacte con el administrador o intente acceder en unos minutos.",
  ERR_CONNECTION_REFUSED:
    "Error interno de la aplicación. Conexión denegada. Contacte con el administrador o intente acceder en unos minutos.",
  ACCION_NO_ENCONTRADA: "Error al enviar la petición.",

  //Mensajes de texto
  OLVIDAR_CONTRASENA: "¿Olvidó su contraseña?",
  RELLENAR_FORM_PASS: "Rellene el formulario para recuperarla",
  RECUPERAR_PASS: "Recuperar contraseña",
  ACCEDER_PAGINA: "Accede a earthTrack",
  MENSAJE_BIENVENIDA: "Bienvenido a earthTrack",
  DATOS_PERSONALES: "Datos Personales",
  DATOS_USUARIO: "Datos Usuario",
  CONFIRMAR_PASS_USUARIO: "Confirmar contraseña",
  CONTRASEÑAS_NO_COINCIDEN: "Las contraseñas no coinciden",
  SI: "Sí",
  NO: "No",
  FORMATO_DNI: "Formato: 12345678A",
  FORMATO_TELF: "Formato: 123456789",
  FORMATO_EMAIL: "Formato: ejemplo@ejemplo.com",
  REGISTRO_PAGINA: "Registrate en earthTrack",
  CAMBIAR_CONTRASEÑA: "CAMBIAR CONTRASEÑA",
  CAMBIAR_CONTRASEÑA_MENU: "Cambiar contraseña",
  MENU: "Menú",
  DESCONECTAR: "Desconectar",
  MENSAJE_TEST: "Tests",
  INSERTAR_ENTIDAD: "Inserción realizada con éxito.",
  EDITAR_ENTIDAD: "Edición realizada con éxito.",
  ELIMINAR_ENTIDAD: "Eliminación realizada con éxito.",
  REACTIVAR_ENTIDAD: "Reactivación realizada con éxito.",
  ERROR_ENTIDAD: "Error en la acción.",
  TITULO_NOTICIA_1: "Protocolo de gases de efecto invernadero",
  CONTENIDO_NOTICIA_1:
    "El efecto invernadero es un proceso en el que la radiación emitida es absorbida por los gases de efecto invernadero atmosférico. Esto resulta en la incremento de la temperatura media respecto a la que había en ausencia de los gie-12.",
  TITULO_NOTICIA_2: "¿Qué pueden hacer los usuarios en esta aplicación?",
  CONTENIDO_NOTICIA_2:
    "Los usuarios van a poder elegir que procesos realizan y en base a ello calcular su huella de carbono. El total de procesos genera el impacto de cada usuario en el planeta.",
  TITULO_NOTICIA_3: "¿Cuál es nuestra meta?",
  CONTENIDO_NOTICIA_3:
    "Que cada usuario poda aportar o seu grano de area na loita contra o cambio climático. É o deber de todos axudar no sostemento do planeta.",

  //////////////
  //////////////  CATEGORIAS
  //////////7////

  GESTION_CATEGORIA: "Gestion categorias",
  EXPLORAR_CATEGORIA: "Explora las categorias",
  ACCEDER_CATEGORIA: "Adentrate en esta categoría",
  ACLARACION_CATEGORIA: "Accede para ver sus subcategorías",
  NUEVA_CATEGORIA: "Crea nueva categoria",
  NOMBRE: "Nombre",
  DESCRIPCION: "Descripción",
  SELECCIONAR_RESPONSABLE: "Escoge un responsable de esta categoria",
  SELECCIONAR_CATEGORIA_PADRE: "Escoge una categoría padre de esta",
  PADRE_CATEGORIA: "Categoria padre",
  RESPONSABLE_CATEGORIA: "Responsable",
  VOLVER_PADRE_ANTERIOR: "Volver a la sección anterior",
  CATEGORIAS: "Categorias",
  PROCESOS: "Procesos",
  CATEGORIA_NOMBRE_VACIO: "El nombre de la categoría no puede ser vacía",
  MI_CATEGORIA: "Mi categoría",
  CATEGORIA_DESCRIPCION_VACIO:
    "La descripción de la categoría no puede ser vacía",
  CATEGORIA_PADRE_VACIO: "Debes escoger un padre para esta categoría",
  CATEGORIA_RESPONSABLE_VACIO:
    "Debes escoger un responsable para esta categoría",
  CATEGORIA_NOMBRE_MENOR_QUE_3:
    "La longitud del nombre debe ser entre 3 y 48 caracteres",
  CATEGORIA_NOMBRE_MAYOR_QUE_48:
    "La longitud del nombre debe ser entre 3 y 48 caracteres",
  CATEGORIA_DESCRIPCION_MAYOR_QUE_200:
    "La descripcion no puede tener mas de 200 caracteres",
  CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO:
    "La descripcion tiene un formato incorrecto. Solo letras, puntos y espacios",
  NOMBRE_CATEGORIA_FORMATO_INCORRECTO:
    "El nombre tiene un formato incorrecto. Solo letras y espacios",
  CATEGORIA_NOMBRE_SOLO_LETRAS: "El nombre solo admite letras, sin espacios",
  EDITAR_CATEGORIA: "Edita esta categoría",
  ELIMINAR_CATEGORIA: "Elimina esta categoría",
  CATEGORIA_YA_EXISTE: "Ya existe una categoria con ese nombre",
  CATEGORIA_NOMBRE_FORMATO_INCORRECTO:
    "El formato del nombre de la categoria es incorrecto",
  NOMBRE_CATEGORIA: "Nombre de la categoria",

  // codigos categoria
  CATEGORIA_EDITAR_OK: "La categoría se ha actualizado correctamente",
  CATEGORIA_INSERTAR_OK: "La categoría se ha insertado correctamente",
  CATEGORIA_BORRAR_OK: "La categoría se eliminó correctamente",
  CATEGORIA_DEVOLVER_PADRE: "La categoria padre ha sido devuelta correctamente",
  CATEGORIA_DEVOLVER_HIJOS:
    "Las categorias hijos has sido devueltas correctamente",

  //codigos proceso
  CALCULAR_PROCESO: "Calcular proceso",
  GESTION_PROCESO: "Gestión de procesos",
  PROCESO_INSERTAR_OK: "Proceso insertado correctamente",
  INSERTAR_PROCESO: "Crea un proceso",
  EDITAR_PROCESO: "Editar proceso",
  BORRAR_PROCESO: "Eliminar proceso",
  NOTAS_FORMULA_PROCESO:
    "Nota: para escribir la fórmula introduce los parámetros entre llaves y las unidades de los mismos entre parentesis, no es necesario indicar la unidad.",
  FORMULA_PROCESO: "Fórmula para calcular el proceso",
  PROCESO_DESCRIPCION_VACIO: "La descripción no puede estar vacía",
  PROCESO_NOMBRE_VACIO: "Debes indicar un nombre",
  FORMULA_PROCESO_VACIO: "Debes indicar una formula",
  PROCESO_NOMBRE_MAYOR_QUE_48:
    "La longitud del nombre debe ser entre 3 y 48 caracteres",
  CATEGORIA_NOMBRE_MENOR_QUE_3:
    "La longitud del nombre debe ser entre 3 y 48 caracteres",
  PROCESO_DESCRIPCION_FORMATO_INCORRECTO:
    "El nombre tiene un formato incorrecto. Solo letras,puntos y espacios",
  PROCESO_NOMBRE_FORMATO_INCORRECTO:
    "El nombre tiene un formato incorrecto. Solo letras y espacios",
  FORMULA_PARAMETROS_MAL:
    "Los parámetros se han introducido de forma incorrecta, por favor mire la nota que indica cómo hacerlo",
  FORMULA_MAL_FORMADA:
    "La fórmula está mal formada. Los operadores disponibles son +,-,*,/,^",
  FORMULA_PARENTESIS_MAL:
    "La formula presenta parentesis o llaves mal cerrados",
  FORMULA_VACIA: "La formula no puede ser vacia",
  PARAMETRO_FORMULA_VACIO: "No puedo haber parámetros vacíos",
  PARAMETRO_FORMULA_INCORRECTO: "El parametro debe ser numerico",
  EJEMPLO_FORMULA: "{masa(kg)} * 2 / ( {altura(metros)} * {edad} )",
  CATEGORIA_PROCESO: "Categoria a la que pertenece el proceso",
  CATEGORIA_PROCESO_VACIA: "Debes asignar el proceso a una categoria",
  EXISTE_PROCESO_EN_CATEGORIA: "Existe un proceso en la categoria",
  PROCESO_EDITAR_OK: "El proceso se actualizó correctamente",
  PROCESO_BORRAR_OK: "El proceso se ha eliminado correctamente",
  EXPLORAR_PROCESOS: "Explora procesos",
  CATEGORIA_PROCESO_EXPLAIN: "Categoria:",
  CATEGORIA_PROCESO_INCORRECTO: "Categoria de proceso incorrecta",
  ICONO_BUSCAR_PROCESO: "Buscar proceso",
  CATEGORIA_NO_TIENE_PERMISO:
    "No tienes permisos para actuar sobre esta categoría, contacta con el administrador en caso de existir un error en el arbol",
  CATEGORIA_EXISTE_HIJO: "Existen hijos de esta categoria",
  CATEGORIA_NO_EXISTE: "No existe la categoria",
  CATEGORIA_TIENE_PROCESO: "La categoría tiene proceso",
  MI_HUELLA: "MI HUELLA",
  EMISIONES: "Generas una huella de",
  GENERAS_HUELLA: "Emisiones de CO2",

  //PARAMETROS
  PROCESO_USUARIO_INSERTAR_OK: "El proceso se introdujo correctamente",
  MIS_PROCESOS: "Mis procesos",
  PROCESO_USUARIO_BORRAR_OK: "Se han eliminado los datos correctamente",
  SIN_PROCESOS_CALCULADOS: "No se han calculado procesos",
  PROCESO_CALCULADO:
    'Usted ya ha añadido este proceso a su huella de carbono, para revisar los procesos que la componen puede visitar el apartado de "Mis procesos"',
  NAVEGAR_MIS_PROCESOS: "Ir a mis procesos",
  PROCESO_USUARIO_ID_PROCESO_USUARIO_VACIO: "ID del proceso vacío",
  EXISTE_PROCESO_USUARIO: "Ya has rellenado este proceso",
  PROCESO_USUARIO_EDITAR_OK: "Cálculo actualizado",
  CATEGORIA_TIENE_PROCESO: "Esta categoría tiene un proceso",
};
