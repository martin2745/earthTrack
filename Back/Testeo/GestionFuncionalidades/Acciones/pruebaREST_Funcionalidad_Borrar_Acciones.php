<?php

function pruebaREST_Funcionalidad_Borrar_Acciones(){

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
												//BORRADO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //borrado funcionalidad
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];

    $prueba = 'Borrado';
    $codeEsperado = 'FUNCIONALIDAD_BORRAR_OK';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                            //ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FUNCIONALIDAD_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];

    $prueba = 'Id de funcionalidad no existe';
    $codeEsperado = 'FUNCIONALIDAD_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FUNCIONALIDAD_ASOCIADO_PERMISO                  
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = 1;

    $prueba = 'No se puede eliminar una funcionalidad asociado a un permiso';
    $codeEsperado = 'FUNCIONALIDAD_ASOCIADO_PERMISO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

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

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);

    //ACCION_DENEGADA_BORRAR_FUNCIONALIDAD
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];

    $prueba = 'Solo el administrador puede eliminar un funcionalidad del sistema.';
    $codeEsperado = 'ACCION_DENEGADA_BORRAR_FUNCIONALIDAD';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

    //login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
    
    //borrado funcionalidad
    $POST = $vaciarPost;
    $POST['controlador'] = 'funcionalidad';
    $POST['action'] = 'borrar';
    $POST['id_funcionalidad'] = $infoFuncionalidad['id_funcionalidad'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>