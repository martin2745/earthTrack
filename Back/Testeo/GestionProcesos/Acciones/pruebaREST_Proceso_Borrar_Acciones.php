<?php

function pruebaREST_Proceso_Borrar_Acciones(){

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
	$POST['nombre_proceso'] = 'procesoTest';
	$POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
	$POST['usuario'] = 'admin';
	$POST['id_categoria'] = '10';
    $POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['nombre_proceso'] = 'procesoTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoProceso = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//BORRADO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //borrado proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'borrar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];

    $prueba = 'Borrado';
    $codeEsperado = 'PROCESO_BORRAR_OK';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                            //ERRORES_PROCESO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'borrar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];

    $prueba = 'Id de proceso no existe';
    $codeEsperado = 'NO_EXISTE_PROCESO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //insertar proceso
	$POST = $vaciarPost;
	$POST['controlador'] = 'proceso';
	$POST['action'] = 'insertar';
	$POST['nombre_proceso'] = 'procesoTest';
	$POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
	$POST['usuario'] = 'admin';
	$POST['id_categoria'] = '10';
    $POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';

    $pruebas->peticionCurlNoTest($POST);

    //Buscar proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['nombre_proceso'] = 'procesoTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoProceso = (array)$id['resource'][0];

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);

    //PROCESO_DENEGADA_BORRAR_PROCESO
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'borrar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];

    $prueba = 'Solo el administrador puede eliminar un proceso del sistema.';
    $codeEsperado = 'ACCION_DENEGADA_BORRAR_PROCESO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

    //login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
    
    //borrado proceso
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'borrar';
    $POST['id_proceso'] = $infoProceso['id_proceso'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>