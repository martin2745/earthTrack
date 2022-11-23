<?php

include_once './Validation/Validar_class.php';
include_once './Validation/excepciones.php';
include_once './Modelos/permiso_MODEL.php';

class funcionalidad_VALIDATION_ACCION extends Validar{

    function validar_insertar(){		
		if ($this->existe_nombre_funcionalidad()){
			throw new excepcionAccion('FUNCIONALIDAD_YA_EXISTE');
        }
        if(!$this->accion_denegada_insertar()){
			throw new excepcionAccion('ACCION_DENEGADA_INSERTAR_FUNCIONALIDAD');
        }
	}

	function validar_editar(){
		if (!$this->existe_funcionalidad_id()){
			throw new excepcionAccion('FUNCIONALIDAD_NO_EXISTE');
        }	
		if ($this->existe_nombre_funcionalidad_editar()){
			throw new excepcionAccion('FUNCIONALIDAD_YA_EXISTE');
        }
        if(!$this->accion_denegada_editar()){
			throw new excepcionAccion('ACCION_DENEGADA_EDITAR_FUNCIONALIDAD');
        }
	}

    function validar_borrar(){
		if (!$this->existe_funcionalidad_id()){ 
			throw new excepcionAccion('FUNCIONALIDAD_NO_EXISTE');
        }
        if($this->existe_permiso()){
			throw new excepcionAccion('FUNCIONALIDAD_ASOCIADO_PERMISO');
        }
        if(!$this->accion_denegada_borrar()){
			throw new excepcionAccion('ACCION_DENEGADA_BORRAR_FUNCIONALIDAD');
        }
	}

    function validar_reactivar(){}

    function validar_buscar(){ /*Excepciones para buscar funcionalidad*/ }

    function validar_verEnDetalle(){ /*Excepciones para ver en detalle funcionalidad*/ }

	function existen_relaciones(){
        $toret = false;
        return $toret;
	}

    
    /**
     * INSERTAR
     */

        /**
         * Se comprueba que ya exista un funcionalidad en el sistema con ese nombre
         */
        function existe_nombre_funcionalidad(){
            $resultado = $this->modelo->seek(array('nombre_funcionalidad'), array($this->modelo->arrayDatoValor['nombre_funcionalidad']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Solo un administrador puede insertar un nuevo funcionalidad
         */
        function accion_denegada_insertar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * EDITAR
     */

        /**
         * Se comprueba que exista el id en el sistema
         */
        function existe_funcionalidad_id(){
            $resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_funcionalidad']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se comprueba que ya exista un funcionalidad en el sistema con ese nombre y que no sea la misma funcionalidad
         * que estamos editando.
         */
        function existe_nombre_funcionalidad_editar(){
            $resultado = $this->modelo->seek(array('nombre_funcionalidad'), array($this->modelo->arrayDatoValor['nombre_funcionalidad']));
        
            $fila = $resultado['resource'];
            
            if (empty($fila) || $fila['id_funcionalidad'] == $this->modelo->arrayDatoValor['id_funcionalidad']){
                return false;
            }
            else{
                return true;
            }
        }

		/**
         * Solo un administrador puede editar un funcionalidad
         */
        function accion_denegada_editar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * BORRAR
     */

        /**
         * Se comprueba que no exista un funcionalidad asignado a un permiso en el sistema
         */
        function existe_permiso(){
            include_once './Modelos/permiso_MODEL.php';
            $modeloPermiso = new permiso_MODEL();
            $resultado = $modeloPermiso->seek_multiple(array('id_funcionalidad'), array($this->modelo->arrayDatoValor['id_funcionalidad']));
    
            $fila = $resultado['resource'];
    
            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se mira si el usuario que intenta eliminar un funcionalidad es un administrador.
         */
        function accion_denegada_borrar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }
}

?>