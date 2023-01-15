-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-01-2023 a las 11:24:04
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
-- Base de datos: `pdptest`
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
(1, 'insertar', 'Insertar un elemento en base de datos.'),
(2, 'borrar', 'Borrado de un elemento en base de datos.'),
(3, 'editar', 'Editar un elemento en base de datos.'),
(4, 'buscar', 'Buscar un elemento en base de datos.'),
(5, 'reactivar', 'Reactivar un elemento borrado de forma lógica.'),
(6, 'verEnDetalle', 'Ver toda la información para una tupla.'),
(7, 'ejecutarTest', 'El usuario tiene la posibilidad de ejecutar el test.');

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
(2, 'nuevaCat', 'Categoria uno', 1, 0, 'admin');

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
(1, 'usuario', 'Gestión de usuarios.'),
(2, 'rol', 'Gestión de roles.'),
(3, 'funcionalidad', 'Gestión de funcionalidades.'),
(4, 'accion', 'Gestión de acciones.'),
(5, 'permiso', 'Gestión de permisos.'),
(6, 'logExcepcionAccion', 'Log de excepcion de acciones'),
(7, 'logExcepcionAtributo', 'Log de excepcion de atributo');

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
(1, 4, 7);

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
(1, 'administrador', 'Rol de administrador que tiene acceso a todas las funcionalidades. del sistema', 0),
(2, 'responsable', 'Asigna responsables de procesos y gestiona las acciones de categorías.', 0),
(4, 'usuario', 'Usuario que puede calcular su huella de carbono en base a los procesos del sistema.', 0),
(5, 'existeUsuarioRolActivo', 'Excepcion de rol accion. EXISTE_USUARIO_ROL_ACTIVO', 0),
(6, 'existeUsuarioRolInactivo', 'Nueva insercion de rol por parte del test', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `contrasena` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 4,
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
('admin', '21232f297a57a5a743894a0e4a801fc3', 1, '34888012W', 'administrador', 'administrador administrador', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'admin@admin.com', 0),
('usuarioCorreo', '1fb4dd8cf34de6f65fe5bfd2118c089f', 4, '85537205K', 'responsable', 'responsable responsable', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'usuarioCorreo@gmail.com', 0),
('usuarioDelete', '21232f297a57a5a743894a0e4a801fc3', 6, '58551442C', 'responsable', 'responsable responsable', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'responsable@responsable.com', 1),
('usuarioRolAccio', '21232f297a57a5a743894a0e4a801fc3', 5, '39426866J', 'usuarioRolAccion', 'rol acciones', '2022-05-01', 'Salvador dalí', '666666666', 'usuarioRolAccion@gmail.com', 0),
('usuarioTest', '21232f297a57a5a743894a0e4a801fc3', 4, '10147483K', 'responsable', 'responsable responsable', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'usuarioTest@gmail.com', 0);

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
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_accion` (`id_accion`),
  ADD KEY `id_funcionalidad` (`id_funcionalidad`);

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
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accion`
--
ALTER TABLE `accion`
  MODIFY `id_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  MODIFY `id_funcionalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `permiso_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE,
  ADD CONSTRAINT `permiso_ibfk_2` FOREIGN KEY (`id_funcionalidad`) REFERENCES `funcionalidad` (`id_funcionalidad`) ON UPDATE CASCADE,
  ADD CONSTRAINT `permiso_ibfk_3` FOREIGN KEY (`id_accion`) REFERENCES `accion` (`id_accion`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
