<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/rol_SERVICE.php';

class rol extends ControllerBase{

	private $rol_SERVICE;

	public function __construct()
	{
		$this->rol_SERVICE = new rol_SERVICE();
	}


	function insertar(){
		$this->rol_SERVICE->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_insertar();
		$respuesta = $this->rol_SERVICE->insertar('ROL_INSERTAR_OK');
		devolverRest($respuesta);		
	}
	
	function editar(){
		$this->rol_SERVICE->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_editar();
		$respuesta = $this->rol_SERVICE->editar('ROL_EDITAR_OK');
		devolverRest($respuesta);
	}

	function borrar(){
		$_POST['borrado_logico'] = 1;
		$this->rol_SERVICE->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_borrar();
		$respuesta = $this->rol_SERVICE->borrar('ROL_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->rol_SERVICE->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_reactivar();
		$respuesta = $this->rol_SERVICE->reactivar('ROL_REACTIVAR_OK');
		devolverRest($respuesta);
	}

	function buscar(){
		$this->rol_SERVICE->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_buscar();
		$respuesta = $this->rol_SERVICE->buscar();
		devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->rol_SERVICE->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_verEnDetalle();
		$respuesta = $this->rol_SERVICE->verEnDetalle();
		devolverRest($respuesta);
	}

}
?>