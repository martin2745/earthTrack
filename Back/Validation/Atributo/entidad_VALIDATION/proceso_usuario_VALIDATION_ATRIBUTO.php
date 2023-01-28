<?php

include_once './Validation/Validar_class.php';

class proceso_usuario_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_usuario();		
		$this->validar_id();
		$this->validar_parametros();
	}

	function validar_atributos_buscar(){
	}

	function validar_atributos_editar(){
		$this->validar_usuario();		
		$this->validar_id();
	}

	function validar_atributos_borrado(){
		$this->validar_usuario();		
		$this->validar_id();
	}

	function validar_atributos_verEnDetalle(){
		$this->validar_usuario();		
		$this->validar_id();
	}

	function validar_atributos_devolverHuella(){
		$this->validar_usuario();
	}
	
	function validar_atributos_devolverProcesos(){
		$this->validar_usuario();
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
function validar_usuario(){
		
	if($this->Es_Vacio($this->usuario)===true){
		rellenarExcepcionAtributo('PROCESO_USUARIO_USUARIO_VACIO');
	}
		
	if($this->comprobarFormatoLoginContrasena($this->usuario)===false){
		rellenarExcepcionAtributo('PROCESO_USUARIO_USUARIO_ALFANUMERICO_INCORRECTO');
	}		
}

function validar_id(){
	if($this->Es_Vacio($this->id_proceso)===true){
		rellenarExcepcionAtributo('PROCESO_USUARIO_ID_PROCESO_USUARIO_VACIO');
	}
	if(!$this->Es_numerico($this->id_proceso)===true){
		rellenarExcepcionAtributo('PROCESO_USUARIO_ID_PROCESO_USUARIO_FORMATO');
	}
}

function validar_parametros(){
	if($this->Es_Vacio($this->parametros)===true){
		rellenarExcepcionAtributo('PROCESO_USUARIO_PARAMETROS_VACIO');
	}
	$dividido = explode(',',$this->parametros);
	for($i = 0; $i < count($dividido); $i++)
	if(!$this->Es_numerico($dividido[$i])===true){
		rellenarExcepcionAtributo('PROCESO_USUARIO_PROCESO_USUARIO__FORMATO');
	}
}

}

?>