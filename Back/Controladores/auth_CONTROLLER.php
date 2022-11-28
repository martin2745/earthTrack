<?php

include_once './Servicios/auth_SERVICE.php';

class auth{

	public function __construct(){
		$this->servicio = new auth_SERVICE();
	}

	function verificacionToken(){	
		$this->servicio->verificacionToken();
	}

	function login(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_login();
		$respuestaFront = $this->servicio->login('LOGIN_USUARIO_CORRECTO');
		devolverRest($respuestaFront);
	}

	function registrar(){
		$this->servicio->validar_entrada_atributos();	
		$this->servicio->inicializarRest();
		$this->servicio->validar_registro();
		$respuesta = $this->servicio->registrar('REGISTRAR_USUARIO_OK');
		devolverRest($respuesta);
	}

	function obtenerContrasenaCorreo(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_obtenerContrasenaCorreo();
		$respuesta = $this->servicio->obtenerContrasenaCorreo('RECUPERAR_CONTRASENA_EMAIL_OK');
		devolverRest($respuesta);		
	}
	
}
?>