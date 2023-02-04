
--
-- DAMOS PERMISO USO Y BORRAMOS EL USUARIO QUE QUEREMOS CREAR POR SI EXISTE
--
-- GRANT USAGE ON * . * TO `pdp`@`localhost`;
-- DROP USER `pdp`@`localhost`;

--
-- CREAMOS EL USUARIO Y LE DAMOS PASSWORD,DAMOS PERMISO DE USO Y DAMOS PERMISOS SOBRE LA BASE DE DATOS.
--
CREATE USER IF NOT EXISTS `pdp`@`localhost` IDENTIFIED BY 'pdp';
/*GRANT USAGE ON *.* TO `pdp`@`localhost` REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;*/
/*GRANT ALL PRIVILEGES ON `pdptest`.* TO `pdp`@`localhost` WITH GRANT OPTION;*/
GRANT ALL ON *.* TO 'pdp'@'localhost';
FLUSH PRIVILEGES;
/*CREACIÓN DE TABLAS*/
DROP DATABASE IF EXISTS `pdptest`;
CREATE DATABASE `pdptest` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
--
-- SELECCIONAMOS PARA USAR
--
USE `pdptest`;

--
-- Base de datos: `pdptest`
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
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `descripcion_categoria` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `id_padre` int NOT NULL,
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `id_padre`, `usuario`) VALUES
(1, 'superCategoria', 'Categoria Base', 0, 'admin'),
(2, 'nuevaCat', 'Categoria uno', 1, 'admin'),
(10, 'categoriaTest', 'Categoria para test', 1, 'admin');

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
(5, 'permiso', 'Gestión de permisos'),
(6, 'logexcepcionaccion', 'Log de excepcion de acciones'),
(7, 'logexcepcionatributo', 'Log de excepcion de atributo'),
(12, 'categorias', 'Gestion de categorias');

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

INSERT INTO `permiso` (`id_parametro`, `nombre`, `unidad`, `id_proceso`) VALUES
(3,'Cilindrada', 'CC', 3),
(4,'distanciaMediaDiaria', 'km', 3);

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
(2, 1, 12),
(2, 3, 12),
(2, 4, 12),
(2, 2, 12);

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

INSERT INTO `proceso` (`id_proceso`, `nombre_proceso`, `descripcion_proceso`, `id_categoria`,`formula`) VALUES
(3, 'coche diario diesel', 'Uso habitual de un coche de combustión diesel. Referido especialmente a desplazamientos urbanos.', 2, `{Cilindrada(CC)} * {distanciaMediaDiaria(km)} * 365`),
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_usuario`
--

CREATE TABLE `proceso_usuario` (
  `id_proceso` int NOT NULL,
  `usuario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

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
(1, 'administrador', 'Rol de administrador que tiene acceso a todas las funcionalidades. del sistema', 0),
(2, 'responsable', 'Asigna responsables de procesos y gestiona las acciones de categorías.', 0),
(3, 'usuario', 'Usuario que puede calcular su huella de carbono en base a los procesos del sistema.', 0),
(5, 'existeUsuarioRolActivo', 'Excepcion de rol accion. EXISTE_USUARIO_ROL_ACTIVO', 0),
(6, 'existeUsuarioRolInactivo', 'Nueva insercion de rol por parte del test', 0);

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
('admin', '21232f297a57a5a743894a0e4a801fc3', 1, '34888012W', 'administrador', 'administrador administrador', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'admin@admin.com', 0),
('usuarioCorreo', 'bdd1d9f6fd4566155602265d5190b8e7', 3, '85537205K', 'responsable', 'responsable responsable', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'usuarioCorreo@gmail.com', 0),
('usuarioDelete', '21232f297a57a5a743894a0e4a801fc3', 6, '58551442C', 'responsable', 'responsable responsable', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'responsable@responsable.com', 1),
('usuarioRolAccio', '21232f297a57a5a743894a0e4a801fc3', 5, '39426866J', 'usuarioRolAccion', 'rol acciones', '2022-05-01', 'Salvador dalí', '666666666', 'usuarioRolAccion@gmail.com', 0),
('usuarioTest', '21232f297a57a5a743894a0e4a801fc3', 3, '10147483K', 'responsable', 'responsable responsable', '2020-05-01', 'Rúa 12, Parcela 5, 6, 32901, Ourense', '666666666', 'usuarioTest@gmail.com', 0);

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
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accion`
--
ALTER TABLE `accion`
  MODIFY `id_accion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  MODIFY `id_funcionalidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

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