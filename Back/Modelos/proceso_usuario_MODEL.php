<?php

include_once './Modelos/ModelBase.php';

class proceso_usuario_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'proceso_usuario';
      $this->id = array('usuario','id_proceso');
      $this->foraneas = array('proceso' => 'id_proceso');
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>