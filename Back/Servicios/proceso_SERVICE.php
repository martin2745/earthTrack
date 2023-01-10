<?php

include_once './Servicios/ServiceBase.php';
include_once './Validation/Atributo/controlador_VALIDATION/proceso_VALIDATION.php';

class proceso_SERVICE extends ServiceBase
{

	function inicializarRest()
	{
		$this->listaAtributosIGUAL = array();

		switch (action) {
			case 'insertar':
				$this->listaAtributos = array('nombre_proceso', 'descripcion_proceso', 'id_categoria', 'formula');
				break;
			case 'editar':
				$this->listaAtributos = array('id_proceso','nombre_proceso', 'descripcion_proceso', 'id_categoria','formula');
				break;
			case 'borrar':
				$this->listaAtributos = array('id_proceso');
				break;
			case 'buscar':
				$this->listaAtributos = array('id_proceso', 'nombre_proceso', 'descripcion_proceso', 'id_categoria');
				$this->listaAtributosIGUAL = array('id_proceso'); //Si establezco que quiero buscar los id_proceso = 1 no quiero que vengan usuarios con id_rol = 10...
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('id_proceso');
				$this->listaAtributosIGUAL = array('id_proceso');
				break;
		}

		$this->modelo = $this->crearModelOne('proceso');
		$this->clase_validacion = $this->crearValidationOne('proceso');

		$this->clase_validacion->modelo = $this->modelo;

	}

	function insertar($mensaje)
	{

		include_once './Modelos/parametro_MODEL.php';
		$modelo_parametro = new parametro_MODEL();
		$this->modelo->ADD();

		$nombres_param = array();
		$unidades_param = array();

		$reding_unit = false;
		$current_unit = '';
		$reading_param = false;
		$current_param_name = '';
		$formula = $this->modelo->arrayDatoValor['formula'];
		for ($i = 0; $i < strlen($formula); $i++) {
			if ($reading_param) {

				// COMPROBAR SI LAS UNIDADES ABREN Y CIERRAN CON PARÉNTESIS
				if (!$reding_unit) {
					if ($formula[$i] == '(') {
						$reding_unit = true;
					} else if ($formula[$i] == '}') {
						$reading_param = false;
						// se ha finalizado de leer un parámetro
						// meter en un array cada uno de los parametros ( array_push() )
						array_push($nombres_param, $current_param_name);
						array_push($unidades_param, $current_unit);
						$current_param_name = '';
						$current_unit = '';
					} else {
						$current_param_name = $current_param_name . $formula[$i];
					}

				} else if ($reding_unit) {
					if ($formula[$i] == ')') {
						$reding_unit = false;
					} else {
						$current_unit = $current_unit . $formula[$i];
					}

				}
			} else if (!$reading_param) {
				if ($formula[$i] == '{') {
					$reading_param = true;
				}
			}
		}
		$id_proceso_actual = $this->modelo->seek(array('id_categoria'), array($this->modelo->arrayDatoValor['id_categoria']))['resource']['id_proceso'];
		//  hacer otro bucle para crear tantos parametros como haya en el array anterior
		for ($i = 0; $i < count($unidades_param); $i++) {
			$modelo_parametro->arrayDatoValor['nombre'] = $nombres_param[$i];
			$modelo_parametro->arrayDatoValor['unidad'] = $unidades_param[$i];
			$modelo_parametro->arrayDatoValor['id_proceso'] = $id_proceso_actual;
			$modelo_parametro->ADD();
		}

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		return $this->feedback;
	}

	function borrar($mensaje)
	{
		// $borradoLogico = $this->clase_validacion->existen_relaciones(); // Se hace borrado físico de todas a todas
		$tipoBorrado = '';

		if (isset($this->modelo->arrayDatoValor['borrado_logico'])) {
			$indiceBorradoLogico = count($this->modelo->arrayDatoValor) - 1;
			unset($this->modelo->datosQuery[$indiceBorradoLogico]);
			unset($this->modelo->valoresQuery[$indiceBorradoLogico]);
			unset($this->modelo->arrayDatoValor['borrado_logico']);
		}
		$this->modelo->DELETE();
		$tipoBorrado = 'borradoFisico';

		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		$this->feedback['tipoBorrado'] = $tipoBorrado;
		return $this->feedback;
	}

}
?>