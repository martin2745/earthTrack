<?php

function pruebaREST_Proceso_Insertar_Acciones(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();

    $tipo = 'Acción';
	$vaciarPost = NULL;

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//INSERTAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//PROCESO_INSERTAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'proceso';
	$POST['action'] = 'insertar';
	$POST['nombre_proceso'] = 'procesoTest';
	$POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
	$POST['usuario'] = 'admin';
	$POST['id_categoria'] = '10';
	$POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';

	$prueba = 'Insertar proceso';
	$codeEsperado = 'PROCESO_INSERTAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_proceso
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_YA_EXISTE
    $prueba = 'proceso para insertar ya existente';
    $codeEsperado = 'EXISTE_PROCESO_EN_CATEGORIA';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //Buscar proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['nombre_proceso'] = 'procesoTest'; 

    $id = $pruebas->peticionCurlNoTestRespuesta($POST); //recupero el proceso insertado
    $infoProceso = (array)$id['resource'][0];
    
//---------------------------------------------------------------------------------------------------------------------

    //borrado proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'borrar';
    $POST['id_proceso'] = $infoProceso['id_proceso']; //utilizo el id del proceso insertado para ahora borrarlo

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 
   
    //PROCESODENEGADA_INSERTAR_PROCESO
	$POST = $vaciarPost;
	$POST['controlador'] = 'proceso';
	$POST['action'] = 'insertar';
	$POST['nombre_proceso'] = 'procesoTest';
	$POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
	$POST['id_categoria'] = '10';
	$POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';

	$prueba = 'Solo un usuario resposable del la categoría puede insertar un proceso en la misma.';
	$codeEsperado = 'ACCION_DENEGADA_INSERTAR_PROCESO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>