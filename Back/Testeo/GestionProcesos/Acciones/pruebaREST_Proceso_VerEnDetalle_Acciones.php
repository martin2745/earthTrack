<?php

function pruebaREST_Proceso_VerEnDetalle_Acciones(){

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

    //RECORDSET_DATOS
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'verEnDetalle';
    $POST['id_proceso'] = 5;

    $prueba = 'Ver en detalle una proceso';
    $codeEsperado = 'RECORDSET_DATOS';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //RECORDSET_VACIO
    $POST['id_proceso'] = 999999;

    $prueba = 'Ver en detalle una proceso que no existe en el sistema';
    $codeEsperado = 'RECORDSET_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>