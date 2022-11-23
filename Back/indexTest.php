<?php
      include_once './Comun/codigos.php';
      include_once './TestPuntosAcceso/funcionesComunes_TestPuntosAcceso.php';

      header('Access-Control-Allow-Origin: *');

      if (  ( !isset($_POST['controlador']) and !isset($_POST['action']) ) or
            !isset($_POST['controlador']) or !isset($_POST['action'])){
            rellenarExcepcion('PETICION_INVALIDA');
      }

      define('controlador', $_POST['controlador']);
      define('action', $_POST['action']);

      include_once './Controladores/auth_CONTROLLER.php';
      $auth = new auth();
      $auth->verificacionToken();
      
      if(rolUsuarioSistema == 'administrador'){
         $rest = controlador;
         $action = action;
         
         if(file_exists('./TestPuntosAcceso/pruebaREST_'.$rest.'.php')){
               include_once './TestPuntosAcceso/pruebaREST_'.$rest.'.php';
               $nombrerest = new $rest;	
         }else{
               rellenarExcepcion('ACCION_NO_ENCONTRADA');
         }

         $metodosControlador = get_class_methods($nombrerest);
         
         if(in_array($action, $metodosControlador)){  
               $nombrerest->$action();
         }
         else{
               rellenarExcepcion('ACCION_NO_ENCONTRADA');
         }
      }
      else{
         rellenarExcepcion('ACCION_DENEGADA_TEST');
      }

      function rellenarExcepcion($mensaje){
            header('Content-type: application/json');
            echo(json_encode(array('ok' => 'false', 'code' => $mensaje))); 
            exit();
	}
   
?>