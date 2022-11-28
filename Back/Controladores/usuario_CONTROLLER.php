<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/usuario_SERVICE.php';

class usuario extends ControllerBase{
		
	private $usuario_SERVICE;

	public function __construct()
	{
		$this->usuario_SERVICE = new usuario_SERVICE();
	}

	function insertar(){
		$this->usuario_SERVICE->validar_entrada_atributos('usuario');
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_insertar();
		$respuesta = $this->usuario_SERVICE->insertar('USUARIO_INSERTAR_OK');
		devolverRest($respuesta);		
	}
	
	function editar(){
		$this->usuario_SERVICE->validar_entrada_atributos('usuario');
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_editar();
		$respuesta = $this->usuario_SERVICE->editar('USUARIO_EDITAR_OK');
		devolverRest($respuesta);
	}

			function editarContrasena(){
				$this->usuario_SERVICE->validar_entrada_atributos('usuario');
				$this->usuario_SERVICE->inicializarRest();
				$respuesta = $this->usuario_SERVICE->editarContrasena('USUARIO_EDITAR_CONTRASENA_OK');
				devolverRest($respuesta);
			}

	function borrar(){
		$_POST['borrado_logico'] = 1;
		$this->usuario_SERVICE->validar_entrada_atributos('usuario');
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_borrar();
		$respuesta = $this->usuario_SERVICE->borrar('USUARIO_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->usuario_SERVICE->validar_entrada_atributos('usuario');
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_reactivar();
		$respuesta = $this->usuario_SERVICE->reactivar('USUARIO_REACTIVAR_OK');
		devolverRest($respuesta);
	}

	function buscar(){
		$this->usuario_SERVICE->validar_entrada_atributos('usuario');
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_buscar();
		$respuesta = $this->usuario_SERVICE->buscar();
		devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->usuario_SERVICE->validar_entrada_atributos('usuario');
		$this->usuario_SERVICE->inicializarRest();
		$this->usuario_SERVICE->validar_verEnDetalle();
		$respuesta = $this->usuario_SERVICE->verEnDetalle();
		devolverRest($respuesta);
	}

}
?>
