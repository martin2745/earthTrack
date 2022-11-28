<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/logExcepcionAcciones_VALIDATION.php';

class logExcepcionAcciones_SERVICE extends ServiceBase{
	
	function inicializarRest(){
		$this->listaAtributosIGUAL = array();
		
		switch(action){
			case 'buscar':
				$this->listaAtributos = array('usuario', 'funcionalidad', 'accion', 'codigo', 'mensaje', 'tiempo');
				break;
		}
		$this->modelo = $this->crearModelOne('logExcepcionAcciones');
	}
}
?>