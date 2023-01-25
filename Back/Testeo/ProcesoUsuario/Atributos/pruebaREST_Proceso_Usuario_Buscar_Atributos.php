<?php

function pruebaREST_Proceso_Usuario_Buscar_Atributos(){

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
												//ERRORES_ATRIBUTO ID
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

   //ID_CATEGORIA_ERROR_FORMATO
   $POST = $vaciarPost;
   $POST['controlador'] = 'categoria';
   $POST['action'] = 'buscar';
   $POST['id_categoria'] = '/&%$';

   $prueba = 'Id de categoria presenta un formato incorrecto';
   $codeEsperado = 'ID_CATEGORIA_ERROR_FORMATO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO NOMBRE
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //CATEGORIA_NOMBRE_MAYOR_QUE_48
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'buscar';
    $POST['id_categoria'] = '1';
    $POST['nombre_categoria'] = 'namenamename
    namenamenamenamenamenamenamename
    namenamenamenamenamenamenamenamenamename';
    
    $prueba = 'Nombre de la categoria no puede ser mayor que 48 caracteres';
    $codeEsperado = 'CATEGORIA_NOMBRE_MAYOR_QUE_48';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //CATEGORIA_NOMBRE_FORMATO_INCORRECTO
   $POST = $vaciarPost;
   $POST['controlador'] = 'categoria';
   $POST['action'] = 'buscar';
   $POST['id_categoria'] = '1';
   $POST['nombre_categoria'] = 'nombre&';

   $prueba = 'Nombre de la categoria presenta un formato incorrecto, solo letras o números';
   $codeEsperado = 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //CATEGORIA_DESCRIPCION_MAYOR_QUE_200
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'buscar';
    $POST['id_categoria'] = '1';
    $POST['nombre_categoria'] = 'nombre';
    $POST['descripcion_categoria'] = 'descripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria
    descripcioncategoriadescripcioncategoriadescripcioncategoriadescripcioncategoria';
    
    $prueba = 'Descripción de la categoria no puede tener una descripción mayor a 200 caracteres';
    $codeEsperado = 'CATEGORIA_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'buscar';
    $POST['id_categoria'] = '1';
    $POST['nombre_categoria'] = 'nombre';
    $POST['descripcion_categoria'] = 'des&ripcion';

    $prueba = 'Descripción de la categoria presenta un formato incorrecto, solo letras o números';
    $codeEsperado = 'CATEGORIA_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>