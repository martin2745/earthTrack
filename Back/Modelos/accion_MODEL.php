<?php

include_once './Modelos/ModelBase.php';

class accion_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'accion';
      $this->id = array('id_accion');
      $this->foraneas = array();
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>