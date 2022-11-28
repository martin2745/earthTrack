<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/funcionalidad_SERVICE.php';

class funcionalidad extends ControllerBase{

	private $funcionalidad_SERVICE;

	public function __construct()
	{
		$this->funcionalidad_SERVICE = new funcionalidad_SERVICE();
	}


	function insertar(){
		$this->funcionalidad_SERVICE->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_insertar();
		$respuesta = $this->funcionalidad_SERVICE->insertar('FUNCIONALIDAD_INSERTAR_OK');
		devolverRest($respuesta);		
	}
	
	function editar(){
		$this->funcionalidad_SERVICE->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_editar();
		$respuesta = $this->funcionalidad_SERVICE->editar('FUNCIONALIDAD_EDITAR_OK');
		devolverRest($respuesta);
	}

	function borrar(){
		$this->funcionalidad_SERVICE->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_borrar();
		$respuesta = $this->funcionalidad_SERVICE->borrar('FUNCIONALIDAD_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function buscar(){
		$this->funcionalidad_SERVICE->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_buscar();
		$respuesta = $this->funcionalidad_SERVICE->buscar();
		devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->funcionalidad_SERVICE->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_verEnDetalle();
		$respuesta = $this->funcionalidad_SERVICE->verEnDetalle();
		devolverRest($respuesta);
	}

	function accionesFuncionalidad(){
		$this->funcionalidad_SERVICE->inicializarRest();
		$respuesta = $this->funcionalidad_SERVICE->accionesFuncionalidad('ACCIONES_FUNCIONALIDAD');
		devolverRest($respuesta);
	}

	function funcionalidadesSistema(){
		$this->funcionalidad_SERVICE->inicializarRest();
		$respuesta = $this->funcionalidad_SERVICE->funcionalidadesSistema('FUNCIONALIDADES_SISTEMA');
		devolverRest($respuesta);	
	}

}
?>