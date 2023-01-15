/**Función para crear un formulario oculto*/
function crearformoculto(name, action) {
  if ($("#" + name).length == 0) {
    var formu = document.createElement("form");
    document.body.appendChild(formu);
    formu.name = name;
    formu.action = action;
    formu.id = name;
    formu.style.display = "none";
  }
}

/**Función para crear un formulario oculto sin accion*/
function crearformocultoSinAction(name) {
  if ($("#" + name).length == 0) {
    var formu = document.createElement("form");
    document.body.appendChild(formu);
    formu.name = name;
    formu.id = name;
    formu.style.display = "none";
  }
}

/**Función para insertar campos en el formulario a mayores*/
function insertacampo(form, name, value) {
  formulario = form;
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  input.className = name;
  formulario.appendChild(input);
}

/**Función para insertar campos en el formulario a mayores con ID*/
function insertacampoParaBusqueda(form, name, value) {
  formulario = form;
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.id = name + "_BUSQUEDA";
  input.value = value;
  input.className = name;
  formulario.appendChild(input);
}

/**Función para eliminar campos del formulario*/
function eliminarcampo(name) {
  $("." + name).remove();
}

/**Función para eliminar campos del formulario*/
function eliminarcampoId(idElementoError) {
  
  document.getElementById(idElementoError).style.display = "none";
}

/**Función que resetear los valores del formulario*/
function resetearFormulario(idFormulario, idElementoList) {

  document.getElementById(idFormulario).reset();
  //Devuelve el color por defecto.
  idElementoList.forEach(function (idElemento) {
    
    document.getElementById(idElemento).style.borderColor = "#c8c8c8";
  });
}

/**Función añade al formulario genérico con los campos de action y controlador*/
function addActionControler(form, action, controller) {
  var accion = "";

  switch (action) {
    case "insertar":
      accion = "insertar";
      break;
    case "borrar":
      accion = "borrar";
      break;
    case "editar":
      accion = "editar";
      break;
    case "buscar":
      accion = "buscar";
      break;
    case "verEnDetalle":
      accion = "verEnDetalle";
      break;
    case "reactivar":
      accion = "reactivar";
      break;
    case "login":
      accion = "login";
      break;
    case "registrar":
      accion = "registrar";
      break;
    case "obtenerNuevaContrasena":
      accion = "obtenerContrasenaCorreo";
      break;
    case "editarContrasena":
      accion = "editarContrasena";
      break;
    case "accionesFuncionalidad":
      accion = "accionesFuncionalidad";
      break;
    case "funcionalidadesSistema":
      accion = "funcionalidadesSistema";
      break;
    case "devolverHijos":
        accion = "devolverHijos";
      break;
  }
  //(form, name, value)
  insertacampo(form, "action", accion);
  insertacampo(form, "controlador", controller);
}

/**Función que elimina del formulario accion y controlado*/
function deleteActionController() {
  eliminarcampo("action");
  eliminarcampo("controlador");
}

/*Funcion que guarda las cookies con los datos de una busqueda*/
function guardarParametrosBusqueda(criteriosbusqueda) {
  for (var clave in criteriosbusqueda) {
    setCookie(clave, criteriosbusqueda[clave]);
  }
}
