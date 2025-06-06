-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2025 a las 17:08:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sgr`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE `asignaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `seccion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones`
--

CREATE TABLE `secciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `tipo` enum('capitulo','seccion','subseccion','contenido') NOT NULL,
  `id_padre` int(11) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `orden` int(11) DEFAULT NULL,
  `contenido` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `secciones`
--

INSERT INTO `secciones` (`id`, `titulo`, `tipo`, `id_padre`, `numero`, `orden`, `contenido`) VALUES
(1, 'CAPÍTULO I', 'capitulo', NULL, 'I', 1, NULL),
(2, 'ASPECTOS ACADÉMICOS', 'seccion', 1, '1.2', 2, '<p>probando la edicion de texto</p>'),
(3, 'ACTIVIDADES DE INVESTIGACIÓN, DESARROLLO CIENTÍFICO, TECNOLÓGICO, INNOVACIÓN Y EMPRENDIMIENTO', 'contenido', 2, '', 3, '<p>kuaso es godddddd</p>'),
(4, 'IMPULSO AL LIDERAZGO, LA REPRESENTACIÓN Y LA ORGANIZACIÓN ESTUDIANTIL', 'contenido', 2, '', 4, '<p>esto ya funciona jejej</p>\n<ul>\n<li>si se&ntilde;or</li>\n<li>ya funciona</li>\n<li>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 50%;\"><col style=\"width: 50%;\"></colgroup>\n<tbody>\n<tr>\n<td>hola</td>\n<td>si</td>\n</tr>\n<tr>\n<td>no</td>\n<td>no</td>\n</tr>\n</tbody>\n</table>\n</li>\n</ul>'),
(5, 'Torneo WER Nacional 2024', 'contenido', 2, '', 5, '<p style=\"text-align: center;\">En f&iacute;sica nuclear, la fisi&oacute;n (no<span style=\"text-decoration: underline;\"> confund</span>ir con la fusi&oacute;n nuclear) es la divisi&oacute;n de un n&uacute;cleo en n&uacute;cleos m&aacute;s livianos,​​ adem&aacute;s de algunos subproductos como<strong> neu</strong>trones libres, fotones (generalmente rayos gamma)&nbsp;</p>'),
(6, 'Semana Tecnológica 2024', 'subseccion', 2, '2.6', 6, NULL),
(7, 'Congreso Latin Food', 'subseccion', 2, '2.7', 7, NULL),
(8, 'Día del Ingeniero en Gestión Empresarial', 'contenido', 2, '', 8, '<p>dia del ingeniero en GEM</p>'),
(9, 'Foro interinstitucional de Emprendimiento Social UG/ITESG', 'contenido', 2, '', 9, NULL),
(10, 'PROMOCIÓN E IMPULSO A LA INVESTIGACIÓN Y A LAS VOCACIONES CIENTÍFICAS', 'contenido', 2, '', 10, '<p>el texto se deberia de generar en esta seccion jijijij</p>'),
(11, 'Eventos Académicos', 'subseccion', 2, '2.11', 11, NULL),
(12, 'FORMACIÓN INTEGRAL DE LOS ESTUDIANTES', 'seccion', 1, '1.12', 12, NULL),
(13, 'Proyecto cultural', 'contenido', 12, '', 13, NULL),
(14, 'PROGRAMA DE FORMACIÓN DUAL', 'seccion', 1, '1.14', 14, NULL),
(15, 'PROGRAMA DE TUTORÍAS', 'seccion', 1, '1.15', 15, NULL),
(16, 'PROGRAMA INSTITUCIONAL DE TUTORÍAS', 'seccion', 1, '1.16', 16, NULL),
(17, 'Enseñanza del Idioma inglés', 'contenido', 16, '', 17, NULL),
(18, 'RESIDENCIAS', 'seccion', 1, '1.18', 18, NULL),
(19, 'Visitas Industriales', 'subseccion', 18, '18.19', 19, NULL),
(20, 'ESTUDIANTES EN RIESGO', 'seccion', 1, '1.20', 20, NULL),
(21, 'Atención Psicológica', 'subseccion', 20, '20.21', 21, NULL),
(22, 'ASPECTOS ACADÉMICOS Y DE LA FORMACIÓN PROFESIONAL', 'contenido', 20, '', 22, NULL),
(23, 'PROGRAMAS EDUCATIVOS', 'seccion', 1, '1.23', 23, NULL),
(24, 'OFERTA EDUCATIVA DEL NIVEL SUPERIOR', 'seccion', 1, '1.24', 24, NULL),
(25, 'IMPLEMENTACIÓN DEL MODELO EDUCATIVO', 'seccion', 1, '1.25', 25, NULL),
(26, 'ESTRUCTURA DE CARGA HORARIA', 'seccion', 1, '1.26', 26, NULL),
(27, 'SISTEMA DE EDUCACIÓN DIGITAL', 'seccion', 1, '1.27', 27, NULL),
(28, 'RECONOCIMIENTO A LA CALIDAD DE LA OFERTA EDUCATIVA', 'contenido', 27, '', 28, NULL),
(29, 'ACTIVIDADES RELEVANTES DE LAS ACADEMIAS ITESG', 'contenido', 27, '', 29, NULL),
(30, 'ACADEMIA DE INGENIERÍA INDUSTRIAL', 'seccion', 1, '1.30', 30, NULL),
(31, 'ACADEMIA DE INGENIERÍA EN MECATRÓNICA', 'seccion', 1, '1.31', 31, NULL),
(32, 'ACADEMIA DE INGENIERÍA EN SISTEMAS COMPUTACIONALES', 'contenido', 31, '', 32, NULL),
(33, 'ACADEMIA DE INGENIERÍA EN INDUSTRIAS ALIMENTARIAS', 'contenido', 31, '', 33, NULL),
(34, 'ACADEMIA DE INGENIERÍA EN GESTIÓN EMPRESARIAL', 'contenido', 31, '', 34, NULL),
(35, 'ACADEMIA DE INGLÉS', 'seccion', 1, '1.35', 35, NULL),
(36, 'ACADEMIA DE CIENCIAS BÁSICAS', 'seccion', 1, '1.36', 36, NULL),
(37, 'ACADEMIA DE ACTIVIDADES EXTRAESCOLARES', 'seccion', 1, '1.37', 37, NULL),
(38, 'Curso Propedéutico', 'subseccion', 37, '37.38', 38, NULL),
(39, 'Registro Público de Derechos de Autor', 'contenido', 37, '', 39, NULL),
(40, 'CIDETEG', 'seccion', 1, '1.40', 40, NULL),
(41, 'Innovatecnm', 'subseccion', 40, '40.41', 41, NULL),
(42, 'DESEMPEÑO DEL PROFESORADO', 'seccion', 1, '1.42', 42, NULL),
(43, 'CAPACITACIÓN DOCENTE', 'seccion', 1, '1.43', 43, NULL),
(44, 'PROFESORES CON ESTUDIOS DE POSGRADO', 'seccion', 1, '1.44', 44, NULL),
(45, 'CALIDAD DEL PROFESORADO', 'seccion', 1, '1.45', 45, NULL),
(46, 'PROFESORES MIEMBROS DEL SNI (CONACYT)', 'seccion', 1, '1.46', 46, NULL),
(47, 'CUERPOS ACADÉMICOS', 'seccion', 1, '1.47', 47, NULL),
(48, 'PROFESORES CON PERFIL PRODEP', 'seccion', 1, '1.48', 48, NULL),
(49, 'CAPÍTULO II', 'capitulo', NULL, 'II', 49, NULL),
(50, 'PLANEACIÓN Y VINCULACIÓN', 'seccion', 49, '49.50', 50, NULL),
(51, 'GESTIÓN INTEGRAL INSTITUCIONAL', 'seccion', 49, '49.51', 51, NULL),
(52, 'PROGRAMA DE PASE REGULADO', 'seccion', 49, '49.52', 52, NULL),
(53, 'MATRÍCULA', 'seccion', 49, '49.53', 53, NULL),
(54, 'REPROBACIÓN', 'seccion', 49, '49.54', 54, NULL),
(55, 'Promedio académico', 'contenido', 54, '', 55, NULL),
(56, 'EFICIENCIA TERMINAL', 'seccion', 49, '49.56', 56, NULL),
(57, 'BECAS, APOYOS Y ESTÍMULOS PARA LA TRAYECTORIA ESCOLAR DE LOS ESTUDIANTES', 'contenido', 56, '', 57, NULL),
(58, 'EGRESADOS', 'seccion', 49, '49.58', 58, NULL),
(59, 'SEGUIMIENTO A EGRESADOS', 'seccion', 49, '49.59', 59, NULL),
(60, 'Empleabilidad', 'subseccion', 59, '59.60', 60, NULL),
(61, 'VINCULACIÓN CON SECTORES PÚBLICO, PRIVADO Y SOCIAL', 'contenido', 59, '', 61, NULL),
(62, 'RESIDENCIAS PROFESIONALES', 'seccion', 49, '49.62', 62, NULL),
(63, 'Servicio Social', 'subseccion', 62, '62.63', 63, NULL),
(64, 'Eventos Institucionales', 'subseccion', 62, '62.64', 64, NULL),
(65, 'CONVENIOS', 'seccion', 49, '49.65', 65, NULL),
(66, 'COMUNICACIÓN INSTITUCIONAL', 'seccion', 49, '49.66', 66, NULL),
(67, 'Promoción de la oferta educativa', 'contenido', 66, '', 67, NULL),
(68, 'Examen de admisión', 'contenido', 66, '', 68, NULL),
(69, 'Curso propedéutico', 'contenido', 66, '', 69, NULL),
(70, 'Participación en muestras profesiográficas', 'contenido', 66, '', 70, NULL),
(71, 'Los medios de difusión utilizados incluyeron:', 'contenido', 66, '', 71, NULL),
(72, 'GESTIÓN DE LA CALIDAD', 'seccion', 49, '49.72', 72, NULL),
(73, 'VISIÓN SUSTENTABLE Y AGENDA AMBIENTAL', 'seccion', 49, '49.73', 73, NULL),
(74, 'GESTIÓN INTEGRAL Y SUSTENTABLE DE LA ENERGÍA Y EL AGUA', 'contenido', 73, '', 74, NULL),
(75, 'Consumo Energético', 'subseccion', 73, '73.75', 75, NULL),
(76, 'Consumo de Agua', 'contenido', 73, '', 76, NULL),
(77, 'CAPÍTULO III', 'capitulo', NULL, 'III', 77, NULL),
(78, 'SUBDIRECCIÓN DE ADMINISTRACIÓN Y FINANZAS', 'seccion', 77, '77.78', 78, NULL),
(79, 'Personal Administrativo', 'subseccion', 78, '78.79', 79, NULL),
(80, 'Indicadores Laborales', 'subseccion', 78, '78.80', 80, NULL),
(81, 'Capacitación del Personal Administrativo.', 'contenido', 78, '', 81, NULL),
(82, 'Clima Organizacional', 'subseccion', 78, '78.82', 82, NULL),
(83, 'Gestión Presupuestal, Administrativa y Financiera', 'contenido', 78, '', 83, NULL),
(84, 'Presupuesto', 'subseccion', 78, '78.84', 84, NULL),
(85, 'Costo por Alumno', 'contenido', 78, '', 85, NULL),
(86, 'Equipamiento', 'subseccion', 78, '78.86', 86, NULL),
(87, 'Servicios Generales', 'subseccion', 78, '78.87', 87, NULL),
(88, 'Corresponsabilidad, equidad e inclusión', 'contenido', 78, '', 88, NULL),
(89, 'Auditorías', 'subseccion', 78, '78.89', 89, NULL),
(90, 'CAPÍTULO V', 'capitulo', NULL, 'V', 90, NULL),
(91, 'OTROS ASPECTOS RELEVANTES', 'seccion', 90, '90.91', 91, NULL),
(92, 'COMITÉS', 'seccion', 90, '90.92', 92, NULL),
(93, 'TABLERO DE INDICADORES SIGES', 'seccion', 90, '90.93', 93, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','colaborador') NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `rol`, `creado_en`) VALUES
(1, 'admin', '$2b$10$EmsmZCvQ/YD9yrYtXM/9zuhLJcAF2KfGZgRybnkDADe8EKl1NiSEu', 'admin', '2025-04-02 05:32:18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `seccion_id` (`seccion_id`);

--
-- Indices de la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_padre` (`id_padre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `secciones`
--
ALTER TABLE `secciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `asignaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `asignaciones_ibfk_2` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`);

--
-- Filtros para la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD CONSTRAINT `fk_padre` FOREIGN KEY (`id_padre`) REFERENCES `secciones` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
