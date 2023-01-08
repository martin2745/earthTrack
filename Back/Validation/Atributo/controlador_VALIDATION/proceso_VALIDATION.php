<?php

function validar_entrada_proceso(){

    include_once './Validation/Atributo/entidad_VALIDATION/proceso_VALIDATION_ATRIBUTO.php';
    
    $proceso_validacion = new proceso_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
            $listaAtributos = array('nombre_proceso', 'descripcion_proceso', 'id_categoria', 'formula');
            contruirLista($listaAtributos, $proceso_validacion);
            $proceso_validacion->validar_atributos_insertar();
            break;
        case 'editar':
            $listaAtributos = array('id_proceso', 'nombre_proceso', 'descripcion_proceso', 'id_categoria', 'formula');
            contruirLista($listaAtributos, $proceso_validacion);
            $proceso_validacion->validar_atributos_editar();
            break;
        case 'borrar':
            $listaAtributos = array('id_proceso');
            contruirLista($listaAtributos, $proceso_validacion);
            $proceso_validacion->validar_atributos_borrado();
            break;
        case 'buscar':
            $listaAtributos = array('id_proceso', 'nombre_proceso', 'descripcion_proceso', 'id_categoria', 'formula');
            contruirLista($listaAtributos, $proceso_validacion);
            $proceso_validacion->validar_atributos_buscar();
            break;
        case 'verEnDetalle':
            $listaAtributos = array('id_proceso', 'nombre_proceso');
            contruirLista($listaAtributos, $proceso_validacion);
            $proceso_validacion->validar_atributos_verEnDetalle();
            break; 
    }
}
?>