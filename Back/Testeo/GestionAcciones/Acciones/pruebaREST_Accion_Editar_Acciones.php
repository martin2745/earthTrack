<?php

function pruebaREST_Accion_Editar_Acciones(){

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

	//insertar accion
	$POST = $vaciarPost;
	$POST['controlador'] = 'accion';
	$POST['action'] = 'insertar';
	$POST['nombre_accion'] = 'accionTest';
	$POST['descripcion_accion'] = 'Nueva insercion de accion por parte del test';

	$pruebas->peticionCurlNoTest($POST);

	//Buscar accion
	$POST = $vaciarPost;
	$POST['controlador'] = 'accion';
	$POST['action'] = 'buscar';
	$POST['nombre_accion'] = 'accionTest';

	$id = $pruebas->peticionCurlNoTestRespuesta($POST);
	$infoAccion = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//EDITAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//ACCION_EDITAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'accion';
	$POST['action'] = 'editar';
    $POST['id_accion'] = $infoAccion['id_accion'];
	$POST['nombre_accion'] = 'accionTestDos';
	$POST['descripcion_accion'] = 'Edicion de un accion';

	$prueba = 'Editar accion';
	$codeEsperado = 'ACCION_EDITAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    
    //borrado accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = $infoAccion['id_accion'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    //ACCION_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'editar';
    $POST['id_accion'] = $infoAccion['id_accion'];
    $POST['nombre_accion'] = 'accionTest';
    $POST['descripcion_accion'] = 'Edicion de una accion';

    $prueba = 'Editar una accion que no existe';
    $codeEsperado = 'ACCION_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
	
    //ACCION_DENEGADA_EDITAR_ACCION
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'editar';
    $POST['id_accion'] = '1';
    $POST['nombre_accion'] = 'accionDos';
    $POST['descripcion_accion'] = 'Edicion de accion por parte del test';

    $prueba = 'Solo el usuario administrador puede editar los datos de un accion';
    $codeEsperado = 'ACCION_DENEGADA_EDITAR_ACCION';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>