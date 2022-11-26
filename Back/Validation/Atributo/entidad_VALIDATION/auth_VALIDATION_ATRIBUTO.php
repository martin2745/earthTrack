<?php

class auth_VALIDATION_ATRIBUTO extends Validar{
	
	function validar_atributos_login(){
		$this->validar_usuario();
		$this->validar_contrasena();		
	}

	function validar_atributos_registro(){
		$this->validar_usuario();
		$this->validar_contrasena();
		$this->validar_dni();
		$this->validar_nombre();
		$this->validar_apellidos();
		$this->validar_fechaNacimiento();
		$this->validar_direccion();
		$this->validar_telefono();
		$this->validar_email();
	}

	function validar_atributos_correo(){
		$this->validar_usuario();
		$this->validar_email();
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
	
	function validar_usuario(){
		
		if($this->Es_Vacio($this->usuario)===true){
			$this->rellenarExcepcion('LOGIN_USUARIO_VACIO');
		}

		if($this->Longitud_minima($this->usuario,3)===false){
			$this->rellenarExcepcion('LOGIN_USUARIO_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->usuario,15)===false){
			$this->rellenarExcepcion('LOGIN_USUARIO_MAYOR_QUE_15');
		}
			
		if($this->comprobarFormatoLoginContrasena($this->usuario)===false){
			$this->rellenarExcepcion('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
		}		
	}

	function validar_contrasena(){

		if($this->Es_Vacio($this->contrasena)===true){
			$this->rellenarExcepcion('CONTRASEÑA_USUARIO_VACIA');
		}

		if($this->Longitud_exacta($this->contrasena,32)===false){
			$this->rellenarExcepcion('CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA');
		}	

		if($this->comprobarFormatoLoginContrasena($this->contrasena)===false){
			$this->rellenarExcepcion('CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO');
		}	
	}	

	function validar_dni(){
		
		if($this->Es_Vacio($this->dni)===true){
			$this->rellenarExcepcion('DNI_VACIO');
		}

		if($this->Longitud_minima($this->dni,9)===false){
			$this->rellenarExcepcion('DNI_MENOR_QUE_9');
		}

		if($this->Longitud_maxima($this->dni,9)===false){
			$this->rellenarExcepcion('DNI_MAYOR_QUE_9');
		}

		if($this->Formato_dni($this->dni)===false){
			$this->rellenarExcepcion('DNI_FORMATO_INCORRECTO');
		}
			
		if($this->LetraNIF($this->dni)===false) {
			$this->rellenarExcepcion('DNI_LETRA_INCORRECTA');
		}
	}

	function validar_nombre(){

		if($this->Es_Vacio($this->nombre)===true){
			$this->rellenarExcepcion('NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre,3)===false){
			$this->rellenarExcepcion('NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre,45)===false){
			$this->rellenarExcepcion('NOMBRE_MAYOR_QUE_45');
		}

		if($this->comprobarLetrasEspacios($this->nombre)===false){
			$this->rellenarExcepcion('NOMBRE_FORMATO_INCORRECTO');
		}
	}

	function validar_apellidos(){

		if($this->Es_Vacio($this->apellidos)===true){
			$this->rellenarExcepcion('APELLIDOS_VACIO');
		}

		if($this->Longitud_minima($this->apellidos,3)===false){
			$this->rellenarExcepcion('APELLIDOS_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->apellidos,45)===false){
			$this->rellenarExcepcion('APELLIDOS_MAYOR_QUE_45');
		}	

		if($this->comprobarLetrasEspacios($this->apellidos)===false){
			$this->rellenarExcepcion('APELLIDOS_FORMATO_INCORRECTO');
		}
	}

	function validar_fechaNacimiento(){

		if($this->Es_Vacio($this->fechaNacimiento)===true){
			$this->rellenarExcepcion('FECHA_NACIMIENTO_VACIA');
		}

		switch ($this->comprobarFechanumerosbarra($this->fechaNacimiento)) {
			case 'formatofechamal':
				$this->rellenarExcepcion('FECHA_NACIMIENTO_FORMATO_INCORRECTO');
				break;

			case 'tieneletras':
				$this->rellenarExcepcion('FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES');
				break;

			case 'tamañomenor10':
				$this->rellenarExcepcion('FECHA_NACIMIENTO_MENOR_QUE_10');
				break;			

			case 'tamañomayor10':
				$this->rellenarExcepcion('FECHA_NACIMIENTO_MAYOR_QUE_10');
				break;
				
			case 'fechafutura':
				$this->rellenarExcepcion('FECHA_NACIMIENTO_IMPOSIBLE');
				break;

			default:
				break;
		}
	}

	function validar_direccion(){
		
		if($this->Es_Vacio($this->direccion)===true){
			$this->rellenarExcepcion('DIRECCION_VACIA');
		}

		if($this->Longitud_minima($this->direccion,5)===false){
			$this->rellenarExcepcion('DIRECCION_MENOR_5');
		}

		if($this->Longitud_maxima($this->direccion,200)===false){
			$this->rellenarExcepcion('DIRECCION_MAYOR_200');
		}

		if($this->FormatoCalle($this->direccion)===false){
			$this->rellenarExcepcion('DIRECCION_FORMATO_INCORRECTO');
		}
	}

	function validar_telefono(){

		if($this->Es_Vacio($this->telefono)===true){
			$this->rellenarExcepcion('TELEFONO_VACIO');
		}

		if($this->Longitud_minima($this->telefono,9)===false){
			$this->rellenarExcepcion('TELEFONO_MENOR_QUE_9');
		}

		if($this->Longitud_maxima($this->telefono,9)===false){
			$this->rellenarExcepcion('TELEFONO_MAYOR_QUE_9');
		}

		if($this->Es_numerico($this->telefono)===false){
			$this->rellenarExcepcion('TELEFONO_FORMATO_INCORRECTO');
		}
	}

	function validar_email(){

		if($this->Es_Vacio($this->email)===true){
			$this->rellenarExcepcion('EMAIL_VACIO');
		}

		if($this->Longitud_minima($this->email,6)===false){
			$this->rellenarExcepcion('EMAIL_LONGITUD_MINIMA');
		}

		if($this->Longitud_maxima($this->email,40)===false){
			$this->rellenarExcepcion('EMAIL_LONGITUD_MAXIMA');
		}

		if($this->Formato_email($this->email)===false){
			$this->rellenarExcepcion('EMAIL_FORMATO_INCORRECTO');
		}
	}
}
?>