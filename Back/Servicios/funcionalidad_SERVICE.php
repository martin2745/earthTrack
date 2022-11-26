<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/funcionalidad_VALIDATION.php';

class funcionalidad_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('nombre_funcionalidad', 'descripcion_funcionalidad');
				break;
			case 'editar':
				$this->listaAtributos = array('id_funcionalidad', 'nombre_funcionalidad', 'descripcion_funcionalidad');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_funcionalidad');
				break;
			case 'reactivar':
				$this->listaAtributos = array('id_funcionalidad');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_funcionalidad', 'nombre_funcionalidad', 'descripcion_funcionalidad');
				$this->listaAtributosIGUAL = array('id_funcionalidad');
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('id_funcionalidad');
				$this->listaAtributosIGUAL = array('id_funcionalidad');
				break;
			case 'accionesFuncionalidad':
				$this->listaAtributos = array('nombre_funcionalidad');
				break;
			case 'accionesFuncionalidad':
				$this->listaAtributos = array('');
				break;
		}

		$this->modelo = $this->crearModelOne('funcionalidad');
		$this->clase_validacion = $this->crearValidationOne('funcionalidad');

			$this->clase_validacion->modelo = $this->modelo;

	}

	function validar_entrada_atributos(){
		validar_entrada_funcionalidad();
	}

	function accionesFuncionalidad($mensaje){
		$funcionalidad = $this->modelo->seek(array('nombre_funcionalidad'), array($this->modelo->arrayDatoValor['nombre_funcionalidad']))['resource']['id_funcionalidad'];
        include_once './Modelos/permiso_MODEL.php';
        $modeloPermiso = new permiso_MODEL();
		include_once './Modelos/rol_MODEL.php';
        $modeloRol = new rol_MODEL();
		$id_rol = $modeloRol->seek(array('nombre_rol'),array(rolUsuarioSistema))['resource']['id_rol'];
		$RAFs = $modeloPermiso->seek_multiple(array('id_rol', 'id_funcionalidad'), array($id_rol, $funcionalidad))['resource'];

		$this->arrayAcciones = array();

		foreach($RAFs as $relacionRAFs){
			if(!in_array($relacionRAFs['id_accion'], $this->arrayAcciones)){
				array_push($this->arrayAcciones, $relacionRAFs['id_accion']);
			}
		}
			
		$this->arrayAccionesNombres = $this->convertirdorIdNombreAccion($this->arrayAcciones);

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		$this->feedback['resource'] =  $this->arrayAccionesNombres;
	return $this->feedback;
	}

	function funcionalidadesSistema($mensaje){
		$funcionalidades = $this->modelo->seek_multiple('', '')['resource'];
		$arrayFuncionalidad = array();
		$arrayFuncionalidadesNombres = array();
			
		foreach($funcionalidades as $funcionalidad){
			if(!in_array($funcionalidad['id_funcionalidad'], $arrayFuncionalidad)){
				array_push($arrayFuncionalidad, $funcionalidad['id_funcionalidad']);
			}
		}
			
		foreach($arrayFuncionalidad as $id_funcionalidad){
			$funcionalidad = $this->convertirdorIdNombreFuncionalidad($id_funcionalidad);
			if($funcionalidad != null && $funcionalidad != 'rolaccionfuncionalidad'){
				array_push($arrayFuncionalidadesNombres, $funcionalidad);
			}
		}

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		$this->feedback['resource'] =  $arrayFuncionalidadesNombres;
		return $this->feedback;
	}

	function convertirdorIdNombreFuncionalidad($id){
		if('RECORDSET_DATOS' == $this->modelo->seek_multiple(array('id_funcionalidad'), array($id))['code']){
			$nombreFuncionalidad = $this->modelo->seek_multiple(array('id_funcionalidad'), array($id))['resource'][0]['nombre_funcionalidad'];
			if($nombreFuncionalidad != 'auth'){
				return $nombreFuncionalidad;
			}
		}
	}

	function convertirdorIdNombreAccion($arrayIdAcciones){
		$toretAcciones = array();
		$this->modeloAccion = $this->crearModelOne('accion');
		foreach($arrayIdAcciones as $id){
			$accion = $this->modeloAccion->seek_multiple(array('id_accion'), array($id));
			if($accion['code'] == 'RECORDSET_DATOS'){
				array_push($toretAcciones, $accion['resource'][0]['nombre_accion']);
			}
		}
		return $toretAcciones;
	}

}
?>