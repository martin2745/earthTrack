<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/logExcepcionAcciones_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/logExcepcionAcciones_VALIDATION.php';

class logExcepcionAcciones extends ControllerBase{
		
	private $logExcepcionAcciones_SERVICE;

	public function __construct(){ 
		$this->logExcepcionAcciones_SERVICE = new logExcepcionAcciones_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_logExcepcionAcciones();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function buscar(){
		$this->validar_entrada_atributos();
		$this->logExcepcionAcciones_SERVICE->inicializarRest();
		$respuesta = $this->logExcepcionAcciones_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}
}
?>
