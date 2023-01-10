<?php

include_once './Modelos/ModelBase.php';

class parametro_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'parametro';
      $this->id = array('id_parametro');
      $this->foraneas = array('proceso'=>'id_proceso');
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>