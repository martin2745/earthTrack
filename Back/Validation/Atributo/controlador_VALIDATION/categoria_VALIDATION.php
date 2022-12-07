<?php

function validar_entrada_categoria(){

    include_once './Validation/Atributo/entidad_VALIDATION/categoria_VALIDATION_ATRIBUTO.php';
    $categoria_validacion = new categoria_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
                $listaAtributos = array('nombre_categoria', 'descripcion_categoria', 'id_padre');
                contruirLista($listaAtributos, $categoria_validacion);
                $categoria_validacion->validar_atributos_insertar();
                break;
        case 'borrar':
                $listaAtributos = array('id_categoria');
                contruirLista($listaAtributos, $categoria_validacion);
                $categoria_validacion->validar_atributos_borrado();
            break;
        case 'editar':
                $listaAtributos = array('id_categoria', 'descripcion_categoria');
                contruirLista($listaAtributos, $categoria_validacion);
                $categoria_validacion->validar_atributos_editar();
            break;
        case 'buscar':
                $listaAtributos = array('id_categoria', 'nombre_categoria', 'descripcion_categoria');
                contruirLista($listaAtributos, $categoria_validacion);
                $categoria_validacion->validar_atributos_buscar();
            break;
        case 'verEnDetalle':
                $listaAtributos = array('id_categoria');
                contruirLista($listaAtributos, $categoria_validacion);
                $categoria_validacion->validar_atributos_verEnDetalle();
            break;
        case 'devolverPadre':
                $listaAtributos = array('id_categoria');
                contruirLista($listaAtributos, $categoria_validacion);
                $categoria_validacion->validar_atributos_devolverPadre();
            break;
    }

}

?>