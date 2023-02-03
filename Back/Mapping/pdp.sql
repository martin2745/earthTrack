-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2023 a las 10:52:28
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- CREAMOS EL USUARIO Y LE DAMOS PASSWORD,DAMOS PERMISO DE USO Y DAMOS PERMISOS SOBRE LA BASE DE DATOS.
--
CREATE USER IF NOT EXISTS `pdp`@`localhost` IDENTIFIED BY 'pdp';
/*GRANT USAGE ON *.* TO `pdp`@`localhost` REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;*/
/*GRANT ALL PRIVILEGES ON `pdp`.* TO `pdp`@`localhost` WITH GRANT OPTION;*/
GRANT ALL ON *.* TO 'pdp'@'localhost';
FLUSH PRIVILEGES;
/*CREACIÓN DE TABLAS*/
DROP DATABASE IF EXISTS `pdp`;
CREATE DATABASE `pdp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
--
-- SELECCIONAMOS PARA USAR
--
USE `pdp`;

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
  `id_accion` int NOT NULL,
  `nombre_accion` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `descripcion_accion` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `descripcion_categoria` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `id_padre` int NOT NULL,
  `borrado_logico` int NOT NULL DEFAULT '0',
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `id_padre`, `borrado_logico`, `usuario`) VALUES
(1, 'superCategoria', 'Categoria Base', 0, 0, 'admin'),
(2, 'Viajes en coche', 'Viajes en coche de corta distancia', 1, 0, 'martin'),
(3, 'Procesos industriales', 'Categoria relacionados con la industria', 1, 0, 'user1'),
(4, 'Industria IT', 'Categoria relacionada hola con IT', 3, 0, 'user1'),
(5, 'Industria textil', 'Categoria relacionada con la industria textil', 3, 0, 'user2'),
(9, 'Camisetas', 'Categoria de camisetas', 5, 0, 'user2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionalidad`
--

CREATE TABLE `funcionalidad` (
  `id_funcionalidad` int NOT NULL,
  `nombre_funcionalidad` varchar(48) NOT NULL,
  `descripcion_funcionalidad` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `funcionalidad`
--

INSERT INTO `funcionalidad` (`id_funcionalidad`, `nombre_funcionalidad`, `descripcion_funcionalidad`) VALUES
(1, 'usuario', 'Gestión de usuarios'),
(2, 'rol', 'Gestión de roles'),
(3, 'funcionalidad', 'Gestión de funcionalidades'),
(4, 'accion', 'Gestión de acciones'),
(6, 'logExcepcionAccion', 'Log de excepcion de acciones'),
(7, 'logExcepcionAtributo', 'Log de excepcion de atributo'),
(12, 'categoria', 'Gestion de categorias'),
(13, 'proceso', 'Gestion de procesos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logexcepcionaccion`
--

CREATE TABLE `logexcepcionaccion` (
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `funcionalidad` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `accion` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `codigo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `mensaje` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `tiempo` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `logexcepcionaccion`
--

INSERT INTO `logexcepcionaccion` (`usuario`, `funcionalidad`, `accion`, `codigo`, `mensaje`, `tiempo`) VALUES
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-04 19:51:44'),
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-04 19:53:21'),
('admin', 'permiso', 'buscar', 'FUNCIONALIDAD_NO_EXISTE', 'La funcionalidad que se pretende editar no existe.', '2023-02-02 20:14:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logexcepcionatributo`
--

CREATE TABLE `logexcepcionatributo` (
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `funcionalidad` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `accion` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `codigo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `mensaje` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `tiempo` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `logexcepcionatributo`
--

INSERT INTO `logexcepcionatributo` (`usuario`, `funcionalidad`, `accion`, `codigo`, `mensaje`, `tiempo`) VALUES
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-28 18:52:53'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-28 18:53:04'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-28 18:53:04'),
('admin', 'categoria', 'editar', 'CATEGORIA_NOMBRE_VACIO', 'El nombre de la categoria está vacio', '2023-01-28 18:53:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro`
--

CREATE TABLE `parametro` (
  `id_parametro` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `unidad` varchar(11) DEFAULT NULL,
  `id_proceso` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `parametro`
--

INSERT INTO `parametro` (`id_parametro`, `nombre`, `unidad`, `id_proceso`) VALUES
(21, 'numeroDeViajes', '', 13),
(22, 'ordenadores', '', 15),
(23, 'capacidad', 'TB', 15),
(26, 'numeroDeCamisetas', '', 17),
(27, 'masa', 'g', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro_usuario`
--

CREATE TABLE `parametro_usuario` (
  `id_parametro` int NOT NULL,
  `id_proceso` int NOT NULL,
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `valor` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Volcado de datos para la tabla `parametro_usuario`
--

INSERT INTO `parametro_usuario` (`id_parametro`, `id_proceso`, `usuario`, `valor`) VALUES
(21, 13, 'user2', 10),
(22, 15, 'user2', 1),
(23, 15, 'user2', 1),
(26, 17, 'admin', 5),
(26, 17, 'user2', 5),
(27, 17, 'admin', 30),
(27, 17, 'user2', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_rol` int NOT NULL,
  `id_accion` int NOT NULL,
  `id_funcionalidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
(1, 4, 4),
(1, 6, 4),
(1, 4, 6),
(1, 4, 7),
(1, 7, 4),
(1, 7, 3),
(1, 7, 6),
(1, 7, 7),
(1, 7, 1),
(1, 2, 12),
(1, 5, 12),
(1, 6, 12),
(2, 6, 12),
(2, 5, 12),
(2, 7, 12),
(2, 1, 12),
(2, 3, 12),
(2, 4, 12),
(2, 2, 12),
(1, 5, 13),
(1, 6, 13),
(2, 2, 13),
(2, 4, 13),
(2, 3, 13),
(2, 1, 13),
(2, 7, 13),
(2, 5, 13),
(2, 6, 13),
(1, 2, 13),
(1, 3, 4),
(1, 2, 4),
(1, 4, 12),
(1, 3, 12),
(1, 1, 12),
(1, 1, 13),
(1, 3, 13),
(1, 4, 13),
(1, 7, 2),
(1, 7, 12),
(1, 7, 13),
(2, 3, 1),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso`
--

CREATE TABLE `proceso` (
  `id_proceso` int NOT NULL,
  `nombre_proceso` varchar(255) DEFAULT NULL,
  `descripcion_proceso` varchar(255) DEFAULT NULL,
  `id_categoria` int NOT NULL,
  `formula` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `proceso`
--

INSERT INTO `proceso` (`id_proceso`, `nombre_proceso`, `descripcion_proceso`, `id_categoria`, `formula`) VALUES
(13, 'Ir al trabajo', 'Proceso que describe los trayectos para ir al trabajo', 2, '{numeroDeViajes}*12'),
(15, 'Ordenadores domesticos', 'Proceso que calcula cuanto carbono produce tus ordenadores', 4, '{ordenadores}*{capacidad(TB)}'),
(17, 'Comprar una camiseta', 'Proceso para comprar una camiseta', 9, '{numeroDeCamisetas}*{masa(g)}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_usuario`
--

CREATE TABLE `proceso_usuario` (
  `id_proceso` int NOT NULL,
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Volcado de datos para la tabla `proceso_usuario`
--

INSERT INTO `proceso_usuario` (`id_proceso`, `usuario`, `total`) VALUES
(13, 'user2', 120),
(15, 'user2', 1),
(17, 'user2', 25),
(17, 'admin', 150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int NOT NULL,
  `nombre_rol` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `descripcion_rol` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `borrado_logico` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `contrasena` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `id_rol` int NOT NULL DEFAULT '3',
  `dni` varchar(9) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `apellidos` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `direccion` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `telefono` varchar(9) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `email` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `borrado_logico` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario`, `contrasena`, `id_rol`, `dni`, `nombre`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `email`, `borrado_logico`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 1, '34888012W', 'administrador', 'administrador administrador', '2020-05-01', 'Rua 12 Parcela 56 32901 Ourense', '666666666', 'admin@admin.com', 0),
('martin', '925d7518fc597af0e43f5606f9a51512', 2, '34888012W', 'martin', 'gil blanco', '2020-05-01', 'Rua 12 Parcela 56 32901 Ourense', '666666666', 'gilblancomartin@gmail.com', 0),
('ramon', '266575d3c2b8a34f83817458f96152b1', 3, '05346796D', 'Ramón', 'Gil González', '1987-05-25', 'Rua 12 Parcela 56 32901 Ourense', '988647382', 'ramon@gmail.com', 0),
('user1', '24c9e15e52afc47c225b757e7bee1f9d', 2, '36230724C', 'usuario uno', 'usuario uno', '1990-01-03', 'Avenida Celanova', '617291722', 'user1@gmail.com', 0),
('user2', '7e58d63b60197ceb55a1c487989a3720', 2, '36230724C', 'usuario dos', 'usuario dos', '1992-02-05', 'Avenida Celanova nº46 2º', '617292222', 'user2@gmail.com', 0);

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
  ADD PRIMARY KEY (`id_parametro`,`id_proceso`,`usuario`),
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
  MODIFY `id_accion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  MODIFY `id_funcionalidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `parametro`
--
ALTER TABLE `parametro`
  MODIFY `id_parametro` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `proceso`
--
ALTER TABLE `proceso`
  MODIFY `id_proceso` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `parametro`
--
ALTER TABLE `parametro`
  ADD CONSTRAINT `id_proceso_rel` FOREIGN KEY (`id_proceso`) REFERENCES `proceso` (`id_proceso`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `id_proceso` FOREIGN KEY (`id_proceso`) REFERENCES `proceso` (`id_proceso`),
  ADD CONSTRAINT `usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
