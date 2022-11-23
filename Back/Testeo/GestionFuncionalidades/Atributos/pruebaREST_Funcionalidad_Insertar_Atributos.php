<?php

function pruebaREST_Funcionalidad_Insertar_Atributos(){

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
												//ERRORES_ATRIBUTO NAME
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

   //FUNCIONALIDAD_NOMBRE_VACIO
   $POST = $vaciarPost;
   $POST['controlador'] = 'funcionalidad';
   $POST['action'] = 'insertar';
   $POST['nombre_funcionalidad'] = '';
   $POST['descripcion_funcionalidad'] = 'Nueva insercion de funcionalidad por parte del test';
   

   $prueba = 'Nombre de funcionalidad vacío';
   $codeEsperado = 'FUNCIONALIDAD_NOMBRE_VACIO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //FUNCIONALIDAD_NOMBRE_MENOR_QUE_3
   $POST['nombre_funcionalidad'] = 'ro';

   $prueba = 'Nombre de funcionalidad con nombre menor que 3';
   $codeEsperado = 'FUNCIONALIDAD_NOMBRE_MENOR_QUE_3';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48
   $POST['nombre_funcionalidad'] = 'funcionalidadTesttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt';

   $prueba = 'Nombre de funcionalidad con nombre mayor que 48';
   $codeEsperado = 'FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO
   $POST['nombre_funcionalidad'] = 'funcionalidad&est';

   $prueba = 'Nombre de funcionalidad que contenga caracteres diferentes a números, letras y espacios';
   $codeEsperado = 'FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_DESCRIPCION_VACIO
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'insertar';
    $POST['nombre_funcionalidad'] = 'funcionalidadTestDos';
    $POST['descripcion_funcionalidad'] = '';
    

    $prueba = 'Descripción de funcionalidad vacío';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
    
    //FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3
    $POST['descripcion_funcionalidad'] = 'In';

    $prueba = 'Descripción de funcionalidad menor que 3';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_MENOR_QUE_3';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200
    $POST['descripcion_funcionalidad'] = 'Iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
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