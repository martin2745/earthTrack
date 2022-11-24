<?php

include_once './Servicios/ServiceBase.php';
class usuario_SERVICE extends ServiceBase{

	function inicializarRest(){
		$this->listaAtributosIGUAL = array();

		switch(action){
			case 'insertar':
				$this->listaAtributos = array('usuario', 'contrasena', 'dni', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'telefono', 'email');
				break;
			case 'editar':
				$this->listaAtributos = array('usuario', 'id_rol', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'telefono', 'email');
				break;
			case 'editarContrasena':
				$this->listaAtributos = array('usuario', 'contrasena');
				break;
			case 'borrar':
				$this->listaAtributos = array('usuario', 'borrado_logico');
				break;
			case 'reactivar':
				$this->listaAtributos = array('usuario', 'borrado_logico');
				break;
			case 'buscar':
				$this->listaAtributos = array('usuario', 'contrasena', 'id_rol', 'dni', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'telefono', 'email', 'borrado_logico');
				$this->listaAtributosIGUAL = array('id_rol'); //Si establezco que quiero buscar los id_rol = 1 no quiero que vengan usuarios con id_rol = 10...
				break;
			case 'verEnDetalle':
				$this->listaAtributos = array('usuario');
				$this->listaAtributosIGUAL = array('usuario');
				break;
		}

		$this->modelo = $this->crearModelOne('usuario');
		$this->clase_validacion = $this->crearValidationOne('usuario');

			$this->clase_validacion->modelo = $this->modelo;

	}

	function editarContrasena($mensaje){
		$this->modelo->arrayDatoValor['usuario'] = usuarioSistema;
		try{	
			$this->modelo->EDIT();
		}catch(falloQuery $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(falloBD $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}catch(Exception $ex){
			$this->rellenarExcepcion($ex->getMessage());
		}
		
		$this->feedback['ok'] = true;
		$this->feedback['code'] = $mensaje;
		$this->feedback['resource'] = $this->tokenNuevo();	
		return $this->feedback;
	}

	function tokenNuevo(){
			include_once "./JWT/token.php";

			$usuarioDatos = [
				'contrasena' => $this->modelo->arrayDatoValor['contrasena'],
				'usuario' => usuarioSistema,
				'rol' => rolUsuarioSistema
			];

			try{
				$token = MiToken::creaToken($usuarioDatos);
			}catch(excepcionToken $ex){
				$this->rellenarExcepcion($ex->getMessage());
			}catch(Exception $ex){
				$this->rellenarExcepcion($ex->getMessage());
			}

		return $token;
	}

}
?>