<?php

include_once './Controladores/ControllerBase.php';

class proceso extends ControllerBase{

	// funciones propias de proceso que extiendan al controllerBase
	function insertar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_insertar();
		$respuesta = $this->servicio->insertar(strtoupper(controlador).'_INSERTAR_OK');
		devolverRest($respuesta);		
	}

	function borrar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_borrar();
		$respuesta = $this->servicio->borrar(strtoupper(controlador).'_BORRAR_OK');
		devolverRest($respuesta);	
	}
}
?>
