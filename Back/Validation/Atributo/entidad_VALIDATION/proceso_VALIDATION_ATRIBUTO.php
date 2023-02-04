<?php

include_once './Validation/validar_class.php';

class proceso_VALIDATION_ATRIBUTO extends Validar{

	function validar_atributos_insertar(){
		$this->validar_nombre_proceso();		
		$this->validar_descripcion_proceso();
		$this->validar_id_categoria();
		$this->validar_formula();
	}

	function validar_atributos_editar(){
		$this->validar_id_proceso(); // Aquí queda, pero yo creo que no se debería poder editar
		$this->validar_nombre_proceso();
		$this->validar_descripcion_proceso();
		$this->validar_id_categoria();
		$this->validar_formula();
	}

	function validar_atributos_buscar(){
		$this->validar_id_proceso_buscar();
		$this->validar_nombre_proceso_buscar();
		$this->validar_descripcion_proceso_buscar();
		$this->validar_id_categoria_buscar();
		$this->validar_formula_buscar();
	}

	function validar_atributos_borrado(){
		$this->validar_id_proceso();
	}

	function validar_atributos_verEnDetalle(){
		$this->validar_id_proceso();
	}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

	
	function validar_id_proceso(){
			
		if($this->Es_Vacio($this->id_proceso)===true){
			rellenarExcepcionAtributo('ID_PROCESO_VACIO');
		}

		if($this->Longitud_maxima($this->id_proceso,12)===false){
			rellenarExcepcionAtributo('ID_PROCESO_MAYOR_QUE_12');
		}		
	}

	function validar_id_categoria(){
			
		if($this->Es_Vacio($this->id_categoria)===true){
			rellenarExcepcionAtributo('ID_CATEGORIA_VACIO');
		}

		if($this->Longitud_maxima($this->id_categoria,12)===false){
			rellenarExcepcionAtributo('ID_CATEGORIA_MAYOR_QUE_12');
		}		
	}

	function validar_nombre_proceso(){
		
		if($this->Es_Vacio($this->nombre_proceso)===true){
			rellenarExcepcionAtributo('NOMBRE_PROCESO_VACIO');
		}

		if($this->Longitud_minima($this->nombre_proceso,3)===false){
			rellenarExcepcionAtributo('NOMBRE_PROCESO_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($this->nombre_proceso,48)===false){
			rellenarExcepcionAtributo('NOMBRE_PROCESO_MAYOR_QUE_48');
		}		
	}

	function validar_descripcion_proceso(){

		if($this->Es_Vacio($this->descripcion_proceso)===true){
			rellenarExcepcionAtributo('DESCRIPCION_PROCESO_VACIA');
		}
		
		if($this->Longitud_maxima($this->descripcion_proceso,254)===false){
			rellenarExcepcionAtributo('DESCRIPCION_PROCESO_MAYOR_QUE_254');
		}
	}

	function validar_formula(){
		// Eliminamos los espacios de la formula y trabajamos sin ellos
		$this->formula = str_replace(' ', '', $this->formula);

		if($this->Es_Vacio($this->formula)===true){
			rellenarExcepcionAtributo('FORMULA_VACIA');
		}
		
		if($this->Longitud_maxima($this->formula,254)===false){
			rellenarExcepcionAtributo('FORMULA_MAYOR_QUE_254');
		}

		// Lo siguiente puede ser reemplazado por regex

		$this->formato_formula();

	}

		function repetidos(){
			if($this->Longitud_maxima($this->formula,254)===false){
				rellenarExcepcionAtributo('FORMULA_MAYOR_QUE_254');
			}
		}


		function coincidencia($cadena) {
			$expresion = '/pattern/'; // aquí debes poner tu expresión regular
			if (preg_match($expresion, $cadena)) {
			  // si la expresión regular coincide con la cadena, mostramos el aviso
			  echo 'Aviso: la cadena contiene una coincidencia con la expresión regular';
			}
		  }

	function formato_formula(){
		$checking_unit=false;
		$has_unit=false;
		$checking_param = false;
		for($i=0;$i<strlen($this->formula);$i++)
		{
			
			if ($checking_param) {
				
				// COMPROBAR SI LAS UNIDADES ABREN Y CIERRAN CON PARÉNTESIS
				if (!$checking_unit){
					if ($this->comprobarOperadores($this->formula[$i])){
						rellenarExcepcionAtributo('PARAMETRO_FORMULA_CON_OPERADOR');
					}
					if($this->formula[$i]=='('){
						$checking_unit=true;
					}else if($this->formula[$i]=='{'){
						rellenarExcepcionAtributo('PARAMETRO_FORMULA_SOBRA_LLAVE_ABRIENDO');
					}else if($this->formula[$i]=='}'){
						$checking_param=false;
						if (!$has_unit){
							// aceptamos parametros sin unidad
							// rellenarExcepcionAtributo('PARAMETRO_FORMULA_FALTA_UNIDAD');
						}
					}
				}else if($checking_unit){
					if($this->formula[$i]==')'){
						$this->has_unit=true;
					}
				}
				
			}else if(!$checking_param){
				if($this->formula[$i]=='{'){
					$checking_param=true;
				}
				else if($this->formula[$i]=='}'){
					rellenarExcepcionAtributo('PARAMETRO_FORMULA_SOBRA_LLAVE_CERRANDO');
				}
				else if (!$this->comprobarNumerosEspaciosParentesis($this->formula[$i]) && !$this->comprobarOperadores($this->formula[$i])){
					rellenarExcepcionAtributo('FORMULA_CARACTER_NO_VALIDO');
				}
			}
		}
	}

	//buscar ***********
	function validar_id_proceso_buscar(){
		if(!empty($this->id_proceso)){
			if($this->Longitud_maxima($this->id_proceso,11)===false){
				rellenarExcepcionAtributo('ID_PROCESO_MAYOR_QUE_11');
			}
			if($this->Es_numerico($this->id_proceso)===false){
				rellenarExcepcionAtributo('ID_PROCESO_NO_NUMERICO');
			}			
		}
	}

	function validar_id_categoria_buscar(){
		if(!empty($this->id_categoria)){
			if($this->Longitud_maxima($this->id_categoria,11)===false){
				rellenarExcepcionAtributo('ID_CATEGORIA_MAYOR_QUE_11');
			}
			if($this->Es_numerico($this->id_categoria)===false){
				rellenarExcepcionAtributo('ID_CATEGORIA_NO_NUMERICO');
			}			
		}
	}

	function validar_nombre_proceso_buscar(){
		if(!empty($this->nombre_proceso)){
			if($this->Longitud_maxima($this->nombre_proceso,254)===false){
				rellenarExcepcionAtributo('NOMBRE_PROCESO_MAYOR_QUE_254');
			}
		}		
	}

	function validar_descripcion_proceso_buscar(){
		if (!empty($this->descripcion_proceso)) {
			if ($this->Longitud_maxima($this->descripcion_proceso, 254) === false) {
				rellenarExcepcionAtributo('DESCRIPCION_PROCESO_MAYOR_QUE_254');
			}
		}
	}

	function validar_formula_buscar(){
		if (!empty($this->formula)) {
			if ($this->Longitud_maxima($this->formula, 254) === false) {
				rellenarExcepcionAtributo('DESCRIPCION_PROCESO_MAYOR_QUE_254');
			}
			$this->formato_formula();
		}
	}
}
?>