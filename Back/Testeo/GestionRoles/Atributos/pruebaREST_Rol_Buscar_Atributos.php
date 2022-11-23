<?php

function pruebaREST_Rol_Buscar_Atributos(){

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

   //ID_ROL_ERROR_FORMATO
   $POST = $vaciarPost;
   $POST['controlador'] = 'rol';
   $POST['action'] = 'buscar';
   $POST['id_rol'] = '/&%$';

   $prueba = 'Id de rol presenta un formato incorrecto';
   $codeEsperado = 'ID_ROL_ERROR_FORMATO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO NOMBRE
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ROL_NOMBRE_MAYOR_QUE_48
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'buscar';
    $POST['id_rol'] = '1';
    $POST['nombre_rol'] = 'namenamename
    namenamenamenamenamenamenamename
    namenamenamenamenamenamenamenamenamename';
    
    $prueba = 'Nombre del rol no puede ser mayor que 48 caracteres';
    $codeEsperado = 'ROL_NOMBRE_MAYOR_QUE_48';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //ROL_NOMBRE_FORMATO_INCORRECTO
   $POST = $vaciarPost;
   $POST['controlador'] = 'rol';
   $POST['action'] = 'buscar';
   $POST['id_rol'] = '1';
   $POST['nombre_rol'] = 'nombre&';

   $prueba = 'Nombre del rol presenta un formato incorrecto, solo letras o números';
   $codeEsperado = 'ROL_NOMBRE_FORMATO_INCORRECTO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ROL_DESCRIPCION_MAYOR_QUE_200
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'buscar';
    $POST['id_rol'] = '1';
    $POST['nombre_rol'] = 'nombre';
    $POST['descripcion_rol'] = 'descripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol
    descripcionRoldescripcionRoldescripcionRoldescripcionRol';
    
    $prueba = 'Descripción del rol no puede tener una descripción mayor a 200 caracteres';
    $codeEsperado = 'ROL_DESCRIPCION_MAYOR_QUE_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ROL_DESCRIPCION_FORMATO_INCORRECTO
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'buscar';
    $POST['id_rol'] = '1';
    $POST['nombre_rol'] = 'nombre';
    $POST['descripcion_rol'] = 'des&ripcion';

    $prueba = 'Descripción del rol presenta un formato incorrecto, solo letras o números';
    $codeEsperado = 'ROL_DESCRIPCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO BORRADO_LOGICO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //BORRADO_LOGICO_DIFERENTE_0_1
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'buscar';
    $POST['id_rol'] = '1';
    $POST['nombre_rol'] = 'nombre';
    $POST['descripcion_rol'] = 'descripcion';
    $POST['borrado_logico'] = '2';

    $prueba = 'Borrado lógico solo puede ser 0 o 1';
    $codeEsperado = 'BORRADO_LOGICO_DIFERENTE_0_1';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>