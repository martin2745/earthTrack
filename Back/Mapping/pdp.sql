

--
-- DAMOS PERMISO USO Y BORRAMOS EL USUARIO QUE QUEREMOS CREAR POR SI EXISTE
--
-- GRANT USAGE ON * . * TO `pdp`@`localhost`;
-- DROP USER `pdp`@`localhost`;

-- Comentario


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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accion`
--

CREATE TABLE `accion` (
  `id_accion` int(11) NOT NULL,
  `nombre_accion` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descripcion_accion` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(7, 'logexcepcionatributo', 'Log de excepcion de atributo');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
('admin', 'categoria', 'insertar', 'CATEGORIA_NO_EXISTE_PADRE', 'No se puede insertar una categoria con un padre inexistente.', '2022-12-05 15:41:37');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_rol` int(11) NOT NULL,
  `id_accion` int(11) NOT NULL,
  `id_funcionalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(1, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descripcion_rol` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `borrado_logico` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `descripcion_rol`, `borrado_logico`) VALUES
(1, 'administrador', 'Rol de administrador que tiene acceso a todas las funcionalidades del sistema', 0),
(2, 'responsable', 'Asigna responsables de procesos y gestiona las acciones de categorías', 0),
(4, 'usuario', 'Usuario que puede calcular su huella de carbono en base a los procesos del sistema', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario`, `contrasena`, `id_rol`, `dni`, `nombre`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `email`, `borrado_logico`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 1, '34888012W', 'administrador', 'administrador administrador', '2020-05-01', 'Rua 12 Parcela 56 32901 Ourense', '666666666', 'admin@admin.com', 0),
('martin', '925d7518fc597af0e43f5606f9a51512', 4, '34888012W', 'martin', 'gil blanco', '2020-05-01', 'Rua 12 Parcela 56 32901 Ourense', '666666666', 'gilblancomartin@gmail.com', 0);

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
  ADD PRIMARY KEY (`id_categoria`);

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
  MODIFY `id_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  MODIFY `id_funcionalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

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

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);
COMMIT;
