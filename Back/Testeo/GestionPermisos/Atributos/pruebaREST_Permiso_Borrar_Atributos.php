<?php 

function pruebaREST_Permiso_Borrar_Atributos(){


	include_once './Testeo/pruebaREST_class.php';
	
	$pruebas = new testRest();
	
//---------------------------------------------------------------------------------------------------------------------

	$tipo = 'Accion';
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
												//Borrar
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//ID_ROL_VACIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'permiso';
	$POST['action'] = 'borrar';
	$POST['id_rol'] = '';
	$POST['id_accion'] = 999999;
	$POST['id_funcionalidad'] = 999999;

	$prueba = 'Id del rol del permiso que se intenta borrar está vacío';
	$codeEsperado = 'ID_ROL_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_ROL_ERROR_FORMATO
	$POST['id_rol'] = 'yt';

	$prueba = 'Id del rol del permiso que se intenta borrar tiene un formato incorrecto';
	$codeEsperado = 'ID_ROL_ERROR_FORMATO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_ACCION_VACIO
	$POST['id_rol'] = 999999;
	$POST['id_accion'] = '';

	$prueba = 'Id de la acción del permiso que se intenta borrar está vacío';
	$codeEsperado = 'ID_ACCION_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_ACCION_ERROR_FORMATO
	$POST['id_accion'] = 'yt';

	$prueba = 'Id de la acción del permiso que se intenta borrar tiene un formato incorrecto';
	$codeEsperado = 'ID_ACCION_ERROR_FORMATO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_FUNCIONALIDAD_VACIO
	$POST['id_accion'] = 999999;
	$POST['id_funcionalidad'] = '';

	$prueba = 'Id de la funcionalidad del permiso que se intenta borrar está vacío';
	$codeEsperado = 'ID_FUNCIONALIDAD_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_FUNCIONALIDAD_ERROR_FORMATO
	$POST['id_funcionalidad'] = 'yt';

	$prueba = 'Id de la funcionalidad del permiso que se intenta borrar tiene un formato incorrecto';
	$codeEsperado = 'ID_FUNCIONALIDAD_ERROR_FORMATO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>