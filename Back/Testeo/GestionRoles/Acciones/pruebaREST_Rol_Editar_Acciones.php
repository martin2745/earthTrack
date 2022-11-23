<?php

function pruebaREST_Rol_Editar_Acciones(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();

    $tipo = 'Acción';
	$vaciarPost = NULL;

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

//---------------------------------------------------------------------------------------------------------------------

	//insertar rol
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'insertar';
	$POST['nombre_rol'] = 'rolTest';
	$POST['descripcion_rol'] = 'Nueva insercion de rol por parte del test';

	$pruebas->peticionCurlNoTest($POST);

	//Buscar rol
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'buscar';
	$POST['nombre_rol'] = 'rolTest';

	$id = $pruebas->peticionCurlNoTestRespuesta($POST);
	$infoRol = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//EDITAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//ROL_EDITAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'editar';
    $POST['id_rol'] = $infoRol['id_rol'];
	$POST['nombre_rol'] = 'rolTestDos';
	$POST['descripcion_rol'] = 'Edicion de un rol';

	$prueba = 'Editar rol';
	$codeEsperado = 'ROL_EDITAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    
    //borrado rol
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = $infoRol['id_rol'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    //ROL_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'editar';
    $POST['id_rol'] = $infoRol['id_rol'];
    $POST['nombre_rol'] = 'rolTest';
    $POST['descripcion_rol'] = 'Edicion de un rol';

    $prueba = 'Editar un rol que no existe';
    $codeEsperado = 'ROL_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
	
    //ACCION_DENEGADA_EDITAR_ROL
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'editar';
    $POST['id_rol'] = '1';
    $POST['nombre_rol'] = 'rol';
    $POST['descripcion_rol'] = 'Edicion de rol por parte del test';

    $prueba = 'Solo el usuario administrador puede editar los datos de un rol';
    $codeEsperado = 'ACCION_DENEGADA_EDITAR_ROL';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>