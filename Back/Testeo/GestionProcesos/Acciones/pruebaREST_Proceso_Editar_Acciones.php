<?php

function pruebaREST_Proceso_Editar_Acciones(){

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

//---------------------------------------------------------------------------------------------------------------------

	//insertar proceso
	$POST = $vaciarPost;
	$POST['controlador'] = 'proceso';
	$POST['action'] = 'insertar';
	$POST['nombre_proceso'] = 'procesoTestEditar';
	$POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
	$POST['usuario'] = 'admin';
	$POST['id_categoria'] = '10';
    $POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['nombre_proceso'] = 'procesoTestEditar';
    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoProceso = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_PROCESO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    
    //borrado proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'borrar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'editar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];
    $POST['nombre_proceso'] = 'procesoTestEditar';
    $POST['descripcion_proceso'] = 'Edicion de una proceso';
	$POST['id_categoria'] = '10';
	$POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';
	//var_dump($POST);exit;

    $prueba = 'Editar un proceso que no existe';
    $codeEsperado = 'NO_EXISTE_PROCESO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);

//---------------------------------------------------------------------------------------------------------------------


    //PROCESO_DENEGADA_EDITAR_PROCESO
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'editar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];
    $POST['nombre_proceso'] = 'procesoDos';
	$POST['id_categoria'] = '10';
    $POST['descripcion_proceso'] = 'Edicion de proceso por parte del test';
	$POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';

    $prueba = 'Solo el usuario administrador puede editar los datos de un proceso';
    $codeEsperado = 'ACCION_DENEGADA_EDITAR_PROCESO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>