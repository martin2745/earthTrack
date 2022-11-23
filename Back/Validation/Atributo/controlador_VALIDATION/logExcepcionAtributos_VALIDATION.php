<?php

function validar_entrada_logExcepcionAtributos(){

    include_once './Validation/Atributo/entidad_VALIDATION/logExcepcionAtributos_VALIDATION_ATRIBUTO.php';
    
    $logExcepcionAtributos_validacion = new logExcepcionAtributos_VALIDATION_ATRIBUTO();

    switch(action){
        case 'buscar':
            if(isset($_POST['tiempo'])){
                $tiempo = $_POST['tiempo'];
                if($_POST['tiempo'] == '1900-01-01'){
                    $_POST['tiempo'] = '';
                }
            }
                $listaAtributos = array('usuario', 'funcionalidad', 'accion', 'codigo', 'mensaje', 'tiempo');
                contruirLista($listaAtributos, $logExcepcionAtributos_validacion);
                $logExcepcionAtributos_validacion->validar_atributos_buscar();
            break;
    }

}

?>