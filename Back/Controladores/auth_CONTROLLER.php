<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/auth_SERVICE.php';
include_once './Validation/Atributo/controlador_VALIDATION/auth_VALIDATION.php';

class auth extends ControllerBase{

	private $auth_SERVICE;

	public function __construct(){
		$this->auth_SERVICE = new auth_SERVICE();
	}

	function validar_entrada_atributos(){
		try{
			validar_entrada_auth();
		}catch(excepcionAtributos $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}	
	}

	function verificacionToken(){	
		$this->auth_SERVICE->verificacionToken();
	}

	function login(){
		$this->validar_entrada_atributos();	
		$this->auth_SERVICE->inicializarRest();
		$this->auth_SERVICE->validar_login();
		$respuestaFront = $this->auth_SERVICE->login('LOGIN_USUARIO_CORRECTO');
		$this->devolverRest($respuestaFront);
	}

	function registrar(){
		$this->validar_entrada_atributos();		
		$this->auth_SERVICE->inicializarRest();
		$this->auth_SERVICE->validar_registro();
		$respuesta = $this->auth_SERVICE->registrar('REGISTRAR_USUARIO_OK');
		$this->devolverRest($respuesta);
	}

	function obtenerContrasenaCorreo(){
		$this->validar_entrada_atributos();
		$this->auth_SERVICE->inicializarRest();
		$this->auth_SERVICE->validar_obtenerContrasenaCorreo();
		$respuesta = $this->auth_SERVICE->obtenerContrasenaCorreo('RECUPERAR_CONTRASENA_EMAIL_OK');
		$this->devolverRest($respuesta);		
	}
	
}
?>