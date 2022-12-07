<?php

function pruebaREST_Categoria_VerEnDetalle_Acciones(){

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

    //insertar categoria
	$POST = $vaciarPost;
	$POST['controlador'] = 'categoria';
	$POST['action'] = 'insertar';
	$POST['nombre_categoria'] = 'categoriaTest';
	$POST['descripcion_categoria'] = 'Nueva insercion de categoria por parte del test';
    $POST['id_padre'] = '1';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'buscar';
    $POST['nombre_categoria'] = 'categoriaTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoCategoria = (array)$id['resource'][0];

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//DEVOLVER HIJOS
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //borrado categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'devolverHijos';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $prueba = 'DevolverHijos';
    $codeEsperado = 'CATEGORIA_BORRAR_OK';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                            //ERRORES_CATEGORIA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    return $pruebas->resultadoTest;

}
?>