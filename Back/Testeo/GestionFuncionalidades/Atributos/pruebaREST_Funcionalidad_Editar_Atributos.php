<?php

function pruebaREST_Funcionalidad_Editar_Atributos(){

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
    $POST['action'] = 'editar';
    $POST['id_funcionalidad'] = '';
    $POST['nombre_funcionalidad'] = 'funcionalidad';
    $POST['descripcion_funcionalidad'] = 'Edicion de funcionalidad por parte del test';

    $prueba = 'ID de funcionalidad vacío';
    $codeEsperado = 'ID_FUNCIONALIDAD_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ID_FUNCIONALIDAD_ERROR_FORMATO
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'editar';
    $POST['id_funcionalidad'] = '/&%$';
    
    $prueba = 'Id de funcionalidad presenta un formato incorrecto';
    $codeEsperado = 'ID_FUNCIONALIDAD_ERROR_FORMATO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_DESCRIPCION_VACIO
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'editar';
    $POST['id_funcionalidad'] = '1';
    $POST['nombre_funcionalidad'] = 'funcionalidadTestDos';
    $POST['descripcion_funcionalidad'] = '';
    

    $prueba = 'Descripción de funcionalidad vacía';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
    
    //FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3
    $POST['descripcion_funcionalidad'] = 'Ed';

    $prueba = 'Descripción de funcionalidad menor que 3';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200
    $POST['descripcion_funcionalidad'] = 'Iiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii';

    $prueba = 'Descripción de funcionalidad mayor de 200';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO
    $POST['descripcion_funcionalidad'] = 'Descrpc#on';

    $prueba = 'Descripción de funcionalidad con carcateres diferentes a números, letras y espacios en la descripcion';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>