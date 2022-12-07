<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/categoria_VALIDATION.php';

class categoria_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('nombre_categoria', 'descripcion_categoria', 'id_padre');
				break;
			case 'editar':
				$this->listaAtributos = array('id_categoria', 'nombre_categoria', 'descripcion_categoria');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_categoria');
				break;
			case 'reactivar':
				$this->listaAtributos = array('id_categoria');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_categoria', 'nombre_categoria', 'descripcion_categoria');
				$this->listaAtributosIGUAL = array('id_categoria');
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('id_categoria');
				$this->listaAtributosIGUAL = array('id_categoria');
				break;
			case 'devolverPadre':
				$this->listaAtributos = array('id_categoria', 'id_padre');
				break;
			case 'devolverHijos':
				$this->listaAtributos = array('id_categoria');
				break;
		}

		$this->modelo = $this->crearModelOne('categoria');
		$this->clase_validacion = $this->crearValidationOne('categoria');
		
			$this->clase_validacion->modelo = $this->modelo;
	}

	function devolverPadre($mensaje){
		
		$resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
        $fila = $resultado['resource'];
        if ($fila['id_padre'] == 0){
            return $fila;
        }
        else{
			$categoria = $this->modelo->seek(array('id_categoria'), array($fila['id_padre']));
            return $categoria;
        }
	}

	function validar_devolverPadre(){
		$this->clase_validacion->validar_devolverPadre();
	}

	function devolverHijos($mensaje){
		$actual = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
        $objetoActual = $actual['resource'];
		
		$resultado = $this->modelo->seek_multiple(array('id_padre'),array($objetoActual['id_categoria']));		
        $filas = $resultado['resource'];

        if (!empty($filas)){
            return $filas;
        }
        else{
			rellenarExcepcionAccion('CATEGORIA_NO_HIJOS');
        }
	}

	function validar_devolverHijos(){
		$this->clase_validacion->validar_devolverHijos();
	}
}
?>