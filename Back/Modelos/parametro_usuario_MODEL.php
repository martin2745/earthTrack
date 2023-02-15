<?php

include_once './Modelos/ModelBase.php';

class parametro_usuario_MODEL extends ModelBase{

    public function __construct(){
      parent::__construct();
      $this->tabla = 'parametro_usuario';
      $this->id = array('usuario','id_proceso','id_parametro', 'valor');
      $this->foraneas = array('proceso_usuario' => 'id_proceso', 'parametro'=>'id_parametro', 'usuario'=>'usuario');
      $this->orden = '';
      $this->tipoOrden = '';
    }

}
?>