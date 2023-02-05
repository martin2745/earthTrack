<?php

    class categoriaAtributos{
        function insertar(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_Insertar_Atributos.php';
            $rest = pruebaREST_Categoria_Insertar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_INSERTAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_INSERTAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function borrar(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_Borrar_Atributos.php';
            $rest = pruebaREST_Categoria_Borrar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_BORRAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_BORRAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function buscar(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_Buscar_Atributos.php';
            $rest = pruebaREST_Categoria_Buscar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_BUSCAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_BUSCAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function editar(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_Editar_Atributos.php';
            $rest = pruebaREST_Categoria_Editar_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_EDITAR_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_EDITAR_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function verEnDetalle(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_VerEnDetalle_Atributos.php';
            $rest = pruebaREST_Categoria_VerEnDetalle_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_VERENDETALLE_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_VERENDETALLE_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }

        function devolverPadre(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_DevolverPadre_Atributos.php';
            $rest = pruebaREST_Categoria_DevolverPadre_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_DEVOLVER_PADRE_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_DEVOLVER_PADRE_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }
        
        function devolverHijos(){
            include_once './Testeo/GestionCategorias/Atributos/pruebaREST_Categoria_DevolverHijos_Atributos.php';
            $rest = pruebaREST_Categoria_DevolverHijos_Atributos();
            $respuesta['datos'] = $rest;
            if(calcularCodeExito($respuesta['datos'])){
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_DEVOLVER_HIJOS_ATRIBUTOS_EXITO';
            }
            else{
                $respuesta['code'] = 'PETICION_TEST_CATEGORIA_DEVOLVER_HIJOS_ATRIBUTOS_FRACASO';
            }
            devolverRespuestaTest($respuesta);
        }
    }
?>