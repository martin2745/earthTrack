<?php

function pruebaREST_Usuario_Reactivar_Acciones(){

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
												//REACTIVAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//USUARIO_REACTIVAR_OK
	/**
	 * Mientras no existan dependencias no se puede validar este caso. 
	 */

//-------------------------------------------------------------------------------------------------------------------

	//USUARIO_NO_EXISTE
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'reactivar';
	$POST['usuario'] = 'usuarioTest2';

	$prueba = 'El usuario no existe en el sistema.';
	$codeEsperado = 'USUARIO_NO_EXISTE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//USUARIO_YA_ACTIVO
	$POST['usuario'] = 'usuarioTest';

	$prueba = 'No se puede reactivar un usuario ya activo.';
	$codeEsperado = 'USUARIO_YA_ACTIVO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

	//ACCION_DENEGADA_REACTIVAR_USUARIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'reactivar';
	$POST['usuario'] = 'usuarioDelete';

	$prueba = 'Solo el administrador puede reactivar el usuario.';
	$codeEsperado = 'ACCION_DENEGADA_REACTIVAR_USUARIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>