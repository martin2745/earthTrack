<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/permiso_VALIDATION.php';

class permiso_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('id_rol', 'id_funcionalidad', 'id_accion');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_rol', 'id_funcionalidad', 'id_accion');
				break;
			case 'buscar':
				$this->listaAtributos = array('nombre_funcionalidad');
				break;
		}

		$this->modelo = $this->crearModelOne('permiso');
		$this->clase_validacion = $this->crearValidationOne('permiso');

			$this->clase_validacion->modelo = $this->modelo;

	}
	
	function buscar(){
		$arrayRoles = $this->rolesSistema();
		$arrayApoyo = array();	
		$arrayRol = array();
		$primeraFila = array();
		$datosFila = array();
		$matriz = array();

		//Roles
		foreach($arrayRoles as $rol){
			$arrayApoyo = [
				'id_rol' => $rol['id_rol'],
				'nombre' => $rol['nombre_rol']
			];
			array_push($arrayRol, $arrayApoyo);
		}
			
		$primeraFila [0] = array();

		for($i = 1; $i <= count($arrayRol); $i++){
			$primeraFila[$i] = $arrayRol[$i - 1];
		}

		$longitudFila = count($primeraFila);
			
		$poseePermisos[$this->modelo->arrayDatoValor["nombre_funcionalidad"]] = $this->actionFuncionalidad($this->modelo->arrayDatoValor["nombre_funcionalidad"], $arrayRol);
			
		$funcionalidadAcciones = array();
		foreach($poseePermisos as $key => $valor){
			$funcionalidadAcciones[$key] = $valor['acciones'];
		}

		foreach($funcionalidadAcciones  as $key => $value) {
			sort($funcionalidadAcciones[$key], SORT_REGULAR);
		}

		foreach($funcionalidadAcciones as $key => $valor){
			$matriz[$key] = array();
			array_push($matriz[$key], $primeraFila);
			foreach($valor as $accion){
				$datosFila[0] = $accion;
				for($i = 1; $i < $longitudFila; $i++){
					$datosFila[$i] = $this->datosCasilla($primeraFila[$i]['id_rol'] ,$key, $accion);
				}
				array_push($matriz[$key], $datosFila);
			}
		}

			$this->feedback['ok'] = true;
			$this->feedback['code'] = 'PERMISOS_OBTENIDOS';
			$this->feedback['resource'] = $matriz;
			
			return $this->feedback;
	}
	function rolesSistema(){
		$this->modeloRol = $this->crearModelOne('rol');
		return $this->modeloRol->seek_multiple(array(), array())['resource'];	
	}

	function accionesSistema(){
		$this->modeloAccion = $this->crearModelOne('accion');
		return $this->modeloAccion->seek_multiple(array(), array())['resource'];	
	}

	function funcionalidadesSistema(){
		$this->modeloFuncionalidad = $this->crearModelOne('funcionalidad');
		return $this->modeloFuncionalidad->seek_multiple(array(), array())['resource'];	
	}

	function acciones($funcionalidad){
		//Acciones para todas las funcionalidades
		$acciones = array('borrar', 'buscar', 'editar', 'insertar', 'reactivar', 'verEnDetalle');

		//Casos especiales en que no se tienen todas las acciones
		switch ($funcionalidad){
			case 'funcionalidad':
				$acciones = array('borrar', 'buscar', 'editar', 'insertar', 'verEnDetalle');
				break;
			case 'accion':
				$acciones = array('borrar', 'buscar', 'editar', 'insertar', 'verEnDetalle');
				break;
			case 'permiso':
				$acciones = array('buscar');
				break;
			case 'categoria':
				$acciones = array('borrar', 'buscar', 'editar', 'insertar', 'verEnDetalle');
				break;
			case 'proceso':
				$acciones = array('borrar', 'buscar', 'editar', 'insertar', 'verEnDetalle');
				break;
			case 'logExcepcionAccion':
				$acciones = array('buscar', 'listar');
				break;
			case 'logExcepcionAtributo':
				$acciones = array('buscar', 'listar');
				break;
		}
		
		if($funcionalidad != 'funcionalidad' && $funcionalidad != 'accion' && $funcionalidad != 'permiso' &&
			$funcionalidad != 'logExcepcionAccion' && $funcionalidad != 'logExcepcionAtributo' ){
			//Añadimos nuevas acciones que no sean las base, buscamos todas las acciones y descartamos las base
			$accionesBase = array('borrar', 'buscar', 'editar', 'insertar', 'reactivar', 'verEnDetalle');
			$accionesSistema = $this->accionesSistema();

			foreach($accionesSistema as $accion){
				if(!in_array($accion['nombre_accion'], $accionesBase)){
					array_push($acciones, $accion['nombre_accion']);
				}
			}

		}

		return $acciones;
	}

	function actionFuncionalidad($funcionalidad, $roles){
		$this->modeloFuncionalidad = $this->crearModelOne('funcionalidad');
		$id_funcionalidad = $this->modeloFuncionalidad->seek(array('nombre_funcionalidad'), array($funcionalidad))['resource']['id_funcionalidad'];	
		//acciones de la funcionalidad
		$results = $this->modelo->seek_multiple(array('id_funcionalidad'), array($id_funcionalidad))['resource'];	//Permisos con esa funcionalidad
		$acciones = array();
		foreach($results as $result){
			$accion = $this->convertirIdNombreAccion($result['id_accion']);
			if(!in_array($accion, $acciones)){
				array_push($acciones, $accion);
			}
		}
		
		$rolFuncionalidadAcciones = array();

		foreach($roles as $rol){
			$apoyo = array();
			$results = $this->modelo->seek_multiple(array('id_rol', 'id_funcionalidad'), array($rol['id_rol'], $id_funcionalidad))['resource'];
			foreach($results as $result){
				$var = '';
				if(isset($result['id_accion'])){
					$var = $this->convertirIdNombreAccion($result['id_accion']);
				}
				$apoyo[$var] = $result;
			}
			$rolFuncionalidadAcciones[$rol['nombre']] = $apoyo;
		}

		$toret = array();
		$toret['acciones'] = $this->acciones($funcionalidad);
		$toret['datosPermisos'] = $rolFuncionalidadAcciones;
		return $toret;
	}

	function datosCasilla($id_rol, $funcionalidad, $accion){
		$toret = array();
		$toret['id_rol'] = $id_rol;
		$toret['id_funcionalidad'] = $this->convertirNombreIdFuncionalidad($funcionalidad);
		$toret['id_accion'] = $this->convertirNombreIdAccion($accion);
		$toret['tienePermiso'] = $this->existeRAF($toret);
		return $toret;
	}

	function existeRAF($arrayRAF){
		$result = $this->modelo->seek_multiple(array('id_rol', 'id_funcionalidad', 'id_accion'), array($arrayRAF['id_rol'], $arrayRAF['id_funcionalidad'], $arrayRAF['id_accion']));
		if($result['code'] == 'RECORDSET_VACIO'){
			return 'NO';
		}
		if($result['code'] == 'RECORDSET_DATOS'){
			return 'SI';
		}
	}

	function convertirNombreIdFuncionalidad($nombre){
		$this->modeloFuncionalidad = $this->crearModelOne('funcionalidad');
		if('RECORDSET_DATOS' == $this->modeloFuncionalidad->seek_multiple(array('nombre_funcionalidad'), array($nombre))['code']){
			$nombreFuncionalidad = $this->modeloFuncionalidad->seek_multiple(array('nombre_funcionalidad'), array($nombre))['resource'][0]['id_funcionalidad'];
				return $nombreFuncionalidad;
		}
	}

	function convertirNombreIdAccion($nombre){
		$this->modeloAccion = $this->crearModelOne('accion');
		if('RECORDSET_DATOS' == $this->modeloAccion->seek_multiple(array('nombre_accion'), array($nombre))['code']){
			$nombreAccion = $this->modeloAccion->seek_multiple(array('nombre_accion'), array($nombre))['resource'][0]['id_accion'];
				return $nombreAccion;
		}
	}

	function convertirNombreIdRol($nombre){
		$this->modeloRol = $this->crearModelOne('rol');
		if('RECORDSET_DATOS' == $this->modeloRol->seek_multiple(array('nombre_rol'), array($nombre))['code']){
			$nombreRol = $this->modeloRol->seek_multiple(array('nombre_rol'), array($nombre))['resource'][0]['id_rol'];
				return $nombreRol;
		}
	}

	function convertirIdNombreFuncionalidad($id){
		$this->modeloFuncionalidad = $this->crearModelOne('funcionalidad');
		if('RECORDSET_DATOS' == $this->modeloFuncionalidad->seek_multiple(array('id_funcionalidad'), array($id))['code']){
			$nombreFuncionalidad = $this->modeloFuncionalidad->seek_multiple(array('id_funcionalidad'), array($id))['resource'][0]['nombre_funcionalidad'];
				return $nombreFuncionalidad;
		}
	}

	function convertirIdNombreAccion($id){
		$this->modeloAccion = $this->crearModelOne('accion');
		if('RECORDSET_DATOS' == $this->modeloAccion->seek_multiple(array('id_accion'), array($id))['code']){
			$nombreAccion = $this->modeloAccion->seek_multiple(array('id_accion'), array($id))['resource'][0]['nombre_accion'];
				return $nombreAccion;
		}
	}
}
?>