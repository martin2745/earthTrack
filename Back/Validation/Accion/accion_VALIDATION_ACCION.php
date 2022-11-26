<?php

include_once './Validation/Validar_class.php';
include_once './Validation/excepciones.php';
include_once './Modelos/permiso_MODEL.php';

class accion_VALIDATION_ACCION extends Validar{

    function validar_insertar(){		
		if ($this->existe_nombre_accion()){
            $this->rellenarExcepcion('ACCION_YA_EXISTE');
            
        }
        if(!$this->accion_denegada_insertar()){
            $this->rellenarExcepcion('ACCION_DENEGADA_INSERTAR_ACCION');
        }
	}

	function validar_editar(){
		if (!$this->existe_accion_id()){
            $this->rellenarExcepcion('ACCION_NO_EXISTE');
        }	
		if ($this->existe_nombre_accion_editar()){
            $this->rellenarExcepcion('ACCION_YA_EXISTE');
        }
        if(!$this->accion_denegada_editar()){
            $this->rellenarExcepcion('ACCION_DENEGADA_EDITAR_ACCION');
        }
	}

    function validar_borrar(){
		if (!$this->existe_accion_id()){ 
            $this->rellenarExcepcion('ACCION_NO_EXISTE');
        }
        if($this->existe_permiso()){
            $this->rellenarExcepcion('ACCION_ASOCIADO_PERMISO');
        }
        if(!$this->accion_denegada_borrar()){
            $this->rellenarExcepcion('ACCION_DENEGADA_BORRAR_ACCION');
        }
	}

    function validar_reactivar(){}

    function validar_buscar(){ /*Excepciones para buscar accion*/ }

    function validar_verEnDetalle(){ /*Excepciones para ver en detalle accion*/ }

	function existen_relaciones(){
        $toret = false;
        return $toret;
	}

    
    /**
     * INSERTAR
     */

        /**
         * Se comprueba que ya exista un accion en el sistema con ese nombre
         */
        function existe_nombre_accion(){
            $resultado = $this->modelo->seek(array('nombre_accion'), array($this->modelo->arrayDatoValor['nombre_accion']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Solo un administrador puede insertar un nuevo accion
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
        function existe_accion_id(){
            $resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_accion']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se comprueba que ya exista un accion en el sistema con ese nombre y que no sea la misma accion
         * que estamos editando.
         */
        function existe_nombre_accion_editar(){
            $resultado = $this->modelo->seek(array('nombre_accion'), array($this->modelo->arrayDatoValor['nombre_accion']));
        
            $fila = $resultado['resource'];
            
            if (empty($fila) || $fila['id_accion'] == $this->modelo->arrayDatoValor['id_accion']){
                return false;
            }
            else{
                return true;
            }
        }

		/**
         * Solo un administrador puede editar un accion
         */
        function accion_denegada_editar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * BORRAR
     */

        /**
         * Se comprueba que no exista un accion asignado a un permiso en el sistema
         */
        function existe_permiso(){
            include_once './Modelos/permiso_MODEL.php';
            $modeloPermiso = new permiso_MODEL();
            $resultado = $modeloPermiso->seek_multiple(array('id_accion'), array($this->modelo->arrayDatoValor['id_accion']));
    
            $fila = $resultado['resource'];
    
            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se mira si el usuario que intenta eliminar un accion es un administrador.
         */
        function accion_denegada_borrar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }
}

?>