<?php

function pruebaREST_Proceso_Editar_Atributos(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();

    $tipo = 'Atributo';
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
												//ERRORES_ATRIBUTO ID
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

   //PROCESO_ID_ERROR_FORMATO
   $POST = $vaciarPost;
   $POST['controlador'] = 'proceso';
   $POST['action'] = 'editar';
   $POST['id_proceso'] = 'D53&';

   $prueba = 'Id de proceso presenta un formato no numérico';
   $codeEsperado = 'PROCESO_ID_NO_NUMERICO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_ID_VACIO
    $POST['id_proceso'] = '';
 
    $prueba = 'Id de proceso vacio';
    $codeEsperado = 'PROCESO_ID_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

    //---------------------------------------------------------------------------------------------------------------------

    //PROCESO_ID_MAYOR_QUE_11
    $POST['id_proceso'] = '19999999999999999999999999999999999999999';
 
    $prueba = 'Id de proceso con tamaño superior a 12';
    $codeEsperado = 'PROCESO_ID_MAYOR_QUE_12';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
  
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO NAME
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

   //PROCESO_NOMBRE_VACIO
   $POST = $vaciarPost;
   $POST['controlador'] = 'proceso';
   $POST['action'] = 'editar';
   $POST['id_proceso'] = '3';
   $POST['nombre_proceso'] = '';
   $POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
   $POST['id_categoria'] = '1';
   $POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';
   

   $prueba = 'Nombre de proceso vacío';
   $codeEsperado = 'PROCESO_NOMBRE_VACIO';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //PROCESO_NOMBRE_MENOR_QUE_3
   $POST['nombre_proceso'] = 'ro';

   $prueba = 'Nombre de proceso con nombre menor que 3';
   $codeEsperado = 'PROCESO_NOMBRE_MENOR_QUE_3';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

   //PROCESO_NOMBRE_MAYOR_QUE_48
   $POST['nombre_proceso'] = 'procesoTesttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt';

   $prueba = 'Nombre de proceso con nombre mayor que 48';
   $codeEsperado = 'PROCESO_NOMBRE_MAYOR_QUE_48';
   $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO DESCRIPCION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_DESCRIPCION_VACIO
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'editar';
    $POST['id_proceso'] = '3';
    $POST['nombre_proceso'] = 'procesoTestDos';
    $POST['descripcion_proceso'] = '';
    $POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';
    

    $prueba = 'Descripción de proceso vacío';
    $codeEsperado = 'PROCESO_DESCRIPCION_VACIA';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_DESCRIPCION_MAYOR_QUE_254
    $POST['descripcion_proceso'] = 'Iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii';

    $prueba = 'Descripción de proceso mayor de 254';
    $codeEsperado = 'PROCESO_DESCRIPCION_MAYOR_QUE_254';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO FORMULA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_PROCESO_FORMULA_VACIA
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'editar';
    $POST['id_proceso'] = '3';
    $POST['nombre_proceso'] = 'procesoTestDos';
    $POST['descripcion_proceso'] = 'Nueva insercion de proceso por parte del test';
    $POST['id_categoria'] = '1';
    $POST['formula'] = '';
    

    $prueba = 'Fórmula de proceso vacío';
    $codeEsperado = 'PROCESO_FORMULA_VACIA';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_PROCESO_FORMULA_MAYOR_QUE_254
    $POST['formula'] = 'Iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii';

    $prueba = 'Fórmula de proceso mayor de 200';
    $codeEsperado = 'PROCESO_FORMULA_MAYOR_QUE_254';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PARAMETRO_PROCESO_FORMULA_SOBRA_LLAVE_ABRIENDO
    $POST['formula'] = '( 4.567 * {Temp(F)} ) * {{CantidadViajesAlAnho}';

    $prueba = 'Formula de proceso con llave abriendo de sobra';
    $codeEsperado = 'PROCESO_FORMULA_SOBRA_LLAVE_ABRIENDO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PARAMETRO_PROCESO_FORMULA_SOBRA_LLAVE_CERRANDO
    $POST['formula'] = '( 4.567 * {Temp(F)}} ) * {CantidadViajesAlAnho}';

    $prueba = 'Formula de proceso con llave cerrando de sobra';
    $codeEsperado = 'PROCESO_FORMULA_SOBRA_LLAVE_CERRANDO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_FORMULA_SOBRA_PARENTESIS_CERRANDO //Dentro del parámetro hay caracteres no válidos
    $POST['formula'] = '( 4.567 * {Temp(F))} ) * {CantidadViajesAlAnho}';

    $prueba = 'Formula de proceso con paréntesis cerrando de sobra';
    $codeEsperado = 'PROCESO_FORMULA_SOBRA_PARENTESIS_CERRANDO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_FORMULA_SOBRA_PARENTESIS_ABRIENDO //La unidad del parámetro contiene caracteres reservados a los operadores
    $POST['formula'] = '( 4.567 * {Temp((F)} ) * {CantidadViajesAlAnho}';

    $prueba = 'Formula de proceso con paréntesis abriendo de sobra';
    $codeEsperado = 'PROCESO_FORMULA_SOBRA_PARENTESIS_ABRIENDO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO ID_CATEGORIA
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //PROCESO_ID-CATEGORIA_VACIO
    $POST = $vaciarPost;
    $POST['controlador'] = 'proceso';
    $POST['action'] = 'editar';
    $POST['id_proceso'] = '3';
    $POST['nombre_proceso'] = 'procesoTestDos';
    $POST['descripcion_proceso'] = 'Esta es una drescripción de ejemplo';
    $POST['formula'] = '( 4.567 * {Temp(F)} ) * {CantidadViajesAlAnho}';
    $POST['id_categoria'] = '';

    

    $prueba = 'Id de categoria de proceso vacío';
    $codeEsperado = 'PROCESO_ID_CATEGORIA_VACIO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //PROCESO_ID-CATEGORIA_MAYOR_QUE_12
    $POST['id_categoria'] = '999999999999999999999
    9999999999999999999999999999999999999999999999';

    $prueba = 'Id de categoria de proceso mayor de 12';
    $codeEsperado = 'PROCESO_ID_CATEGORIA_MAYOR_QUE_12';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>