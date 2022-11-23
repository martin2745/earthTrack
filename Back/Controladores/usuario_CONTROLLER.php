<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/usuario_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/usuario_VALIDATION.php';

class usuario extends ControllerBase{
		
	private $usuario_SERVICE;

	public function __construct()
	{
		$this->usuario_SERVICE = new usuario_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_usuario();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function insertar(){
		$this->validar_entrada_atributos();
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_insertar();
		$respuesta = $this->usuario_SERVICE->insertar('USUARIO_INSERTAR_OK');
		$this->devolverRest($respuesta);		
	}
	
	function editar(){
		$this->validar_entrada_atributos();
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_editar();
		$respuesta = $this->usuario_SERVICE->editar('USUARIO_EDITAR_OK');
		$this->devolverRest($respuesta);
	}

			function editarContrasena(){
				$this->validar_entrada_atributos();
				$this->usuario_SERVICE->inicializarRest();
				$respuesta = $this->usuario_SERVICE->editarContrasena('USUARIO_EDITAR_CONTRASENA_OK');
				$this->devolverRest($respuesta);
			}

	function borrar(){
		$_POST['borrado_logico'] = 1;
		$this->validar_entrada_atributos();
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_borrar();
		$respuesta = $this->usuario_SERVICE->borrar('USUARIO_BORRAR_OK');
		$this->devolverRest($respuesta);	
	}

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->validar_entrada_atributos();
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_reactivar();
		$respuesta = $this->usuario_SERVICE->reactivar('USUARIO_REACTIVAR_OK');
		$this->devolverRest($respuesta);
	}

	function buscar(){
		$this->validar_entrada_atributos();
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_buscar();
		$respuesta = $this->usuario_SERVICE->buscar();
		$this->devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->validar_entrada_atributos();
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_verEnDetalle();
		$respuesta = $this->usuario_SERVICE->verEnDetalle();
		$this->devolverRest($respuesta);
	}

}
?>
