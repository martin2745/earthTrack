<?php

function pruebaREST_Proceso_Buscar_Atributos(){

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

   //ID_PROCESO_ERROR_FORMATO
   $POST = $vaciarPost;
   $POST['controlador'] = 'proceso';
   $POST['action'] = 'buscar';
   $POST['id_proceso'] = '/&%$';

   $prueba = 'Id de proceso presenta un formato incorrecto';
   $codeEsperado = 'ID_PROCESO_ERROR_FORMATO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO NOMBRE
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_NOMBRE_MAYOR_QUE_48
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['id_proceso'] = '1';
    $POST['nombre_proceso'] = 'namenamename
    namenamenamenamenamenamenamename
    namenamenamenamenamenamenamenamenamename';
    
    $prueba = 'Nombre de la proceso no puede ser mayor que 48 caracteres';
    $codeEsperado = 'PROCESO_NOMBRE_MAYOR_QUE_48';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //PROCESO_NOMBRE_FORMATO_INCORRECTO
   $POST = $vaciarPost;
   $POST['controlador'] = 'proceso';
   $POST['action'] = 'buscar';
   $POST['id_proceso'] = '1';
   $POST['nombre_proceso'] = 'nombre&';

   $prueba = 'Nombre de la proceso presenta un formato incorrecto, solo letras o números';
   $codeEsperado = 'PROCESO_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_DESCRIPCION_MAYOR_QUE_200
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['id_proceso'] = '1';
    $POST['nombre_proceso'] = 'nombre';
    $POST['descripcion_proceso'] = 'descripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso
    descripcionprocesodescripcionprocesodescripcionprocesodescripcionproceso';
    
    $prueba = 'Descripción de la proceso no puede tener una descripción mayor a 200 caracteres';
    $codeEsperado = 'PROCESO_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_DESCRIPCION_FORMATO_INCORRECTO
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'buscar';
    $POST['id_proceso'] = '1';
    $POST['nombre_proceso'] = 'nombre';
    $POST['descripcion_proceso'] = 'des&ripcion';

    $prueba = 'Descripción de la proceso presenta un formato incorrecto, solo letras o números';
    $codeEsperado = 'PROCESO_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>