<?php

function pruebaREST_Funcionalidad_Buscar_Atributos(){

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

   //ID_FUNCIONALIDAD_ERROR_FORMATO
   $POST = $vaciarPost;
   $POST['controlador'] = 'funcionalidad';
   $POST['action'] = 'buscar';
   $POST['id_funcionalidad'] = '/&%$';

   $prueba = 'Id de funcionalidad presenta un formato incorrecto';
   $codeEsperado = 'ID_FUNCIONALIDAD_ERROR_FORMATO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO NOMBRE
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'buscar';
    $POST['id_funcionalidad'] = '1';
    $POST['nombre_funcionalidad'] = 'namenamename
    namenamenamenamenamenamenamename
    namenamenamenamenamenamenamenamenamename';
    
    $prueba = 'Nombre de la funcionalidad no puede ser mayor que 48 caracteres';
    $codeEsperado = 'FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO
   $POST = $vaciarPost;
   $POST['controlador'] = 'funcionalidad';
   $POST['action'] = 'buscar';
   $POST['id_funcionalidad'] = '1';
   $POST['nombre_funcionalidad'] = 'nombre&';

   $prueba = 'Nombre de la funcionalidad presenta un formato incorrecto, solo letras o números';
   $codeEsperado = 'FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'buscar';
    $POST['id_funcionalidad'] = '1';
    $POST['nombre_funcionalidad'] = 'nombre';
    $POST['descripcion_funcionalidad'] = 'descripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad
    descripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidaddescripcionfuncionalidad';
    
    $prueba = 'Descripción de la funcionalidad no puede tener una descripción mayor a 200 caracteres';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'buscar';
    $POST['id_funcionalidad'] = '1';
    $POST['nombre_funcionalidad'] = 'nombre';
    $POST['descripcion_funcionalidad'] = 'des&ripcion';

    $prueba = 'Descripción de l funcionalidad presenta un formato incorrecto, solo letras o números';
    $codeEsperado = 'FUNCIONALIDAD_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>