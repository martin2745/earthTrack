<?php

include_once './Validation/Validar_class.php';
include_once './Validation/excepciones.php';
include_once './Modelos/permiso_MODEL.php';

class rol_VALIDATION_ACCION extends Validar{

    function validar_insertar(){		
		if ($this->existe_nombre_rol()){
            $this->rellenarExcepcion('ROL_YA_EXISTE');
        }
        if(!$this->accion_denegada_insertar()){
            $this->rellenarExcepcion('ACCION_DENEGADA_INSERTAR_ROL');
        }
	}

	function validar_editar(){
		if (!$this->existe_rol_id()){
            $this->rellenarExcepcion('ROL_NO_EXISTE');
        }	
		if ($this->existe_nombre_rol_editar()){
            $this->rellenarExcepcion('ROL_YA_EXISTE');
        }
        if(!$this->accion_denegada_editar()){;
            $this->rellenarExcepcion('ACCION_DENEGADA_EDITAR_ROL');
        }
	}

    function validar_borrar(){
		if (!$this->existe_rol_id()){ 
            $this->rellenarExcepcion('ROL_NO_EXISTE');
        }
        if($this->existe_permiso()){
            $this->rellenarExcepcion('ROL_ASOCIADO_PERMISO');
        }
        if($this->existe_usuarioRolActivo()){
            $this->rellenarExcepcion('ROL_ASOCIADO_USUARIO_ACTIVO');
        }
        if(!$this->accion_denegada_borrar()){
            $this->rellenarExcepcion('ACCION_DENEGADA_BORRAR_ROL');
        }
	}

    function validar_reactivar(){
		if (!$this->existe_rol_id()){ 
            $this->rellenarExcepcion('ROL_NO_EXISTE');
        }
        if (!$this->existe_rol_borrado_logicamente()){ 
            $this->rellenarExcepcion('ROL_YA_ACTIVO');
        }
        if(!$this->accion_denegada_reactivar()){
            $this->rellenarExcepcion('ACCION_DENEGADA_REACTIVAR_ROL');
        }
	}

    function validar_buscar(){ /*Excepciones para buscar rol*/ }

    function validar_verEnDetalle(){ /*Excepciones para ver en detalle rol*/ }

	function existen_relaciones(){
        $toret = false;
        if($this->existe_relacionUsuarioRol()) $toret = true;
        return $toret;
	}

    
    /**
     * INSERTAR
     */

        /**
         * Se comprueba que ya exista un rol en el sistema con ese nombre
         */
        function existe_nombre_rol(){
            $resultado = $this->modelo->seek(array('nombre_rol'), array($this->modelo->arrayDatoValor['nombre_rol']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Solo un administrador puede insertar un nuevo rol
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
        function existe_rol_id(){
            $resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_rol']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se comprueba que ya exista un rol en el sistema con ese nombre
         */
        function existe_nombre_rol_editar(){
            $resultado = $this->modelo->seek(array('nombre_rol'), array($this->modelo->arrayDatoValor['nombre_rol']));
        
            $fila = $resultado['resource'];

            if (empty($fila) || $fila['id_rol'] == $this->modelo->arrayDatoValor['id_rol']){
                return false;
            }
            else{
                return true;
            }
        }

		/**
         * Solo un administrador puede editar un rol
         */
        function accion_denegada_editar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * BORRAR
     */

        /**
         * Se comprueba que no exista un rol asignado a un permiso en el sistema
         */
        function existe_permiso(){
            include_once './Modelos/permiso_MODEL.php';
            $modeloPermiso = new permiso_MODEL();
            $resultado = $modeloPermiso->seek_multiple(array('id_rol'), array($this->modelo->arrayDatoValor['id_rol']));
    
            $fila = $resultado['resource'];
    
            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se comprueba que no exista un usuario activo con ese rol asignado para poder hacer el borrado del rol
         */
        function existe_usuarioRolActivo(){
            include_once './Modelos/usuario_MODEL.php';
            $usuario = new usuario_MODEL();
            $resultado = $usuario->seek_multiple(array('id_rol'), array($this->modelo->arrayDatoValor['id_rol']));
            
            $fila = $resultado['resource'];
           
            if (empty($fila)){
                return false;
            }
            else{
                $toret = false;
    
                foreach($fila as $usuario){
                    if($usuario['borrado_logico'] == 0){
                        $toret = true;
                    }
                }
                
                return $toret;
            }
        }
    

        /**
         * Se comprueba que el rol que se intenta reactivar esta borrado de forma lógica en el sistema
         */
        function existe_rol_borrado_logicamente(){
            $resultado = $this->modelo->getById(array($this->modelo->arrayDatoValor['id_rol']));

            $fila = $resultado['resource'];

            if ($fila['borrado_logico'] == 0){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Se mira si el usuario que intenta eliminar un rol es un administrador.
         */
        function accion_denegada_borrar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * REACTIVAR
     */

        /**
         * Se mira si el usuario que intenta reactivar un rol es un administrador.
         */
        function accion_denegada_reactivar(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * existen_relaciones
     */

            /**
             * Para poder hacer un borrado físico o lógico del rol primero hemos validado en la validación de acciones del rol
             * los siguientes casos. Que no exista un rol asociado a un permiso y que no exista un rol asociado a un usuario activo.
             * Si estos casos no han dado excepción esta claro que puede darse lo siguiente:
             *      a) Que el rol no está asociado a nadie -> borrado lógico
             *      b) Que el rol está asociado a un usuario borrado de forma lógica -> borrado lógico del rol
             */
            function existe_relacionUsuarioRol(){
                include_once './Modelos/usuario_MODEL.php';
                $usuario = new usuario_MODEL();
                $resultado = $usuario->seek_multiple(array('id_rol'), array($this->modelo->arrayDatoValor['id_rol']));
                
                $fila = $resultado['resource'];
            
                if (empty($fila)){
                    //no hay relaciones, borrado fisico
                    return false;                               
                }
                else{
                     //El usuario esta borrado lógicamente, sino antes saltaria una excepcion. ROL_ASOCIADO_USUARIO_ACTIVO
                    return true;
                }
            }
}

?>