<?php

    class funcionalidadAtributos{
        function insertar(){
            include_once './Testeo/GestionFuncionalidades/Atributos/pruebaREST_Funcionalidad_Insertar_Atributos.php';
            $rest = pruebaREST_Funcionalidad_Insertar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_INSERTAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_INSERTAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function borrar(){
            include_once './Testeo/GestionFuncionalidades/Atributos/pruebaREST_Funcionalidad_Borrar_Atributos.php';
            $rest = pruebaREST_Funcionalidad_Borrar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BORRAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BORRAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function buscar(){
            include_once './Testeo/GestionFuncionalidades/Atributos/pruebaREST_Funcionalidad_Buscar_Atributos.php';
            $rest = pruebaREST_Funcionalidad_Buscar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BUSCAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_BUSCAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function editar(){
            include_once './Testeo/GestionFuncionalidades/Atributos/pruebaREST_Funcionalidad_Editar_Atributos.php';
            $rest = pruebaREST_Funcionalidad_Editar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_EDITAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_EDITAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function verEnDetalle(){
            include_once './Testeo/GestionFuncionalidades/Atributos/pruebaREST_Funcionalidad_VerEnDetalle_Atributos.php';
            $rest = pruebaREST_Funcionalidad_VerEnDetalle_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_VERENDETALLE_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_FUNCIONALIDAD_VERENDETALLE_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }
    }
?>