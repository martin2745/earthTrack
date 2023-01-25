<?php

include_once './Controladores/ControllerBase.php';

class proceso_usuario extends ControllerBase{

    // funciones propias de proceso que extiendan al controllerBase
	function insertar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_insertar();
		$respuesta = $this->servicio->insertar(strtoupper(controlador).'_INSERTAR_OK');
		devolverRest($respuesta);		
	}

	function borrar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_borrar();
		$respuesta = $this->servicio->borrar(strtoupper(controlador).'_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function devolverProcesos(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_devolverProcesos();
		$respuesta = $this->servicio->devolverProcesos(strtoupper(controlador).'_DEVOLVER_PROCESOS_OK');
		devolverRest($respuesta);	
	}

	function devolverHuella(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_devolverHuella();
		$respuesta = $this->servicio->devolverHuella(strtoupper(controlador).'_DEVOLVER_HUELLA_OK');
		devolverRest($respuesta);	
	}
}
?>