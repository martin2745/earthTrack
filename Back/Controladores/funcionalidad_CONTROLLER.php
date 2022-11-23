<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/funcionalidad_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/funcionalidad_VALIDATION.php';

class funcionalidad extends ControllerBase{

	private $funcionalidad_SERVICE;

	public function __construct()
	{
		$this->funcionalidad_SERVICE = new funcionalidad_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_funcionalidad();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function insertar(){
		$this->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_insertar();
		$respuesta = $this->funcionalidad_SERVICE->insertar('FUNCIONALIDAD_INSERTAR_OK');
		$this->devolverRest($respuesta);		
	}
	
	function editar(){
		$this->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_editar();
		$respuesta = $this->funcionalidad_SERVICE->editar('FUNCIONALIDAD_EDITAR_OK');
		$this->devolverRest($respuesta);
	}

	function borrar(){
		$this->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_borrar();
		$respuesta = $this->funcionalidad_SERVICE->borrar('FUNCIONALIDAD_BORRAR_OK');
		$this->devolverRest($respuesta);	
	}

	function buscar(){
		$this->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_buscar();
		$respuesta = $this->funcionalidad_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->validar_entrada_atributos();
		$this->funcionalidad_SERVICE->inicializarRest();
		$this->funcionalidad_SERVICE->validar_verEnDetalle();
		$respuesta = $this->funcionalidad_SERVICE->verEnDetalle();
		$this->devolverRest($respuesta);
	}

	function accionesFuncionalidad(){
		$this->funcionalidad_SERVICE->inicializarRest();
		$respuesta = $this->funcionalidad_SERVICE->accionesFuncionalidad('ACCIONES_FUNCIONALIDAD');
		$this->devolverRest($respuesta);
	}

	function funcionalidadesSistema(){
		$this->funcionalidad_SERVICE->inicializarRest();
		$respuesta = $this->funcionalidad_SERVICE->funcionalidadesSistema('FUNCIONALIDADES_SISTEMA');
		$this->devolverRest($respuesta);	
	}

}
?>