<?php

include_once './Validation/validar_class.php';

class permiso_VALIDATION_ACCION extends Validar{

    function validar_insertar(){		
		if ($this->existe_permiso()){
            rellenarExcepcionAccion('PERMISO_YA_EXISTE');
        }
        if(!$this->accion_denegada()){
            rellenarExcepcionAccion('ACCION_DENEGADA_INSERTAR_PERMISO');
        }
	}
    
	function validar_editar(){ /*Los permisos no tienen edición*/ }

	function validar_borrar(){
        if (!$this->existe_permiso()){
            rellenarExcepcionAccion('PERMISO_NO_EXISTE');
        }
        if(!$this->accion_denegada()){
            rellenarExcepcionAccion('ACCION_DENEGADA_BORRAR_PERMISO');
        }
	}

    function validar_reactivar(){ /*Los permisos no tienen reactivación*/ }

    function validar_buscar(){ 
        if (!$this->existe_funcionalidad()){
            rellenarExcepcionAccion('FUNCIONALIDAD_NO_EXISTE');
        }
     }

    function validar_verEnDetalle(){ /*Excepciones para ver en detalle permiso*/ }

	function existen_relaciones(){
        $toret = false;
        return $toret;
	}

    /**
     * INSERTAR
     */

        /**
         * Se mira si existe el permiso (relacion rol/accion/funcionalidad) en el sistema.
         */
        function existe_permiso(){
            $resultado = $this->modelo->seek(array("id_rol", "id_accion", "id_funcionalidad"), 
                array($this->modelo->arrayDatoValor['id_rol'], $this->modelo->arrayDatoValor['id_accion'], $this->modelo->arrayDatoValor['id_funcionalidad']));

            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

        /**
         * Solo un administrador puede insertar un nuevo permiso
         */
        function accion_denegada(){
			if (rolUsuarioSistema != 'administrador'){ return false; }
            else{ return true; }
        }

    /**
     * BORRAR
     */

    /**
     * BUSCAR
     */

        /**
         * Se comprueba que se está buscando
         */
        function existe_funcionalidad(){
            include_once './Modelos/funcionalidad_MODEL.php';
            $modeloFuncionalidad = new funcionalidad_MODEL();
            $resultado = $modeloFuncionalidad->seek(array('nombre_funcionalidad'), array($this->modelo->arrayDatoValor['nombre_funcionalidad']));
        
            $fila = $resultado['resource'];

            if (empty($fila)){
                return false;
            }
            else{
                return true;
            }
        }

}

?>