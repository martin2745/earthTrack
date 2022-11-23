<?php

include_once './Modelos/ModelBase.php';

class rol_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'rol';
      $this->id = array('id_rol');
      $this->foraneas = array();
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>