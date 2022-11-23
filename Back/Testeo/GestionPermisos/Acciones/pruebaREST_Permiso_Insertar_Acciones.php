<?php 

function pruebaREST_Permiso_Insertar_Acciones(){


	include_once './Testeo/pruebaREST_class.php';
	
	$pruebas = new testRest();
	
//---------------------------------------------------------------------------------------------------------------------

	$tipo = 'Accion';
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

	//insertar RAF
	$POST = $vaciarPost;
	$POST['controlador'] = 'permiso';
	$POST['action'] = 'insertar';
	$POST['id_rol'] = 4;
	$POST['id_accion'] = 1;
	$POST['id_funcionalidad'] = 1;

	$prueba = 'Insercion de un nuevo permiso';
	$codeEsperado = 'PERMISO_INSERTAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PERMISO_YA_EXISTE
    $POST = $vaciarPost;
	$POST['controlador'] = 'permiso';
	$POST['action'] = 'insertar';
	$POST['id_rol'] = 4;
	$POST['id_accion'] = 1;
	$POST['id_funcionalidad'] = 1;

	$prueba = 'El permiso que se intenta insertar ya existe';
    $codeEsperado = 'PERMISO_YA_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//borrado funcionalidad
	$POST = $vaciarPost;
	$POST['controlador'] = 'permiso';
	$POST['action'] = 'borrar';
	$POST['id_rol'] = 4;
	$POST['id_accion'] = 1;
	$POST['id_funcionalidad'] = 1;

	$pruebas->peticionCurlNoTest($POST);
	
//---------------------------------------------------------------------------------------------------------------------
	
	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 
	
	//ACCION_DENEGADA_INSERTAR_PERMISO
	$POST = $vaciarPost;
	$POST['controlador'] = 'permiso';
	$POST['action'] = 'insertar';
	$POST['id_rol'] = 4;
	$POST['id_accion'] = 1;
	$POST['id_funcionalidad'] = 1;

	$prueba = 'Solo el administrador puede insertar un nuevo permiso';
    $codeEsperado = 'ACCION_DENEGADA_INSERTAR_PERMISO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>