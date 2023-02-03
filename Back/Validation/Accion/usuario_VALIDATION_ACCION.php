<?php

include_once './Validation/validar_class.php';

class usuario_VALIDATION_ACCION extends Validar{
	
	function validar_insertar(){
		if($this->existe_usuario()){
			rellenarExcepcionAccion('USUARIO_YA_EXISTE');
		}
        if(!$this->accion_denegada_insertar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_INSERTAR_USUARIO');
        }
	}

	function validar_editar(){
		if(!$this->existe_usuario()){
			rellenarExcepcionAccion('USUARIO_NO_EXISTE');
		}
        if(!$this->existe_usuario_email()){
			rellenarExcepcionAccion('EMAIL_USUARIO_YA_EXISTE');
        }
        if(!$this->accion_denegada_editar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_EDITAR_USUARIO');
        }
	}

	/**
	 * No necesitamos validación de acciones de editar contraseña ya que sacamos el usuario a partir del
	 * token, por lo tanto, ya que le token es único y pertenece solo a un usuario, tiene que ser el mismo 
	 * usuario del token el que hace la edición de su propia contraseña. Además un admin no puede editar
	 * la contraseña del usuario.
	 */

	function validar_borrar(){
		if($this->modelo->arrayDatoValor['usuario'] == 'admin'){
			rellenarExcepcionAccion('ADMIN_NO_SE_PUEDE_BORRAR');
		}
		if(!$this->existe_usuario()){
			rellenarExcepcionAccion('USUARIO_NO_EXISTE');
		}
        if($this->existe_responsable_con_categoria()){
			rellenarExcepcionAccion('RESPONSABLE_TIENE_CATEGORIA');
        }
        if(!$this->accion_denegada_borrar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_BORRAR_USUARIO');
        }
	}

	function validar_reactivar(){
		if(!$this->existe_usuario()){ 
			rellenarExcepcionAccion('USUARIO_NO_EXISTE');
        }
		if(!$this->usuario_ya_activo()){ 
			rellenarExcepcionAccion('USUARIO_YA_ACTIVO');
        }
        if(!$this->accion_denegada_reactivar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_REACTIVAR_USUARIO');
        }
	}

	function validar_buscar(){ /*Excepciones para buscar usuario*/ }

	function validar_verEnDetalle(){ /*Excepciones para ver en detalle usuario*/ }

	function existen_relaciones(){
		$toret = false;
        if($this->usuario_con_huella()) $toret = true;
        return $toret;
	}

//////////////////////////////////////Funciones para disparar las excepcion/////////////////////////////////////////
	
	/**
	 * INSERTAR
	 */
		/**
		 * Se mira si ya existe el usuario en el sistema
		 */
		function existe_usuario(){
			$fila = $this->modelo->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }
		}

		/**
         * Se mira si el usuario es un administrador.
         */
        function accion_denegada_insertar(){
            $fila = $this->modelo->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

	/**
     * EDITAR
     */

		/**
         * Se comprueba si existe un usuario con ese email en el sistema
         */
        function existe_usuario_email(){
            $fila = $this->modelo->seek(array('email'), array($this->modelo->arrayDatoValor['email']))['resource'];
            if (!empty($fila)){
                if($fila['usuario'] != $this->modelo->arrayDatoValor['usuario']){ return false; }
                else{ return true; }
            }else{ return true; }
        }

		/**
		 * Se comprueba cual es el nuevo rol del usuario a editar. No se puede editar el rol de un usuario por administrador.
		 */
		function rol_admin(){
			if($this->modelo->arrayDatoValor['id_rol'] == '1'){ return false; }
			else{ return true; }
		}

		/**
         * Se mira si el usuario es un administrador o si el usuario que intenta
         * editar sus datos personales es el y no otro usuario diferente.
         */
        function accion_denegada_editar(){
            $fila = $this->modelo->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];
			if (rolUsuarioSistema != 'administrador' && usuarioSistema != $fila['usuario']){ return false; }
            else{ return true; }
        }

	/**
	 * BORRAR
	 */

		/**
		 * No se puede eliminar un usuario responsable con categoría asociada. Primero elimine su categoría.
		 */
		function existe_responsable_con_categoria(){
			include_once './Modelos/categoria_MODEL.php';
			$modeloCategoria = new categoria_MODEL();
			$resultado = $modeloCategoria->seek(array('usuario'), array($this->modelo->arrayDatoValor['usuario']));
			
			$fila = $resultado['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }

		}

		/**
         * Se mira si el usuario es un administrador.
         */
        function accion_denegada_borrar(){
            $fila = $this->modelo->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

	/**
	 * REACTIVAR
	 */

		/**
         * Se mira si el usuario es un administrador.
         */
        function accion_denegada_reactivar(){
            $fila = $this->modelo->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }
		
		/**
         * Se mira si el usuario es un administrador.
         */
        function usuario_ya_activo(){
            $fila = $this->modelo->getById(array($this->modelo->arrayDatoValor['usuario']))['resource'];
			if ($fila['borrado_logico'] == 0){ return false; }
            else{ return true; }
        }

	/**
     * BUSCAR
     */

	/**
     * VER EN DETALLE
     */
	
	/**
     * existen_relaciones
     */

        /**
         * Se borra de forma lógica un usuario con huella calculada. Esto nos permite no tener que eliminar
		 * sus huella y tener un histórico de todas las huellas, incluso de los usuarios ya no activos.
         */
		function usuario_con_huella(){
			include_once './Modelos/proceso_usuario_MODEL.php';
			$modeloProcesoUsuario = new proceso_usuario_MODEL();
			$resultado = $modeloProcesoUsuario->seek(array('usuario'), array($this->modelo->arrayDatoValor['usuario']));
			
			$fila = $resultado['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }

		}
		
}
?>