<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/categoria_VALIDATION.php';

class categoria_SERVICE extends ServiceBase
{

	function inicializarRest()
	{
		$this->listaAtributosIGUAL = array();

		switch (action) {
			case 'insertar':
				$this->listaAtributos = array('nombre_categoria', 'descripcion_categoria', 'id_padre', 'usuario', 'borrado_logico');
				break;
			case 'editar':
				$this->listaAtributos = array('id_categoria', 'nombre_categoria', 'descripcion_categoria', 'id_padre', 'usuario', 'borrado_logico');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_categoria', 'borrado_logico');
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

	function devolverPadre($mensaje)
	{
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();
		$resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
		$fila = $resultado['resource'];

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;

		if ($fila['id_padre'] == 0) {
			$this->feedback['resource'] = $fila;
		} else {
			$categoria = $this->modelo->seek(array('id_categoria'), array($fila['id_padre']));
			$this->feedback['resource'] = $categoria['resource'];
		}
		return $this->feedback;
	}

	function validar_devolverPadre()
	{
		$this->clase_validacion->validar_devolverPadre();
	}

	function devolverHijos($mensaje)
	{
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();
		$actual = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
		$objetoActual = $actual['resource'];

		$resultado = $this->modelo->seek_multiple(array('id_padre'), array($objetoActual['id_categoria']));
		$filas = $resultado['resource'];

		include_once './Modelos/proceso_model.php';
		$modelo_proceso = new proceso_MODEL();

		for ($i = 0; $i < count($filas); $i++) {
			$filas[$i]['usuario'] = $modeloUsuario->seek(array('usuario'), array($filas[$i]['usuario']))['resource'];
			$filas[$i]['usuario']['contrasena'] = '*****';
			$filas[$i]['id_padre'] = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']))['resource'];
			$filas[$i]['tiene_proceso'] = false;

			$id_categoria_actual=$filas[$i]['id_categoria'];
			$resultado = $modelo_proceso->seek(array('id_categoria'), array($id_categoria_actual))['resource'];
			//var_dump($resultado);
			if ($resultado){
				$filas[$i]['tiene_proceso']=true;
			}
		}

		if (!empty($filas)) {
			$this->feedback['ok'] = true;
			$this->feedback['code'] = $mensaje;
			$this->feedback['resource'] = $filas;

			return $this->feedback;
		} else {
			rellenarExcepcionAccion('CATEGORIA_NO_HIJOS');
		}
	}

	function validar_devolverHijos()
	{
		$this->clase_validacion->validar_devolverHijos();
	}

	function insertar($mensaje)
	{
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();

		$this->modelo->ADD('categoria', $this->modelo->arrayDatoValor);

		$usuario = $modeloUsuario->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];

		if ($usuario['id_rol'] > 2) {
			$usuario['id_rol'] = 2;
			$modeloUsuario->arrayDatoValor = $usuario;
			$modeloUsuario->EDIT('usuario', $modeloUsuario, 'usuario', $usuario['usuario']);
		}

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function editar($mensaje)
	{
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();

		$usuarioNuevo = $modeloUsuario->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];

		$categoriaAct = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']))['resource'];

		if ($usuarioNuevo['usuario'] != $categoriaAct['usuario']) {
			$categoriaUsuario = $this->modelo->seek_multiple(array('usuario'), array($categoriaAct['usuario']))['resource'];
			if (sizeof($categoriaUsuario) == 1) {
				$usuarioAntiguo = $modeloUsuario->getById(array($categoriaAct['usuario']))['resource'];
				$usuarioAntiguo['id_rol'] = 4;
				$modeloUsuario->arrayDatoValor = $usuarioAntiguo;
				$modeloUsuario->EDIT('usuario', $modeloUsuario, 'usuario', $usuarioAntiguo['usuario']);
			}
		}

		$this->modelo->EDIT('categoria', $this->modelo->arrayDatoValor, 'id_categoria', $categoriaAct['id_categoria']);

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function borrar($mensaje)
	{
		include_once './Modelos/usuario_model.php';
		$modeloUsuario = new usuario_MODEL();

		$categoriaAct = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']))['resource'];

		$usuarioAct = $modeloUsuario->getById(array($categoriaAct['usuario']))['resource'];

		$categoriaUsuario = $this->modelo->seek_multiple(array('usuario'), array($categoriaAct['usuario']))['resource'];

		if (sizeof($categoriaUsuario) == 1) {
			$usuarioAct = $modeloUsuario->getById(array($categoriaAct['usuario']))['resource'];
			$usuarioAct['id_rol'] = 4;
			$modeloUsuario->arrayDatoValor = $usuarioAct;
			$modeloUsuario->EDIT('usuario', $modeloUsuario, 'usuario', $usuarioAct['usuario']);
		}

		$this->modelo->DELETE('categoria', $this->modelo->arrayDatoValor, 'id_categoria', $categoriaAct['id_categoria']);

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function buscar()
	{
		$infoBusqueda = $this->modelo->SEARCH($this->modelo->arrayDatoValor, $this->modelo->orden, $this->modelo->tipoOrden);
		include_once './Modelos/proceso_MODEL.php';
		$modelo_proceso = new proceso_MODEL();
		for ($i = 0; $i < count($infoBusqueda['resource']); $i++) {
			$infoBusqueda['resource'][$i]['tiene_proceso']=false;
			$id_categoria_actual=$infoBusqueda['resource'][$i]['id_categoria'];
			$resultado = $modelo_proceso->seek(array('id_categoria'), array($id_categoria_actual))['resource'];
			if ($resultado){
				$infoBusqueda['resource'][$i]['tiene_proceso']=true;
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
}
?>