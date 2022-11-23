<?php

    class funcionalidadAcciones{
        function insertar(){
            include_once './Testeo/GestionFuncionalidades/Acciones/pruebaREST_Funcionalidad_Insertar_Acciones.php';
            $rest = pruebaREST_Funcionalidad_Insertar_Acciones();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_INSERTAR_ACCIONES_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_INSERTAR_ACCIONES_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function borrar(){
            include_once './Testeo/GestionFuncionalidades/Acciones/pruebaREST_Funcionalidad_Borrar_Acciones.php';
            $rest = pruebaREST_Funcionalidad_Borrar_Acciones();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST__FUNCIONALIDAD_BORRAR_ACCIONES_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BORRAR_ACCIONES_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function buscar(){
            include_once './Testeo/GestionFuncionalidades/Acciones/pruebaREST_Funcionalidad_Buscar_Acciones.php';
            $rest = pruebaREST_Funcionalidad_Buscar_Acciones();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BUSCAR_ACCIONES_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BUSCAR_ACCIONES_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function editar(){
            include_once './Testeo/GestionFuncionalidades/Acciones/pruebaREST_Funcionalidad_Editar_Acciones.php';
            $rest = pruebaREST_Funcionalidad_Editar_Acciones();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_EDITAR_ACCIONES_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_EDITAR_ACCIONES_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function verEnDetalle(){
            include_once './Testeo/GestionFuncionalidades/Acciones/pruebaREST_Funcionalidad_VerEnDetalle_Acciones.php';
            $rest = pruebaREST_Funcionalidad_VerEnDetalle_Acciones();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_VERENDETALLE_ACCIONES_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_VERENDETALLE_ACCIONES_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }
    }
?>