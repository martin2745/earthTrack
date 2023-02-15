<?php

include_once './Servicios/logExcepcionAcciones_SERVICE.php';

class logExcepcionAcciones{
		
	public function __construct(){ 
		$this->servicio = new logExcepcionAcciones_SERVICE();
	}

	function buscar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$respuesta = $this->servicio->buscar();
		devolverRest($respuesta);
	}
}
?>
