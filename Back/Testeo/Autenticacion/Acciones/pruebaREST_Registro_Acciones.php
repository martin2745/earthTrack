<?php

function pruebaREST_Registro_Acciones(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();

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
												//REGISTRAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'registrar';
	$POST['usuario'] = 'usuarioTest2';
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc3';
	$POST['dni'] = '34971500T';
	$POST['nombre'] = 'Martin';
	$POST['apellidos'] = 'Gil Blanco';
	$POST['fechaNacimiento'] = '2021-12-06';
	$POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
	$POST['telefono'] = '696696696';
	$POST['email'] = 'usuarioRegistro@gmail.com';

	$prueba = 'Usuario registrado correctamente.';
	$codeEsperado = 'REGISTRAR_USUARIO_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//USUARIO_YA_EXISTE
	$POST['usuario'] = 'usuarioDelete';

	$prueba = 'Ya existe el usuario en el sistema.';
	$codeEsperado = 'USUARIO_YA_EXISTE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//EMAIL_YA_EXISTE
	$POST['usuario'] = 'nuevoUsuario';
	$POST['email'] = 'responsable@responsable.com';

	$prueba = 'Ya existe un usuario con ese email.';
	$codeEsperado = 'EMAIL_YA_EXISTE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $accion, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//borrado usuario
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'borrar';
	$POST['usuario'] = 'usuarioTest2';

	$pruebas->peticionCurlNoTest($POST);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>