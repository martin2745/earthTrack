<?php

include_once './Validation/Validar_class.php';
include_once './Validation/excepciones.php';

class permiso_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_id_rol();
		$this->validar_id_accion();
		$this->validar_id_funcionalidad();
	}

    function validar_atributos_borrado(){
		$this->validar_id_rol();
		$this->validar_id_accion();
		$this->validar_id_funcionalidad();
	}

	function validar_atributos_buscar(){
		$this->validar_nombre_funcionalidad_buscar();
	}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	function validar_id_rol(){
		if($this->Es_Vacio($this->id_rol)===true){
			throw new excepcionAtributos('ID_ROL_VACIO');
		}
		if(!$this->Es_numerico($this->id_rol)===true){
			throw new excepcionAtributos('ID_ROL_ERROR_FORMATO');
		}
	}

    function validar_id_accion(){
		if($this->Es_Vacio($this->id_accion)===true){
			throw new excepcionAtributos('ID_ACCION_VACIO');
		}
		if(!$this->Es_numerico($this->id_accion)===true){
			throw new excepcionAtributos('ID_ACCION_ERROR_FORMATO');
		}
	}

    function validar_id_funcionalidad(){
		if($this->Es_Vacio($this->id_funcionalidad)===true){
			throw new excepcionAtributos('ID_FUNCIONALIDAD_VACIO');
		}
		if(!$this->Es_numerico($this->id_funcionalidad)===true){
			throw new excepcionAtributos('ID_FUNCIONALIDAD_ERROR_FORMATO');
		}
	}


	////////buscar////////

	function validar_id_rol_buscar(){
		if(!empty($this->id_rol)){
			if(!$this->Es_numerico($this->id_rol)===true){
				throw new excepcionAtributos('ID_ROL_ERROR_FORMATO');
			}
		}
	}

    function validar_id_accion_buscar(){
        if(!empty($this->id_accion)){
            if(!$this->Es_numerico($this->id_accion)===true){
                throw new excepcionAtributos('ID_ACCION_ERROR_FORMATO');
            }
        }
	}

    function validar_id_funcionalidad_buscar(){
        if(!empty($this->id_funcionalidad)){
            if(!$this->Es_numerico($this->id_funcionalidad)===true){
                throw new excepcionAtributos('ID_FUNCIONALIDAD_ERROR_FORMATO');
            }
        }
	}

	function validar_nombre_funcionalidad_buscar(){
		
		if($this->Es_Vacio($this->nombre_funcionalidad)===true){
			throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_VACIO');
		}

		if($this->Longitud_minima($this->nombre_funcionalidad,3)===false){
			throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre_funcionalidad,48)===false){
			throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48');
		}

		if($this->comprobarLetrasNumerosSinEspacios($this->nombre_funcionalidad)===false){
			throw new excepcionAtributos('FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO');
		}
	}

}

?>