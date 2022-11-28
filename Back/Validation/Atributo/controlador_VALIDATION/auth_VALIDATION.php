<?php
    
include_once './Validation/validar_class.php';

function validar_entrada_auth(){
    
    include_once './Validation/Atributo/entidad_VALIDATION/auth_VALIDATION_ATRIBUTO.php';
    
    $auth_validacion = new auth_VALIDATION_ATRIBUTO();

    switch(action){
        case 'login':
                $listaAtributos = array('usuario', 'contrasena');
                contruirLista($listaAtributos, $auth_validacion);
                $auth_validacion->validar_atributos_login();
            break;
        case 'registrar':
                $listaAtributos = array('usuario', 'contrasena', 'dni', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'telefono', 'email');
                contruirLista($listaAtributos, $auth_validacion);
                $auth_validacion->validar_atributos_registro();
            break;
        case 'obtenerContrasenaCorreo':
                $listaAtributos = array('usuario', 'email');
                contruirLista($listaAtributos, $auth_validacion);
                $auth_validacion->validar_atributos_correo();
            break;
    }
}

function contruirLista($listaAtributos, $validacion){
    foreach ($listaAtributos as $atributo){
        if (!isset($_POST[$atributo])){
            $validacion->$atributo = '';
        }
        else{
            $validacion->$atributo = $_POST[$atributo];
        }
    }
}

?>