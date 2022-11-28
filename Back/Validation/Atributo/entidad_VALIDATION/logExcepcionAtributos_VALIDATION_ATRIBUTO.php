<?php

include_once './Validation/validar_class.php';

class logExcepcionAtributos_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_buscar(){
		
		$this->validar_usuario_buscar();
		$this->validar_funcionalidad_buscar();
		$this->validar_accion_buscar();
		$this->validar_codigo_buscar();
		$this->validar_mensaje_buscar();
		$this->validar_tiempo_buscar();
	}
	
////////////Buscar//////////////////////////////////////////////////////////////////////////////

    function validar_usuario_buscar(){
        if(!empty($this->usuario)){
            if($this->Longitud_maxima($this->usuario,15)===false){
				rellenarExcepcionAtributo('LOGIN_USUARIO_MAYOR_QUE_15');
            }
                
            if($this->comprobarFormatoLoginContrasena($this->usuario)===false){
				rellenarExcepcionAtributo('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
            }			
        }
    }

	function validar_funcionalidad_buscar(){
		if(!empty($this->nombre_funcionalidad)){
			if($this->Longitud_maxima($this->nombre_funcionalidad,48)===false){
				rellenarExcepcionAtributo('FUNCIONALIDAD_NAME_MAYOR_QUE_48');
			}
			
			if($this->comprobarLetrasNumerosEspacios($this->nombre_funcionalidad)===false){
				rellenarExcepcionAtributo('FUNCIONALIDAD_NAME_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_accion_buscar(){
		if(!empty($this->nombre_accion)){
			if($this->Longitud_maxima($this->nombre_accion,48)===false){
				rellenarExcepcionAtributo('ACCION_NAME_MAYOR_QUE_48');
			}
			
			if($this->comprobarLetrasNumerosEspacios($this->nombre_accion)===false){
				rellenarExcepcionAtributo('ACCION_NAME_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_codigo_buscar(){
		if(!empty($this->codigo)){
			if($this->Longitud_maxima($this->codigo,48)===false){
				rellenarExcepcionAtributo('CODIGO_MAYOR_QUE_48');
			}
			
			if($this->comprobarLetrasNumerosEspaciosGuiones($this->codigo)===false){
				rellenarExcepcionAtributo('CODIGO_FORMATO_INCORRECTO');
			}
		}
	}

    function validar_mensaje_buscar(){
		if(!empty($this->mensaje)){
			if($this->comprobarLetrasNumerosEspacios($this->mensaje)===false){
				rellenarExcepcionAtributo('MENSAJE_FORMATO_INCORRECTO');
			}
			if($this->Longitud_maxima($this->mensaje,48)===false){
				rellenarExcepcionAtributo('MENSAJE_MAYOR_QUE_48');
			}
		}
	}

    function validar_tiempo_buscar(){
		if(!empty($this->tiempo)){
			if($this->Longitud_maxima($this->tiempo,200)===false){
				rellenarExcepcionAtributo('TIEMPO_MAYOR_QUE_200');
			}
			
			if($this->comprobarLetrasNumerosEspaciosGuiones($this->tiempo)===false){
				rellenarExcepcionAtributo('TIEMPO_FORMATO_INCORRECTO');
			}
		}
	}

}
?>