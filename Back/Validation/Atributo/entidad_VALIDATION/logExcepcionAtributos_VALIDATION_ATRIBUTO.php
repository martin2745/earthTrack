<?php

include_once './Validation/validar_class.php';
include_once './Validation/excepciones.php';

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
				$this->rellenarExcepcion('LOGIN_USUARIO_MAYOR_QUE_15');
            }
                
            if($this->comprobarFormatoLoginContrasena($this->usuario)===false){
				$this->rellenarExcepcion('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
            }			
        }
    }

	function validar_funcionalidad_buscar(){
		if(!empty($this->nombre_funcionalidad)){
			if($this->Longitud_maxima($this->nombre_funcionalidad,48)===false){
				$this->rellenarExcepcion('FUNCIONALIDAD_NAME_MAYOR_QUE_48');
			}
			
			if($this->comprobarLetrasNumerosEspacios($this->nombre_funcionalidad)===false){
				$this->rellenarExcepcion('FUNCIONALIDAD_NAME_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_accion_buscar(){
		if(!empty($this->nombre_accion)){
			if($this->Longitud_maxima($this->nombre_accion,48)===false){
				$this->rellenarExcepcion('ACCION_NAME_MAYOR_QUE_48');
			}
			
			if($this->comprobarLetrasNumerosEspacios($this->nombre_accion)===false){
				$this->rellenarExcepcion('ACCION_NAME_FORMATO_INCORRECTO');
			}
		}
	}

	function validar_codigo_buscar(){
		if(!empty($this->codigo)){
			if($this->Longitud_maxima($this->codigo,48)===false){
				$this->rellenarExcepcion('CODIGO_MAYOR_QUE_48');
			}
			
			if($this->comprobarLetrasNumerosEspaciosGuiones($this->codigo)===false){
				$this->rellenarExcepcion('CODIGO_FORMATO_INCORRECTO');
			}
		}
	}

    function validar_mensaje_buscar(){
		if(!empty($this->mensaje)){
			if($this->comprobarLetrasNumerosEspacios($this->mensaje)===false){
				$this->rellenarExcepcion('MENSAJE_FORMATO_INCORRECTO');
			}
			if($this->Longitud_maxima($this->mensaje,48)===false){
				$this->rellenarExcepcion('MENSAJE_MAYOR_QUE_48');
			}
		}
	}

    function validar_tiempo_buscar(){
		if(!empty($this->tiempo)){
			if($this->Longitud_maxima($this->tiempo,200)===false){
				$this->rellenarExcepcion('TIEMPO_MAYOR_QUE_200');
			}
			
			if($this->comprobarLetrasNumerosEspaciosGuiones($this->tiempo)===false){
				$this->rellenarExcepcion('TIEMPO_FORMATO_INCORRECTO');
			}
		}
	}

}
?>