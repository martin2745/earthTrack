<?php 

function pruebaREST_ObtenerContrasenaCorreo_Acciones(){


	include_once './Testeo/pruebaREST_class.php';
	
	$pruebas = new testRest();
	
//---------------------------------------------------------------------------------------------------------------------

	$accion = 'Accion';
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
												//CORREO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//RECUPERAR_CONTRASENA_EMAIL_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'obtenerContrasenaCorreo';
	$POST['usuario'] = 'usuarioCorreo';
	$POST['email'] = 'usuarioCorreo@gmail.com';

	$prueba = 'La contraseña ha sido cambiada, revise su correo.';
	$codeEsperado = 'RECUPERAR_CONTRASENA_EMAIL_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //USUARIO_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'auth';
    $POST['action'] = 'obtenerContrasenaCorreo';
    $POST['usuario'] = 'usuarioCorreo2';
    $POST['email'] = 'usuarioCorreo@gmail.com';

    $prueba = 'El usuario no existe en el sistema.';
    $codeEsperado = 'USUARIO_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //EMAIL_NO_EXISTE
    $POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'obtenerContrasenaCorreo';
	$POST['usuario'] = 'usuarioCorreo';
    $POST['email'] = 'responsable@responsable.es';

    $prueba = 'El correo electrónico no existe.';
    $codeEsperado = 'EMAIL_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //USUARIO_EMAIL_NO_COINCIDEN
    $POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'obtenerContrasenaCorreo';
	$POST['usuario'] = 'usuarioCorreo';
    $POST['email'] = 'responsable@responsable.com';

    $prueba = 'El usuario y el correo electrónico no coinciden.';
    $codeEsperado = 'USUARIO_EMAIL_NO_COINCIDEN';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>
