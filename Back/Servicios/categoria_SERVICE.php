<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/categoria_VALIDATION.php';

class categoria_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('nombre_categoria', 'descripcion_categoria', 'id_padre', 'usuario');
				break;
			case 'editar':
				$this->listaAtributos = array('id_categoria', 'nombre_categoria', 'descripcion_categoria', 'id_padre', 'usuario');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_categoria');
				break;
			case 'reactivar':
				$this->listaAtributos = array('id_categoria');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_categoria', 'nombre_categoria', 'descripcion_categoria', 'usuario');
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
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();
		$resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
        $fila = $resultado['resource'];

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		
        if ($fila['id_padre'] == 0){
			$this->feedback['resource'] =  $fila;
        }
        else{
			$categoria = $this->modelo->seek(array('id_categoria'), array($fila['id_padre']));
			$this->feedback['resource'] =  $categoria['resource'];
        }
		return $this->feedback;
	}

	function validar_devolverPadre(){
		$this->clase_validacion->validar_devolverPadre();
	}

	function devolverHijos($mensaje){
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();
		$actual = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
        $objetoActual = $actual['resource'];
		
		$resultado = $this->modelo->seek_multiple(array('id_padre'),array($objetoActual['id_categoria']));
        $filas = $resultado['resource'];

		$devolverPadreValor = $this->devolverPadre('CATEGORIA_DEVOLVER_PADRE');
		
		for ($i=0; $i<count($filas); $i++) {
			$filas[$i]['usuario'] = $modeloUsuario->seek(array('usuario'),array($filas[$i]['usuario']))['resource'];	
			$filas[$i]['usuario']['contrasena'] = '*****';
			$filas[$i]['id_padre']	= $devolverPadreValor['resource'];
		}

        if (!empty($filas)){
			$this->feedback['ok'] = true;
			$this->feedback['code'] = $mensaje;
            $this->feedback['resource'] = $filas;

			return $this->feedback; 
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