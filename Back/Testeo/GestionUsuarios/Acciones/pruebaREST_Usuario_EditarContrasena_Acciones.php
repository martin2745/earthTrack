<?php

function pruebaREST_Usuario_EditarContrasena_Acciones(){

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

	//insertar usuario
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'insertar';
	$POST['usuario'] = 'usuarioTest2';
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc3';
	$POST['id_rol'] = '4';
	$POST['dni'] = '34971500T';
	$POST['nombre'] = 'Martin';
	$POST['apellidos'] = 'Gil Blanco';
	$POST['fechaNacimiento'] = '2021-12-06';
	$POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
	$POST['telefono'] = '696696696';
	$POST['email'] = 'usuarioRegistro@gmail.com';

    $pruebas->peticionCurlNoTest($POST);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//MODIFICAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest2';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

	//USUARIO_EDITAR_CONTRASENA_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'editarContrasena';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc4';

	$prueba = 'Contraseña editada con éxito.';
	$codeEsperado = 'USUARIO_EDITAR_CONTRASENA_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc4';

	$pruebas->peticionLogin($POST); 

	//USUARIO_EDITAR_CONTRASENA_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'editarContrasena';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionCurlNoTest($POST);

//------------------------------------------------BORRADO--------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

	//eliminar usuario
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