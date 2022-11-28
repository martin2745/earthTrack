<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/auth_SERVICE.php';

class auth extends ControllerBase{

	private $auth_SERVICE;

	public function __construct(){
		$this->auth_SERVICE = new auth_SERVICE();
	}

	function verificacionToken(){	
		$this->auth_SERVICE->verificacionToken();
	}

	function login(){
		$this->auth_SERVICE->validar_entrada_atributos('auth');	
		$this->auth_SERVICE->inicializarRest();
		$this->auth_SERVICE->validar_login();
		$respuestaFront = $this->auth_SERVICE->login('LOGIN_USUARIO_CORRECTO');
		devolverRest($respuestaFront);
	}

	function registrar(){
		$this->auth_SERVICE->validar_entrada_atributos('auth');		
		$this->auth_SERVICE->inicializarRest();
		$this->auth_SERVICE->validar_registro();
		$respuesta = $this->auth_SERVICE->registrar('REGISTRAR_USUARIO_OK');
		devolverRest($respuesta);
	}

	function obtenerContrasenaCorreo(){
		$this->auth_SERVICE->validar_entrada_atributos('auth');
		$this->auth_SERVICE->inicializarRest();
		$this->auth_SERVICE->validar_obtenerContrasenaCorreo();
		$respuesta = $this->auth_SERVICE->obtenerContrasenaCorreo('RECUPERAR_CONTRASENA_EMAIL_OK');
		devolverRest($respuesta);		
	}
	
}
?>