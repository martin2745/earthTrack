<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/permiso_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/permiso_VALIDATION.php';

class permiso extends ControllerBase{

	private $permiso_SERVICE;

	public function __construct()
	{
		$this->permiso_SERVICE = new permiso_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_permiso();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function insertar(){
		$this->validar_entrada_atributos();
		$this->permiso_SERVICE->inicializarRest();
		$this->permiso_SERVICE->validar_insertar();
		$respuesta = $this->permiso_SERVICE->insertar('PERMISO_INSERTAR_OK');
		$this->devolverRest($respuesta);		
	}

	function borrar(){
		$this->validar_entrada_atributos();
		$this->permiso_SERVICE->inicializarRest();
		$this->permiso_SERVICE->validar_borrar();
		$respuesta = $this->permiso_SERVICE->borrar('PERMISO_BORRAR_OK');
		$this->devolverRest($respuesta);	
	}

	function buscar(){
		$this->validar_entrada_atributos();
		$this->permiso_SERVICE->inicializarRest();
		$this->permiso_SERVICE->validar_buscar();
		$respuesta = $this->permiso_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}	
}
?>