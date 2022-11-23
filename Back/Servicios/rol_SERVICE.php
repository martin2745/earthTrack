<?php

include_once './Servicios/ServiceBase.php';
class rol_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('nombre_rol', 'descripcion_rol', 'borrado_logico');
				break;
			case 'editar':
				$this->listaAtributos = array('id_rol', 'nombre_rol', 'descripcion_rol');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_rol', 'borrado_logico');
				break;
			case 'reactivar':
				$this->listaAtributos = array('id_rol', 'borrado_logico');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_rol', 'nombre_rol', 'descripcion_rol', 'borrado_logico');
				$this->listaAtributosIGUAL = array('id_rol');
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('id_rol');
				$this->listaAtributosIGUAL = array('id_rol');
				break;
		}

		$this->modelo = $this->crearModelOne('rol');
		$this->clase_validacion = $this->crearValidationOne('rol');

			$this->clase_validacion->modelo = $this->modelo;

	}
}
?>