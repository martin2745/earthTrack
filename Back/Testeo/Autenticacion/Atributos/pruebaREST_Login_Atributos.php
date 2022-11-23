<?php

function pruebaREST_Login_Atributos(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();


	$atributo = 'Atributo';
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
												//ERRORES_ATRIBUTO LOGIN
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//LOGIN_USUARIO_VACIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = '';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';
	
	$prueba = 'El login de usuario es vacio.';
	$codeEsperado = 'LOGIN_USUARIO_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_MENOR_QUE_3
	$POST['usuario'] = 'ad';

	$prueba = 'El tamaño del nombre de usuario no puede ser menor que 3.';
	$codeEsperado = 'LOGIN_USUARIO_MENOR_QUE_3';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_MAYOR_QUE_15
	$POST['usuario'] = 'adminadminadmina';

	$prueba = 'El tamaño del nombre de usuario no puede ser mayor que 15.';
	$codeEsperado = 'LOGIN_USUARIO_MAYOR_QUE_15';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['usuario'] = 'admin#';

	$prueba = 'El nombre de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO CONTRASEÑA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//CONTRASEÑA_USUARIO_VACIA
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '';

	$prueba = 'La contraseña no puede ser vacia.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_VACIA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);
//---------------------------------------------------------------------------------------------------------------------

	//CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc33';

	$prueba = 'Seguridad de la password comprometida. Longitud de password incorrecta.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['contrasena'] = '21232f297a57a5a7-3894a0e4a801fc3';

	$prueba = 'La contraseña de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>