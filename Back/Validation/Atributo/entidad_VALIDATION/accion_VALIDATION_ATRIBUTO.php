<?php

include_once './Validation/validar_class.php';

class accion_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_nombre_accion();
		$this->validar_descripcion_accion();
	}

	function validar_atributos_buscar(){
		$this->validar_id_buscar();
		$this->validar_nombre_accion_buscar();
		$this->validar_descripcion_accion_buscar();
	}

	function validar_atributos_editar(){
		$this->validar_id();
		//$this->validar_nombre_accion();
		$this->validar_descripcion_accion();
	}

	function validar_atributos_borrado(){
		$this->validar_id();
	}

	function validar_atributos_verEnDetalle(){
		$this->validar_id();
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	function validar_nombre_accion(){
		
		if($this->Es_Vacio($this->nombre_accion)===true){
			rellenarExcepcionAtributo('ACCION_NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre_accion,3)===false){
			rellenarExcepcionAtributo('ACCION_NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre_accion,48)===false){
			rellenarExcepcionAtributo('ACCION_NOMBRE_MAYOR_QUE_48');
		}

		if($this->comprobarLetrasNumerosSinEspacios($this->nombre_accion)===false){
			rellenarExcepcionAtributo('ACCION_NOMBRE_FORMATO_INCORRECTO');
		}
	
	}

	function validar_descripcion_accion(){

		if($this->Es_Vacio($this->descripcion_accion)===true){
			rellenarExcepcionAtributo('ACCION_DESCRIPCION_VACIO');
		}

		if($this->Longitud_minima($this->descripcion_accion,3)===false){
			rellenarExcepcionAtributo('ACCION_DESCRIPCION_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->descripcion_accion,200)===false){
			rellenarExcepcionAtributo('ACCION_DESCRIPCION_MAYOR_QUE_200');
		}

		if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_accion)===false){
			rellenarExcepcionAtributo('ACCION_DESCRIPCION_FORMATO_INCORRECTO');
		}
	}

	function validar_id(){
		if($this->Es_Vacio($this->id_accion)===true){
			rellenarExcepcionAtributo('ID_ACCION_VACIO');
		}
		if(!$this->Es_numerico($this->id_accion)===true){
			rellenarExcepcionAtributo('ID_ACCION_ERROR_FORMATO');
		}
	}

	////////buscar////////

	function validar_nombre_accion_buscar(){
		if(!empty($this->nombre_accion)){
			if($this->Longitud_maxima($this->nombre_accion,48)===false){
				rellenarExcepcionAtributo('ACCION_NOMBRE_MAYOR_QUE_48');
			}

			if($this->comprobarLetrasNumerosSinEspacios($this->nombre_accion)===false){
				rellenarExcepcionAtributo('ACCION_NOMBRE_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_descripcion_accion_buscar(){
		if(!empty($this->descripcion_accion)){
			if($this->Longitud_maxima($this->descripcion_accion,200)===false){
				rellenarExcepcionAtributo('ACCION_DESCRIPCION_MAYOR_QUE_200');
			}

			if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_accion)===false){
				rellenarExcepcionAtributo('ACCION_DESCRIPCION_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_id_buscar(){
		if(!empty($this->id_accion)){
			if(!$this->Es_numerico($this->id_accion)===true){
				rellenarExcepcionAtributo('ID_ACCION_ERROR_FORMATO');
			}
		}
	}

}

?>