<?php

include_once './Servicios/ServiceBase.php';

class auth_SERVICE extends ServiceBase{

	private $usuario;

	function inicializarRest(){				
		$this->listaAtributosIGUAL = array();
		
		switch(action){
			case 'login':
				$this->listaAtributos = array('usuario', 'contrasena');
				$this->usuario = $this->crearModelOne('usuario');
				$this->clase_validacion = $this->crearValidationOne('auth');
				$this->clase_validacion->usuario = $this->usuario;
				break;

			case 'registrar':
				$this->listaAtributos = array('usuario', 'contrasena', 'dni', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'telefono', 'email');
				$this->usuario = $this->crearModelOne('usuario');
				$this->clase_validacion = $this->crearValidationOne('auth');
				$this->clase_validacion->usuario = $this->usuario;
				break;

			case 'obtenerContrasenaCorreo':
				include_once './correo/obtenerContrasena_CORREO.php';
				$this->modelo = new obtenerContrasena_CORREO();
				$this->listaAtributos = array('usuario', 'email');
				$this->usuario = $this->crearModelOne('usuario');
				$this->clase_validacion = $this->crearValidationOne('auth');
				$this->clase_validacion->usuario = $this->usuario;	
				break;
		}
	}


	function verificacionToken(){

		try{
				
			include_once "./JWT/token.php";
			$tokenFront = $this->cargarTokenCabecera();
			$resultado = MiToken::devuelveToken($tokenFront);
			define('usuarioSistema', $resultado->data->usuario);
			define('rolUsuarioSistema', $resultado->data->rol);

		}catch(excepcionAccion $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(excepcionToken $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}
	}

///////////////////////////////////////////////////////LOGIN///////////////////////////////////////////////////////

	function validar_login(){
		try{
			$this->clase_validacion->validar_login();
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(excepcionAccion $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}
	}
	
	//Se genera un token por usuario, contrasena y rol.
	function login($mensaje){
		try{
			
			include_once './Modelos/rol_MODEL.php';
            $modeloRol = new rol_MODEL();
            $rol = $modeloRol->getById(array($this->usuario->getById(array($this->usuario->arrayDatoValor['usuario']))['resource']['id_rol']))['resource']['nombre_rol'];

			$usuarioDatos = [
				'usuario' => $this->usuario->arrayDatoValor['usuario'],
				'contrasena' => $this->usuario->arrayDatoValor['contrasena'],
				'rol' => $rol
			];

			include_once "./JWT/token.php";
			$token = MiToken::creaToken($usuarioDatos);
		}catch(excepcionToken $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}

			$this->feedback['ok'] = true;
			$this->feedback['code'] = $mensaje;
			$this->feedback['resource'] = $token;
		return $this->feedback;

	}

/////////////////////////////////////////////////////REGISTRO//////////////////////////////////////////////////////

	function validar_registro(){
		try{
			$this->clase_validacion->validar_registro();
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(excepcionAccion $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}
	}
	
	function registrar($mensaje){
		try{
				$this->usuario->ADD();
				$this->feedback['ok'] = true;
				$this->feedback['code'] = $mensaje;
			return $this->feedback;
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(excepcionAccion $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}
	}

//////////////////////////////////////////OBTENER_CONTRASENA_CORREO///////////////////////////////////////////////

	function validar_obtenerContrasenaCorreo(){
		try{
			$this->clase_validacion->validar_obtenerContrasenaCorreo();
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(excepcionAccion $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}
	}

	function obtenerContrasenaCorreo($mensaje){
		try{
				$contrasenaclaro = $this->modelo->obtenerContrasenaCorreo($this->usuario);
				$this->modelo->enviarCorreo($contrasenaclaro, $this->usuario);
				$this->feedback['ok'] = true;
				$this->feedback['code'] = $mensaje;
				$this->feedback['resource'] = $contrasenaclaro;
			return $this->feedback;
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(excepcionAccion $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());}	
	}

}
?>