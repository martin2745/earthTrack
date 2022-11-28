<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/accion_SERVICE.php';

class accion extends ControllerBase{

	private $accion_SERVICE;

	public function __construct()
	{
		$this->accion_SERVICE = new accion_SERVICE();
	}


	function insertar(){
		$this->accion_SERVICE->validar_entrada_atributos();
		$this->accion_SERVICE->inicializarRest();
		$this->accion_SERVICE->validar_insertar();
		$respuesta = $this->accion_SERVICE->insertar('ACCION_INSERTAR_OK');
		devolverRest($respuesta);		
	}
	
	function editar(){
		$this->accion_SERVICE->validar_entrada_atributos();
		$this->accion_SERVICE->inicializarRest();
		$this->accion_SERVICE->validar_editar();
		$respuesta = $this->accion_SERVICE->editar('ACCION_EDITAR_OK');
		devolverRest($respuesta);
	}

	function borrar(){
		$this->accion_SERVICE->validar_entrada_atributos();
		$this->accion_SERVICE->inicializarRest();
		$this->accion_SERVICE->validar_borrar();
		$respuesta = $this->accion_SERVICE->borrar('ACCION_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function buscar(){
		$this->accion_SERVICE->validar_entrada_atributos();
		$this->accion_SERVICE->inicializarRest();
		$this->accion_SERVICE->validar_buscar();
		$respuesta = $this->accion_SERVICE->buscar();
		devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->accion_SERVICE->validar_entrada_atributos();
		$this->accion_SERVICE->inicializarRest();
		$this->accion_SERVICE->validar_verEnDetalle();
		$respuesta = $this->accion_SERVICE->verEnDetalle();
		devolverRest($respuesta);
	}

}
?>