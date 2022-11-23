<?php 

function pruebaREST_Permiso_Buscar_Atributos(){


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
												//Buscar
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_NOMBRE_VACIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'permiso';
	$POST['action'] = 'buscar';
	$POST['nombre_funcionalidad'] = '';

	$prueba = 'El nombre de la funcionadad de la que se quieren ver los permisos no puede ser vacío.';
	$codeEsperado = 'FUNCIONALIDAD_NOMBRE_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
   
    //FUNCIONALIDAD_NOMBRE_MENOR_QUE_3
	$POST['nombre_funcionalidad'] = 'us';

	$prueba = 'El nombre de la funcionadad de la que se quieren ver los permisos no puede ser menor de tres caracteres.';
	$codeEsperado = 'FUNCIONALIDAD_NOMBRE_MENOR_QUE_3';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48
	$POST['nombre_funcionalidad'] = 'usuariousuariousuariousuariousuariousuario
	usuariousuariousuariousuariousuariousuariousuariousuariousuariousuariousuario';

	$prueba = 'El nombre de la funcionadad de la que se quieren ver los permisos no puede ser mayor de cuarenta y ocho caracteres.';
	$codeEsperado = 'FUNCIONALIDAD_NOMBRE_MAYOR_QUE_48';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO
	$POST['nombre_funcionalidad'] = 'usua"·$rio';

	$prueba = 'El nombre de la funcionadad de la que se quieren ver los permisos tiene un formato incorrecto.';
	$codeEsperado = 'FUNCIONALIDAD_NOMBRE_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
	$pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>