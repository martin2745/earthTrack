<?php

include_once './Modelos/ModelBase.php';

class categoria_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'categoria';
      $this->id = array('id_categoria');
      $this->foraneas = array('categoria' => 'id_padre');
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>