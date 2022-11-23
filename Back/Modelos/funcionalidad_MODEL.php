<?php

include_once './Modelos/ModelBase.php';

class funcionalidad_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'funcionalidad';
      $this->id = array('id_funcionalidad');
      $this->foraneas = array();
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>