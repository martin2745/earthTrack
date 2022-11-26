<?php

include_once './Validation/Validar_class.php';
include_once './Validation/excepciones.php';

class funcionalidad_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_nombre_funcionalidad();
		$this->validar_descripcion_funcionalidad();
	}

	function validar_atributos_buscar(){
		$this->validar_id_buscar();
		$this->validar_nombre_funcionalidad_buscar();
		$this->validar_descripcion_funcionalidad_buscar();
	}

	function validar_atributos_editar(){
		$this->validar_id();
		//$this->validar_nombre_funcionalidad();
		$this->validar_descripcion_funcionalidad();
	}

	function validar_atributos_borrado(){
		$this->validar_id();
	}

	function validar_atributos_verEnDetalle(){
		$this->validar_id();
	}

	function validar_atributos_accionesFuncionalidad(){
		$this->validar_nombre_funcionalidad();
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	function validar_nombre_funcionalidad(){
		
		if($this->Es_Vacio($this->nombre_funcionalidad)===true){
			//throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_VACIO');
			$this->rellenarExcepcion('FUNCIONALIDAD_NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre_funcionalidad,3)===false){
			//throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_MENOR_QUE_3');
			$this->rellenarExcepcion('FUNCIONALIDAD_NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre_funcionalidad,48)===false){
			//throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48');
			$this->rellenarExcepcion('FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48');
		}

		if($this->comprobarLetrasNumerosSinEspacios($this->nombre_funcionalidad)===false){
			//throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO');
			$this->rellenarExcepcion('FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO');
		}
	
	}

	function validar_descripcion_funcionalidad(){

		if($this->Es_Vacio($this->descripcion_funcionalidad)===true){
			//throw new excepcionAtributos('FUNCIONALIDAD_DESCRIPCION_VACIO');
			$this->rellenarExcepcion('FUNCIONALIDAD_DESCRIPCION_VACIO');
		}

		if($this->Longitud_minima($this->descripcion_funcionalidad,3)===false){
			//throw new excepcionAtributos('FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3');
			$this->rellenarExcepcion('FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->descripcion_funcionalidad,200)===false){
			//throw new excepcionAtributos('FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200');
			$this->rellenarExcepcion('FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200');
		}

		if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_funcionalidad)===false){
			//throw new excepcionAtributos('FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO');
			$this->rellenarExcepcion('FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO');
		}
	}

	function validar_id(){
		if($this->Es_Vacio($this->id_funcionalidad)===true){
			//throw new excepcionAtributos('ID_FUNCIONALIDAD_VACIO');
			$this->rellenarExcepcion('ID_FUNCIONALIDAD_VACIO');
		}
		if(!$this->Es_numerico($this->id_funcionalidad)===true){
			//throw new excepcionAtributos('ID_FUNCIONALIDAD_ERROR_FORMATO');
			$this->rellenarExcepcion('ID_FUNCIONALIDAD_ERROR_FORMATO');
		}
	}

	////////buscar////////

	function validar_nombre_funcionalidad_buscar(){
		if(!empty($this->nombre_funcionalidad)){
			if($this->Longitud_maxima($this->nombre_funcionalidad,48)===false){
				//throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48');
				$this->rellenarExcepcion('FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48');
			}

			if($this->comprobarLetrasNumerosSinEspacios($this->nombre_funcionalidad)===false){
				//throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO');
				$this->rellenarExcepcion('FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_descripcion_funcionalidad_buscar(){
		if(!empty($this->descripcion_funcionalidad)){
			if($this->Longitud_maxima($this->descripcion_funcionalidad,200)===false){
				//throw new excepcionAtributos('FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200');
				$this->rellenarExcepcion('FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200');
			}

			if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_funcionalidad)===false){
				//throw new excepcionAtributos('FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO');
				$this->rellenarExcepcion('FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_id_buscar(){
		if(!empty($this->id_funcionalidad)){
			if(!$this->Es_numerico($this->id_funcionalidad)===true){
				//throw new excepcionAtributos('ID_FUNCIONALIDAD_ERROR_FORMATO');
				$this->rellenarExcepcion('ID_FUNCIONALIDAD_ERROR_FORMATO');
			}
		}
	}

}

?>