<?php

function validar_entrada_proceso_usuario(){

    include_once './Validation/Atributo/entidad_VALIDATION/proceso_usuario_VALIDATION_ATRIBUTO.php';
    $proceso_usuario_validacion = new proceso_usuario_VALIDATION_ATRIBUTO();

    switch(action){
        case 'insertar':
                $listaAtributos = array('id_proceso', 'usuario', 'parametros');
                contruirLista($listaAtributos, $proceso_usuario_validacion);
                $proceso_usuario_validacion->validar_atributos_insertar();
                break;
        case 'borrar':
                $listaAtributos = array('id_proceso', 'usuario');
                contruirLista($listaAtributos, $proceso_usuario_validacion);
                $proceso_usuario_validacion->validar_atributos_borrado();
            break;
        case 'editar':
                $listaAtributos = array('id_proceso', 'usuario');
                contruirLista($listaAtributos, $proceso_usuario_validacion);
                $proceso_usuario_validacion->validar_atributos_editar();
            break;
        case 'buscar':
                $listaAtributos = array('id_proceso', 'usuario');
                contruirLista($listaAtributos, $proceso_usuario_validacion);
                $proceso_usuario_validacion->validar_atributos_buscar();
            break;
        case 'verEnDetalle':
                $listaAtributos = array('id_proceso', 'usuario');
                contruirLista($listaAtributos, $proceso_usuario_validacion);
                $proceso_usuario_validacion->validar_atributos_verEnDetalle();
            break;
        case 'devolverHuella':
            $listaAtributos = array('usuario');
            contruirLista($listaAtributos, $validar_atributos_devolverHuella);
            $proceso_usuario_validacion->validar_atributos_devolverHuella();
        break;
        case 'devolverProcesos':
            $listaAtributos = array('usuario');
            contruirLista($listaAtributos, $proceso_usuario_validacion);
            $proceso_usuario_validacion->validar_atributos_devolverProcesos();
        break;
    }
}

?>