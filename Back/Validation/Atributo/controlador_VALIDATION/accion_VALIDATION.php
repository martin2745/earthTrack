<?php

function validar_entrada_accion(){

    include_once './Validation/Atributo/entidad_VALIDATION/accion_VALIDATION_ATRIBUTO.php';
    $accion_validacion = new accion_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
                $listaAtributos = array('nombre_accion', 'descripcion_accion');
                contruirLista($listaAtributos, $accion_validacion);
                $accion_validacion->validar_atributos_insertar();
                break;
        case 'borrar':
                $listaAtributos = array('id_accion');
                contruirLista($listaAtributos, $accion_validacion);
                $accion_validacion->validar_atributos_borrado();
            break;
        case 'editar':
                $listaAtributos = array('id_accion', 'descripcion_accion');
                contruirLista($listaAtributos, $accion_validacion);
                $accion_validacion->validar_atributos_editar();
            break;
        case 'buscar':
                $listaAtributos = array('id_accion', 'nombre_accion', 'descripcion_accion');
                contruirLista($listaAtributos, $accion_validacion);
                $accion_validacion->validar_atributos_buscar();
            break;
        case 'verEnDetalle':
                $listaAtributos = array('id_accion');
                contruirLista($listaAtributos, $accion_validacion);
                $accion_validacion->validar_atributos_verEnDetalle();
            break;
    }

}

?>