<?php

function pruebaREST_Usuario_Buscar_Atributos(){

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
												//ERRORES_ATRIBUTO usuario
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//LOGIN_USUARIO_MAYOR_QUE_15
	$POST = $vaciarPost;
	$POST['controlador'] = 'usuario';
	$POST['action'] = 'buscar';
	$POST['usuario'] = 'usuario1usuario1';
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc3';
	$POST['id_rol'] = '4';
	$POST['dni'] = '34971500T';
	$POST['nombre'] = 'Martin';
	$POST['apellidos'] = 'Gil Blanco';
	$POST['fechaNacimiento'] = '2021-12-06';
	$POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
	$POST['telefono'] = '696696696';
	$POST['email'] = 'usuario1Registro@gmail.com';

	$prueba = 'El tamaño del nombre de usuario no puede ser mayor que 15.';
	$codeEsperado = 'LOGIN_USUARIO_MAYOR_QUE_15';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//LOGIN_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['usuario'] = 'usu$arioTest';

	$prueba = 'El nombre de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO id_rol
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	
	//ID_ROL_ERROR_FORMATO
	$POST['usuario'] = 'usuario';
	$POST['id_rol'] = '4·$%';

	$prueba = 'El rol presenta un formato incorrecto, solo se admiten números.';
	$codeEsperado = 'ID_ROL_ERROR_FORMATO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO dni
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //DNI_MAYOR_QUE_9
	$POST['id_rol'] = '4';
	$POST['dni'] = '349715004T';

    $prueba = 'El DNI no puede tener mayor de 9 caracteres.';
    $codeEsperado = 'DNI_MAYOR_QUE_9';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO nombre
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //NOMBRE_FORMATO_INCORRECTO
	$POST['dni'] = '34971500T';
	$POST['nombre'] = 'Martin"·$';

    $prueba = 'El nombre del usuario no puede contener más que letras.';
    $codeEsperado = 'NOMBRE_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //NOMBRE_MAYOR_QUE_45
    $POST['nombre'] = 'Jose manuelllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll';

    $prueba = 'El nombre del usuario no puede ser mayor que 45.';
    $codeEsperado = 'NOMBRE_MAYOR_QUE_45';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO apellidos
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //APELLIDOS_FORMATO_INCORRECTO
	$POST['nombre'] = 'Martin';
    $POST['apellidos'] = 'g$l';

    $prueba = 'Los apellidos del usuario no pueden contener más que letras.';
    $codeEsperado = 'APELLIDOS_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //APELLIDOS_MAYOR_QUE_45
    $POST['apellidos'] = 'giiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiil';

    $prueba = 'Los apellidos del usuario no pueden ser mayores que 45.';
    $codeEsperado = 'APELLIDOS_MAYOR_QUE_45';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO fechaNacimiento
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //FECHA_NACIMIENTO_FORMATO_INCORRECTO
    $POST['apellidos'] = 'gil';
    $POST['fechaNacimiento'] = '12-2021-06';

    $prueba = 'El formato de la fecha no es correcto: aaaa-mm-dd.';
    $codeEsperado = 'FECHA_NACIMIENTO_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES
    $POST['fechaNacimiento'] = '2021-1$-06';

    $prueba = 'La fecha solo puede contener números y -.';
    $codeEsperado = 'FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FECHA_NACIMIENTO_MENOR_QUE_10
    $POST['fechaNacimiento'] = '2021-12-6';

    $prueba = 'La fecha de nacimiento no puede ser menor que 10 dígitos.';
    $codeEsperado = 'FECHA_NACIMIENTO_MENOR_QUE_10';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //FECHA_NACIMIENTO_MAYOR_QUE_10
    $POST['fechaNacimiento'] = '202121212121-12-06';

    $prueba = 'La fecha de nacimiento no puede ser mayor que 10 dígitos.';
    $codeEsperado = 'FECHA_NACIMIENTO_MAYOR_QUE_10';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO direccion
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //DIRECCION_FORMATO_INCORRECTO
	$POST['fechaNacimiento'] = '2021-12-06';
    $POST['direccion'] = 'salv@dor';

    $prueba = 'La direccion solo debe contener letras, números º y ª.';
    $codeEsperado = 'DIRECCION_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //DIRECCION_MAYOR_200
    $POST['direccion'] = 'aaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

    $prueba = 'La longitud de la direccion no debe ser mayor de 200 caracteres.';
    $codeEsperado = 'DIRECCION_MAYOR_200';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO telefono
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //TELEFONO_FORMATO_INCORRECTO
    $POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
    $POST['telefono'] = '65445@654';

    $prueba = 'El formato del teléfono no es el correcto, deben ser 9 números.';
    $codeEsperado = 'TELEFONO_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);
    
//---------------------------------------------------------------------------------------------------------------------

    //TELEFONO_MAYOR_QUE_9
    $POST['telefono'] = '6544566544';

    $prueba = 'El tamaño del número de teléfono no puede ser mayor que 9.';
    $codeEsperado = 'TELEFONO_MAYOR_QUE_9';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO email
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //EMAIL_LONGITUD_MAXIMA
    $POST['telefono'] = '654456654';
    $POST['email'] = 'usuario@hotmail.
    commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    mmmmmmmmmmmmmmmmmmmmmmmmmm';

    $prueba = 'El email debe tener menos de 40 caracteres.';
    $codeEsperado = 'EMAIL_LONGITUD_MAXIMA';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    //EMAIL_FORMATO_INCORRECTO
    $POST['email'] = 'usuarioTest#gmail.com';

    $prueba = 'El formato del email no es correcto.';
    $codeEsperado = 'EMAIL_FORMATO_INCORRECTO';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
                                                //ERRORES_ATRIBUTO borrado_logico
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //BORRADO_LOGICO_DIFERENTE_0_1
    $POST['email'] = 'usuario@hotmail.com';
    $POST['borrado_logico'] = '2';

    $prueba = 'El flag de borrado debe ser 0 o 1.';
    $codeEsperado = 'BORRADO_LOGICO_DIFERENTE_0_1';
    $pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

    $pruebas->desconectarCurl($pruebas->cliente);

    return $pruebas->resultadoTest;

}
?>