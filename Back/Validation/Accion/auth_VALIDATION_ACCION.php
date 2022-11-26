<?php

include_once './Validation/validar_class.php';
include_once './Validation/excepciones.php';

class auth_VALIDATION_ACCION extends Validar{

	function validar_login(){
		if(!$this->existe_usuario()){
			//throw new excepcionAccion('USUARIO_NO_EXISTE');
			$this->rellenarExcepcion('USUARIO_NO_EXISTE');
		}
		if(!$this->usuario_contrasena_correcto()){
			//throw new excepcionAccion('CONTRASENA_INCORRECTO');
			$this->rellenarExcepcion('CONTRASENA_INCORRECTO');
		}		
		if($this->existe_usuario_eliminado()){
			//throw new excepcionAccion('USUARIO_ELIMINADO');
			$this->rellenarExcepcion('USUARIO_ELIMINADO');
		}
	}
	
	function validar_registro(){
		if($this->existe_usuario()){
			//throw new excepcionAccion('USUARIO_YA_EXISTE');
			$this->rellenarExcepcion('USUARIO_YA_EXISTE');
		}
		if($this->existe_email()){
			//throw new excepcionAccion('EMAIL_YA_EXISTE');
			$this->rellenarExcepcion('EMAIL_YA_EXISTE');
		}
	}

	function validar_obtenerContrasenaCorreo(){
		if(!$this->existe_usuario()){
			//throw new excepcionAccion('USUARIO_NO_EXISTE');
			$this->rellenarExcepcion('USUARIO_NO_EXISTE');
		}
		if(!$this->existe_correo()){
			//throw new excepcionAccion('EMAIL_NO_EXISTE');
			$this->rellenarExcepcion('EMAIL_NO_EXISTE');
		}
		if(!$this->usuario_correo_misma_usuario()){
			//throw new excepcionAccion('USUARIO_EMAIL_NO_COINCIDEN');
			$this->rellenarExcepcion('USUARIO_EMAIL_NO_COINCIDEN');
		}
	}

	/**
	 * LOGIN
	 */
		/**
		 * Comprobamos que exista el usuario en el sistema
		 */
		function existe_usuario(){
			$fila = $this->usuario->getById(array($this->usuario->arrayDatoValor['usuario']))['resource'];
			if (!empty($fila)){ return true; }
			else{ return false; }
		}

		/**
		 * Comprobamos que para el usuario la contraseña sea correcta
		 */
		function usuario_contrasena_correcto(){
			$fila = $this->usuario->getById(array($this->usuario->arrayDatoValor['usuario']))['resource'];
			if (empty($fila) || $fila['contrasena'] != $this->usuario->arrayDatoValor['contrasena']){ return false; }
			else{ return true; }
		}

		/**
		 * No debemos permitir que un usuario que está borrado de forma lógica pueda acceder al sistema
		 */
		function existe_usuario_eliminado(){	
			$fila = $this->usuario->getById(array($this->usuario->arrayDatoValor['usuario']))['resource'];	
			if ($fila['borrado_logico'] == 1){ return true; }
			else{ return false; }
		}

	/**
	 * REGISTRAR
	 */
		
		/**
		 * No se puede insertar un usuario si el email del usuario ya existe en el sistema
		 */
		function existe_email(){	
			$fila = $this->usuario->seek(array('email'), array($this->usuario->arrayDatoValor['email']))['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }
		}

		/**
		 * Existe ya el DNI del usuario en el sistema
		 */
		function existe_dni(){
			$fila = $this->usuario->seek(array('dni'), array($this->usuario->arrayDatoValor['dni']))['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }
		}

	/**
	 * OBTENER CONTRASEÑA CORREO
	 */

		/**
		 * Miramos si el correo de recuperación existe en el sistema
		 */
		function existe_correo(){
			$fila = $this->usuario->seek(array('email'), array($this->arrayDatoValor['email']))['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }
		}

		/**
		 * Comprobamos que el correo electrónico pertenece al usuario
		 */
		function usuario_correo_misma_usuario(){
			$fila = $this->usuario->seek(array('usuario', 'email'), (array($this->arrayDatoValor['usuario'], $this->arrayDatoValor['email'])))['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }
		}

}
?>