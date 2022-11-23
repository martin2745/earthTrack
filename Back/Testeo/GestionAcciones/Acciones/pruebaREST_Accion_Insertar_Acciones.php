<?php

function pruebaREST_Accion_Insertar_Acciones(){

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

	//ACCION_INSERTAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'accion';
	$POST['action'] = 'insertar';
	$POST['nombre_accion'] = 'accionTest';
	$POST['descripcion_accion'] = 'Nueva insercion de accion por parte del test';

	$prueba = 'Insertar accion';
	$codeEsperado = 'ACCION_INSERTAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ACCION_YA_EXISTE
    $prueba = 'accion para insertar ya existente';
    $codeEsperado = 'ACCION_YA_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //Buscar accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'buscar';
    $POST['nombre_accion'] = 'accionTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoAccion = (array)$id['resource'][0];
    
//---------------------------------------------------------------------------------------------------------------------

    //borrado accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = $infoAccion['id_accion'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 
   
    //ACCION_DENEGADA_INSERTAR_ACCION
	$POST = $vaciarPost;
	$POST['controlador'] = 'accion';
	$POST['action'] = 'insertar';
	$POST['nombre_accion'] = 'accionTest';
	$POST['descripcion_accion'] = 'Nueva insercion de accion por parte del test';

	$prueba = 'Solo un usuario administrador puede insertar una accion.';
	$codeEsperado = 'ACCION_DENEGADA_INSERTAR_ACCION';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>