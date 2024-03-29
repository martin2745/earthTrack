<?php

function pruebaREST_Usuario_EditarContrasena_Atributos(){

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
											//ERRORES_ATRIBUTO contraseña
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//CONTRASEÑA_USUARIO_VACIA
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'editarContrasena';
	$POST['contrasena'] = '';

	$prueba = 'La contraseña no puede ser vacia.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_VACIA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA 
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc33';

	$prueba = 'Seguridad de la password comprometida. Longitud de password incorrecta.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['contrasena'] = '21232f297a57a5a&f3894a0e4a801fc3';

	$prueba = 'La contraseña de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>