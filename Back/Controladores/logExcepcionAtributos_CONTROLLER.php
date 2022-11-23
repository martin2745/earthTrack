<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/logExcepcionAtributos_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/logExcepcionAtributos_VALIDATION.php';

class logExcepcionAtributos extends ControllerBase{
		
	private $logExcepcionAtributos_SERVICE;

	public function __construct(){ 
		$this->logExcepcionAtributos_SERVICE = new logExcepcionAtributos_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_logExcepcionAtributos();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function buscar(){
		$this->validar_entrada_atributos();
		$this->logExcepcionAtributos_SERVICE->inicializarRest();
		$respuesta = $this->logExcepcionAtributos_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}
}
?>
