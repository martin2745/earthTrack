<?php

include_once './Controladores/ControllerBase.php';

class categoria extends ControllerBase{

    function devolverPadre(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_devolverPadre();
		$respuesta = $this->servicio->devolverPadre('CATEGORIA_DEVOLVER_PADRE');
		devolverRest($respuesta);
	}

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_reactivar();
		$respuesta = $this->servicio->reactivar('CATEGORIA_REACTIVAR_OK');
		devolverRest($respuesta);
	}

	function devolverHijos(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_devolverHijos();
		$respuesta = $this->servicio->devolverHijos('CATEGORIA_DEVOLVER_HIJOS');
		devolverRest($respuesta);
	}

	function insertarConResposable(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_insertarConResposable();
		$respuesta = $this->servicio->insertarConResposable('CATEGORIA_INSERTAR_CON_RESP');
		devolverRest($respuesta);
	}

	function editarConResposable(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_editarConResposable();
		$respuesta = $this->servicio->editarConResposable('CATEGORIA_EDITAR_CON_RESP');
		devolverRest($respuesta);
	}

	function borrarConResposable(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_borrarConResposable();
		$respuesta = $this->servicio->borrarConResposable('CATEGORIA_BORRAR_CON_RESP');
		devolverRest($respuesta);
	}
}
?>