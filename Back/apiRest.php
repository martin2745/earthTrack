<?php
      include_once './Comun/codigos.php';

      header('Access-Control-Allow-Origin: *');

      if (  ( !isset($_POST['controlador']) and !isset($_POST['action']) ) or
            !isset($_POST['controlador']) or !isset($_POST['action'])){
            rellenarExcepcion('PETICION_INVALIDA');
      }

      define('controlador', $_POST['controlador']);
      define('action', $_POST['action']);

      $rest = controlador;
      $action = action;
         
      if ($rest != 'auth'){
            include_once './Controladores/auth_CONTROLLER.php';
            $auth = new auth();
            $auth->verificacionToken();
      }
      
      if(file_exists('./Controladores/'.$rest.'_CONTROLLER.php')){
            include_once './Controladores/'.$rest.'_CONTROLLER.php';
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

      function rellenarExcepcion($mensaje){
            header('Content-type: application/json');
            echo(json_encode(array('ok' => 'false', 'code' => $mensaje))); 
            exit();
	}
   
?>