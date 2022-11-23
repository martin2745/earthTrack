<?php

function pruebaREST_Accion_Buscar_Atributos(){

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

   //ID_ACCION_ERROR_FORMATO
   $POST = $vaciarPost;
   $POST['controlador'] = 'accion';
   $POST['action'] = 'buscar';
   $POST['id_accion'] = '/&%$';

   $prueba = 'Id de accion presenta un formato incorrecto';
   $codeEsperado = 'ID_ACCION_ERROR_FORMATO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO NOMBRE
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ACCION_NOMBRE_MAYOR_QUE_48
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'buscar';
    $POST['id_accion'] = '1';
    $POST['nombre_accion'] = 'namenamename
    namenamenamenamenamenamenamename
    namenamenamenamenamenamenamenamenamename';
    
    $prueba = 'Nombre de la accion no puede ser mayor que 48 caracteres';
    $codeEsperado = 'ACCION_NOMBRE_MAYOR_QUE_48';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //ACCION_NOMBRE_FORMATO_INCORRECTO
   $POST = $vaciarPost;
   $POST['controlador'] = 'accion';
   $POST['action'] = 'buscar';
   $POST['id_accion'] = '1';
   $POST['nombre_accion'] = 'nombre&';

   $prueba = 'Nombre de la accion presenta un formato incorrecto, solo letras o números';
   $codeEsperado = 'ACCION_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ACCION_DESCRIPCION_MAYOR_QUE_200
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'buscar';
    $POST['id_accion'] = '1';
    $POST['nombre_accion'] = 'nombre';
    $POST['descripcion_accion'] = 'descripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion
    descripcionacciondescripcionacciondescripcionacciondescripcionaccion';
    
    $prueba = 'Descripción de la accion no puede tener una descripción mayor a 200 caracteres';
    $codeEsperado = 'ACCION_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ACCION_DESCRIPCION_FORMATO_INCORRECTO
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'buscar';
    $POST['id_accion'] = '1';
    $POST['nombre_accion'] = 'nombre';
    $POST['descripcion_accion'] = 'des&ripcion';

    $prueba = 'Descripción de la accion presenta un formato incorrecto, solo letras o números';
    $codeEsperado = 'ACCION_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>