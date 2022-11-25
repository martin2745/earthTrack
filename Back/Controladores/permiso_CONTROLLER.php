<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/permiso_SERVICE.php';

class permiso extends ControllerBase{

	private $permiso_SERVICE;

	public function __construct()
	{
		$this->permiso_SERVICE = new permiso_SERVICE();
	}


	function insertar(){
		$this->permiso_SERVICE->validar_entrada_atributos();
		$this->permiso_SERVICE->inicializarRest();
		$this->permiso_SERVICE->validar_insertar();
		$respuesta = $this->permiso_SERVICE->insertar('PERMISO_INSERTAR_OK');
		$this->devolverRest($respuesta);		
	}

	function borrar(){
		$this->permiso_SERVICE->validar_entrada_atributos();
		$this->permiso_SERVICE->inicializarRest();
		$this->permiso_SERVICE->validar_borrar();
		$respuesta = $this->permiso_SERVICE->borrar('PERMISO_BORRAR_OK');
		$this->devolverRest($respuesta);	
	}

	function buscar(){
		$this->permiso_SERVICE->validar_entrada_atributos();
		$this->permiso_SERVICE->inicializarRest();
		$this->permiso_SERVICE->validar_buscar();
		$respuesta = $this->permiso_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}	
}
?>