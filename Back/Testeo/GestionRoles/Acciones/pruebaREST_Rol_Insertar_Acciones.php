<?php

function pruebaREST_Rol_Insertar_Acciones(){

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

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//INSERTAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//ROL_INSERTAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'insertar';
	$POST['nombre_rol'] = 'rolTest';
	$POST['descripcion_rol'] = 'Nueva insercion de rol por parte del test';

	$prueba = 'Insertar rol';
	$codeEsperado = 'ROL_INSERTAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ROL_YA_EXISTE
    $prueba = 'Rol para insertar ya existente';
    $codeEsperado = 'ROL_YA_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //Buscar rol
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'buscar';
    $POST['nombre_rol'] = 'rolTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoRol = (array)$id['resource'][0];
    
//---------------------------------------------------------------------------------------------------------------------

    //borrado rol
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = $infoRol['id_rol'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 
   
    //ACCION_DENEGADA_INSERTAR_ROL
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'insertar';
	$POST['nombre_rol'] = 'rolTest';
	$POST['descripcion_rol'] = 'Nueva insercion de rol por parte del test';

	$prueba = 'Solo un usuario administrador puede insertar un rol.';
	$codeEsperado = 'ACCION_DENEGADA_INSERTAR_ROL';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>