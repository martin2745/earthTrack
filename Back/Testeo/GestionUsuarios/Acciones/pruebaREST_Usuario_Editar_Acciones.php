<?php

function pruebaREST_Usuario_Editar_Acciones(){

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

	//USUARIO_EDITAR_OK
	$POST['action'] = 'editar';
	$POST['telefono'] = '696696699';

	$prueba = 'Usuario editado con éxito.';
	$codeEsperado = 'USUARIO_EDITAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//USUARIO_NO_EXISTE
	$POST['usuario'] = 'noExiste';

	$prueba = 'El usuario no existe en el sistema';
	$codeEsperado = 'USUARIO_NO_EXISTE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//USUARIO_ROL_NO_VALIDO
	$POST['usuario'] = 'usuarioTest2';
	$POST['id_rol'] = '1';

	$prueba = 'No se puede editar el rol del usuario a ser un administrador.';
	$codeEsperado = 'USUARIO_ROL_NO_VALIDO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//EMAIL_USUARIO_YA_EXISTE
	$POST['usuario'] = 'usuarioTest2';
	$POST['id_rol'] = '4';
	$POST['email'] = 'responsable@responsable.com';

	$prueba = 'Ya existe un usuario con ese email.';
	$codeEsperado = 'EMAIL_USUARIO_YA_EXISTE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 

	//ACCION_DENEGADA_EDITAR_USUARIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'editar';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc3';
	$POST['id_rol'] = '4';
	$POST['dni'] = '34971500T';
	$POST['nombre'] = 'Martin';
	$POST['apellidos'] = 'Gil Blanco';
	$POST['fechaNacimiento'] = '2021-12-06';
	$POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
	$POST['telefono'] = '696696696';
	$POST['email'] = 'correoAdmin@gmail.com';

	$prueba = 'Solo el administrador puede editar los datos de un usuario y un usuario los suyos propios.';
	$codeEsperado = 'ACCION_DENEGADA_EDITAR_USUARIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

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