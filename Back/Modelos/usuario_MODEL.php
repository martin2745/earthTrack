<?php

include_once './Modelos/ModelBase.php';

class usuario_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'usuario';
      $this->id = array('usuario');
      $this->foraneas = array('rol' => 'id_rol');
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>