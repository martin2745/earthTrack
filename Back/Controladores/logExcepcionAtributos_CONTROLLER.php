<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/logExcepcionAtributos_SERVICE.php';

class logExcepcionAtributos extends ControllerBase{
		
	private $logExcepcionAtributos_SERVICE;

	public function __construct(){ 
		$this->logExcepcionAtributos_SERVICE = new logExcepcionAtributos_SERVICE();
	}


	function buscar(){
		$this->logExcepcionAtributos_SERVICE->validar_entrada_atributos();
		$this->logExcepcionAtributos_SERVICE->inicializarRest();
		$respuesta = $this->logExcepcionAtributos_SERVICE->buscar();
		devolverRest($respuesta);
	}
}
?>
