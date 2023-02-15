<?php

include_once './Controladores/ControllerBase.php';

class usuario extends ControllerBase{

	function editarContrasena(){
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$respuesta = $this->servicio->editarContrasena('USUARIO_EDITAR_CONTRASENA_OK');
		devolverRest($respuesta);
	}

	function reactivar(){
		$_POST['borrado_logico'] = 0;
		$this->servicio->validar_entrada_atributos();
		$this->servicio->inicializarRest();
		$this->servicio->validar_reactivar();
		$respuesta = $this->servicio->reactivar('USUARIO_REACTIVAR_OK');
		devolverRest($respuesta);
	}

	//Es necesario un método específico para editar el rol.

}
?>
