<?php

include_once './Validation/validar_class.php';
include_once './Validation/excepciones.php';

class usuario_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
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

	function validar_atributos_editar(){
		$this->validar_usuario();	
		$this->validar_id_rol();	
		$this->validar_nombre();
		$this->validar_apellidos();
		$this->validar_fechaNacimiento();
		$this->validar_direccion();
		$this->validar_telefono();
		$this->validar_email();
	}

	function validar_atributos_editarContrasena(){
		$this->validar_contrasena();
	}

	function validar_atributos_borrado(){	
		$this->validar_usuario();	
	}

	function validar_atributos_reactivar(){
		$this->validar_usuario();
	}

	function validar_atributos_buscar(){
		$this->validar_usuario_buscar();
		$this->validar_id_rol_buscar();
		$this->validar_dni_buscar();
		$this->validar_nombre_buscar();
		$this->validar_apellidos_buscar();
		$this->validar_fechaNacimiento_buscar();
		$this->validar_direccion_buscar();
		$this->validar_telefono_buscar();
		$this->validar_email_buscar();
		$this->validar_borrado_logico_buscar();	
	}

	function validar_atributos_verEnDetalle(){	
		$this->validar_usuario();	
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	function validar_usuario(){
		
		if($this->Es_Vacio($this->usuario)===true){
			//throw new excepcionAtributos('LOGIN_USUARIO_VACIO');
			$this->rellenarExcepcion('LOGIN_USUARIO_VACIO');
		}

		if($this->Longitud_minima($this->usuario,3)===false){
			//throw new excepcionAtributos('LOGIN_USUARIO_MENOR_QUE_3');
			$this->rellenarExcepcion('LOGIN_USUARIO_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->usuario,15)===false){
			//throw new excepcionAtributos('LOGIN_USUARIO_MAYOR_QUE_15');
			$this->rellenarExcepcion('LOGIN_USUARIO_MAYOR_QUE_15');
		}
			
		if($this->comprobarFormatoLoginContrasena($this->usuario)===false){
			//throw new excepcionAtributos('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
			$this->rellenarExcepcion('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
		}			
	}

	function validar_contrasena(){

		if($this->Es_Vacio($this->contrasena)===true){
			throw new excepcionAtributos('CONTRASEÑA_USUARIO_VACIA');
		}

		if($this->Longitud_exacta($this->contrasena,32)===false){
			throw new excepcionAtributos('CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA');
		}
			
		if($this->Es_alfanumerico($this->contrasena)===false){
			throw new excepcionAtributos('CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO');
		}			
	}

	function validar_id_rol(){
		if($this->Es_Vacio($this->id_rol)===true){
			throw new excepcionAtributos('ID_ROL_VACIO');
		}
		if(!$this->Es_numerico($this->id_rol)===true){
			throw new excepcionAtributos('ID_ROL_ERROR_FORMATO');
		}
	}

	function validar_dni(){
		
		if($this->Es_Vacio($this->dni)===true){
			throw new excepcionAtributos('DNI_VACIO');
		}

		if($this->Longitud_minima($this->dni,9)===false){
			throw new excepcionAtributos('DNI_MENOR_QUE_9');
		}

		if($this->Longitud_maxima($this->dni,9)===false){
			throw new excepcionAtributos('DNI_MAYOR_QUE_9');
		}

		if($this->Formato_dni($this->dni)===false){
			throw new excepcionAtributos('DNI_FORMATO_INCORRECTO');
		}
			
		if($this->LetraNIF($this->dni)===false) {
			throw new excepcionAtributos('DNI_LETRA_INCORRECTA');
		}
	}

	function validar_nombre(){

		if($this->Es_Vacio($this->nombre)===true){
			throw new excepcionAtributos('NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre,3)===false){
			throw new excepcionAtributos('NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre,45)===false){
			throw new excepcionAtributos('NOMBRE_MAYOR_QUE_45');
		}

		if($this->comprobarLetrasEspacios($this->nombre)===false){
			throw new excepcionAtributos('NOMBRE_FORMATO_INCORRECTO');
		}
	}

	function validar_apellidos(){

		if($this->Es_Vacio($this->apellidos)===true){
			throw new excepcionAtributos('APELLIDOS_VACIO');
		}

		if($this->Longitud_minima($this->apellidos,3)===false){
			throw new excepcionAtributos('APELLIDOS_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->apellidos,45)===false){
			throw new excepcionAtributos('APELLIDOS_MAYOR_QUE_45');
		}

		if($this->comprobarLetrasEspacios($this->apellidos)===false){
			throw new excepcionAtributos('APELLIDOS_FORMATO_INCORRECTO');
		}
			
	}

	function validar_fechaNacimiento(){

		if($this->Es_Vacio($this->fechaNacimiento)===true){
			throw new excepcionAtributos('FECHA_NACIMIENTO_VACIA');
		}

		switch ($this->comprobarFechanumerosbarra($this->fechaNacimiento)) {
			case 'formatofechamal':
				throw new excepcionAtributos('FECHA_NACIMIENTO_FORMATO_INCORRECTO');
				break;

			case 'tieneletras':
				throw new excepcionAtributos('FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES');
				break;

			case 'tamañomenor10':
				throw new excepcionAtributos('FECHA_NACIMIENTO_MENOR_QUE_10');
				break;			

			case 'tamañomayor10':
				throw new excepcionAtributos('FECHA_NACIMIENTO_MAYOR_QUE_10');
				break;
				
			case 'fechafutura':
				throw new excepcionAtributos('FECHA_NACIMIENTO_IMPOSIBLE');
				break;

			default:
				break;
		}
	}

	function validar_direccion(){
		
		if($this->Es_Vacio($this->direccion)===true){
			throw new excepcionAtributos('DIRECCION_VACIA');
		}

		if($this->Longitud_minima($this->direccion,5)===false){
			throw new excepcionAtributos('DIRECCION_MENOR_5');
		}

		if($this->Longitud_maxima($this->direccion,200)===false){
			throw new excepcionAtributos('DIRECCION_MAYOR_200');
		}

		if($this->FormatoCalle($this->direccion)===false){
			throw new excepcionAtributos('DIRECCION_FORMATO_INCORRECTO');
		}
	}

	function validar_telefono(){

		if($this->Es_Vacio($this->telefono)===true){
			throw new excepcionAtributos('TELEFONO_VACIO');
		}

		if($this->Longitud_minima($this->telefono,9)===false){
			throw new excepcionAtributos('TELEFONO_MENOR_QUE_9');
		}

		if($this->Longitud_maxima($this->telefono,9)===false){
			throw new excepcionAtributos('TELEFONO_MAYOR_QUE_9');
		}

		if($this->Es_numerico($this->telefono)===false){
			throw new excepcionAtributos('TELEFONO_FORMATO_INCORRECTO');
		}
	}

	function validar_email(){

		if($this->Es_Vacio($this->email)===true){
			throw new excepcionAtributos('EMAIL_VACIO');
		}

		if($this->Longitud_minima($this->email,6)===false){
			throw new excepcionAtributos('EMAIL_LONGITUD_MINIMA');
		}

		if($this->Longitud_maxima($this->email,40)===false){
			throw new excepcionAtributos('EMAIL_LONGITUD_MAXIMA');
		}

		if($this->Formato_email($this->email)===false){
			throw new excepcionAtributos('EMAIL_FORMATO_INCORRECTO');
		}
	}

	////////buscar////////

	function validar_usuario_buscar(){
		if(!empty($this->usuario)){
			if($this->Longitud_maxima($this->usuario,15)===false){
				throw new excepcionAtributos('LOGIN_USUARIO_MAYOR_QUE_15');
			}
				
			if($this->comprobarFormatoLoginContrasena($this->usuario)===false){
				throw new excepcionAtributos('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
			}			
		}
	}

	
	function validar_id_rol_buscar(){
		if(!empty($this->id_rol)){
			if(!$this->Es_numerico($this->id_rol)===true){
				throw new excepcionAtributos('ID_ROL_ERROR_FORMATO');
			}
		}
	}

	function validar_dni_buscar(){
		if(!empty($this->dni)){
			if($this->Longitud_maxima($this->dni,9)===false){
				throw new excepcionAtributos('DNI_MAYOR_QUE_9');
			}
		}
	}

	function validar_nombre_buscar(){
		if(!empty($this->nombre)){
			if($this->Longitud_maxima($this->nombre,45)===false){
				throw new excepcionAtributos('NOMBRE_MAYOR_QUE_45');
			}
			
			if($this->comprobarLetrasEspacios($this->nombre)===false){
				throw new excepcionAtributos('NOMBRE_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_apellidos_buscar(){
		if(!empty($this->apellidos)){
			if($this->Longitud_maxima($this->apellidos,45)===false){
				throw new excepcionAtributos('APELLIDOS_MAYOR_QUE_45');
			}
			
			if($this->comprobarLetrasEspacios($this->apellidos)===false){
				throw new excepcionAtributos('APELLIDOS_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_fechaNacimiento_buscar(){
		if(!empty($this->fechaNacimiento)){
			switch ($this->comprobarFechanumerosbarra($this->fechaNacimiento)) {
				case 'formatofechamal':
					throw new excepcionAtributos('FECHA_NACIMIENTO_FORMATO_INCORRECTO');
					break;

				case 'tieneletras':
					throw new excepcionAtributos('FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES');
					break;

				case 'tamañomenor10':
					throw new excepcionAtributos('FECHA_NACIMIENTO_MENOR_QUE_10');
					break;			

				case 'tamañomayor10':
					throw new excepcionAtributos('FECHA_NACIMIENTO_MAYOR_QUE_10');
					break;
					
				case 'fechafutura':
					throw new excepcionAtributos('FECHA_NACIMIENTO_IMPOSIBLE');
					break;

				default:
					break;
			}
		}
	}

	function validar_direccion_buscar(){
		if(!empty($this->direccion)){
			if($this->Longitud_maxima($this->direccion,200)===false){
				throw new excepcionAtributos('DIRECCION_MAYOR_200');
			}
			
			if($this->FormatoCalle($this->direccion)===false){
				throw new excepcionAtributos('DIRECCION_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_telefono_buscar(){
		if(!empty($this->telefono)){
			if($this->Longitud_maxima($this->telefono,9)===false){
				throw new excepcionAtributos('TELEFONO_MAYOR_QUE_9');
			}
			
			if($this->Es_numerico($this->telefono)===false){
				throw new excepcionAtributos('TELEFONO_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_email_buscar(){
		if(!empty($this->email)){
			if($this->Longitud_maxima($this->email,40)===false){
				throw new excepcionAtributos('EMAIL_LONGITUD_MAXIMA');
			}

			if($this->Formato_email($this->email)===false){
				throw new excepcionAtributos('EMAIL_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_borrado_logico_buscar(){
		if(!empty($this->borrado_logico)){
			if($this->Es_flag($this->borrado_logico)===false){
				throw new excepcionAtributos('BORRADO_LOGICO_DIFERENTE_0_1');
			}
		}
	}

}
?>