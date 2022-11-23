<?php

include_once './Modelos/ModelBase.php';

class logExcepcionAcciones_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'logexcepcionaccion';
      $this->id = array('usuario', 'tiempo');
      $this->foraneas = array();
      $this->orden = 'tiempo';
      $this->tipoOrden = 'DESC';
    }

}
?>