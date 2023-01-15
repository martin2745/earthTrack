-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-01-2023 a las 11:22:57
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pdp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accion`
--

CREATE TABLE `accion` (
  `id_accion` int(11) NOT NULL,
  `nombre_accion` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descripcion_accion` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `accion`
--

INSERT INTO `accion` (`id_accion`, `nombre_accion`, `descripcion_accion`) VALUES
(1, 'insertar', 'Insertar un elemento en base de datos'),
(2, 'borrar', 'Borrado de un elemento en base de datos'),
(3, 'editar', 'Editar un elemento en base de datos'),
(4, 'buscar', 'Buscar un elemento en base de datos'),
(5, 'reactivar', 'Reactivar un elemento borrado de forma lógica'),
(6, 'verEnDetalle', 'Ver toda la información para una tupla'),
(7, 'listar', 'Listado de las tuplas de una entidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descripcion_categoria` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_padre` int(11) NOT NULL,
  `borrado_logico` int(1) NOT NULL DEFAULT 0,
  `usuario` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `id_padre`, `borrado_logico`, `usuario`) VALUES
(1, 'superCategoria', 'Categoria Base', 0, 0, 'admin'),
(11, 'Viajes', 'Categoria relacionada con viajes', 1, 0, 'martin'),
(24, 'Viajes en coche', 'Viajes en coche', 11, 0, 'brais'),
(25, 'Viajes en avion', 'Viajes en avion', 11, 0, 'user2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionalidad`
--

CREATE TABLE `funcionalidad` (
  `id_funcionalidad` int(11) NOT NULL,
  `nombre_funcionalidad` varchar(48) NOT NULL,
  `descripcion_funcionalidad` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `funcionalidad`
--

INSERT INTO `funcionalidad` (`id_funcionalidad`, `nombre_funcionalidad`, `descripcion_funcionalidad`) VALUES
(1, 'usuario', 'Gestión de usuarios'),
(2, 'rol', 'Gestión de roles'),
(3, 'funcionalidad', 'Gestión de funcionalidades'),
(4, 'accion', 'Gestión de acciones'),
(5, 'permiso', 'Gestión de permisos'),
(6, 'logexcepcionaccion', 'Log de excepcion de acciones'),
(7, 'logexcepcionatributo', 'Log de excepcion de atributo'),
(12, 'categoria', 'Gestion de categorias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logexcepcionaccion`
--

CREATE TABLE `logexcepcionaccion` (
  `usuario` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `funcionalidad` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `accion` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `codigo` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mensaje` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tiempo` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `logexcepcionaccion`
--

INSERT INTO `logexcepcionaccion` (`usuario`, `funcionalidad`, `accion`, `codigo`, `mensaje`, `tiempo`) VALUES
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 19:48:56'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-04 19:51:44'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-04 19:53:21'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 19:53:27'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 19:55:46'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 19:56:24'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 19:57:20'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 19:59:19'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-04 20:00:35'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-04 20:02:25'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-05 00:07:40'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-05 00:08:53'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-05 00:10:03'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-05 00:35:24'),
('admin', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2022-12-05 15:33:57'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-05 15:41:26'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-05 15:41:33'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-05 15:41:37'),
('DESCONOCIDO', 'auth', 'login', 'USUARIO_NO_EXISTE', 'El usuario no existe en el sistema.', '2023-01-10 18:58:40'),
('admin', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-10 19:00:10'),
('martin', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-10 19:07:39'),
('martin', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-10 19:07:44'),
('admin', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-10 22:54:20'),
('user1', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-11 11:03:37'),
('martin', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-11 11:04:24'),
('martin', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-11 11:06:55'),
('user2', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-11 11:56:12'),
('user2', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-11 12:04:42'),
('user2', 'categoria', 'devolverHijos', 'CATEGORIA_NO_HIJOS', 'La categoria seleccionada no tiene hijos.', '2023-01-11 12:15:09'),
('user2', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-11 17:25:20'),
('user2', 'categoria', 'insertar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-11 17:25:30'),
('user2', 'categoria', 'insertar', 'CATEGORIA_NO_TIENE_PERMISO', 'No tiene permiso para operar sobre esta categoria', '2023-01-11 17:32:00'),
('user2', 'proceso', 'editar', 'EXISTE_PROCESO_EN_CATEGORIA', 'No se puede insertar un proceso en una categoría si esta ya tiene un proceso.', '2023-01-11 17:52:52'),
('user2', 'categoria', 'insertar', 'CATEGORIA_YA_EXISTE', 'No se puede insertar una categoria que ya existe.', '2023-01-11 19:02:21'),
('martin', 'categoria', 'insertar', 'CATEGORIA_YA_EXISTE', 'No se puede insertar una categoria que ya existe.', '2023-01-11 20:48:40'),
('brais', 'proceso', 'insertar', 'EXISTE_PROCESO_EN_CATEGORIA', 'No se puede insertar un proceso en una categoría si esta ya tiene un proceso.', '2023-01-11 20:53:14'),
('brais', 'proceso', 'editar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-12 17:03:07'),
('martin', 'proceso', 'editar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-12 17:19:05'),
('admin', 'categoria', 'borrar', 'CATEGORIA_EXISTE_HIJO', 'No se puede insertar una categoria con un responsable inexistente.', '2023-01-12 21:50:05'),
('admin', 'categoria', 'borrar', 'CATEGORIA_EXISTE_HIJO', 'No se puede insertar una categoria con un responsable inexistente.', '2023-01-12 21:50:17'),
('admin', 'categoria', 'borrar', 'CATEGORIA_EXISTE_HIJO', 'No se puede insertar una categoria con un responsable inexistente.', '2023-01-12 21:51:28'),
('brais', 'categoria', 'insertar', 'CATEGORIA_YA_EXISTE', 'No se puede insertar una categoria que ya existe.', '2023-01-12 22:31:46'),
('brais', 'categoria', 'devolverHijos', 'CATEGORIA_NO_EXISTE', 'La categoria que se pretende editar no existe.', '2023-01-12 22:36:56'),
('brais', 'categoria', 'devolverHijos', 'CATEGORIA_NO_EXISTE', 'La categoria que se pretende editar no existe.', '2023-01-12 22:37:12'),
('brais', 'categoria', 'devolverHijos', 'CATEGORIA_NO_EXISTE', 'La categoria que se pretende editar no existe.', '2023-01-12 22:37:33'),
('brais', 'categoria', 'devolverHijos', 'CATEGORIA_NO_EXISTE', 'La categoria que se pretende editar no existe.', '2023-01-12 22:39:12'),
('brais', 'categoria', 'devolverHijos', 'CATEGORIA_NO_EXISTE', 'La categoria que se pretende editar no existe.', '2023-01-12 22:42:49'),
('brais', 'categoria', 'devolverHijos', 'CATEGORIA_NO_EXISTE', 'La categoria que se pretende editar no existe.', '2023-01-12 22:45:44'),
('brais', 'proceso', 'editar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-12 22:52:30'),
('brais', 'proceso', 'editar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-12 22:52:40'),
('martin', 'categoria', 'insertar', 'CATEGORIA_YA_EXISTE', 'No se puede insertar una categoria que ya existe.', '2023-01-13 16:33:17'),
('admin', 'categoria', 'borrar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-13 16:49:30'),
('admin', 'categoria', 'borrar', 'CATEGORIA_EXISTE_HIJO', 'No se puede insertar una categoria con un responsable inexistente.', '2023-01-13 16:50:02'),
('admin', 'categoria', 'insertar', 'CATEGORIA_YA_EXISTE', 'No se puede insertar una categoria que ya existe.', '2023-01-13 17:11:04'),
('admin', 'categoria', 'borrar', 'SQL_KO', 'Error al ejecutar el sql.', '2023-01-15 10:59:51'),
('admin', 'categoria', 'borrar', 'CATEGORIA_TIENE_PROCESO', 'No se puede borrar una categoria que tiene un proceso asociado.', '2023-01-15 11:00:30'),
('admin', 'categoria', 'borrar', 'CATEGORIA_TIENE_PROCESO', 'No se puede borrar una categoria que tiene un proceso asociado.', '2023-01-15 11:02:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logexcepcionatributo`
--

CREATE TABLE `logexcepcionatributo` (
  `usuario` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `funcionalidad` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `accion` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `codigo` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mensaje` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tiempo` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `logexcepcionatributo`
--

INSERT INTO `logexcepcionatributo` (`usuario`, `funcionalidad`, `accion`, `codigo`, `mensaje`, `tiempo`) VALUES
('martin', 'categoria', 'insertar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-10 19:04:38'),
('martin', 'categoria', 'insertar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-10 19:05:00'),
('martin', 'categoria', 'insertar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-10 19:06:59'),
('admin', 'proceso', 'insertar', 'FORMULA_VACIA', 'La fórmula está vacía', '2023-01-10 19:34:48'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-11 11:50:02'),
('admin', 'categoria', 'buscar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-11 11:50:02'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-11 11:50:54'),
('admin', 'categoria', 'buscar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-11 11:50:54'),
('user2', 'proceso', 'editar', 'ID_PROCESO_VACIO', 'El id del proceso es vacío.', '2023-01-11 17:48:11'),
('user2', 'proceso', 'editar', 'ID_PROCESO_VACIO', 'El id del proceso es vacío.', '2023-01-11 17:48:56'),
('user2', 'proceso', 'editar', 'ID_PROCESO_VACIO', 'El id del proceso es vacío.', '2023-01-11 17:49:45'),
('user2', 'categoria', 'borrar', 'ID_CATEGORIA_VACIO', 'El id del categoria está vacío', '2023-01-11 19:25:57'),
('user2', 'proceso', 'borrar', 'ID_PROCESO_VACIO', 'El id del proceso es vacío.', '2023-01-11 19:27:16'),
('user2', 'proceso', 'insertar', 'NOMBRE_PROCESO_VACIO', 'El nombre del proceso está vacío', '2023-01-11 19:39:36'),
('user2', 'proceso', 'insertar', 'PARAMETRO_FORMULA_FALTA_UNIDAD', 'La fórmula introducida no especifica una unidad.', '2023-01-11 19:40:42'),
('admin', 'proceso', 'borrar', 'ID_PROCESO_VACIO', 'El id del proceso es vacío.', '2023-01-11 21:14:41'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-12 21:52:44'),
('admin', 'categoria', 'buscar', 'CATEGORIA_NOMBRE_FORMATO_INCORRECTO', 'El nombre de la categoria tiene un formato erroneo, solo letras y números', '2023-01-12 21:52:44'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 13:41:20'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 13:41:21'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 13:41:33'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:39:49'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:39:57'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_MENOR_QUE_3', 'El nombre de la categoria es menor de 3', '2023-01-13 16:41:09'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:41:40'),
('martin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:42:31'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:50:33'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:50:34'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 16:50:40'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 17:12:16'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 17:12:17'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-13 17:12:22'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-15 10:52:29'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-15 10:52:31'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-15 10:52:35'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-15 10:54:16'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-15 10:54:20'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-15 11:06:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro`
--

CREATE TABLE `parametro` (
  `id_parametro` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `unidad` varchar(11) DEFAULT NULL,
  `id_proceso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `parametro`
--

INSERT INTO `parametro` (`id_parametro`, `nombre`, `unidad`, `id_proceso`) VALUES
(59, 'numeroDeViajes', '', 35),
(60, 'numeroDeViajes', '', 36),
(61, 'altitud', 'metros', 36);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro_usuario`
--

CREATE TABLE `parametro_usuario` (
  `id_parametro` int(11) NOT NULL,
  `id_proceso` int(11) NOT NULL,
  `usuario` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_rol` int(11) NOT NULL,
  `id_accion` int(11) NOT NULL,
  `id_funcionalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`id_rol`, `id_accion`, `id_funcionalidad`) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(1, 4, 1),
(1, 5, 1),
(1, 6, 1),
(1, 1, 2),
(1, 2, 2),
(1, 3, 2),
(1, 4, 2),
(1, 5, 2),
(1, 6, 2),
(1, 1, 3),
(1, 2, 3),
(1, 3, 3),
(1, 4, 3),
(1, 6, 3),
(1, 1, 4),
(1, 2, 4),
(1, 3, 4),
(1, 4, 4),
(1, 6, 4),
(1, 1, 5),
(1, 2, 5),
(1, 4, 5),
(1, 6, 5),
(1, 4, 6),
(1, 4, 7),
(1, 7, 4),
(1, 7, 3),
(1, 7, 6),
(1, 7, 7),
(1, 7, 5),
(1, 7, 2),
(1, 7, 1),
(1, 4, 12),
(1, 2, 12),
(1, 3, 12),
(1, 1, 12),
(1, 7, 12),
(1, 5, 12),
(1, 6, 12),
(2, 6, 12),
(2, 5, 12),
(2, 7, 12),
(2, 3, 12),
(2, 4, 12),
(2, 2, 12),
(2, 1, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso`
--

CREATE TABLE `proceso` (
  `id_proceso` int(11) NOT NULL,
  `nombre_proceso` varchar(255) DEFAULT NULL,
  `descripcion_proceso` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL,
  `formula` varchar(255) NOT NULL,
  `borrado_logico` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proceso`
--

INSERT INTO `proceso` (`id_proceso`, `nombre_proceso`, `descripcion_proceso`, `id_categoria`, `formula`, `borrado_logico`) VALUES
(35, 'Ir al trabajo', 'Proceso para ver cuanto emites yendo al trabajo', 24, '{numeroDeViajes}*5', 0),
(36, 'Viaje avion corta distancia', 'Viaje en avion de menos de 1000km', 25, '{numeroDeViajes}*5/({altitud(metros)})', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_usuario`
--

CREATE TABLE `proceso_usuario` (
  `id_proceso` int(11) NOT NULL,
  `usuario` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descripcion_rol` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `borrado_logico` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `descripcion_rol`, `borrado_logico`) VALUES
(1, 'administrador', 'Rol de administrador que tiene acceso a todas las funcionalidades del sistema', 0),
(2, 'responsable', 'Asigna responsables de procesos y gestiona las acciones de categorías', 0),
(3, 'usuario', 'Usuario que puede calcular su huella de carbono en base a los procesos del sistema', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `contrasena` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 3,
  `dni` varchar(9) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `apellidos` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `direccion` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `telefono` varchar(9) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `borrado_logico` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario`, `contrasena`, `id_rol`, `dni`, `nombre`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `email`, `borrado_logico`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 1, '34888012W', 'administrador', 'administrador administrador', '2020-05-01', 'Rua 12 Parcela 56 32901 Ourense', '666666666', 'admin@admin.com', 0),
('brais', 'e77a37f64e93e3e3e0211e76bfe512b7', 2, '45141100N', 'Brais', 'Iglesias', '1900-01-01', 'Avenida Celanova ', '617293722', 'brais@gmail.com', 0),
('martin', '925d7518fc597af0e43f5606f9a51512', 2, '34888012W', 'martin', 'gil blanco', '2020-05-01', 'Rua 12 Parcela 56 32901 Ourense', '666666666', 'gilblancomartin@gmail.com', 0),
('prueba', 'c893bad68927b457dbed39460e6afd62', 3, '36230724C', 'prueba', 'usuario de prueba', '1900-01-01', 'Avenida Celanova ', '617291733', 'prueba@gmail.com', 0),
('user1', '24c9e15e52afc47c225b757e7bee1f9d', 3, '36230724C', 'usuario uno', 'usuario uno', '1900-01-03', 'Avenida Celanova ', '617291722', 'user1@gmail.com', 0),
('user2', '7e58d63b60197ceb55a1c487989a3720', 2, '36230724C', 'usuario dos', 'usuario dos', '1900-01-01', 'Avenida Celanova n', '617291712', 'user2@gmail.com', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accion`
--
ALTER TABLE `accion`
  ADD PRIMARY KEY (`id_accion`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD KEY `categoria_ibfk_1` (`usuario`);

--
-- Indices de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  ADD PRIMARY KEY (`id_funcionalidad`);

--
-- Indices de la tabla `parametro`
--
ALTER TABLE `parametro`
  ADD PRIMARY KEY (`id_parametro`),
  ADD KEY `id_proceso_rel` (`id_proceso`);

--
-- Indices de la tabla `parametro_usuario`
--
ALTER TABLE `parametro_usuario`
  ADD KEY `id_parametro` (`id_parametro`),
  ADD KEY `id_proceso` (`id_proceso`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_accion` (`id_accion`),
  ADD KEY `id_funcionalidad` (`id_funcionalidad`);

--
-- Indices de la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD PRIMARY KEY (`id_proceso`),
  ADD KEY `proceso_ibfk_1` (`id_categoria`);

--
-- Indices de la tabla `proceso_usuario`
--
ALTER TABLE `proceso_usuario`
  ADD KEY `id_proceso` (`id_proceso`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `usuario_ibfk_1` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accion`
--
ALTER TABLE `accion`
  MODIFY `id_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  MODIFY `id_funcionalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `parametro`
--
ALTER TABLE `parametro`
  MODIFY `id_parametro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `proceso`
--
ALTER TABLE `proceso`
  MODIFY `id_proceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `parametro`
--
ALTER TABLE `parametro`
  ADD CONSTRAINT `id_proceso_rel` FOREIGN KEY (`id_proceso`) REFERENCES `proceso` (`id_proceso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `parametro_usuario`
--
ALTER TABLE `parametro_usuario`
  ADD CONSTRAINT `parametro_usuario_ibfk_1` FOREIGN KEY (`id_parametro`) REFERENCES `parametro` (`id_parametro`) ON UPDATE CASCADE,
  ADD CONSTRAINT `parametro_usuario_ibfk_2` FOREIGN KEY (`id_proceso`) REFERENCES `proceso_usuario` (`id_proceso`) ON UPDATE CASCADE,
  ADD CONSTRAINT `parametro_usuario_ibfk_3` FOREIGN KEY (`usuario`) REFERENCES `proceso_usuario` (`usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `permiso_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE,
  ADD CONSTRAINT `permiso_ibfk_2` FOREIGN KEY (`id_funcionalidad`) REFERENCES `funcionalidad` (`id_funcionalidad`) ON UPDATE CASCADE,
  ADD CONSTRAINT `permiso_ibfk_3` FOREIGN KEY (`id_accion`) REFERENCES `accion` (`id_accion`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD CONSTRAINT `proceso_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `proceso_usuario`
--
ALTER TABLE `proceso_usuario`
  ADD CONSTRAINT `id_proceso` FOREIGN KEY (`id_proceso`) REFERENCES `proceso` (`id_proceso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
