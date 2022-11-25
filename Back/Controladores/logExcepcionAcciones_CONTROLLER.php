<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/logExcepcionAcciones_SERVICE.php';

class logExcepcionAcciones extends ControllerBase{
		
	private $logExcepcionAcciones_SERVICE;

	public function __construct(){ 
		$this->logExcepcionAcciones_SERVICE = new logExcepcionAcciones_SERVICE();
	}


	function buscar(){
		$this->logExcepcionAcciones_SERVICE->validar_entrada_atributos();
		$this->logExcepcionAcciones_SERVICE->inicializarRest();
		$respuesta = $this->logExcepcionAcciones_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}
}
?>
