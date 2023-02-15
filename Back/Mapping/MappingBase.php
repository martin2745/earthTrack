<?php

include_once './Comun/config.php';

abstract class MappingBase{

	private static $db_host = host;
	private static $db_user = user;
	private static $db_pass = pass;
	private static $bd = BD;
	private static $bdTest = BDTEST;
	private static $directorioLog = directorioLog;
	private static $log_name = log_name;
	private static $db_name = BD;
	protected $query;
	protected $rows = array();
	private $conn;
	protected $stmt;
	protected $datos = array();
	public $ok = true;
	public $code = 'CONEXION_BD_OK';
	public $resource = '';
	public $feedback = array();
	public $erroresdatos = [];
	public $listaAtributosBD = array();
	public $mapping;

	function connection(){
		if (isset($_POST['test']) && $_POST['test'] == 'conectardbTest'){
			try{
				$this->conn = new PDO('mysql:host='.self::$db_host.';dbname='.self::$bdTest,self::$db_user,self::$db_pass);
			}catch(Exception $e){
				die('Error: '.$e->GetMessage());
			}finally{
				return $this->conn;
			}

		}else{
			try{
				$this->conn = new PDO('mysql:host='.self::$db_host.';dbname='.self::$bd,self::$db_user,self::$db_pass);
			}catch(Exception $e){
				die('Error: '.$e->GetMessage());
			}finally{
				return $this->conn;
			}
		}
	}

	//Ejecutar un query simple del tipo INSERT, DELETE, UPDATE
	protected function execute_single_query($valores) {
		if (!($this->connection())){
			rellenarExcepcionAccion('CONEXION_BD_KO');
		}
		else{
			if(!($this->stmt->execute($valores))){
				rellenarExcepcionAccion('SQL_KO');
			}
		}

	}

	//Traer resultados de una consulta en un Array
	protected function get_results_from_query($valores) {
		$this->resource = array();
		if (!($this->connection())){
			rellenarExcepcionAccion('CONEXION_BD_KO');
		}
		else{
			if(!empty($valores)){
				if (!$this->stmt->execute($valores)){
					rellenarExcepcionAccion('SQL_KO');
				}else{
	
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construct_response();
					}
					else{
						$result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
						$this->resource = $result;
						$this->ok = true;
						$this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						$this->construct_response();
					}
				}
			}
			else{
				if (!$this->stmt->execute()){
					rellenarExcepcionAccion('SQL_KO');
				}else{
	
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construct_response();
					}
					else{
						$result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
						$this->resource = $result;
						$this->ok = true;
						$this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						$this->construct_response();
					}
				}
			}
			
		}
	}

	//Ejecutar un query por clave primaria que debe devolver una túpla de resultado 
	protected function get_one_result_from_query($valores) {
		$this->resource = array();
		if (!($this->connection())){
			rellenarExcepcionAccion('CONEXION_BD_KO');
		}
		else{
			if(!empty($valores)){
				if (!$this->stmt->execute($valores)){
					rellenarExcepcionAccion('SQL_KO');
				}else{
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construct_response();
					}else{
						$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
						$this->resource = $result;
						$this->ok = true;
						$this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						$this->construct_response();
					}
				}
			}
			else{
				if (!$this->stmt->execute()){
					rellenarExcepcionAccion('SQL_KO');
				}else{
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construct_response();
					}else{
						$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
						$this->resource = $result;
						$this->ok = true;
						$this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						$this->construct_response();
					}
				}
			}
		}

	}

	protected function construct_response() {
		$this->feedback['ok'] = $this->ok;
		$this->feedback['code'] = $this->code;
		$this->feedback['resource'] = $this->resource;
	}
}

?>