<?php

abstract class ControllerBase{

	public function __construct()
	{
		include_once './Servicios/'.controlador.'_SERVICE.php';

        $nombre_servicio = controlador;
        $nombre_servicio = $nombre_servicio.'_SERVICE';
		$this->servicio = new $nombre_servicio();
	}

    function insertar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_insertar();
		$respuesta = $this->servicio->insertar(strtoupper(controlador).'_INSERTAR_OK');
		devolverRest($respuesta);		
	}
	
	function editar(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_editar();
		$respuesta = $this->servicio->editar(strtoupper(controlador).'_EDITAR_OK');
		devolverRest($respuesta);
	}

	function borrar(){
		$_POST['borrado_logico'] = 1;
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_borrar();
		$respuesta = $this->servicio->borrar(strtoupper(controlador).'_BORRAR_OK');
		devolverRest($respuesta);	
	}

	function buscar(){
		$this->servicio->validar_entrada_atributos();	
		$this->servicio->inicializarRest();
		$this->servicio->validar_buscar();
		$respuesta = $this->servicio->buscar();
		devolverRest($respuesta);
	}	
	
	function verEnDetalle(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_verEnDetalle();
		$respuesta = $this->servicio->verEnDetalle();
		devolverRest($respuesta);
	}

}

?>
