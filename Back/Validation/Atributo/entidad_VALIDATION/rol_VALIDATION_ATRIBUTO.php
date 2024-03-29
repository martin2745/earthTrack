<?php

include_once './Validation/validar_class.php';

class rol_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_nombre_rol();
		$this->validar_descripcion_rol();
	}

	function validar_atributos_buscar(){
		$this->validar_id_buscar();
		$this->validar_nombre_rol_buscar();
		$this->validar_descripcion_rol_buscar();
		$this->validar_borrado_logico_buscar();
	}

	function validar_atributos_editar(){
		$this->validar_id();
		//$this->validar_nombre_rol();
		$this->validar_descripcion_rol();
	}

	function validar_atributos_borrado(){
		$this->validar_id();
	}

	function validar_atributos_verEnDetalle(){
		$this->validar_id();
	}

	function validar_atributos_reactivar(){
		$this->validar_id();
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	function validar_nombre_rol(){
		
		if($this->Es_Vacio($this->nombre_rol)===true){
			rellenarExcepcionAtributo('ROL_NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre_rol,3)===false){
			rellenarExcepcionAtributo('ROL_NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre_rol,48)===false){
			rellenarExcepcionAtributo('ROL_NOMBRE_MAYOR_QUE_48');
		}

		if($this->comprobarLetrasNumerosSinEspacios($this->nombre_rol)===false){
			rellenarExcepcionAtributo('ROL_NOMBRE_FORMATO_INCORRECTO');
		}
	
	}

	function validar_descripcion_rol(){

		if($this->Es_Vacio($this->descripcion_rol)===true){
			rellenarExcepcionAtributo('ROL_DESCRIPCION_VACIO');
		}

		if($this->Longitud_minima($this->descripcion_rol,3)===false){
			rellenarExcepcionAtributo('ROL_DESCRIPCION_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->descripcion_rol,200)===false){
			rellenarExcepcionAtributo('ROL_DESCRIPCION_MAYOR_QUE_200');
		}

		if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_rol)===false){
			rellenarExcepcionAtributo('ROL_DESCRIPCION_FORMATO_INCORRECTO');
		}
	}

	function validar_id(){
		if($this->Es_Vacio($this->id_rol)===true){
			rellenarExcepcionAtributo('ID_ROL_VACIO');
		}
		if(!$this->Es_numerico($this->id_rol)===true){
			rellenarExcepcionAtributo('ID_ROL_ERROR_FORMATO');
		}
	}

	function validar_borrado(){
		if($this->Es_flag($this->borrado_logico)===false){
			rellenarExcepcionAtributo('BORRADO_LOGICO_DIFERENTE_0_1');
		}
	}


	////////buscar////////

	function validar_nombre_rol_buscar(){
		if(!empty($this->nombre_rol)){
			if($this->Longitud_maxima($this->nombre_rol,48)===false){
				rellenarExcepcionAtributo('ROL_NOMBRE_MAYOR_QUE_48');
			}

			if($this->comprobarLetrasNumerosSinEspacios($this->nombre_rol)===false){
				rellenarExcepcionAtributo('ROL_NOMBRE_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_descripcion_rol_buscar(){
		if(!empty($this->descripcion_rol)){
			if($this->Longitud_maxima($this->descripcion_rol,200)===false){
				rellenarExcepcionAtributo('ROL_DESCRIPCION_MAYOR_QUE_200');
			}

			if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_rol)===false){
				rellenarExcepcionAtributo('ROL_DESCRIPCION_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_id_buscar(){
		if(!empty($this->id_rol)){
			if(!$this->Es_numerico($this->id_rol)===true){
				rellenarExcepcionAtributo('ID_ROL_ERROR_FORMATO');
			}
		}
	}

	function validar_borrado_logico_buscar(){
		if(!empty($this->borrado_logico)){
			if($this->Es_flag($this->borrado_logico)===false){
				rellenarExcepcionAtributo('BORRADO_LOGICO_DIFERENTE_0_1');
			}
		}
	}

}

?>