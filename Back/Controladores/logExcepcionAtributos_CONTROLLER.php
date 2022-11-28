<?php

include_once './Servicios/logExcepcionAtributos_SERVICE.php';

class logExcepcionAtributos{
		
	public function __construct(){ 
		$this->servicio = new logExcepcionAtributos_SERVICE();
	}

	function buscar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$respuesta = $this->servicio->buscar();
		devolverRest($respuesta);
	}
}
?>
