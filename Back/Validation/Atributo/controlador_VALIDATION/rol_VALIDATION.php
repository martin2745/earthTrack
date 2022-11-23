<?php

function validar_entrada_rol(){

    include_once './Validation/Atributo/entidad_VALIDATION/rol_VALIDATION_ATRIBUTO.php';
    $rol_validacion = new rol_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
                $listaAtributos = array('nombre_rol', 'descripcion_rol');
                contruirLista($listaAtributos, $rol_validacion);
                $rol_validacion->validar_atributos_insertar();
                break;
        case 'borrar':
                $listaAtributos = array('id_rol');
                contruirLista($listaAtributos, $rol_validacion);
                $rol_validacion->validar_atributos_borrado();
            break;
        case 'editar':
                $listaAtributos = array('id_rol', 'descripcion_rol');
                contruirLista($listaAtributos, $rol_validacion);
                $rol_validacion->validar_atributos_editar();
            break;
        case 'buscar':
                $listaAtributos = array('id_rol', 'nombre_rol', 'descripcion_rol', 'borrado_logico');
                contruirLista($listaAtributos, $rol_validacion);
                $rol_validacion->validar_atributos_buscar();
            break;
        case 'verEnDetalle':
                $listaAtributos = array('id_rol');
                contruirLista($listaAtributos, $rol_validacion);
                $rol_validacion->validar_atributos_verEnDetalle();
            break;
        case 'reactivar':
            $listaAtributos = array('id_rol');
            contruirLista($listaAtributos, $rol_validacion);
            $rol_validacion->validar_atributos_reactivar();
        break;
    }

}

?>