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
			$filas[$i]['tiene_hijos'] = false;

			$id_categoria_actual = $filas[$i]['id_categoria'];
			$resultado_proceso = $modelo_proceso->seek(array('id_categoria'), array($id_categoria_actual))['resource'];
			$resultado_hijos = $this->modelo->seek(array('id_padre'), array($id_categoria_actual))['resource'];
			if ($resultado_proceso) {
				$filas[$i]['tiene_proceso'] = true;
			}
			if ($resultado_hijos) {
				$filas[$i]['tiene_hijos'] = true;
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

		$categoria_insertada = $this->modelo->seek(array('id_padre'), array($this->modelo->arrayDatoValor['id_padre']))['resource'];
		//var_dump($categoria_insertada['id_categoria']);

		include_once './Modelos/proceso_model.php';
		$modelo_proceso = new proceso_MODEL();

		$resultado_proceso = $modelo_proceso->seek(array('id_categoria'), array($this->modelo->arrayDatoValor['id_padre']))['resource'];
		//var_dump($resultado_proceso);
		if ($resultado_proceso) {
			$resultado_proceso['id_categoria'] = $categoria_insertada['id_categoria'];
			$modelo_proceso->arrayDatoValor = $resultado_proceso;
			$modelo_proceso->EDIT('id_proceso', $modelo_proceso, 'id_proceso', $resultado_proceso['id_proceso']);
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

		if (sizeof($categoriaUsuario) == 1) { // si era la ultima categoria de la que era responsable se le cambia el rol a usuario
			$usuarioAct = $modeloUsuario->getById(array($categoriaAct['usuario']))['resource'];
			$usuarioAct['id_rol'] = 3;
			$modeloUsuario->arrayDatoValor = $usuarioAct;
			$modeloUsuario->EDIT('usuario', $modeloUsuario, 'usuario', $usuarioAct['usuario']);
		}

		if (isset($this->modelo->arrayDatoValor['borrado_logico'])) {
			$indiceBorradoLogico = count($this->modelo->arrayDatoValor) - 1;
			unset($this->modelo->datosQuery[$indiceBorradoLogico]);
			unset($this->modelo->valoresQuery[$indiceBorradoLogico]);
			unset($this->modelo->arrayDatoValor['borrado_logico']);
		}
		$this->modelo->DELETE();
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
			$infoBusqueda['resource'][$i]['tiene_proceso'] = false;
			$infoBusqueda['resource'][$i]['tiene_hijos'] = false;
			$id_categoria_actual = $infoBusqueda['resource'][$i]['id_categoria'];
			$resultado_proceso = $modelo_proceso->seek(array('id_categoria'), array($id_categoria_actual))['resource'];
			$resultado_hijos = $this->modelo->seek(array('id_padre'), array($id_categoria_actual))['resource'];
			if ($resultado_proceso) {
				$infoBusqueda['resource'][$i]['tiene_proceso'] = true;
			}
			if ($resultado_hijos) {
				$infoBusqueda['resource'][$i]['tiene_hijos'] = true;
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