<?php

function pruebaREST_Categoria_Insertar_Acciones(){

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

	//CATEGORIA_INSERTAR_OK
	$POST = $vaciarPost;
	$POST['controlador'] = 'categoria';
	$POST['action'] = 'insertar';
	$POST['nombre_categoria'] = 'categoriaTest';
	$POST['descripcion_categoria'] = 'Nueva insercion de categoria por parte del test';

	$prueba = 'Insertar categoria';
	$codeEsperado = 'CATEGORIA_INSERTAR_OK';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_categoria
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //CATEGORIA_YA_EXISTE
    $prueba = 'categoria para insertar ya existente';
    $codeEsperado = 'CATEGORIA_YA_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //Buscar categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'buscar';
    $POST['nombre_categoria'] = 'categoriaTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoCategoria = (array)$id['resource'][0];
    
//---------------------------------------------------------------------------------------------------------------------

    //borrado categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST); 
   
    //CATEGORIADENEGADA_INSERTAR_CATEGORIA
	$POST = $vaciarPost;
	$POST['controlador'] = 'categoria';
	$POST['action'] = 'insertar';
	$POST['nombre_categoria'] = 'categoriaTest';
	$POST['descripcion_categoria'] = 'Nueva insercion de categoria por parte del test';
	$POST['id_padre'] = '0';

	$prueba = 'Solo un usuario administrador puede insertar una categoria.';
	$codeEsperado = 'CATEGORIA_DENEGADA_INSERTAR_CATEGORIA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>