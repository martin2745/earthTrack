<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/rol_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/rol_VALIDATION.php';

class rol extends ControllerBase{

	private $rol_SERVICE;

	public function __construct()
	{
		$this->rol_SERVICE = new rol_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_rol();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function insertar(){
		$this->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_insertar();
		$respuesta = $this->rol_SERVICE->insertar('ROL_INSERTAR_OK');
		$this->devolverRest($respuesta);		
	}
	
	function editar(){
		$this->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_editar();
		$respuesta = $this->rol_SERVICE->editar('ROL_EDITAR_OK');
		$this->devolverRest($respuesta);
	}

	function borrar(){
		$_POST['borrado_logico'] = 1;
		$this->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_borrar();
		$respuesta = $this->rol_SERVICE->borrar('ROL_BORRAR_OK');
		$this->devolverRest($respuesta);	
	}

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_reactivar();
		$respuesta = $this->rol_SERVICE->reactivar('ROL_REACTIVAR_OK');
		$this->devolverRest($respuesta);
	}

	function buscar(){
		$this->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_buscar();
		$respuesta = $this->rol_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->validar_entrada_atributos();
		$this->rol_SERVICE->inicializarRest();
		$this->rol_SERVICE->validar_verEnDetalle();
		$respuesta = $this->rol_SERVICE->verEnDetalle();
		$this->devolverRest($respuesta);
	}

}
?>