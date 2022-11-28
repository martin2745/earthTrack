<?php

include_once './Mapping/MappingBase.php';

class mapping extends MappingBase{

    private $conexion;
    private $datosQuery = array();
    private $valoresQuery = array();
    
    public function __construct(){
		    $this->conexion = $this->connection();
	  }

    /* 
     * Separa el array asociativo que contiene los datos y sus valores en 
     * dos arrays para poder operar facilmente con PDO.
     */
    function datosValores($arrayDatoValor){
        $this->datosQuery = array();
        $this->valoresQuery = array();
        if(!empty($arrayDatoValor)){
            foreach($arrayDatoValor as $key => $value){
                array_push($this->datosQuery, $key);
                array_push($this->valoresQuery, $value);
            }
        }
    }
  
////////////////////////////////////////////////////////ADD////////////////////////////////////////////////////////

    function ADD($tabla,$arrayDatoValor){
        $this->datosValores($arrayDatoValor);
        $y = '';
        foreach($this->valoresQuery as $valor){
                $y = $y.'?'.',';
        }
        $y = substr($y,0,-1);
        $datos = $this->queryDatosAdd($this->datosQuery);

        $this->query = "INSERT INTO $tabla ($datos) values ($y)";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query($this->valoresQuery);  
    }

        /*
        * Para la acción de insertar crea el string de datos de la query.
        */
        private function queryDatosAdd($datosQuery){
            $toret = '';
            foreach($datosQuery as $dato){
                $toret = $toret.', '.$dato;
            }
            return substr($toret, 2, strlen($toret));
        }

///////////////////////////////////////////////////////EDIT////////////////////////////////////////////////////////
    
    function EDIT($tabla,$arrayDatoValor,$condicion,$valoresCondition){
      $this->datosValores($arrayDatoValor);

      $infoQuery = '';
      $infoWhere = '';

      $valores = array();
      
          foreach($this->valoresQuery as $valorQuery){
            array_push($valores, $valorQuery);
          }
          foreach($valoresCondition as $valorCondition){
            array_push($valores, $valorCondition);
          }
          foreach($this->datosQuery as $valor){
            $infoQuery = $infoQuery.$valor.'=?, ';
          }
          foreach($condicion as $valorCondicion){
            $infoWhere = $infoWhere.$valorCondicion.'=? AND ';
          }

          $infoQuery = substr($infoQuery,0,-2);
          $infoWhere = substr($infoWhere,0,-5);

        $this->query = "UPDATE $tabla SET $infoQuery WHERE $infoWhere";

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query($valores);
    }

///////////////////////////////////////////////////////DELETE/////////////////////////////////////////////////////////
    
    function DELETE($tabla,$arrayDatoValor){
      $this->datosValores($arrayDatoValor);
      $infoQuery = '';

          foreach($this->datosQuery as $valor){
            $infoQuery = $infoQuery.'('.$valor.' = ?) and ';
          }
          $infoQuery = substr($infoQuery,0,-5);
          
      $this->query = "DELETE FROM $tabla WHERE( $infoQuery )";
      $this->stmt = $this->conexion->prepare($this->query);
      $this->execute_single_query($this->valoresQuery);
    }

//////////////////////////////////////////////////////SEARCH_GENERICO///////////////////////////////////////////////////////

    function SEARCH_GENERICO($tabla,$arrayDatoValor, $foraneas, $empieza, $filaspagina, $orden, $tipoOrden){
        $valores = array();
        $this->query = "SELECT * FROM ".$tabla;
        $this->datosValores($arrayDatoValor);  

        if (!empty($this->datosQuery)){
            $toret = $this->filtradoSentenciaWHERE_Generico($arrayDatoValor);
            $this->query = $this->query.' WHERE ('.$toret[0].')';
            $valores = $toret[1];
        }
        
        if($orden != '' && $tipoOrden != ''){
            $this->query = $this->query.' ORDER BY ('.$orden.') '.$tipoOrden;
        }

        if (($empieza == 'nulo') && ($filaspagina == 'nulo')) {
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_results_from_query($valores);
        }
        else{
        //ES NECESARIO MEJORAR ESTA PARTE PARA INCLUIR UN LIMIT POR SQL CON PDO EN PHP
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_results_from_query($valores);
            
            if($empieza == 'nulo') { $empieza = 0;}

            if(count($this->feedback['resource']) == $empieza){
                $this->feedback['code'] = 'RECORDSET_VACIO';
                $this->feedback['resource'] = array();
            }
            else if(count($this->feedback['resource']) > $filaspagina){
                $this->feedback['resource'] = array_slice($this->feedback['resource'], $empieza, $filaspagina);
            }
        }

        if (!empty($this->feedback['resource']) && !empty($foraneas)){
            foreach ($foraneas as $key => $value) {
                $this->feedback['resource'] = $this->incluirforaneas($this->feedback['resource'], $key, $value);
            }
        }
        return $this->feedback;
      }

    function filtradoSentenciaWHERE_Generico($arrayDatoValor){
        $arrayDatoValorLIKE = array();
        $arrayDatoValorIGUAL = array();
        $valoresQuery = array();
        $query = '';

        foreach($arrayDatoValor as $dato => $valor){
            $igual = substr($dato,-6);
            if($igual == '_IGUAL'){
                $datoSinIgual = substr($dato, 0, -6);
                $arrayDatoValorIGUAL[$datoSinIgual] = $valor;
            }
            else{
                $arrayDatoValorLIKE[$dato] = $valor;
            }
        }

        if(!empty($arrayDatoValorLIKE)){
            $query = $this->constructWhereBuscar_LIKE($arrayDatoValorLIKE);
            $arrayValoresLike = $this->convertirValoresLike(array_values($arrayDatoValorLIKE));
            foreach($arrayValoresLike as $value){
                array_push($valoresQuery, $value);
            }
        }
        if(!empty($arrayDatoValorIGUAL)){
            if($query != ''){
                $query = $query.' and '.$this->constructWhereBuscar($arrayDatoValorIGUAL);
            }else{
                $query = $this->constructWhereBuscar($arrayDatoValorIGUAL);
            }
            foreach($arrayDatoValorIGUAL as $valor){
                array_push($valoresQuery, $valor);
            }
        }

        $toret[0] = $query;
        $toret[1] = $valoresQuery;
         return $toret;
        
      }

              function constructWhereBuscar_LIKE($datosValoresQuery){  
                  $this->datosValores($datosValoresQuery);  
                  $infoQuery = '';
                  for($i = 0; $i < count($this->datosQuery); $i++){
                      $infoQuery = $infoQuery.'(lower('.$this->datosQuery[$i].') LIKE ?) and ';
                  }
                  $infoQuery = substr($infoQuery,0,-5);
                  return $infoQuery;
              }

              function constructWhereBuscar($datosValoresQuery){
                  $this->datosValores($datosValoresQuery);
                  $infoQuery = '';
                      for($i = 0; $i < count($this->datosQuery); $i++){
                          $infoQuery = $infoQuery.'('.$this->datosQuery[$i].' = ?) and ';
                      }
                      $infoQuery = substr($infoQuery,0,-5);
                  return $infoQuery;
            }
           
            /**
             * Convierte los valores a minúsculas y añade un %%
             * MarTin -> %martin%
             * */
            function convertirValoresLike($valoresQuery){
                $toret = array();
                $valores = (array)$valoresQuery;
                for($i = 0; $i < count($valores); $i++){
                  array_push($toret, '%'.strtolower($valores[$i]).'%');
                } 
                return $toret;
            }

            function buscarforaneas($tabla){
                $this->query = "SELECT * FROM ".$tabla;
                $this->stmt = $this->conexion->prepare($this->query);
                $this->get_results_from_query(array());
                return $this->feedback;
            }
        
            function incluirforaneas($principal, $tabla, $clave){
                $filasforaneas = $this->buscarforaneas($tabla);
                $auxiliar = array();

                if (empty($principal)){}
                else{
                    foreach ($principal as $fila) {
                        foreach ($filasforaneas['resource'] as $filasforanea) {
                            if ($fila[$clave] == $filasforanea[$clave]){
                                $fila[$clave] = $filasforanea;
                            }       
                        }
                    array_push($auxiliar, $fila);
                  }
                }
                return $auxiliar;
            }

////////////////////////////////////////////SEARCH BY///////////////////////////////////////////////////////
function SEARCH_BY($tabla,$arrayDatoValor, $foraneas, $empieza, $filaspagina, $orden, $tipoOrden){
    $valores = array();
    $this->query = "SELECT * FROM ".$tabla;
    $this->datosValores($arrayDatoValor);  

    if (!empty($this->datosQuery)){
        $toret = $this->filtradoSentenciaWHEREBy($arrayDatoValor);
        $this->query = $this->query.' WHERE ('.$toret[0].')';
        $valores = $toret[1];
    }
    
    if($orden != '' && $tipoOrden != ''){
        $this->query = $this->query.' ORDER BY ('.$orden.') '.$tipoOrden;
    }

    if (($empieza == 'nulo') && ($filaspagina == 'nulo')) {
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query($valores);
    }
    else{
    //ES NECESARIO MEJORAR ESTA PARTE PARA INCLUIR UN LIMIT POR SQL CON PDO EN PHP
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query($valores);
        
        if($empieza == 'nulo') { $empieza = 0;}

        if(count($this->feedback['resource']) == $empieza){
            $this->feedback['code'] = 'RECORDSET_VACIO';
            $this->feedback['resource'] = array();
        }
        else if(count($this->feedback['resource']) > $filaspagina){
            $this->feedback['resource'] = array_slice($this->feedback['resource'], $empieza, $filaspagina);
        }
    }

    if (!empty($this->feedback['resource']) && !empty($foraneas)){
        foreach ($foraneas as $key => $value) {
            $this->feedback['resource'] = $this->incluirforaneas($this->feedback['resource'], $key, $value);
        }
    }
    return $this->feedback;
  }

function filtradoSentenciaWHEREBy($arrayDatoValor){
    $valoresQuery = array();
    $query = '';

    if($query != ''){
        $query = $query.' and '.$this->constructWhereBuscar($arrayDatoValorIGUAL);
    }else{
        $query = $this->constructWhereBuscar($arrayDatoValorIGUAL);
    }
    foreach($arrayDatoValorIGUAL as $valor){
       array_push($valoresQuery, $valor);
    }  

    $toret[0] = $query;
    $toret[1] = $valoresQuery;
     return $toret;
    
  }
////////////////////////////////////////////SEARCH///////////////////////////////////////////////////////
function SEARCH($tabla,$arrayDatoValor, $foraneas, $empieza, $filaspagina, $orden, $tipoOrden){
    $valores = array();
    $this->query = "SELECT * FROM ".$tabla;
    $this->datosValores($arrayDatoValor);  

    if (!empty($this->datosQuery)){
        $toret = $this->filtradoSentenciaWHERE($arrayDatoValor);
        $this->query = $this->query.' WHERE ('.$toret[0].')';
        $valores = $toret[1];
    }
    
    if($orden != '' && $tipoOrden != ''){
        $this->query = $this->query.' ORDER BY ('.$orden.') '.$tipoOrden;
    }

    if (($empieza == 'nulo') && ($filaspagina == 'nulo')) {
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query($valores);
    }
    else{
    //ES NECESARIO MEJORAR ESTA PARTE PARA INCLUIR UN LIMIT POR SQL CON PDO EN PHP
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query($valores);
        
        if($empieza == 'nulo') { $empieza = 0;}

        if(count($this->feedback['resource']) == $empieza){
            $this->feedback['code'] = 'RECORDSET_VACIO';
            $this->feedback['resource'] = array();
        }
        else if(count($this->feedback['resource']) > $filaspagina){
            $this->feedback['resource'] = array_slice($this->feedback['resource'], $empieza, $filaspagina);
        }
    }

    if (!empty($this->feedback['resource']) && !empty($foraneas)){
        foreach ($foraneas as $key => $value) {
            $this->feedback['resource'] = $this->incluirforaneas($this->feedback['resource'], $key, $value);
        }
    }
    return $this->feedback;
  }

function filtradoSentenciaWHERE($arrayDatoValor){
    $valoresQuery = array();
    $query = '';

    $query = $this->constructWhereBuscar($arrayDatoValorLIKE);
    $arrayValoresLike = $this->convertirValoresLike(array_values($arrayDatoValorLIKE));
    foreach($arrayValoresLike as $value){
        array_push($valoresQuery, $value);
    }

    $toret[0] = $query;
    $toret[1] = $valoresQuery;
     return $toret;
    
  }
////////////////////////////////////////////Funciones de apoyo///////////////////////////////////////////////////////
      
    function getById($tabla,$datosQuery,$valoresQuery){
        $this->query = "SELECT * FROM $tabla";
        if (!empty($datosQuery)){
            $infoWhere = $this->constructWhereSEARCH_BY($datosQuery);
            $this->query = "SELECT * FROM $tabla WHERE(($infoWhere))";
        }
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query($valoresQuery);
        return $this->feedback;
    }

    function seek_multiple($tabla,$datosQuery,$valoresQuery){
        $this->query = "SELECT * FROM $tabla";
        if (!empty($datosQuery)){
            $infoQuery = $this->constructWhereSEARCH_BY($datosQuery);
            $this->query = "SELECT * FROM $tabla WHERE( $infoQuery )";
        }
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_results_from_query($valoresQuery);
        return $this->feedback; 
    }

    function seek($tabla,$datosQuery,$valoresQuery){
        $this->query = "SELECT * FROM $tabla";
        if (!empty($datosQuery)){
                $infoWhere = $this->constructWhereSEARCH_BY($datosQuery);
                $this->query = "SELECT * FROM $tabla WHERE(($infoWhere))";
        }
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query($valoresQuery);
        return $this->feedback;
    }

        function constructWhereSEARCH_BY($datosQuery){
            $infoQuery = '';
                for($i = 0; $i < count($datosQuery); $i++){
                    $infoQuery = $infoQuery.'('.$datosQuery[$i].' = ?) and ';
                }
                $infoQuery = substr($infoQuery,0,-5);

            return $infoQuery;
        }

    function max($tabla,$datosQuery){
        $this->query = "SELECT MAX($datosQuery) FROM $tabla";
        
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query('');
        return $this->feedback;
    }

    function min($tabla,$datosQuery){
        $this->query = "SELECT MIN($datosQuery) FROM $tabla";
        
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query('');
        return $this->feedback;
    }

    function contarTuplas($tabla, $arrayDatoValor){
        $this->datosValores($arrayDatoValor);
        $valores = array();
        $this->query = "SELECT COUNT(*) FROM ". $tabla;
  
        if (!empty($this->datosQuery)){
          $toret = $this->filtradoSentenciaWHERE_Generico($arrayDatoValor);
          $this->query = $this->query.' WHERE ('.$toret[0].')';
          $valores = $toret[1];
        }
  
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query($valores);
        return $this->feedback;
      }

}
?>