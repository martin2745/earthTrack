<?php

function validar_entrada_logExcepcionAcciones(){

    include_once './Validation/Atributo/entidad_VALIDATION/logExcepcionAcciones_VALIDATION_ATRIBUTO.php';
    
    $logExcepcionAcciones_validacion = new logExcepcionAcciones_VALIDATION_ATRIBUTO();

    switch(action){
        case 'buscar':
            if(isset($_POST['tiempo'])){
                if($_POST['tiempo'] == '1900-01-01'){
                    $_POST['tiempo'] = '';
                }
            }
                $listaAtributos = array('usuario', 'funcionalidad', 'accion', 'codigo', 'mensaje', 'tiempo');
                contruirLista($listaAtributos, $logExcepcionAcciones_validacion);
                $logExcepcionAcciones_validacion->validar_atributos_buscar();
            break;
    }

}

?>