<?php

include_once './Modelos/ModelBase.php';

class proceso_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'proceso';
      $this->id = array('id_proceso');
      $this->foraneas = array('categoria' => 'id_categoria');
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>