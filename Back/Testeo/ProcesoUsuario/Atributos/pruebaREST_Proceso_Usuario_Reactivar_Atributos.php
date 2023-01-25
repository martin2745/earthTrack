<?php

function pruebaREST_Proceso_Usuario_Reactivar_Atributos(){

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
												//ERRORES_ATRIBUTO ID_CATEGORIA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

   //ID_CATEGORIA_VACIO
   $POST = $vaciarPost;
   $POST['controlador'] = 'categoria';
   $POST['action'] = 'verEnDetalle';
   $POST['id_categoria'] = '';

   $prueba = 'Id de categoria vacío';
   $codeEsperado = 'ID_CATEGORIA_VACIO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_CATEGORIA_ERROR_FORMATO
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'verEnDetalle';
    $POST['id_categoria'] = '1$';
    
    $prueba = 'Id de categoria presenta un formato incorrecto';
    $codeEsperado = 'ID_CATEGORIA_ERROR_FORMATO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>