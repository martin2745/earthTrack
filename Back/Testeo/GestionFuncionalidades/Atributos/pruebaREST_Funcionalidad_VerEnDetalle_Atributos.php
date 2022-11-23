<?php

function pruebaREST_Funcionalidad_VerEnDetalle_Atributos(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();

    $tipo = 'Atributo';
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
												//ERRORES_ATRIBUTO ID_FUNCIONALIDAD
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

   //ID_FUNCIONALIDAD_VACIO
   $POST = $vaciarPost;
   $POST['controlador'] = 'funcionalidad';
   $POST['action'] = 'verEnDetalle';
   $POST['id_funcionalidad'] = '';

   $prueba = 'Id de funcionalidad vacío';
   $codeEsperado = 'ID_FUNCIONALIDAD_VACIO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_FUNCIONALIDAD_ERROR_FORMATO
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'verEnDetalle';
    $POST['id_funcionalidad'] = '1$';
    
    $prueba = 'Id de funcionalidad presenta un formato incorrecto';
    $codeEsperado = 'ID_FUNCIONALIDAD_ERROR_FORMATO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>