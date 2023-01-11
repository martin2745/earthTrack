<?php

include_once './Validation/validar_class.php';

class proceso_VALIDATION_ACCION extends Validar{
	
	function validar_insertar(){
		if($this->existe_categoria()){
	 		rellenarExcepcionAccion('NO_EXISTE_CATEGORIA');
		}
		if($this->existe_proceso_en_categoria()){
			rellenarExcepcionAccion('EXISTE_PROCESO_EN_CATEGORIA');
		}
        if($this->accion_denegada_insertar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_INSERTAR_PROCESO');
        }

	}

	function validar_editar(){
		if($this->existe_categoria()){
			rellenarExcepcionAccion('NO_EXISTE_CATEGORIA');
		}
        if($this->accion_denegada_editar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_EDITAR_PROCESO');
        }

	}

	function validar_borrar(){
		if($this->no_existe_proceso()){
			rellenarExcepcionAccion('NO_EXISTE_PROCESO');
		}
        if($this->accion_denegada_borrar()){
			rellenarExcepcionAccion('ACCION_DENEGADA_BORRAR_PROCESO');
        }
	}

	function validar_buscar(){ /*Excepciones para buscar proceso*/ }

	function validar_verEnDetalle(){ /*Excepciones para ver en detalle proceso*/ }

	function existen_relaciones(){
		$toret = false;
		/*Si el proceso está relacionado con otras entidades es necesario indicarlo para que este
		se borre de forma lógica. Si el usuario no tuviera relaciones el borrado será físico.*/
		if($this->existe_relacionProcesoParametro()) $toret = true;
        return $toret;
	}
//////////////////////////////////////Funciones para disparar las excepcion/////////////////////////////////////////
	
	/**
	 * INSERTAR
	 */
		/**
		 * Se mira si existe la categoría en la que se pretende insertar.
		 */
		function existe_categoria(){
			include_once './Modelos/categoria_MODEL.php';
			$modeloCategoria = new categoria_MODEL();
			$resultado = $modeloCategoria->seek(array('id_categoria'), array($this->modelo->arrayDatoValor['id_categoria']));
			$fila = $resultado['resource'];
			if (empty($fila)){ return true; }
			else{ return false; }
		}
		/**
		 * Se mira si ya existe algún proceso en la categoría que se pretende insertar
		 */
		function existe_proceso_en_categoria(){
			$resultado = $this->modelo->seek(array('id_categoria'), array($this->modelo->arrayDatoValor['id_categoria']));
			$fila = $resultado['resource'];
			if (empty($fila)){ return false; }
			else{ return true; }
		}

		/**
         * Se mira si el usuario tiene un rol administrador o reponsable para llevar a cabo la inserción.
         */
        function accion_denegada_insertar(){
			if (rolUsuarioSistema == 'administrador' || rolUsuarioSistema == 'responsable' ){ return false; }
			else { return true; }
        }

	
	/**
	 * EDITAR
	 */

		/**
         * Se mira si el usuario tiene un rol administrador o reponsable para llevar a cabo la edición.
		 * Actualmente los permisos son identicos a los de la inserción.
         */
        function accion_denegada_editar(){
			if (rolUsuarioSistema == 'administrador' || rolUsuarioSistema == 'responsable' ){ return false; }
			else { return true; }
        }
		
		
	/**
	 * BORRAR
	 */
		/**
		 * Se mira si ya existe algún proceso en la categoría que se pretende insertar
		 */
		function no_existe_proceso(){
			$resultado = $this->modelo->seek(array('id_proceso'), array($this->modelo->arrayDatoValor['id_proceso']));
			$fila = $resultado['resource'];
			if (empty($fila)){ return true; }
			else{ return false; }
		}

		/**
         * Se mira si el usuario tiene un rol administrador o reponsable para llevar a cabo la inserción.
         */
        function accion_denegada_borrar(){
			if (rolUsuarioSistema == 'administrador' || rolUsuarioSistema == 'responsable' ){ return false; }
			else { return true; }
        }

	/**
     * existen_relaciones
     */

            /**
             * Para poder hacer un borrado físico o lógico del proceso primero hemos validado en la validación de acciones del proceso
             * el caso siguiente: Que no exista un parámetro asociado a un proceso y que no exista un rol asociado a un usuario activo.
             * Si estos casos no han dado excepción esta claro que puede darse lo siguiente:
             *      a) Que el proceso no está asociado a nadie -> borrado lógico
             *      b) Que el rol está asociado a un usuario borrado de forma lógica -> borrado lógico del rol
             */
            function existe_relacionProcesoParametro(){
                include_once './Modelos/parametro_MODEL.php';
                $parametro = new parametro_MODEL();
                $resultado = $parametro->seek_multiple(array('id_proceso'), array($this->modelo->arrayDatoValor['id_proceso']));
                
                $fila = $resultado['resource'];
            
                if (empty($fila)){
                    //no hay relaciones, borrado fisico
                    return false;                               
                }
                else{
                    //El proceso esta borrado lógicamente, sino antes saltaria una excepcion
                    return true;
                }
            }
}
?>