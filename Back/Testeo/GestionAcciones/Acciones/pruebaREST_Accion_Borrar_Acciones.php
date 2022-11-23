<?php

function pruebaREST_Accion_Borrar_Acciones(){

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

    //insertar accion
	$POST = $vaciarPost;
	$POST['controlador'] = 'accion';
	$POST['action'] = 'insertar';
	$POST['nombre_accion'] = 'accionTest';
	$POST['descripcion_accion'] = 'Nueva insercion de accion por parte del test';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'buscar';
    $POST['nombre_accion'] = 'accionTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoAccion = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//BORRADO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //borrado accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = $infoAccion['id_accion'];

    $prueba = 'Borrado';
    $codeEsperado = 'ACCION_BORRAR_OK';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                            //ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ACCION_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = $infoAccion['id_accion'];

    $prueba = 'Id de accion no existe';
    $codeEsperado = 'ACCION_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ACCION_ASOCIADO_PERMISO                  
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = 1;

    $prueba = 'No se puede eliminar una accion asociado a un permiso';
    $codeEsperado = 'ACCION_ASOCIADO_PERMISO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //insertar accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'insertar';
    $POST['nombre_accion'] = 'accionTest';
    $POST['descripcion_accion'] = 'Nueva insercion de accion por parte del test';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'buscar';
    $POST['nombre_accion'] = 'accionTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoAccion = (array)$id['resource'][0];

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);

    //ACCION_DENEGADA_BORRAR_ACCION
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = $infoAccion['id_accion'];

    $prueba = 'Solo el administrador puede eliminar un accion del sistema.';
    $codeEsperado = 'ACCION_DENEGADA_BORRAR_ACCION';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

    //login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
    
    //borrado accion
    $POST = $vaciarPost;
    $POST['controlador'] = 'accion';
    $POST['action'] = 'borrar';
    $POST['id_accion'] = $infoAccion['id_accion'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>