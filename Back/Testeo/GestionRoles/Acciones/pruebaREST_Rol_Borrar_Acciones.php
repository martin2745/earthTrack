<?php

function pruebaREST_Rol_Borrar_Acciones(){

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

    //insertar rol
	$POST = $vaciarPost;
	$POST['controlador'] = 'rol';
	$POST['action'] = 'insertar';
	$POST['nombre_rol'] = 'rolTest';
	$POST['descripcion_rol'] = 'Nueva insercion de rol por parte del test';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar rol
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'buscar';
    $POST['nombre_rol'] = 'rolTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoRol = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//BORRADO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //borrado rol
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = $infoRol['id_rol'];

    $prueba = 'Borrado';
    $codeEsperado = 'ROL_BORRAR_OK';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                            //ERRORES_ACCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //ROL_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = $infoRol['id_rol'];

    $prueba = 'Id de rol no existe';
    $codeEsperado = 'ROL_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //ROL_ASOCIADO_PERMISO                  
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = 1;

    $prueba = 'No se puede eliminar un rol asociado a un permiso';
    $codeEsperado = 'ROL_ASOCIADO_PERMISO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
    
    //ROL_ASOCIADO_USUARIO_ACTIVO
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = 5;

    $prueba = 'No se puede eliminar un rol asociado a un usuario activo';
    $codeEsperado = 'ROL_ASOCIADO_USUARIO_ACTIVO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
   
//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);

    //ACCION_DENEGADA_BORRAR_ROL
    $POST = $vaciarPost;
    $POST['controlador'] = 'rol';
    $POST['action'] = 'borrar';
    $POST['id_rol'] = 2;

    $prueba = 'Solo el administrador puede eliminar un rol del sistema.';
    $codeEsperado = 'ACCION_DENEGADA_BORRAR_ROL';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>