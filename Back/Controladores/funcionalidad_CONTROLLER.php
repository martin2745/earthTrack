<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/funcionalidad_SERVICE.php';

class funcionalidad extends ControllerBase{

	function accionesFuncionalidad(){
		$this->servicio->inicializarRest();
		$respuesta = $this->servicio->accionesFuncionalidad('ACCIONES_FUNCIONALIDAD');
		devolverRest($respuesta);
	}

	function funcionalidadesSistema(){
		$this->servicio->inicializarRest();
		$respuesta = $this->servicio->funcionalidadesSistema('FUNCIONALIDADES_SISTEMA');
		devolverRest($respuesta);	
	}

}
?>