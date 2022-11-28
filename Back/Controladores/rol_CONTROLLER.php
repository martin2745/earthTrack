<?php

include_once './Controladores/ControllerBase.php';

class rol extends ControllerBase{

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_reactivar();
		$respuesta = $this->servicio->reactivar('ROL_REACTIVAR_OK');
		devolverRest($respuesta);
	}
}
?>