<?php

include_once './Servicios/ServiceBase.php';
class accion_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('nombre_accion', 'descripcion_accion');
				break;
			case 'editar':
				$this->listaAtributos = array('id_accion', 'nombre_accion', 'descripcion_accion');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_accion');
				break;
			case 'reactivar':
				$this->listaAtributos = array('id_accion');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_accion', 'nombre_accion', 'descripcion_accion');
				$this->listaAtributosIGUAL = array('id_accion');
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('id_accion');
				$this->listaAtributosIGUAL = array('id_accion');
				break;
		}

		$this->modelo = $this->crearModelOne('accion');
		$this->clase_validacion = $this->crearValidationOne('accion');

			$this->clase_validacion->modelo = $this->modelo;

	}
}
?>