<?php

include_once './Mapping/mapping.php';

class ModelBase{
	
    protected $mapping;
	protected $tabla;
    protected $id;

	public function __construct()
	{
		$this->mapping = new mapping();	
	}

////////////////////////////////////////////////////////insertar////////////////////////////////////////////////////////

	function insertar(){
		$this->mapping->insertar($this->tabla, $this->arrayDatoValor);
	}

///////////////////////////////////////////////////////editar////////////////////////////////////////////////////////

	function editar(){
		$valoresCondition = array();
		foreach ($this->arrayDatoValor as $key => $value) { 
			foreach($this->id as $elementoId){
				if($key == $elementoId){
					array_push($valoresCondition, $value);
				}
			}
		} 

		foreach ($this->id as $value) { 
			foreach($this->arrayDatoValor as $dato => $valor){
				if($value == $dato){
					unset($this->arrayDatoValor[$value]);
				}
			}
		}

		$this->mapping->editar($this->tabla, $this->arrayDatoValor, $this->id, $valoresCondition);
	}

///////////////////////////////////////////////////////borrar/////////////////////////////////////////////////////////

	function borrar(){
		$this->mapping->borrar($this->tabla, $this->arrayDatoValor);
	}

//////////////////////////////////////////////////////buscar///////////////////////////////////////////////////////

	function buscar(){
		$result = $this->mapping->buscar($this->tabla, $this->arrayDatoValor, $this->foraneas, $this->empieza, $this->filaspagina, $this->orden, $this->tipoOrden);
		$filas = $result['resource'];

		if($this->empieza == 'nulo') {$this->empieza = 0;}
		if (!empty($filas)) { 
			$filasenrespuesta = count($filas); 
		} else {
			$filasenrespuesta = 0; 
		}
		
		$result1 = $this->mapping->contarTuplas($this->tabla, $this->arrayDatoValor);
		$total = $result1['resource'];
		$total = $total[0]['COUNT(*)'];
		
		$feedback=array('ok' => $result['ok'], 
						'code' => $result['code'], 
						'resource'=>$filas,
						'total'=>$total,
						'empieza'=>$this->empieza, 
						'filas'=>$filasenrespuesta, 
						'criteriosbusqueda' => $this->criteriosbusqueda);
		
		return $feedback;
	}

///////////////////////////////////////////////Funciones de apoyo/////////////////////////////////////////////////

	function getById($valoresQuery){
		return $this->mapping->getById($this->tabla, $this->id, $valoresQuery);
	}

	function seek_multiple($datosQuery,$valoresQuery){
		return $this->mapping->seek_multiple($this->tabla, $datosQuery, $valoresQuery);
	}

	function seek($datosQuery,$valoresQuery){
		return $this->mapping->seek($this->tabla, $datosQuery, $valoresQuery);
	}
	
	function max($datosQuery){
		return $this->mapping->max($this->tabla, $datosQuery);
	}

	function min($datosQuery){
		return $this->mapping->min($this->tabla, $datosQuery);
	}

}
?>