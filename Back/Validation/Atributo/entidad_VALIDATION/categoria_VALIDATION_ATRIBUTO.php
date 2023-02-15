<?php

include_once './Validation/validar_class.php';

class categoria_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_nombre_categoria();
		$this->validar_descripcion_categoria();
		$this->validar_id_padre();
	}

	function validar_atributos_buscar(){
		$this->validar_id_buscar();
		$this->validar_nombre_categoria_buscar();
		$this->validar_descripcion_categoria_buscar();
	}

	function validar_atributos_editar(){
		$this->validar_id();
		$this->validar_nombre_categoria();
		$this->validar_descripcion_categoria();
	}

	function validar_atributos_borrado(){
		$this->validar_id();
	}

	function validar_atributos_verEnDetalle(){
		$this->validar_id();
	}

	function validar_atributos_devolverPadre(){
		$this->validar_id();
	}
	

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	function validar_nombre_categoria(){
		
		if($this->Es_Vacio($this->nombre_categoria)===true){
			rellenarExcepcionAtributo('CATEGORIA_NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre_categoria,3)===false){
			rellenarExcepcionAtributo('CATEGORIA_NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre_categoria,48)===false){
			rellenarExcepcionAtributo('CATEGORIA_NOMBRE_MAYOR_QUE_48');
		}

		if($this->comprobarLetrasNumerosEspacios($this->nombre_categoria)===false){
			rellenarExcepcionAtributo('CATEGORIA_NOMBRE_FORMATO_INCORRECTO');
		}
	
	}

	function validar_descripcion_categoria(){

		if($this->Es_Vacio($this->descripcion_categoria)===true){
			rellenarExcepcionAtributo('CATEGORIA_DESCRIPCION_VACIO');
		}

		if($this->Longitud_minima($this->descripcion_categoria,3)===false){
			rellenarExcepcionAtributo('CATEGORIA_DESCRIPCION_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->descripcion_categoria,200)===false){
			rellenarExcepcionAtributo('CATEGORIA_DESCRIPCION_MAYOR_QUE_200');
		}

		if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_categoria)===false){
			rellenarExcepcionAtributo('CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO');
		}
	}

	function validar_id(){
		if($this->Es_Vacio($this->id_categoria)===true){
			rellenarExcepcionAtributo('ID_CATEGORIA_VACIO');
		}
		if(!$this->Es_numerico($this->id_categoria)===true){
			rellenarExcepcionAtributo('ID_CATEGORIA_ERROR_FORMATO');
		}
	}

	function validar_id_padre(){
		if($this->Es_Vacio($this->id_padre)===true){
			rellenarExcepcionAtributo('ID_PADRE_VACIO');
		}
		if(!$this->Es_numerico($this->id_padre)===true){
			rellenarExcepcionAtributo('ID_PADRE_ERROR_FORMATO');
		}
	}

	////////buscar////////

	function validar_nombre_categoria_buscar(){
		if(!empty($this->nombre_categoria)){
			if($this->Longitud_maxima($this->nombre_categoria,48)===false){
				rellenarExcepcionAtributo('CATEGORIA_NOMBRE_MAYOR_QUE_48');
			}

			if($this->comprobarLetrasNumerosEspacios($this->nombre_categoria)===false){
				rellenarExcepcionAtributo('CATEGORIA_NOMBRE_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_descripcion_categoria_buscar(){
		if(!empty($this->descripcion_categoria)){
			if($this->Longitud_maxima($this->descripcion_categoria,200)===false){
				rellenarExcepcionAtributo('CATEGORIA_DESCRIPCION_MAYOR_QUE_200');
			}

			if($this->comprobarLetrasNumerosEspaciosSignos($this->descripcion_categoria)===false){
				rellenarExcepcionAtributo('CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_id_buscar(){
		if(!empty($this->id_categoria)){
			if(!$this->Es_numerico($this->id_categoria)===true){
				rellenarExcepcionAtributo('ID_CATEGORIA_ERROR_FORMATO');
			}
		}
	}

}

?>