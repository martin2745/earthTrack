<?php 

function pruebaREST_ObtenerContrasenaCorreo_Atributos(){


	include_once './Testeo/pruebaREST_class.php';
	
	$pruebas = new testRest();
	
//---------------------------------------------------------------------------------------------------------------------

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
	$POST['action'] = 'obtenerContrasenaCorreo';
	$POST['usuario'] = '';
	$POST['email'] = 'gilblancomartin@gmail.com';

	$prueba = 'El login de usuario es vacio.';
	$codeEsperado = 'LOGIN_USUARIO_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_MENOR_QUE_3
	$POST['usuario'] = 'us';

	$prueba = 'El tamaño del nombre de usuario no puede ser menor que 3.';
	$codeEsperado = 'LOGIN_USUARIO_MENOR_QUE_3';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_MAYOR_QUE_15
	$POST['usuario'] = 'usuarioRecuperacionCorreo';

	$prueba = 'El tamaño del nombre de usuario no puede ser mayor que 15.';
	$codeEsperado = 'LOGIN_USUARIO_MAYOR_QUE_15';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['usuario'] = 'usuario€ecupe';

	$prueba = 'El nombre de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO email
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar EMAIL_VACIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'obtenerContrasenaCorreo';
	$POST['usuario'] = 'usuarioCorreo';
	$POST['email'] = '';

	$prueba = 'El email no puede ser vacío.';
	$codeEsperado = 'EMAIL_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar EMAIL_LONGITUD_MINIMA
	
	$POST['email'] = 'gilbl';

	$prueba = 'El email debe tener por lo menos 6 caracteres.';
	$codeEsperado = 'EMAIL_LONGITUD_MINIMA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar EMAIL_LONGITUD_MAXIMA
	$POST['email'] = 'gilblancomartinooooooooooooooooooooooooooooooooooooooooooooooooooooooo@gmail.com';

	$prueba = 'El email debe tener menos de 40 caracteres.';
	$codeEsperado = 'EMAIL_LONGITUD_MAXIMA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar EMAIL_FORMATO_INCORRECTO
	$POST['email'] = 'gilblancomartin#gmail.com';

	$prueba = 'El formato del email no es correcto.';
	$codeEsperado = 'EMAIL_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}
?>
