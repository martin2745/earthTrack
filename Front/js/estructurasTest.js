/*Función para generar estructura básica de los test*/
function crearTest(arrayDatosAccordion) {
  var aUno = "";

  if (arrayDatosAccordion[2] === null) {
    aUno =
      '<a class="collapsed card-link" data-toggle="collapse" href="#' +
      arrayDatosAccordion[1] +
      '">' +
      " " +
      arrayDatosAccordion[3] +
      " " +
      "</a>";
  } else {
    aUno =
      '<a class="collapsed card-link" data-toggle="collapse" href="#' +
      arrayDatosAccordion[1] +
      '"  onclick="' +
      arrayDatosAccordion[2] +
      '">' +
      " " +
      arrayDatosAccordion[3] +
      " " +
      "</a>";
  }

  var cardHeaderUno =
    '<div class="card-header">' +
    aUno +
    '<img class="iconTab" id="' +
    arrayDatosAccordion[4] +
    ' src="images/failed.png" hidden>' +
    "</div>";

  var cardsUno = "";

  if (arrayDatosAccordion[2] === null) {
    var arrayUno = arrayDatosAccordion[7];
    cardsUno = creaCards(arrayUno);
  } else {
    cardsUno = creaTableResponsive(
      arrayDatosAccordion[5],
      arrayDatosAccordion[6]
    );
  }

  var aDos = "";

  if (arrayDatosAccordion[9] === null) {
    aDos =
      '<a class="collapsed card-link" data-toggle="collapse" href="#' +
      arrayDatosAccordion[8] +
      '">' +
      " " +
      arrayDatosAccordion[10] +
      " " +
      "</a>";
  } else {
    aDos =
      '<a class="collapsed card-link" data-toggle="collapse" href="#' +
      arrayDatosAccordion[8] +
      '"  onclick="' +
      arrayDatosAccordion[9] +
      '">' +
      " " +
      arrayDatosAccordion[10] +
      " " +
      "</a>";
  }

  var cardHeaderDos =
    '<div class="card-header">' +
    aDos +
    '<img class="iconTab" id="' +
    arrayDatosAccordion[11] +
    ' src="images/failed.png" hidden>' +
    "</div>";

  var cardsDos = "";

  if (arrayDatosAccordion[9] === null) {
    var arrayDos = arrayDatosAccordion[14];
    cardsDos = creaCards(arrayDos);
  } else {
    cardsDos = creaTableResponsive(
      arrayDatosAccordion[12],
      arrayDatosAccordion[13]
    );
  }

  var contenidoTest =
    '<div id="' +
    arrayDatosAccordion[0] +
    '">' +
    '<div class="card">' +
    cardHeaderUno +
    '<div id="' +
    arrayDatosAccordion[1] +
    '" class="collapse" data-parent="#' +
    arrayDatosAccordion[0] +
    '">' +
    '<div class="card-body">' +
    cardsUno +
    "</div>" +
    "</div>" +
    cardHeaderDos +
    '<div id="' +
    arrayDatosAccordion[8] +
    '" class="collapse" data-parent="#' +
    arrayDatosAccordion[0] +
    '">' +
    '<div class="card-body">' +
    cardsDos +
    "</div>" +
    "</div>" +
    " </div>" +
    "</div>";

  return contenidoTest;
}

/*Función para crear los cards*/
function creaCards(arrayDatos) {
  var cards = "";

  for (let step = 1; step < arrayDatos.length; step++) {
    var array = arrayDatos[step];

    cards =
      cards +
      '<div class="card">' +
      '<div class="card-header">' +
      '<a class="collapsed card-link" data-toggle="collapse" href="#' +
      array[0] +
      '" onclick="' +
      array[1] +
      '">' +
      " " +
      array[2] +
      " " +
      "</a>" +
      '<img class="iconTab" id="' +
      array[3] +
      '" src="images/failed.png" hidden>' +
      "</div>" +
      '<div id="' +
      array[0] +
      '" class="collapse" data-parent="#' +
      arrayDatos[0] +
      '">' +
      '<div class="card-body">' +
      '<div class="table-responsive controlTamTabla">' +
      '<table class="table table-bordered">' +
      '<thead class="cabeceraTablasTest" id="' +
      array[4] +
      '"></thead>' +
      '<tbody id="' +
      array[5] +
      '"></tbody>' +
      "</table>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  var resultCards = '<div id="' + arrayDatos[0] + '">' + cards + "</div>";

  return resultCards;
}

/*Función que crea la tabla responsive si no tenemos subniveles*/
function creaTableResponsive(idCabecera, idCuerpo) {
  var table =
    '<div class="table-responsive">' +
    '<table class="table table-bordered">' +
    '<thead class="cabeceraTablasTest" id="' +
    idCabecera +
    '"></thead>' +
    '<tbody id="' +
    idCuerpo +
    '"></tbody>' +
    "</table>" +
    "</div>";
  return table;
}

/*Función para cargar las opciones de Tests de Autenticacion*/
function cargarTestAutenticaciones() {
  $("#testAutenticacion").html("");

  let arraySubAccordionUno = [
    "collapseAtributosLoginAutenticacion",
    "javascript:testAutenticacion('Login', 'Atributos')",
    "Login",
    "iconoTestAutenticacionAtributosLogin",
    "cabeceraAtributosAutenticacionLogin",
    "cuerpoAtributosAutenticacionLogin",
  ];
  let arraySubAccordionDos = [
    "collapseAtributosRegistroAutenticacion",
    "javascript:testAutenticacion('Registro', 'Atributos')",
    "Registro",
    "iconoTestAutenticacionAtributosRegistro",
    "cabeceraAtributosAutenticacionRegistro",
    "cuerpoAtributosAutenticacionRegistro",
  ];
  let arraySubAccordionTres = [
    "collapseAutenticacionAtributoObtenerContrasenaCorreo",
    "javascript:testAutenticacion('ObtenerContrasenaCorreo', 'Atributos')",
    "Obtener contraseña",
    "iconoTestAutenticacionAtributosObtenerContrasenaCorreo",
    "cabeceraAtributosAutenticacionObtenerContrasenaCorreo",
    "cuerpoAtributosAutenticacionObtenerContrasenaCorreo",
  ];
  let arrayAccordionUno = [
    "accordion3",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
  ];

  let arraySubAccordionCuatro = [
    "collapseAutenticacionAccionesLogin",
    "javascript:testAutenticacion('Login', 'Acciones')",
    "Login",
    "iconoTestAutenticacionAccionesLogin",
    "cabeceraAccionesAutenticacionLogin",
    "cuerpoAccionesAutenticacionLogin",
  ];
  let arraySubAccordionCinco = [
    "collapseAutenticacionAccionesRegistro",
    "javascript:testAutenticacion('Registro', 'Acciones')",
    "Registro",
    "iconoTestAutenticacionAccionesRegistro",
    "cabeceraAccionesAutenticacionRegistro",
    "cuerpoAccionesAutenticacionRegistro",
  ];
  let arraySubAccordionSeis = [
    "collapseAutenticacionAccionesObtenerContrasenaCorreo",
    "javascript:testAutenticacion('ObtenerContrasenaCorreo', 'Acciones')",
    "Obtener contraseña",
    "iconoTestAutenticacionAccionesObtenerContrasenaCorreo",
    "cabeceraAccionesAutenticacionObtenerContrasenaCorreo",
    "cuerpoAccionesAutenticacionObtenerContrasenaCorreo",
  ];
  let arrayAccordionDos = [
    "accordion4",
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
    arraySubAccordionSeis,
  ];

  let arrayAccordionTres = [
    "accordion2",
    "collapseAutenticacionAtributos",
    null,
    "Atributos",
    "iconoTestAutenticacionAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseAutenticacionAcciones",
    null,
    "Acciones",
    "iconoTestAutenticacionAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testAutenticacion").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Roles*/
function cargarTestGestionRoles() {
  $("#testRol").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarRol",
    "javascript:testRol('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestRolAtributosInsertar",
    "cabeceraAtributosRolInsertar",
    "cuerpoAtributosRolInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseRolAtributoBuscar",
    "javascript:testRol('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestRolAtributosBuscar",
    "cabeceraAtributosRolBuscar",
    "cuerpoAtributosRolBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseRolAtributoModificar",
    "javascript:testRol('Modificar', 'Atributos')",
    "Modificar",
    "iconoTestRolAtributosModificar",
    "cabeceraAtributosRolModificar",
    "cuerpoAtributosRolModificar",
  ];
  let arraySubAccordionCuatro = [
    "collapseAtributosBorrarRol",
    "javascript:testRol('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestRolAtributosBorrar",
    "cabeceraAtributosRolBorrar",
    "cuerpoAtributosRolBorrar",
  ];
  let arraySubAccordionCinco = [
    "collapseRolAtributoVerEnDetalle",
    "javascript:testRol('VerEnDetalle', 'Atributos')",
    "Ver en detalle",
    "iconoTestRolAtributosVerEnDetalle",
    "cabeceraAtributosRolVerEnDetalle",
    "cuerpoAtributosRolVerEnDetalle",
  ];
  let arraySubAccordionSeis = [
    "collapseRolAtributoReactivar",
    "javascript:testRol('Reactivar', 'Atributos')",
    "Reactivar",
    "iconoTestRolAtributosReactivar",
    "cabeceraAtributosRolReactivar",
    "cuerpoAtributosRolReactivar",
  ];
  let arrayAccordionUno = [
    "accordion7",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
    arraySubAccordionSeis,
  ];

  let arraySubAccordionSiete = [
    "collapseRolAccionesInsertar",
    "javascript:testRol('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestRolAccionesInsertar",
    "cabeceraAccionesRolInsertar",
    "cuerpoAccionesRolInsertar",
  ];
  let arraySubAccordionOcho = [
    "collapseRolAccionesBuscar",
    "javascript:testRol('Buscar', 'Acciones')",
    "Buscar",
    "iconoTestRolAccionesBuscar",
    "cabeceraAccionesRolBuscar",
    "cuerpoAccionesRolBuscar",
  ];
  let arraySubAccordionNueve = [
    "collapseRolAccionesModificar",
    "javascript:testRol('Modificar', 'Acciones')",
    "Modificar",
    "iconoTestRolAccionesModificar",
    "cabeceraAccionesRolModificar",
    "cuerpoAccionesRolModificar",
  ];
  let arraySubAccordionDiez = [
    "collapseRolAccionesBorrar",
    "javascript:testRol('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestRolAccionesBorrar",
    "cabeceraAccionesRolBorrar",
    "cuerpoAccionesRolBorrar",
  ];
  let arraySubAccordionOnce = [
    "collapseRolAccionesReactivar",
    "javascript:testRol('Reactivar', 'Acciones')",
    "Reactivar",
    "iconoTestRolAccionesReactivar",
    "cabeceraAccionesRolReactivar",
    "cuerpoAccionesRolReactivar",
  ];
  let arrayAccordionDos = [
    "accordion8",
    arraySubAccordionSiete,
    arraySubAccordionOcho,
    arraySubAccordionNueve,
    arraySubAccordionDiez,
    arraySubAccordionOnce,
  ];

  let arrayAccordionTres = [
    "accordion6",
    "collapseRolAtributos",
    null,
    "Atributos",
    "iconoTestRolAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseRolAcciones",
    null,
    "Acciones",
    "iconoTestRolAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testRol").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Funcionalidades*/
function cargarTestGestionFuncionalidades() {
  $("#testFuncionalidad").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarFuncionalidad",
    "javascript:testFuncionalidad('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestFuncionalidadAtributosInsertar",
    "cabeceraAtributosFuncionalidadInsertar",
    "cuerpoAtributosFuncionalidadInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseFuncionalidadAtributoBuscar",
    "javascript:testFuncionalidad('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestFuncionalidadAtributosBuscar",
    "cabeceraAtributosFuncionalidadBuscar",
    "cuerpoAtributosFuncionalidadBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseFuncionalidadAtributoModificar",
    "javascript:testFuncionalidad('Modificar', 'Atributos')",
    "Modificar",
    "iconoTestFuncionalidadAtributosModificar",
    "cabeceraAtributosFuncionalidadModificar",
    "cuerpoAtributosFuncionalidadModificar",
  ];
  let arraySubAccordionCuatro = [
    "collapseAtributosBorrarFuncionalidad",
    "javascript:testFuncionalidad('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestFuncionalidadAtributosBorrar",
    "cabeceraAtributosFuncionalidadBorrar",
    "cuerpoAtributosFuncionalidadBorrar",
  ];
  let arraySubAccordionCinco = [
    "collapseFuncionalidadAtributoVerEnDetalle",
    "javascript:testFuncionalidad('VerEnDetalle', 'Atributos')",
    "Ver en detalle",
    "iconoTestFuncionalidadAtributosVerEnDetalle",
    "cabeceraAtributosFuncionalidadVerEnDetalle",
    "cuerpoAtributosFuncionalidadVerEnDetalle",
  ];
  let arrayAccordionUno = [
    "accordion10",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
  ];

  let arraySubAccordionSeis = [
    "collapseFuncionalidadAccionesInsertar",
    "javascript:testFuncionalidad('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestFuncionalidadAccionesInsertar",
    "cabeceraAccionesFuncionalidadInsertar",
    "cuerpoAccionesFuncionalidadInsertar",
  ];
  let arraySubAccordionSiete = [
    "collapseFuncionalidadAccionesBuscar",
    "javascript:testFuncionalidad('Buscar', 'Acciones')",
    "Buscar",
    "iconoTestFuncionalidadAccionesBuscar",
    "cabeceraAccionesFuncionalidadBuscar",
    "cuerpoAccionesFuncionalidadBuscar",
  ];
  let arraySubAccordionOcho = [
    "collapseFuncionalidadAccionesModificar",
    "javascript:testFuncionalidad('Modificar', 'Acciones')",
    "Modificar",
    "iconoTestFuncionalidadAccionesModificar",
    "cabeceraAccionesFuncionalidadModificar",
    "cuerpoAccionesFuncionalidadModificar",
  ];
  let arraySubAccordionNueve = [
    "collapseFuncionalidadcAcionesBorrar",
    "javascript:testFuncionalidad('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestFuncionalidadAccionesBorrar",
    "cabeceraAccionesFuncionalidadBorrar",
    "cuerpoAccionesFuncionalidadBorrar",
  ];
  let arrayAccordionDos = [
    "accordion11",
    arraySubAccordionSeis,
    arraySubAccordionSiete,
    arraySubAccordionOcho,
    arraySubAccordionNueve,
  ];

  let arrayAccordionTres = [
    "accordion9",
    "collapseFuncionalidadAtributos",
    null,
    "Atributos",
    "iconoTestFuncionalidadAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseFuncionalidadAcciones",
    null,
    "Acciones",
    "iconoTestFuncionalidadAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testFuncionalidad").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Acciones*/
function cargarTestGestionAcciones() {
  $("#testAccion").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarAccion",
    "javascript:testAccion('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestAccionAtributosInsertar",
    "cabeceraAtributosAccionInsertar",
    "cuerpoAtributosAccionInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseAccionAtributoBuscar",
    "javascript:testAccion('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestAccionAtributosBuscar",
    "cabeceraAtributosAccionBuscar",
    "cuerpoAtributosAccionBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseAccionAtributoModificar",
    "javascript:testAccion('Modificar', 'Atributos')",
    "Modificar",
    "iconoTestAccionAtributosModificar",
    "cabeceraAtributosAccionModificar",
    "cuerpoAtributosAccionModificar",
  ];
  let arraySubAccordionCuatro = [
    "collapseAtributosBorrarAccion",
    "javascript:testAccion('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestAccionAtributosBorrar",
    "cabeceraAtributosAccionBorrar",
    "cuerpoAtributosAccionBorrar",
  ];
  let arraySubAccordionCinco = [
    "collapseAccionAtributoVerEnDetalle",
    "javascript:testAccion('VerEnDetalle', 'Atributos')",
    "Ver en detalle",
    "iconoTestAccionAtributosVerEnDetalle",
    "cabeceraAtributosAccionVerEnDetalle",
    "cuerpoAtributosAccionVerEnDetalle",
  ];
  let arrayAccordionUno = [
    "accordion13",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
  ];

  let arraySubAccordionSeis = [
    "collapseAccionAccionesInsertar",
    "javascript:testAccion('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestAccionAccionesInsertar",
    "cabeceraAccionesAccionInsertar",
    "cuerpoAccionesAccionInsertar",
  ];
  let arraySubAccordionSiete = [
    "collapseAccionAccionesBuscar",
    "javascript:testAccion('Buscar', 'Acciones')",
    "Buscar",
    "iconoTestAccionAccionesBuscar",
    "cabeceraAccionesAccionBuscar",
    "cuerpoAccionesAccionBuscar",
  ];
  let arraySubAccordionOcho = [
    "collapseAccionAccionesModificar",
    "javascript:testAccion('Modificar', 'Acciones')",
    "Modificar",
    "iconoTestAccionAccionesModificar",
    "cabeceraAccionesAccionModificar",
    "cuerpoAccionesAccionModificar",
  ];
  let arraySubAccordionNueve = [
    "collapseAccionAccionesBorrar",
    "javascript:testAccion('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestAccionAccionesBorrar",
    "cabeceraAccionesAccionBorrar",
    "cuerpoAccionesAccionBorrar",
  ];
  let arrayAccordionDos = [
    "accordion14",
    arraySubAccordionSeis,
    arraySubAccordionSiete,
    arraySubAccordionOcho,
    arraySubAccordionNueve,
  ];

  let arrayAccordionTres = [
    "accordion12",
    "collapseAccionAtributos",
    null,
    "Atributos",
    "iconoTestAccionAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseAccionAcciones",
    null,
    "Acciones",
    "iconoTestAccionAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testAccion").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Permisos*/
function cargarTestGestionRolAccionFuncionalidad() {
  $("#testRolAccionFuncionalidad").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarRolAccionFuncionalidad",
    "javascript:testRolAccionFuncionalidad('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestRolAccionFuncionalidadAtributosInsertar",
    "cabeceraAtributosRolAccionFuncionalidadInsertar",
    "cuerpoAtributosRolAccionFuncionalidadInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseRolAccionFuncionalidadAtributoBuscar",
    "javascript:testRolAccionFuncionalidad('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestRolAccionFuncionalidadAtributosBuscar",
    "cabeceraAtributosRolAccionFuncionalidadBuscar",
    "cuerpoAtributosRolAccionFuncionalidadBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseAtributosBorrarRolAccionFuncionalidad",
    "javascript:testRolAccionFuncionalidad('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestRolAccionFuncionalidadAtributosBorrar",
    "cabeceraAtributosRolAccionFuncionalidadBorrar",
    "cuerpoAtributosRolAccionFuncionalidadBorrar",
  ];
  let arrayAccordionUno = [
    "accordion16",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
  ];

  let arraySubAccordionCuatro = [
    "collapseRolAccionFuncionalidadAccionesInsertar",
    "javascript:testRolAccionFuncionalidad('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestRolAccionFuncionalidadAccionesInsertar",
    "cabeceraAccionesRolAccionFuncionalidadInsertar",
    "cuerpoAccionesRolAccionFuncionalidadInsertar",
  ];
  let arraySubAccordionCinco = [
    "collapseRolAccionFuncionalidadAccionesBorrar",
    "javascript:testRolAccionFuncionalidad('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestAccionAccionesBorrar",
    "cabeceraAccionesRolAccionFuncionalidadBorrar",
    "cuerpoAccionesRolAccionFuncionalidadBorrar",
  ];
  let arrayAccordionDos = [
    "accordion17",
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
  ];

  let arrayAccordionTres = [
    "accordion15",
    "collapseRolAccionFuncionalidadAtributos",
    null,
    "Atributos",
    "iconoTestAccionAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseRolAccionFuncionalidadAcciones",
    null,
    "Acciones",
    "iconoTestRolAccionFuncionalidadAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testRolAccionFuncionalidad").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Usuarios*/
function cargarTestGestionUsuarios() {
  $("#testUsuario").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarUsuario",
    "javascript:testUsuario('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestUsuarioAtributosInsertar",
    "cabeceraAtributosUsuarioInsertar",
    "cuerpoAtributosUsuarioInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseUsuarioAtributoBuscar",
    "javascript:testUsuario('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestUsuarioAtributosBuscar",
    "cabeceraAtributosUsuarioBuscar",
    "cuerpoAtributosUsuarioBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseUsuarioAtributoModificar",
    "javascript:testUsuario('Modificar', 'Atributos')",
    "Modificar",
    "iconoTestUsuarioAtributosModificar",
    "cabeceraAtributosUsuarioModificar",
    "cuerpoAtributosUsuarioModificar",
  ];
  let arraySubAccordionCuatro = [
    "collapseAtributosBorrarUsuario",
    "javascript:testUsuario('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestUsuarioAtributosBorrar",
    "cabeceraAtributosUsuarioBorrar",
    "cuerpoAtributosUsuarioBorrar",
  ];
  let arraySubAccordionCinco = [
    "collapseUsuarioAtributoVerEnDetalle",
    "javascript:testUsuario('VerEnDetalle', 'Atributos')",
    "Ver en detalle",
    "iconoTestUsuarioAtributosVerEnDetalle",
    "cabeceraAtributosUsuarioVerEnDetalle",
    "cuerpoAtributosUsuarioVerEnDetalle",
  ];
  let arraySubAccordionSeis = [
    "collapseUsuarioAtributoReactivar",
    "javascript:testUsuario('Reactivar', 'Atributos')",
    "Reactivar",
    "iconoTestUsuarioAtributosReactivar",
    "cabeceraAtributosUsuarioReactivar",
    "cuerpoAtributosUsuarioReactivar",
  ];
  let arraySubAccordionSiete = [
    "collapseUsuarioAtributoEditarContrasena",
    "javascript:testUsuario('EditarContrasena', 'Atributos')",
    "EditarContrasena",
    "iconoTestUsuarioAtributosEditarContrasena",
    "cabeceraAtributosUsuarioEditarContrasena",
    "cuerpoAtributosUsuarioEditarContrasena",
  ];
  let arrayAccordionUno = [
    "accordion19",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
    arraySubAccordionSeis,
    arraySubAccordionSiete,
  ];

  let arraySubAccordionOcho = [
    "collapseUsuarioAccionesInsertar",
    "javascript:testUsuario('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestUsuarioAccionesInsertar",
    "cabeceraAccionesUsuarioInsertar",
    "cuerpoAccionesUsuarioInsertar",
  ];
  let arraySubAccordionNueve = [
    "collapseUsuarioAccionesBuscar",
    "javascript:testUsuario('Buscar', 'Acciones')",
    "Buscar",
    "iconoTestUsuarioAccionesBuscar",
    "cabeceraAccionesUsuarioBuscar",
    "cuerpoAccionesUsuarioBuscar",
  ];
  let arraySubAccordionDiez = [
    "collapseUsuarioAccionesModificar",
    "javascript:testUsuario('Modificar', 'Acciones')",
    "Modificar",
    "iconoTestUsuarioAccionesModificar",
    "cabeceraAccionesUsuarioModificar",
    "cuerpoAccionesUsuarioModificar",
  ];
  let arraySubAccordionOnce = [
    "collapseUsuarioAccionesBorrar",
    "javascript:testUsuario('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestUsuarioAccionesBorrar",
    "cabeceraAccionesUsuarioBorrar",
    "cuerpoAccionesUsuarioBorrar",
  ];
  let arraySubAccordionDoce = [
    "collapseUsuarioAccionesReactivar",
    "javascript:testUsuario('Reactivar', 'Acciones')",
    "Reactivar",
    "iconoTestUsuarioAccionesReactivar",
    "cabeceraAccionesUsuarioReactivar",
    "cuerpoAccionesUsuarioReactivar",
  ];
  let arraySubAccordionTrece = [
    "collapseUsuarioAccionesEditarContrasena",
    "javascript:testUsuario('EditarContrasena', 'Acciones')",
    "EditarContrasena",
    "iconoTestUsuarioAccionesEditarContrasena",
    "cabeceraAccionesUsuarioEditarContrasena",
    "cuerpoAccionesUsuarioEditarContrasena",
  ];
  let arrayAccordionDos = [
    "accordion20",
    arraySubAccordionOcho,
    arraySubAccordionNueve,
    arraySubAccordionDiez,
    arraySubAccordionOnce,
    arraySubAccordionDoce,
    arraySubAccordionTrece,
  ];

  let arrayAccordionTres = [
    "accordion18",
    "collapseUsuarioAtributos",
    null,
    "Atributos",
    "iconoTestUsuarioAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseUsuarioAcciones",
    null,
    "Acciones",
    "iconoTestUsuarioAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testUsuario").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Categorias*/
function cargarTestGestionCategorias() {
  $("#testCategoria").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarCategoria",
    "javascript:testCategoria('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestCategoriaAtributosInsertar",
    "cabeceraAtributosCategoriaInsertar",
    "cuerpoAtributosCategoriaInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseCategoriaAtributoBuscar",
    "javascript:testCategoria('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestCategoriaAtributosBuscar",
    "cabeceraAtributosCategoriaBuscar",
    "cuerpoAtributosCategoriaBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseCategoriaAtributoModificar",
    "javascript:testCategoria('Modificar', 'Atributos')",
    "Modificar",
    "iconoTestCategoriaAtributosModificar",
    "cabeceraAtributosCategoriaModificar",
    "cuerpoAtributosCategoriaModificar",
  ];
  let arraySubAccordionCuatro = [
    "collapseAtributosBorrarCategoria",
    "javascript:testCategoria('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestCategoriaAtributosBorrar",
    "cabeceraAtributosCategoriaBorrar",
    "cuerpoAtributosCategoriaBorrar",
  ];
  let arraySubAccordionCinco = [
    "collapseCategoriaAtributoVerEnDetalle",
    "javascript:testCategoria('VerEnDetalle', 'Atributos')",
    "Ver en detalle",
    "iconoTestCategoriaAtributosVerEnDetalle",
    "cabeceraAtributosCategoriaVerEnDetalle",
    "cuerpoAtributosCategoriaVerEnDetalle",
  ];
  let arrayAccordionUno = [
    "accordion22",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
    arraySubAccordionCuatro,
    arraySubAccordionCinco,
  ];

  let arraySubAccordionOcho = [
    "collapseCategoriaAccionesInsertar",
    "javascript:testCategoria('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestCategoriaAccionesInsertar",
    "cabeceraAccionesCategoriaInsertar",
    "cuerpoAccionesCategoriaInsertar",
  ];
  let arraySubAccordionNueve = [
    "collapseCategoriaAccionesBuscar",
    "javascript:testCategoria('Buscar', 'Acciones')",
    "Buscar",
    "iconoTestCategoriaAccionesBuscar",
    "cabeceraAccionesCategoriaBuscar",
    "cuerpoAccionesCategoriaBuscar",
  ];
  let arraySubAccordionDiez = [
    "collapseCategoriaAccionesModificar",
    "javascript:testCategoria('Modificar', 'Acciones')",
    "Modificar",
    "iconoTestCategoriaAccionesModificar",
    "cabeceraAccionesCategoriaModificar",
    "cuerpoAccionesCategoriaModificar",
  ];
  let arraySubAccordionOnce = [
    "collapseCategoriaAccionesBorrar",
    "javascript:testCategoria('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestCategoriaAccionesBorrar",
    "cabeceraAccionesCategoriaBorrar",
    "cuerpoAccionesCategoriaBorrar",
  ];
  let arrayAccordionDos = [
    "accordion23",
    arraySubAccordionOcho,
    arraySubAccordionNueve,
    arraySubAccordionDiez,
    arraySubAccordionOnce,
  ];

  let arrayAccordionTres = [
    "accordion21",
    "collapseCategoriaAtributos",
    null,
    "Atributos",
    "iconoTestCategoriaAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseCategoriaAcciones",
    null,
    "Acciones",
    "iconoTestCategoriaAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testCategoria").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Procesos*/
function cargarTestGestionProcesos() {
  $("#testProceso").html("");

  let arraySubAccordionUno = [
    "collapseAtributosInsertarProceso",
    "javascript:testProceso('Insertar', 'Atributos')",
    "Añadir",
    "iconoTestProcesoAtributosInsertar",
    "cabeceraAtributosProcesoInsertar",
    "cuerpoAtributosProcesoInsertar",
  ];
  let arraySubAccordionDos = [
    "collapseProcesoAtributoBuscar",
    "javascript:testProceso('Buscar', 'Atributos')",
    "Buscar",
    "iconoTestProcesoAtributosBuscar",
    "cabeceraAtributosProcesoBuscar",
    "cuerpoAtributosProcesoBuscar",
  ];
  let arraySubAccordionTres = [
    "collapseProcesoAtributoModificar",
    "javascript:testProceso('Modificar', 'Atributos')",
    "Modificar",
    "iconoTestProcesoAtributosModificar",
    "cabeceraAtributosProcesoModificar",
    "cuerpoAtributosProcesoModificar",
  ];
  let arraySubAccordionCuatro = [
    "collapseAtributosBorrarProceso",
    "javascript:testProceso('Borrar', 'Atributos')",
    "Borrar",
    "iconoTestProcesoAtributosBorrar",
    "cabeceraAtributosProcesoBorrar",
    "cuerpoAtributosProcesoBorrar",
  ];
  let arrayAccordionUno = [
    "accordion22",
    arraySubAccordionUno,
    arraySubAccordionDos,
    arraySubAccordionTres,
    arraySubAccordionCuatro,
  ];

  let arraySubAccordionOcho = [
    "collapseProcesoAccionesInsertar",
    "javascript:testProceso('Insertar', 'Acciones')",
    "Añadir",
    "iconoTestProcesoAccionesInsertar",
    "cabeceraAccionesProcesoInsertar",
    "cuerpoAccionesProcesoInsertar",
  ];
  let arraySubAccordionNueve = [
    "collapseProcesoAccionesBuscar",
    "javascript:testProceso('Buscar', 'Acciones')",
    "Buscar",
    "iconoTestProcesoAccionesBuscar",
    "cabeceraAccionesProcesoBuscar",
    "cuerpoAccionesProcesoBuscar",
  ];
  let arraySubAccordionDiez = [
    "collapseProcesoAccionesModificar",
    "javascript:testProceso('Modificar', 'Acciones')",
    "Modificar",
    "iconoTestProcesoAccionesModificar",
    "cabeceraAccionesProcesoModificar",
    "cuerpoAccionesProcesoModificar",
  ];
  let arraySubAccordionOnce = [
    "collapseProcesoAccionesBorrar",
    "javascript:testProceso('Borrar', 'Acciones')",
    "Borrar",
    "iconoTestProcesoAccionesBorrar",
    "cabeceraAccionesProcesoBorrar",
    "cuerpoAccionesProcesoBorrar",
  ];
  let arrayAccordionDos = [
    "accordion23",
    arraySubAccordionOcho,
    arraySubAccordionNueve,
    arraySubAccordionDiez,
    arraySubAccordionOnce,
  ];

  let arrayAccordionTres = [
    "accordion21",
    "collapseProcesoAtributos",
    null,
    "Atributos",
    "iconoTestProcesoAtributos",
    null,
    null,
    arrayAccordionUno,
    "collapseProcesoAcciones",
    null,
    "Acciones",
    "iconoTestProcesoAcciones",
    null,
    null,
    arrayAccordionDos,
  ];

  var contenidoTest = crearTest(arrayAccordionTres);

  $("#testProceso").append(contenidoTest);
}
