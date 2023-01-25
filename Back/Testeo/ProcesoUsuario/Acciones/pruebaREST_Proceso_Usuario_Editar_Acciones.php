<?php

function pruebaREST_Proceso_Usuario_Editar_Acciones(){

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
	$POST['usuario'] = 'admin';
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
												//ERRORES_CATEGORIA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    
    //borrado categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    //CATEGORIA_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'editar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];
    $POST['nombre_categoria'] = 'categoriaTest';
    $POST['descripcion_categoria'] = 'Edicion de una categoria';
	$POST['responsabe'] = 'admin';

    $prueba = 'Editar una categoria que no existe';
    $codeEsperado = 'CATEGORIA_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
	
    //CATEGORIA_DENEGADA_EDITAR_CATEGORIA
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'editar';
    $POST['id_categoria'] = '1';
    $POST['nombre_categoria'] = 'categoriaDos';
    $POST['descripcion_categoria'] = 'Edicion de categoria por parte del test';
	$POST['responsabe'] = 'admin';

    $prueba = 'Solo el usuario administrador puede editar los datos de un categoria';
    $codeEsperado = 'CATEGORIA_DENEGADA_EDITAR_CATEGORIA';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>