<?php

include_once './Servicios/permiso_SERVICE.php';

class permiso{

	public function __construct()
	{
		$this->servicio = new permiso_SERVICE();
	}

	function insertar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_insertar();
		$respuesta = $this->servicio->insertar('PERMISO_INSERTAR_OK');
		devolverRest($respuesta);		
	}

	function borrar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_borrar();
		$respuesta = $this->servicio->borrar('PERMISO_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function buscar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_buscar();
		$respuesta = $this->servicio->buscar();
		devolverRest($respuesta);
	}	
}
?>