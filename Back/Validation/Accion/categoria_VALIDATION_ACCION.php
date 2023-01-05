<?php

include_once './Validation/Validar_class.php';
include_once './Modelos/permiso_MODEL.php';

class categoria_VALIDATION_ACCION extends Validar{

    function validar_insertar(){		
		if ($this->existe_nombre_categoria()){
            rellenarExcepcionAccion('CATEGORIA_YA_EXISTE');
            
        }
        if(!$this->categoria_denegada_insertar()){
            rellenarExcepcionAccion('CATEGORIA_DENEGADA_INSERTAR_CATEGORIA');
        }
        if(!$this->categoria_no_existe_padre()){
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE_PADRE');
        }
        /*
        if(!$this->categoria_no_existe_responsable()){
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE_RESPONSABLE');
        }*/
	}

	function validar_editar(){
		if (!$this->existe_categoria_id()){
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE');
        }	
		if ($this->existe_nombre_categoria_editar()){
            rellenarExcepcionAccion('CATEGORIA_YA_EXISTE');
        }
        if(!$this->categoria_denegada_editar()){
            rellenarExcepcionAccion('CATEGORIA_DENEGADA_EDITAR_CATEGORIA');
        }
	}

    function validar_borrar(){
        if(!$this->categoria_no_borrar_base()){
            rellenarExcepcionAccion('CATEGORIA_NO_BORRAR_BASE');
        }
		if (!$this->existe_categoria_id()){ 
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE');
        } 
        if(!$this->categoria_denegada_borrar()){
            rellenarExcepcionAccion('CATEGORIA_DENEGADA_BORRAR_CATEGORIA');
        }
        if (!$this->existe_hijo()){ 
            rellenarExcepcionAccion('CATEGORIA_EXISTE_HIJO');
        } 
	}

    function validar_reactivar(){
        if (!$this->existe_categoria_id()){ 
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE');
        }
        if (!$this->existe_categoria_borrado_logicamente()){ 
            rellenarExcepcionAccion('CATEGORIA_YA_ACTIVA');
        }
        if(!$this->accion_denegada_reactivar()){
            rellenarExcepcionAccion('ACCION_DENEGADA_REACTIVAR_CATEGORIA');
        }
    }

    function validar_buscar(){ /*Excepciones para buscar categoria*/ }

    function validar_verEnDetalle(){ /*Excepciones para ver en detalle categoria*/ }

    function validar_devolverPadre(){ /*Excepciones para devolverPadre categoria*/ 
        if (!$this->existe_categoria_id()){
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE');
        }
    }

    function validar_devolverHijos(){ /*Excepciones para devolverHijos categoria*/ 
        if (!$this->existe_categoria_id()){
            rellenarExcepcionAccion('CATEGORIA_NO_EXISTE');
        }
    }

	function existen_relaciones(){
        $toret = false;
        return $toret;
	}


    
    /**
     * INSERTAR
     */

        /**
         * Se comprueba que ya exista un categoria en el sistema con ese nombre
         */
        function existe_nombre_categoria(){
            $resultado = $this->modelo->seek(array('nombre_categoria'), array($this->modelo->arrayDatoValor['nombre_categoria']));
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Solo un administrador puede insertar un nuevo categoria
         */
        function categoria_denegada_insertar(){
			if (rolUsuarioSistema != 'administrador' && rolUsuarioSistema != 'responsable'){ return false; }
            else{ return true; }
        }

         /**
         * No se puede insertar una categoria si su padre no ha sido insertado previamente
         */
        function categoria_no_existe_padre(){
			$categoria = $this->modelo->seek(array('id_categoria'), array($this->modelo->arrayDatoValor['id_padre']));
            $fila = $categoria['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

         /**
         * No se puede insertar una categoria si su responsable no existe
         */
        function categoria_no_existe_responsable(){
			$categoria = $this->modelo->seek(array('usuario'), array($this->modelo->arrayDatoValor['responsable']));
            $fila = $categoria['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

    /**
     * EDITAR
     */

        /**
         * Se comprueba que exista el id en el sistema
         */
        function existe_categoria_id(){            
            $resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se comprueba que ya exista un categoria en el sistema con ese nombre y que no sea la misma categoria
         * que estamos editando.
         */
        function existe_nombre_categoria_editar(){
            $resultado = $this->modelo->seek(array('nombre_categoria'), array($this->modelo->arrayDatoValor['nombre_categoria']));
        
            $fila = $resultado['resource'];
            
            if (empty($fila) || $fila['id_categoria'] == $this->modelo->arrayDatoValor['id_categoria']){
                return false;
            }
            else{
                return true;
            }
        }

		/**
         * Solo un administrador puede editar un categoria
         */
        function categoria_denegada_editar(){
			if (rolUsuarioSistema != 'administrador' && rolUsuarioSistema != 'responsable'){ return false; }
            else{ return true; }
        }

    /**
     * BORRAR
     */

        /**
         * Se mira si el usuario que intenta eliminar un categoria es un administrador.
         */
        function categoria_denegada_borrar(){
			if (rolUsuarioSistema != 'administrador' && rolUsuarioSistema != 'responsable'){ return false; }
            else{ return true; }
        }

        /**
         * Se mira si el usuario que intenta eliminar un categoria es un administrador.
         */
        function categoria_no_borrar_base(){
			if ($this->modelo->arrayDatoValor['id_categoria'] == 1){ return false; }
            else{ return true; }
        }

        function existe_hijo(){
            $categoria = $this->modelo->seek(array('id_padre'), array($this->modelo->arrayDatoValor['id_categoria']));
            $fila = $categoria['resource'];

            if (empty($fila)){
                return true;
            }
            else{
                return false;
            }
        }

        /**
        * REACTIVAR
        */

        /**
         * Se mira si el usuario que intenta reactivar un rol es un administrador.
         */
        function accion_denegada_reactivar(){
			if (rolUsuarioSistema != 'administrador' && rolUsuarioSistema != 'responsable'){ return false; }
            else{ return true; }
        }

        /**
         * Se comprueba que el categoria que se intenta reactivar esta borrado de forma lógica en el sistema
         */
        function existe_categoria_borrado_logicamente(){
            $resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_categoria']));

            $fila = $resultado['resource'];

            if ($fila['borrado_logico'] == 0){
                return false;
            }
            else{
                return true;
            }
        }

        
}

?>