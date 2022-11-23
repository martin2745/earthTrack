<?php

include_once './Servicios/ServiceBase.php';

class logExcepcionAtributos_SERVICE extends ServiceBase{
	
	function inicializarRest(){
		$this->listaAtributosIGUAL = array();
		
		switch(action){
			case 'buscar':
				$this->listaAtributos = array('usuario', 'funcionalidad', 'accion', 'codigo', 'mensaje', 'tiempo');
				break;
		}
		$this->modelo = $this->crearModelOne('logExcepcionAtributos');
	}
}
?>