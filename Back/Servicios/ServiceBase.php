<?php

class ServiceBase{

	protected $modelo;
	protected $clase_validacion;

	function rellenarExcepcionAccion($mensaje){
		$feedback['ok'] = false;
		$feedback['code'] = $mensaje;
		
		if(!isset($_POST['test'])){
			$this->logExcepcionesAccion($feedback);
		}

		header('Content-type: application/json');
		echo(json_encode($feedback));
		exit();
	}

	function crearModelOne($entidad){
		$entidadbase = $entidad;
		include_once './Modelos/'.$entidadbase.'_MODEL.php';
		$entidadbase = $entidadbase.'_MODEL'; 
		$this->entidad = new $entidadbase;
		if(isset($this->listaAtributos)){
			$this->rellenaModel($this->entidad, $this->listaAtributos);
		}
		return $this->entidad;
	}

	function crearValidationOne($entidad){
		$entidadbase = $entidad;
		include_once './Validation/Accion/'.$entidadbase.'_VALIDATION_ACCION.php';
		$entidadbase = $entidadbase.'_VALIDATION_ACCION';
		$validacion = new $entidadbase;
		if(isset($this->listaAtributos)){
			$this->rellenaModel($validacion, $this->listaAtributos);
		}
		return $validacion;
	}

	function rellenaModel(&$obj_entidad, $listaAtributos){

		$objeto = $obj_entidad;
		$objeto->arrayDatoValor = array();
		$i = 0;

		$objeto = $this->paginacion($objeto, $listaAtributos);

		foreach ($listaAtributos as $atributo){
			if (!isset($_POST[$atributo])){
				$_POST[$atributo] = '';
			}
			$objeto->criteriosbusqueda[$atributo] = $_POST[$atributo];	
		}
		
		foreach ($listaAtributos as $atributo){
			if (!isset($_POST[$atributo])){
				unset($listaAtributos[$i]);
			}
			$i++;
		}
		
		foreach ($listaAtributos as $atributo){
			if (!isset($_POST[$atributo])){
				$_POST[$atributo] = '';
			}

			if(in_array($atributo, $this->listaAtributosIGUAL)){
				$atributoIGUAL = $atributo.'_IGUAL';
				if($_POST[$atributo] != ''){ 
					/*Evito insertar por ejemplo ["id_rol_IGUAL"]=> string(0) "", haría que busquemos los id_rol = '', no existen usuarios sin rol*/
					$objeto->arrayDatoValor[$atributoIGUAL] = $_POST[$atributo];
				}
			}else{
				$objeto->arrayDatoValor[$atributo] = $_POST[$atributo];
			}
		}
	}

	function paginacion($objeto, $listaAtributos){
		//Si el action empieza por buscar
		if (substr(action, 0, 6) == 'buscar'){
			foreach ($listaAtributos as $atributo){
				if (!isset($_POST[$atributo])){
					$_POST[$atributo] = '';
				}
				$objeto->criteriosbusqueda[$atributo] = $_POST[$atributo];
			}

			if (!isset($_POST['empieza'])) {
				$empieza = 'nulo'; 
			} elseif ($_POST['empieza'] == '' || $_POST['empieza'] == 0) { 
				$empieza = 'nulo'; 
			} else { 
				$empieza = $_POST['empieza']; 
			} // sino viene empieza defecto 0
			
			$objeto->empieza = $empieza;
			
			if (!isset($_POST['filaspagina'])) { 
				$filaspagina = 'nulo'; 
			} elseif ($_POST['filaspagina'] == '' || $_POST['filaspagina'] == 0) { 
				$filaspagina = 'nulo'; 
			} else { $filaspagina = $_POST['filaspagina']; 
			}// sino viene filaspagina defecto nulo, buscamos todo
			
			$objeto->filaspagina = $filaspagina;
		}
		return $objeto;
	}

////////////////////////////////////////////////////////insertar////////////////////////////////////////////////////////

	function insertar($mensaje){
		$this->modelo->ADD();
		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;	
	}

	function validar_insertar(){
		$this->clase_validacion->validar_insertar();
	}

///////////////////////////////////////////////////////editar////////////////////////////////////////////////////////

	function editar($mensaje){

		$this->modelo->EDIT();
		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;		
		return $this->feedback;
	}

	function validar_editar(){
		$this->clase_validacion->validar_editar();
	}

///////////////////////////////////////////////////////borrar/////////////////////////////////////////////////////////

	function borrar($mensaje){
		$borradoLogico = $this->clase_validacion->existen_relaciones();
		$tipoBorrado = '';
			if($borradoLogico){
				$this->modelo->EDIT();
				$tipoBorrado = 'borradoLogico';
			}else{
				if(isset($this->modelo->arrayDatoValor['borrado_logico'])){
					$indiceBorradoLogico = count($this->modelo->arrayDatoValor) - 1;
					unset($this->modelo->datosQuery[$indiceBorradoLogico]);
					unset($this->modelo->valoresQuery[$indiceBorradoLogico]);
					unset($this->modelo->arrayDatoValor['borrado_logico']);
				}	
				$this->modelo->DELETE();
				$tipoBorrado = 'borradoFisico';
			}
			$this->feedback['ok'] = true;
			$this->feedback['code'] = $mensaje;
			$this->feedback['tipoBorrado'] = $tipoBorrado;
		return $this->feedback;
	}

	function validar_borrar(){
		$this->clase_validacion->validar_borrar();
	}

/////////////////////////////////////////////////////reactivar/////////////////////////////////////////////////////////

	function reactivar($mensaje){
		$this->modelo->EDIT();
		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;	
	}

	function validar_reactivar(){
		$this->clase_validacion->validar_reactivar();
	}

/////////////////////////////////////////////////////buscar/////////////////////////////////////////////////////////

	function buscar(){
		$infoBusqueda = $this->modelo->SEARCH($this->modelo->arrayDatoValor, $this->modelo->orden, $this->modelo->tipoOrden);

			//No se puede ver la contraseña de los usuarios
			if(controlador == 'usuario' && action == 'buscar'){
				for($i = 0 ; $i  < count($infoBusqueda['resource']); $i++){
					$infoBusqueda['resource'][$i]['contrasena'] = '********************************';
				}
			}

			$this->feedback['ok'] = true;
			$this->feedback['code'] = $infoBusqueda['code'];
			$this->feedback['resource'] = $infoBusqueda['resource'];
			//Información de pagincación
			$this->feedback['total'] = $infoBusqueda['total'];
			$this->feedback['empieza'] = $infoBusqueda['empieza'];
			$this->feedback['filas'] = $infoBusqueda['filas'];
			$this->feedback['criteriosbusqueda'] = $infoBusqueda['criteriosbusqueda'];
		return $this->feedback;
	}

	function validar_buscar(){
		$this->clase_validacion->validar_buscar();
	}

//////////////////////////////////////////////////verEnDetalle//////////////////////////////////////////////////////

	function verEnDetalle(){
			$infoBusqueda = $this->modelo->SEARCH($this->modelo->arrayDatoValor, '', '');
			//No se puede ver la contraseña de los usuarios
			if(controlador == 'usuario' && action == 'verEnDetalle' && count($infoBusqueda['resource']) == 1){
				$infoBusqueda['resource'][0]['contrasena'] = '********************************';
			}
			$this->feedback['ok'] = true;
			$this->feedback['code'] = $infoBusqueda['code'];
			$this->feedback['resource'] = $infoBusqueda['resource'];
		return $this->feedback;

	}

	function validar_verEnDetalle(){
		$this->clase_validacion->validar_verEnDetalle();
	}

///////////////////////////////////////////////cargarTokenCabecera//////////////////////////////////////////////////

	function cargarTokenCabecera(){
		$tokenFront = '';	
		foreach(apache_request_headers() as $header =>$value){
			if($header == 'Authorization')
				$tokenFront = $value;
		}	
		return $tokenFront;
	}

}

?>