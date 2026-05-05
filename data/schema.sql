CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `categorias` (`nombre`, `slug`) VALUES
('Zapatillas', 'zapatillas'),
('Ropa', 'ropa'),
('Pantalones', 'pantalones'),
('Calcetines', 'calcetines');

-- --------------------------------------------------------

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `productos` (`categoria_id`, `nombre`, `descripcion`, `precio`, `imagen`) VALUES
(1, 'Nike Air Max 90', 'Zapatilla clásica con cámara de aire visible', 129.99, 'nike-air-max-90.jpg'),
(1, 'Adidas Ultraboost 22', 'Zapatilla de running con suela Boost', 159.99, 'adidas-ultraboost-22.jpg'),
(1, 'New Balance 574', 'Zapatilla casual con estilo retro', 89.99, 'new-balance-574.jpg'),
(2, 'Camiseta Básica Blanca', 'Camiseta de algodón 100% unisex', 19.99, 'camiseta-basica-blanca.jpg'),
(2, 'Sudadera con Capucha Negra', 'Sudadera de algodón con capucha ajustable', 49.99, 'sudadera-capucha-negra.jpg'),
(3, 'Pantalón Jogger Gris', 'Pantalón cómodo para deporte y casual', 34.99, 'pantalon-jogger-gris.jpg'),
(3, 'Vaquero Slim Fit Azul', 'Vaquero ajustado de corte moderno', 59.99, 'vaquero-slim-fit-azul.jpg'),
(4, 'Calcetines Pack x5 Blancos', 'Pack de 5 pares de calcetines de algodón', 9.99, 'calcetines-blancos.jpg'),
(4, 'Calcetines Antideslizantes', 'Calcetines con suela antideslizante para casa', 7.99, 'calcetines-antideslizantes.jpg');

-- --------------------------------------------------------

CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `talla` varchar(20) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `stock` (`producto_id`, `talla`, `color`, `cantidad`) VALUES
-- Nike Air Max 90 (id 1)
(1, '40', 'Blanco', 10),
(1, '41', 'Blanco', 8),
(1, '42', 'Negro', 5),
(1, '43', 'Negro', 7),
-- Adidas Ultraboost 22 (id 2)
(2, '40', 'Gris', 6),
(2, '41', 'Gris', 9),
(2, '42', 'Azul', 4),
(2, '43', 'Azul', 3),
-- New Balance 574 (id 3)
(3, '39', 'Verde', 5),
(3, '40', 'Verde', 7),
(3, '41', 'Blanco', 10),
-- Camiseta Básica Blanca (id 4)
(4, 'S', 'Blanco', 20),
(4, 'M', 'Blanco', 25),
(4, 'L', 'Blanco', 15),
(4, 'XL', 'Blanco', 10),
-- Sudadera con Capucha Negra (id 5)
(5, 'S', 'Negro', 8),
(5, 'M', 'Negro', 12),
(5, 'L', 'Negro', 10),
-- Pantalón Jogger Gris (id 6)
(6, 'S', 'Gris', 10),
(6, 'M', 'Gris', 14),
(6, 'L', 'Gris', 8),
-- Vaquero Slim Fit Azul (id 7)
(7, '30', 'Azul', 6),
(7, '32', 'Azul', 9),
(7, '34', 'Azul', 5),
-- Calcetines Pack x5 Blancos (id 8)
(8, 'Única', 'Blanco', 30),
-- Calcetines Antideslizantes (id 9)
(9, 'Única', 'Gris', 20);
