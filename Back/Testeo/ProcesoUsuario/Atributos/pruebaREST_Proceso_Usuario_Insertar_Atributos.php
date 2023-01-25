<?php

function pruebaREST_Proceso_Usuario_Insertar_Atributos(){

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

   //CATEGORIA_NOMBRE_VACIO
   $POST = $vaciarPost;
   $POST['controlador'] = 'categoria';
   $POST['action'] = 'insertar';
   $POST['nombre_categoria'] = '';
   $POST['descripcion_categoria'] = 'Nueva insercion de categoria por parte del test';
   $POST['id_padre'] = '1';
   

   $prueba = 'Nombre de categoria vacío';
   $codeEsperado = 'CATEGORIA_NOMBRE_VACIO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //CATEGORIA_NOMBRE_MENOR_QUE_3
   $POST['nombre_categoria'] = 'ro';

   $prueba = 'Nombre de categoria con nombre menor que 3';
   $codeEsperado = 'CATEGORIA_NOMBRE_MENOR_QUE_3';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //CATEGORIA_NOMBRE_MAYOR_QUE_48
   $POST['nombre_categoria'] = 'categoriaTesttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt';

   $prueba = 'Nombre de categoria con nombre mayor que 48';
   $codeEsperado = 'CATEGORIA_NOMBRE_MAYOR_QUE_48';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //CATEGORIA_NOMBRE_FORMATO_INCORRECTO
   $POST['nombre_categoria'] = 'categoria&est';

   $prueba = 'Nombre de categoria que contenga caracteres diferentes a números, letras y espacios';
   $codeEsperado = 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //CATEGORIA_DESCRIPCION_VACIO
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'insertar';
    $POST['nombre_categoria'] = 'categoriaTestDos';
    $POST['descripcion_categoria'] = '';
    

    $prueba = 'Descripción de categoria vacío';
    $codeEsperado = 'CATEGORIA_DESCRIPCION_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
    
    //CATEGORIA_DESCRIPCION_MENOR_QUE_3
    $POST['descripcion_categoria'] = 'In';

    $prueba = 'Descripción de categoria menor que 3';
    $codeEsperado = 'CATEGORIA_DESCRIPCION_MENOR_QUE_3';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //CATEGORIA_DESCRIPCION_MAYOR_QUE_200
    $POST['descripcion_categoria'] = 'Iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
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

    $prueba = 'Descripción de categoria mayor de 200';
    $codeEsperado = 'CATEGORIA_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO
    $POST['descripcion_categoria'] = 'Descrpc#on';

    $prueba = 'Descripción de categoria con carcateres diferentes a números, letras y espacios en la descripcion';
    $codeEsperado = 'CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>