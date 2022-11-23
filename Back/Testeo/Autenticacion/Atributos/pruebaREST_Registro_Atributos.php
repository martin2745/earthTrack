<?php

function pruebaREST_Registro_Atributos(){

	include_once './Testeo/pruebaREST_class.php';

	$pruebas = new testRest();


	$atributo = 'Atributo';
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

	//registrar LOGIN_USUARIO_VACIO
	$POST = $vaciarPost;
	$POST['controlador'] = 'auth';
	$POST['action'] = 'registrar';
	$POST['usuario'] = '';
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc3';
	$POST['dni'] = '34971500T';
	$POST['nombre'] = 'Martin';
	$POST['apellidos'] = 'Gil Blanco';
	$POST['fechaNacimiento'] = '2021-12-06';
	$POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
	$POST['telefono'] = '696696696';
	$POST['email'] = 'usuario1Registro@gmail.com';

	$prueba = 'El login de usuario es vacio.';
	$codeEsperado = 'LOGIN_USUARIO_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
	//registrar LOGIN_USUARIO_MENOR_QUE_3
	$POST['usuario'] = 'us';
	
	$prueba = 'El tamaño del nombre de usuario no puede ser menor que 3.';
	$codeEsperado = 'LOGIN_USUARIO_MENOR_QUE_3';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
	//registrar LOGIN_USUARIO_MAYOR_QUE_15
	$POST['usuario'] = 'usuario1usuario1';

	$prueba = 'El tamaño del nombre de usuario no puede ser mayor que 15.';
	$codeEsperado = 'LOGIN_USUARIO_MAYOR_QUE_15';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
	//registrar LOGIN_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['usuario'] = 'usu$arioTest';

	$prueba = 'El nombre de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO contraseña
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar CONTRASEÑA_USUARIO_VACIA
	$POST['usuario'] = 'usuario1';
	$POST['contrasena'] = '';
	
	$prueba = 'La contraseña no puede ser vacia.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_VACIA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//registrar CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA 
	$POST['contrasena'] = '21232f297a57a5a7f3894a0e4a801fc33';
	
	$prueba = 'Seguridad de la password comprometida. Longitud de password incorrecta.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_LONGITUD_INCORRECTA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	//registrar CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO
	$POST['contrasena'] = '21232f297a57a5a&f3894a0e4a801fc3';
	
	$prueba = 'La contraseña de usuario no puede contener más que letras y números, no se aceptan caracteres en blanco, ñ, acentos o carcateres especiales.';
	$codeEsperado = 'CONTRASEÑA_USUARIO_ALFANUMERICO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO dni
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar DNI_VACIO
	$POST['contrasena'] = '21232f297a57a5a743894a0e4a801fc3';
	$POST['dni'] = '';

	$prueba = 'El DNI es vacio.';
	$codeEsperado = 'DNI_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar DNI_MENOR_QUE_9
	$POST['dni'] = '3497150T';

	$prueba = 'El DNI no puede tener menos de 9 caracteres.';
	$codeEsperado = 'DNI_MENOR_QUE_9';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar DNI_MAYOR_QUE_9
	$POST['dni'] = '349715000T';

	$prueba = 'El DNI no puede tener mayor de 9 caracteres.';
	$codeEsperado = 'DNI_MAYOR_QUE_9';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar DNI_FORMATO_INCORRECTO
	$POST['dni'] = '34971K00T';

	$prueba = 'El formato del DNI es incorrecto, deben ser 8 números y una letra.';
	$codeEsperado = 'DNI_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar DNI_LETRA_INCORRECTA
	$POST['dni'] = '34971500K';

	$prueba = 'La letra introducida en el DNI no es la correcta.';
	$codeEsperado = 'DNI_LETRA_INCORRECTA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO nombre
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar NOMBRE_VACIO
	$POST['dni'] = '34971500T';
	$POST['nombre'] = '';

	$prueba = 'El nombre no puede ser vacio.';
	$codeEsperado = 'NOMBRE_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar NOMBRE_FORMATO_INCORRECTO
	$POST['nombre'] = 'M@rtin';

	$prueba = 'El nombre del usuario no puede contener más que letras.';
	$codeEsperado = 'NOMBRE_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar NOMBRE_MENOR_QUE_3
	$POST['nombre'] = 'Ma';

	$prueba = 'El nombre del usuario no puede se menor que 3.';
	$codeEsperado = 'NOMBRE_MENOR_QUE_3';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar NOMBRE_MAYOR_QUE_45
	$POST['nombre'] = 'Maaaaaaaaaaaaa
	aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
	aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaartin';

	$prueba = 'El nombre del usuario no puede ser mayor que 45.';
	$codeEsperado = 'NOMBRE_MAYOR_QUE_45';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO apellidos
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar APELLIDOS_VACIO
	$POST['nombre'] = 'Martin';
	$POST['apellidos'] = '';

	$prueba = 'Los apellidos no pueden ser vacios.';
	$codeEsperado = 'APELLIDOS_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar APELLIDOS_FORMATO_INCORRECTO
	$POST['apellidos'] = 'G|l Bl@nco';

	$prueba = 'Los apellidos del usuario no pueden contener más que letras.';
	$codeEsperado = 'APELLIDOS_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar APELLIDOS_MENOR_QUE_3
	$POST['apellidos'] = 'Gi';
	
	$prueba = 'Los apellidos del usuario no pueden se menores que 3.';
	$codeEsperado = 'APELLIDOS_MENOR_QUE_3';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar APELLIDOS_MAYOR_QUE_45
	$POST['apellidos'] = 'Giiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiil Blanco';

	$prueba = 'Los apellidos del usuario no pueden ser mayores que 45.';
	$codeEsperado = 'APELLIDOS_MAYOR_QUE_45';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO fecha
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar FECHA_NACIMIENTO_VACIA
	$POST['apellidos'] = 'Gil Blanco';
	$POST['fechaNacimiento'] = '';

	$prueba = 'La fecha no puede ser vacia.';
	$codeEsperado = 'FECHA_NACIMIENTO_VACIA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar FECHA_NACIMIENTO_FORMATO_INCORRECTO
	$POST['fechaNacimiento'] = '12-2021-06';

	$prueba = 'El formato de la fecha no es correcto: aaaa-mm-dd.';
	$codeEsperado = 'FECHA_NACIMIENTO_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES
	$POST['fechaNacimiento'] = '2021-1$-06';

	$prueba = 'La fecha solo puede contener números y -.';
	$codeEsperado = 'FECHA_NACIMIENTO_SOLO_NUMEROS_Y_GUIONES';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar FECHA_NACIMIENTO_MENOR_QUE_10
	$POST['fechaNacimiento'] = '2021-12-6';

	$prueba = 'La fecha de nacimiento no puede ser menor que 10 dígitos.';
	$codeEsperado = 'FECHA_NACIMIENTO_MENOR_QUE_10';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar FECHA_NACIMIENTO_MAYOR_QUE_10
	$POST['fechaNacimiento'] = '202121212121-12-06';
	
	$prueba = 'La fecha de nacimiento no puede ser mayor que 10 dígitos.';
	$codeEsperado = 'FECHA_NACIMIENTO_MAYOR_QUE_10';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar FECHA_NACIMIENTO_IMPOSIBLE
	$POST['fechaNacimiento'] = '3000-12-06';

	$prueba = 'La fecha de nacimiento no puede ser mayor a la fecha actual.';
	$codeEsperado = 'FECHA_NACIMIENTO_IMPOSIBLE';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO direccion
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//DIRECCION_VACIA
	$POST['fechaNacimiento'] = '2021-12-06';
	$POST['direccion'] = '';

	$prueba = 'La longitud de la direccion no debe ser vacia.';
	$codeEsperado = 'DIRECCION_VACIA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//DIRECCION_FORMATO_INCORRECTO
	$POST['direccion'] = '#########';

	$prueba = 'La direccion solo debe contener letras, números º y ª.';
	$codeEsperado = 'DIRECCION_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//DIRECCION_MENOR_5
	$POST['direccion'] = 'salv';

	$prueba = 'La longitud de la direccion no debe ser manor de 5 caracteres.';
	$codeEsperado = 'DIRECCION_MENOR_5';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//DIRECCION_MAYOR_200
	$POST['direccion'] = 'salvadorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
										rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr';

	$prueba = 'La longitud de la direccion no debe ser mayor de 200 caracteres.';
	$codeEsperado = 'DIRECCION_MAYOR_200';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO telefono
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar TELEFONO_VACIO
	$POST['direccion'] = 'salvador Dalí portal 10º piso 6º A ';
	$POST['telefono'] = '';

	$prueba = 'El número de teléfono no puede ser vacio.';
	$codeEsperado = 'TELEFONO_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar TELEFONO_FORMATO_INCORRECTO
	$POST['telefono'] = '669|48687';

	$prueba = 'El formato del teléfono no es el correcto, deben ser 9 números.';
	$codeEsperado = 'TELEFONO_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------
	
	//registrar TELEFONO_MENOR_QUE_9
	$POST['telefono'] = '66934868';

	$prueba = 'El tamaño del número de teléfono no puede ser menor que 9.';
	$codeEsperado = 'TELEFONO_MENOR_QUE_9';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar TELEFONO_MAYOR_QUE_9
	$POST['telefono'] = '6693486877';

	$prueba = 'El tamaño del número de teléfono no puede ser mayor que 9.';
	$codeEsperado = 'TELEFONO_MAYOR_QUE_9';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
												//ERRORES_ATRIBUTO email
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//registrar EMAIL_VACIO
	$POST['telefono'] = '696696696';
	$POST['email'] = '';

	$prueba = 'El email no puede ser vacío.';
	$codeEsperado = 'EMAIL_VACIO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------


	//registrar EMAIL_LONGITUD_MINIMA
	$POST['email'] = 'u';

	$prueba = 'El email debe tener por lo menos 6 caracteres.';
	$codeEsperado = 'EMAIL_LONGITUD_MINIMA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar EMAIL_LONGITUD_MAXIMA
	$POST['email'] = 'usuario1Registroooo
	ooooooooooooooooooooooooooooooooooooooooooooo
	ooooooooo@gmail.com';

	$prueba = 'El email debe tener menos de 40 caracteres.';
	$codeEsperado = 'EMAIL_LONGITUD_MAXIMA';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//registrar EMAIL_FORMATO_INCORRECTO
	$POST['email'] = 'usuario1Registro#gmail.com';

	$prueba = 'El formato del email no es correcto.';
	$codeEsperado = 'EMAIL_FORMATO_INCORRECTO';
	$pruebas->hacerPrueba($POST, $POST['controlador'], $POST['action'], $atributo, $prueba, $codeEsperado);
	
//---------------------------------------------------------------------------------------------------------------------

	$pruebas->desconectarCurl($pruebas->cliente);

	return $pruebas->resultadoTest;

}

?>