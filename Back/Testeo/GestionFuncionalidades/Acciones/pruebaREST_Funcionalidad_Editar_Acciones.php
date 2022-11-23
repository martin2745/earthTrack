<?php

function pruebaREST_Funcionalidad_Editar_Acciones(){

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

	//insertar funcionalidad
	$POST = $vaciarPost;
	$POST['controlador'] = 'funcionalidad';
	$POST['action'] = 'insertar';
	$POST['nombre_funcionalidad'] = 'funcionalidadTest';
	$POST['descripcion_funcionalidad'] = 'Nueva insercion de funcionalidad por parte del test';

	$pruebas->peticionCurlNoTest($POST);

	//Buscar funcionalidad
	$POST = $vaciarPost;
	$POST['controlador'] = 'funcionalidad';
	$POST['action'] = 'buscar';
	$POST['nombre_funcionalidad'] = 'funcionalidadTest';

	$id = $pruebas->peticionCurlNoTestRespuesta($POST);
	$infoFuncionalidad = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//EDITAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//FUNCIONALIDAD_EDITAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'funcionalidad';
	$POST['action'] = 'editar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];
	$POST['nombre_funcionalidad'] = 'funcionalidadTestDos';
	$POST['descripcion_funcionalidad'] = 'Edicion de un funcionalidad';

	$prueba = 'Editar funcionalidad';
	$codeEsperado = 'FUNCIONALIDAD_EDITAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    
    //borrado funcionalidad
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'editar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];
    $POST['nombre_funcionalidad'] = 'funcionalidadTest';
    $POST['descripcion_funcionalidad'] = 'Edicion de una funcionalidad';

    $prueba = 'Editar una funcionalidad que no existe';
    $codeEsperado = 'FUNCIONALIDAD_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
	
    //ACCION_DENEGADA_EDITAR_FUNCIONALIDAD
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'editar';
    $POST['id_funcionalidad'] = '1';
    $POST['nombre_funcionalidad'] = 'funcionalidadDos';
    $POST['descripcion_funcionalidad'] = 'Edicion de funcionalidad por parte del test';

    $prueba = 'Solo el usuario administrador puede editar los datos de un funcionalidad';
    $codeEsperado = 'ACCION_DENEGADA_EDITAR_FUNCIONALIDAD';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>