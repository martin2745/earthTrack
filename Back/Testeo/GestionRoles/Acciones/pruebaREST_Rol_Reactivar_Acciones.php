<?php

function pruebaREST_Rol_Reactivar_Acciones(){

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
	
	//borrar rol
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'borrar';
	$POST['id_rol'] = 6;

	$pruebas->peticionCurlNoTest($POST);

	//ROL_REACTIVAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'reactivar';
	$POST['id_rol'] = 6;

	$prueba = 'Reactivar rol';
	$codeEsperado = 'ROL_REACTIVAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//ROL_NO_EXISTE
	$POST['id_rol'] = 999999;

	$prueba = 'Reactivar rol que no existe';
	$codeEsperado = 'ROL_NO_EXISTE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//ROL_YA_ACTIVO
	$POST['id_rol'] = 5;

	$prueba = 'Reactivar rol ya activo';
	$codeEsperado = 'ROL_YA_ACTIVO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//borrar rol
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'borrar';
	$POST['id_rol'] = 6;

	$pruebas->peticionCurlNoTest($POST);

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

	//ACCION_DENEGADA_REACTIVAR_ROL
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'reactivar';
	$POST['id_rol'] = 6;

	$prueba = 'Solo un administrador puede reactivar un rol.';
	$codeEsperado = 'ACCION_DENEGADA_REACTIVAR_ROL';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

	//ROL_REACTIVAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'reactivar';
	$POST['id_rol'] = 6;
	
	$pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>