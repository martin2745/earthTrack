<?php

function validar_entrada_permiso(){

    include_once './Validation/Atributo/entidad_VALIDATION/permiso_VALIDATION_ATRIBUTO.php';
    $permiso_validacion = new permiso_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
                $listaAtributos = array('id_rol', 'id_funcionalidad', 'id_accion');
                contruirLista($listaAtributos, $permiso_validacion);
                $permiso_validacion->validar_atributos_insertar();
            break;
        case 'borrar':
                $listaAtributos = array('id_rol', 'id_funcionalidad', 'id_accion');
                contruirLista($listaAtributos, $permiso_validacion);
                $permiso_validacion->validar_atributos_borrado();
            break;
        case 'buscar':
                $listaAtributos = array('nombre_funcionalidad');
                contruirLista($listaAtributos, $permiso_validacion);
                $permiso_validacion->validar_atributos_buscar();
            break;
    }

}

?>