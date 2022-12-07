<?php

function pruebaREST_Categoria_Borrar_Acciones(){

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
												//BORRADO
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //borrado categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $prueba = 'Borrado';
    $codeEsperado = 'CATEGORIA_BORRAR_OK';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                            //ERRORES_CATEGORIA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //CATEGORIA_NO_EXISTE
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $prueba = 'Id de categoria no existe';
    $codeEsperado = 'CATEGORIA_NO_EXISTE';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //CATEGORIA_ASOCIADO_PERMISO                  
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = 1;

    $prueba = 'No se puede eliminar una categoria asociado a un permiso';
    $codeEsperado = 'CATEGORIA_ASOCIADO_PERMISO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //insertar categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'insertar';
    $POST['nombre_categoria'] = 'categoriaTest';
    $POST['descripcion_categoria'] = 'Nueva insercion de categoria por parte del test';
    
    $pruebas->peticionCurlNoTest($POST);

    //Buscar categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'buscar';
    $POST['nombre_categoria'] = 'categoriaTest';

    $id = $pruebas->peticionCurlNoTestRespuesta($POST);
    $infoCategoria = (array)$id['resource'][0];

	//login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'usuarioTest';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);

    //CATEGORIA_DENEGADA_BORRAR_CATEGORIA
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $prueba = 'Solo el administrador puede eliminar un categoria del sistema.';
    $codeEsperado = 'CATEGORIA_DENEGADA_BORRAR_CATEGORIA';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

    //login correcto
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'login';
	$POST['usuario'] = 'admin';
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';

	$pruebas->peticionLogin($POST);
    
    //borrado categoria
    $POST = $vaciarPost;
    $POST['controlador'] = 'categoria';
    $POST['action'] = 'borrar';
    $POST['id_categoria'] = $infoCategoria['id_categoria'];

    $pruebas->peticionCurlNoTest($POST);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>