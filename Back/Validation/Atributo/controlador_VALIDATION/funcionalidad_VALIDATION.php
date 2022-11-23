<?php

function validar_entrada_funcionalidad(){

    include_once './Validation/Atributo/entidad_VALIDATION/funcionalidad_VALIDATION_ATRIBUTO.php';
    $funcionalidad_validacion = new funcionalidad_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
                $listaAtributos = array('nombre_funcionalidad', 'descripcion_funcionalidad');
                contruirLista($listaAtributos, $funcionalidad_validacion);
                $funcionalidad_validacion->validar_atributos_insertar();
                break;
        case 'borrar':
                $listaAtributos = array('id_funcionalidad');
                contruirLista($listaAtributos, $funcionalidad_validacion);
                $funcionalidad_validacion->validar_atributos_borrado();
            break;
        case 'editar':
                $listaAtributos = array('id_funcionalidad', 'descripcion_funcionalidad');
                contruirLista($listaAtributos, $funcionalidad_validacion);
                $funcionalidad_validacion->validar_atributos_editar();
            break;
        case 'buscar':
                $listaAtributos = array('id_funcionalidad', 'nombre_funcionalidad', 'descripcion_funcionalidad');
                contruirLista($listaAtributos, $funcionalidad_validacion);
                $funcionalidad_validacion->validar_atributos_buscar();
            break;
        case 'verEnDetalle':
                $listaAtributos = array('id_funcionalidad');
                contruirLista($listaAtributos, $funcionalidad_validacion);
                $funcionalidad_validacion->validar_atributos_verEnDetalle();
            break;
        case 'accionesFuncionalidad':
                $listaAtributos = array('nombre_funcionalidad');
                contruirLista($listaAtributos, $funcionalidad_validacion);
                $funcionalidad_validacion->validar_atributos_accionesFuncionalidad();
            break;
    }

}

?>