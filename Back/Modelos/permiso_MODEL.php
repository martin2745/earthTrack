<?php

include_once './Modelos/ModelBase.php';

class permiso_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'permiso';
      $this->id = array('id_rol', 'id_accion', 'id_funcionalidad');
      $this->foraneas = array('rol' => 'id_rol', 'accion' => 'id_accion', 'funcionalidad' => 'id_funcionalidad');
      $this->orden = '';
      $this->tipoOrden = '';
    }    
}
?>