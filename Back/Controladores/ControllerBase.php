<?php

abstract class ControllerBase{

	function rellenarExcepcion($mensaje){
		$feedback['ok'] = false;
		$feedback['code'] = $mensaje;
		if(!isset($_POST['test'])){
			$this->logExcepcionesAtributo($feedback);
		}
		header('Content-type: application/json');
		echo(json_encode($feedback)); 
		exit();
	}

	function devolverRest($feedback){
		
	    header('Content-type: application/json');
		echo(json_encode($feedback));

	}

	function logExcepcionesAtributo($feedback){
		include_once './Modelos/logExcepcionAtributos_MODEL.php';
		
		$log = new logExcepcionAtributos_MODEL();
		date_default_timezone_set('Europe/Madrid');
		if(action == 'login' || action == 'registrar' || action == 'obtenerContrasenaCorreo'){
			define('usuarioSistema', 'DESCONOCIDO');
		}

		$log->arrayDatoValor = array( 
			'usuario' => usuarioSistema, 
			'funcionalidad' => controlador,
			'accion' => action,
			'codigo' => $feedback['code'],
			'mensaje' => constant($feedback['code']),
			'tiempo' => (string)date("Y-m-d H:i:s", time()));
			
		try{	
			$log->insertar();
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	  
	}

}

?>
