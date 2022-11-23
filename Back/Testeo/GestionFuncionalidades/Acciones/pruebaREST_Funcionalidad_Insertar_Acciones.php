<?php

function pruebaREST_Funcionalidad_Insertar_Acciones(){

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
												//INSERTAR
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//FUNCIONALIDAD_INSERTAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'funcionalidad';
	$POST['action'] = 'insertar';
	$POST['nombre_funcionalidad'] = 'funcionalidadTest';
	$POST['descripcion_funcionalidad'] = 'Nueva insercion de funcionalidad por parte del test';

	$prueba = 'Insertar funcionalidad';
	$codeEsperado = 'FUNCIONALIDAD_INSERTAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_YA_EXISTE
    $prueba = 'funcionalidad para insertar ya existente';
    $codeEsperado = 'FUNCIONALIDAD_YA_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //Buscar funcionalidad
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'buscar';
    $POST['nombre_funcionalidad'] = 'funcionalidadTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoFuncionalidad = (array)$id['resource'][0];
    
//---------------------------------------------------------------------------------------------------------------------

    //borrado funcionalidad
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 
   
    //ACCION_DENEGADA_INSERTAR_FUNCIONALIDAD
	$POST = $vaciarPost;
	$POST['controlador'] = 'funcionalidad';
	$POST['action'] = 'insertar';
	$POST['nombre_funcionalidad'] = 'funcionalidadTest';
	$POST['descripcion_funcionalidad'] = 'Nueva insercion de funcionalidad por parte del test';

	$prueba = 'Solo un usuario administrador puede insertar una funcionalidad.';
	$codeEsperado = 'ACCION_DENEGADA_INSERTAR_FUNCIONALIDAD';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>