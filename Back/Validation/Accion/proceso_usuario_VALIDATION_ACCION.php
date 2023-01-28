<?php

include_once './Validation/Validar_class.php';
include_once './Modelos/permiso_MODEL.php';

class proceso_usuario_VALIDATION_ACCION extends Validar{

    function validar_insertar(){		
		if($this->no_existe_proceso()){
			rellenarExcepcionAccion('NO_EXISTE_PROCESO');
		}
        if($this->no_existe_usuario()){
			rellenarExcepcionAccion('NO_EXISTE_USUARIO');
		}
        if($this->existe_proceso_usuario()){
			rellenarExcepcionAccion('EXISTE_PROCESO_USUARIO');
		}
	}

	function validar_editar(){
		if($this->no_existe_proceso()){
			rellenarExcepcionAccion('NO_EXISTE_PROCESO');
		}
        if($this->no_existe_usuario()){
			rellenarExcepcionAccion('NO_EXISTE_USUARIO');
		}
	}

    function validar_borrar(){
        if($this->no_existe_proceso()){
			rellenarExcepcionAccion('NO_EXISTE_PROCESO');
		}
        if($this->no_existe_usuario()){
			rellenarExcepcionAccion('NO_EXISTE_USUARIO');
		}
	}

    function validar_reactivar(){
        if($this->no_existe_proceso()){
			rellenarExcepcionAccion('NO_EXISTE_PROCESO');
		}
        if($this->no_existe_usuario()){
			rellenarExcepcionAccion('NO_EXISTE_USUARIO');
		}
    }

    function validar_buscar(){ /*Excepciones para buscar categoria*/ }

    function validar_verEnDetalle(){ /*Excepciones para ver en detalle categoria*/ }

    function validar_devolverHuella(){
		if($this->no_existe_usuario()){
			rellenarExcepcionAccion('NO_EXISTE_USUARIO');
		}
	}
	
	function validar_devolverProcesos(){
		if($this->no_existe_usuario()){
			rellenarExcepcionAccion('NO_EXISTE_USUARIO');
		}
	}



    function no_existe_proceso(){
        include_once './Modelos/proceso_MODEL.php';
		$modelo_proceso = new proceso_MODEL();

        $resultado = $modelo_proceso->seek(array('id_proceso'), array($this->modelo->arrayDatoValor['id_proceso']));
        $fila = $resultado['resource'];
        if (empty($fila)){ return true; }
        else{ return false; }
    }

    function no_existe_usuario(){
        include_once './Modelos/usuario_MODEL.php';
		$modelo_usuario = new usuario_MODEL();

        $resultado = $modelo_usuario->seek(array('usuario'), array($this->modelo->arrayDatoValor['usuario']));
        $fila = $resultado['resource'];
        if (empty($fila)){ return true; }
        else{ return false; }
    }

    function existe_proceso_usuario(){
        $resultado =  $this->modelo->seek(array('id_proceso', 'usuario'), array($this->modelo->arrayDatoValor['id_proceso'], $this->modelo->arrayDatoValor['usuario']));
        $fila = $resultado['resource'];
        if (!empty($fila)){ return true; }
        else{ return false; }
    }
        
}

?>