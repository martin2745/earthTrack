<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/proceso_usuario_VALIDATION.php';

class proceso_usuario_SERVICE extends ServiceBase
{

	function inicializarRest()
	{
		$this->listaAtributosIGUAL = array();

		switch (action) {
			case 'insertar':
				$this->listaAtributos = array('id_proceso', 'usuario', 'total', 'parametros');
				break;
			case 'editar':
				$this->listaAtributos = array('id_proceso', 'usuario', 'total', 'parametros');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_proceso', 'usuario');
				break;
			case 'reactivar':
				$this->listaAtributos = array('id_proceso', 'usuario');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_proceso', 'usuario');
				$this->listaAtributosIGUAL = array('id_proceso', 'usuario');
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('id_proceso', 'usuario');
				$this->listaAtributosIGUAL = array('id_proceso', 'usuario');
				break;
			case 'devolverHuella':
				$this->listaAtributos = array('usuario');
				break;
			case 'devolverProcesos':
				$this->listaAtributos = array('usuario');
				break;
		}

		$this->modelo = $this->crearModelOne('proceso_usuario');
		$this->clase_validacion = $this->crearValidationOne('proceso_usuario');

		$this->clase_validacion->modelo = $this->modelo;
	}

	function insertar($mensaje)
	{

		include_once './Modelos/parametro_MODEL.php';
		$modelo_parametro = new parametro_MODEL();

		include_once './Modelos/parametro_usuario_MODEL.php';
		$modelo_parametro_usuario = new parametro_usuario_MODEL();

		include_once './Modelos/proceso_MODEL.php';
		$modelo_proceso = new proceso_MODEL();

		$procesoAct = $modelo_proceso->getById(array($this->modelo->arrayDatoValor['id_proceso']))['resource'];

		$formula = $procesoAct['formula'];
		$caracteres = str_split($formula);
		$formulaProcesada = $formula;
		$dentroDeParametro = false;
		$cadenaAReemplazar="";

		$valores = explode(',', $this->modelo->arrayDatoValor['parametros']);
		$valoresCopy = $valores;
		
		for ($j = 0; $j < count($caracteres); $j++){
			if($dentroDeParametro){
				$cadenaAReemplazar .= $caracteres[$j];
				if($caracteres[$j] == "}"){
					$dentroDeParametro = false;
					$formulaProcesada = str_replace($cadenaAReemplazar, array_shift($valores), $formulaProcesada);
					$cadenaAReemplazar = "";
				}
			}
			if($caracteres[$j] == "{"){
				$dentroDeParametro = true;
				$cadenaAReemplazar .= $caracteres[$j];
			}
		}
		$formulaProcesada = str_replace("^","**", $formulaProcesada);  
		$toret = "return ";
		$toret .= $formulaProcesada;
		$toret .= ";";
		$total=eval($toret);

		$this->modelo->arrayDatoValor['total'] = $total;
		unset($this->modelo->arrayDatoValor['parametros']);
		$this->modelo->ADD('proceso_usuario', $this->modelo->arrayDatoValor);

		$parametros_proceso = $modelo_parametro->seek_multiple(array('id_proceso'), array($this->modelo->arrayDatoValor['id_proceso']))['resource'];

		for ($i = 0; $i < count($parametros_proceso); $i++) {
			$modelo_parametro_usuario->arrayDatoValor['id_parametro'] = $parametros_proceso[$i]['id_parametro'];
			$modelo_parametro_usuario->arrayDatoValor['id_proceso'] = $this->modelo->arrayDatoValor['id_proceso'];
			$modelo_parametro_usuario->arrayDatoValor['usuario'] = $this->modelo->arrayDatoValor['usuario'];
			$modelo_parametro_usuario->arrayDatoValor['valor'] = $valoresCopy[$i];
			$modelo_parametro_usuario->ADD();
		}	

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function editar($mensaje)
	{

		include_once './Modelos/parametro_MODEL.php';
		$modelo_parametro = new parametro_MODEL();

		include_once './Modelos/parametro_usuario_MODEL.php';
		$modelo_parametro_usuario = new parametro_usuario_MODEL();

		include_once './Modelos/proceso_MODEL.php';
		$modelo_proceso = new proceso_MODEL();

		$procesoAct = $modelo_proceso->getById(array($this->modelo->arrayDatoValor['id_proceso']))['resource'];

		$formula = $procesoAct['formula'];
		$caracteres = str_split($formula);
		$formulaProcesada = $formula;
		$dentroDeParametro = false;
		$cadenaAReemplazar="";

		$valores = explode(',', $this->modelo->arrayDatoValor['parametros']);
		$valoresCopy = $valores;
		
		for ($j = 0; $j < count($caracteres); $j++){
			if($dentroDeParametro){
				$cadenaAReemplazar .= $caracteres[$j];
				if($caracteres[$j] == "}"){
					$dentroDeParametro = false;
					$formulaProcesada = str_replace($cadenaAReemplazar, array_shift($valores), $formulaProcesada);
					$cadenaAReemplazar = "";
				}
			}
			if($caracteres[$j] == "{"){
				$dentroDeParametro = true;
				$cadenaAReemplazar .= $caracteres[$j];
			}
		}
		$formulaProcesada = str_replace("^","**", $formulaProcesada);  
		$toret = "return ";
		$toret .= $formulaProcesada;
		$toret .= ";";
		$total=eval($toret);

		$parametros_proceso = $modelo_parametro->seek_multiple(array('id_proceso'), array($this->modelo->arrayDatoValor['id_proceso']))['resource'];

		for ($i = 0; $i < count($parametros_proceso); $i++) {
			$modelo_parametro_usuario->arrayDatoValor['id_parametro'] = $parametros_proceso[$i]['id_parametro'];
			$modelo_parametro_usuario->arrayDatoValor['id_proceso'] = $this->modelo->arrayDatoValor['id_proceso'];
			$modelo_parametro_usuario->arrayDatoValor['usuario'] = $this->modelo->arrayDatoValor['usuario'];
			$modelo_parametro_usuario->DELETE();
		}

		unset($this->modelo->arrayDatoValor['parametros']);
		unset($this->modelo->arrayDatoValor['total']);
		$this->modelo->DELETE('proceso_usuario', $this->modelo->arrayDatoValor);

		$this->modelo->arrayDatoValor['total'] = $total;
		
		$this->modelo->ADD('proceso_usuario', $this->modelo->arrayDatoValor);

		

		for ($i = 0; $i < count($parametros_proceso); $i++) {
			$modelo_parametro_usuario->arrayDatoValor['id_parametro'] = $parametros_proceso[$i]['id_parametro'];
			$modelo_parametro_usuario->arrayDatoValor['id_proceso'] = $this->modelo->arrayDatoValor['id_proceso'];
			$modelo_parametro_usuario->arrayDatoValor['usuario'] = $this->modelo->arrayDatoValor['usuario'];
			$modelo_parametro_usuario->arrayDatoValor['valor'] = $valoresCopy[$i];
			$modelo_parametro_usuario->ADD();
		}	

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function borrar($mensaje)
	{

		include_once './Modelos/parametro_MODEL.php';
		$modelo_parametro = new parametro_MODEL();

		include_once './Modelos/parametro_usuario_MODEL.php';
		$modelo_parametro_usuario = new parametro_usuario_MODEL();

		include_once './Modelos/proceso_MODEL.php';
		$modelo_proceso = new proceso_MODEL();

		$parametros_proceso_usuario = $modelo_parametro_usuario->seek_multiple(array('id_proceso', 'usuario'), array($this->modelo->arrayDatoValor['id_proceso'], $this->modelo->arrayDatoValor['usuario']))['resource'];
		
		for ($i = 0; $i < count($parametros_proceso_usuario); $i++){
			$modelo_parametro_usuario->arrayDatoValor['id_parametro'] = $parametros_proceso_usuario[$i]['id_parametro'];
			$modelo_parametro_usuario->arrayDatoValor['id_proceso'] = $parametros_proceso_usuario[$i]['id_proceso'];
			$modelo_parametro_usuario->arrayDatoValor['usuario'] = $parametros_proceso_usuario[$i]['usuario'];
			$modelo_parametro_usuario->DELETE();
		}
		
		$this->modelo->DELETE();

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function devolverProcesos($mensaje){
		include_once './Modelos/parametro_usuario_MODEL.php';
		$modelo_parametro_usuario = new parametro_usuario_MODEL();

		include_once './Modelos/proceso_MODEL.php';
		$modelo_proceso = new proceso_MODEL();

		include_once './Modelos/categoria_MODEL.php';
		$modelo_categoria = new categoria_MODEL();

		include_once './Modelos/parametro_MODEL.php';
		$modelo_parametro = new parametro_MODEL();


		$procesosUserActual =  $this->modelo->seek_multiple(array('usuario'), array($this->modelo->arrayDatoValor['usuario']))['resource'];

		for ($i = 0; $i < count($procesosUserActual); $i++){
			$procesoAct = $modelo_proceso->getById(array($procesosUserActual[$i]['id_proceso']))['resource'];
			$procesosUserActual[$i]['nombre_proceso'] = $procesoAct['nombre_proceso'];
			$procesosUserActual[$i]['descripcion_proceso'] = $procesoAct['descripcion_proceso'];
			$procesosUserActual[$i]['formula'] = $procesoAct['formula'];
			$categoriaAct = $modelo_categoria->getById(array($procesoAct['id_categoria']))['resource'];
			$procesosUserActual[$i]['categoria'] = $categoriaAct;
			$parametros_proceso_usuario = $modelo_parametro_usuario->seek_multiple(array('id_proceso', 'usuario'), array($procesosUserActual[$i]['id_proceso'], $this->modelo->arrayDatoValor['usuario']))['resource'];
			
			for ($j = 0; $j < count($parametros_proceso_usuario); $j++){
				$parametros_proceso = $modelo_parametro->getById(array($parametros_proceso_usuario[$j]['id_parametro']))['resource'];
				$parametros_proceso_usuario[$j]['nombre'] = $parametros_proceso['nombre'];
				$parametros_proceso_usuario[$j]['unidad'] = $parametros_proceso['unidad'];
			}
			$procesosUserActual[$i]['parametros'] = $parametros_proceso_usuario;
			
		}

		$this->feedback['resource'] = $procesosUserActual;

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function validar_devolverProcesos()
	{
		$this->clase_validacion->validar_devolverProcesos();
	}

	function devolverHuella($mensaje){
		include_once './Modelos/parametro_usuario_MODEL.php';
		$modelo_parametro_usuario = new parametro_usuario_MODEL();

		$procesosUserActual =  $this->modelo->seek_multiple(array('usuario'), array($this->modelo->arrayDatoValor['usuario']))['resource'];
		
		$acumulado = 0;
		
		for ($i = 0; $i < count($procesosUserActual); $i++){
			$acumulado += $procesosUserActual[$i]['total'];
		}

		$this->feedback['resource'] = $acumulado;

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function validar_devolverHuella()
	{
		$this->clase_validacion->validar_devolverHuella();
	}
}
?>