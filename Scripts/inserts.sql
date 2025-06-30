/* -------------  CATEGORÍAS  ------------- */
INSERT INTO categoria (nombre) VALUES
('Remeras'),
('Pantalones'),
('Vestidos'),
('Faldas'),
('Camperas'),
('Blusas'),
('Jeans'),
('Sweaters'),
('Shorts'),
('Accesorios');

/* -------------  PRODUCTOS  ------------- */
INSERT INTO producto (nombre, descripcion, precio, genero, id_categoria, imagen) VALUES
('Remera Oversize',      'Algodón 100 %, cuello redondo',        12000.00, 'Femenino', 1, 'https://http2.mlstatic.com/D_NQ_NP_953602-MLA84646517499_052025-O.webp'),
('Pantalón Cargo',       'Tiro alto, múltiples bolsillos',       18000.00, 'Femenino', 2, 'https://http2.mlstatic.com/D_NQ_NP_845060-MLA85717005059_062025-O.webp'),
('Vestido Floral',       'Corte midi, estampado flores',         23000.00, 'Femenino', 3, 'https://http2.mlstatic.com/D_NQ_NP_879981-MLA84452167337_052025-O.webp'),
('Falda Denim',          'Denim azul, ruedo desflecado',         15000.00, 'Femenino', 4, 'https://http2.mlstatic.com/D_NQ_NP_950676-MLA85716120865_062025-O.webp'),
('Campera Bomber',       'Forrada, cierre metálico',             35000.00, 'Femenino', 5, 'https://http2.mlstatic.com/D_NQ_NP_970875-MLA85108199740_052025-O.webp'),
('Blusa Satinada',       'Manga larga, lazo al cuello',          17000.00, 'Femenino', 6, 'https://http2.mlstatic.com/D_NQ_NP_947951-MLA84471309533_052025-O.webp'),
('Jean Mom Fit',         'Tiro alto, lavado claro',              20000.00, 'Femenino', 7, 'https://http2.mlstatic.com/D_NQ_NP_665011-MLA84287665577_052025-O.webp'),
('Sweater Cropped',      'Tejido algodón‑acrílico',              14000.00, 'Femenino', 8, 'https://http2.mlstatic.com/D_NQ_NP_617117-MLA85568994019_062025-O.webp'),
('Short Deportivo',      'Secado rápido, cintura elastizada',     9000.00, 'Femenino', 9, 'https://http2.mlstatic.com/D_NQ_NP_791380-MLA79541116106_102024-O.webp'),
('Riñonera Eco‑cuero',   'Correa regulable, cierre metálico',     8000.00, 'Femenino',10, 'https://http2.mlstatic.com/D_NQ_NP_854016-MLA85769623398_062025-O.webp');

/* -------------  INVENTARIO  (una variante por producto) ------------- */
INSERT INTO inventario (talle, color, stock, id_producto) VALUES
('M','Negro', 20, 1),
('M','Negro', 15, 2),
('M','Negro', 10, 3),
('M','Negro', 12, 4),
('M','Negro',  8, 5),
('M','Negro', 18, 6),
('M','Negro', 25, 7),
('M','Negro', 14, 8),
('M','Negro', 30, 9),
('M','Negro', 50,10);

/* -------------  USUARIOS  (rol usuario) ------------- */
INSERT INTO usuario (nombre, apellido, email, password, direccion, telefono, rol) VALUES
('Lucía',  'Gómez',   'maria@example.com',  '1234', 'Av. Siempre 123', '351‑1111111', 'usuario'),
('María',  'Pérez',   'maripe@example.com',  '1234', 'Calle Falsa 456',  '351‑2222222', 'usuario'),
('Carla',  'Díaz',    'carla@example.com',  '1234', 'Ruta 9 Km 12',     '351‑3333333', 'usuario'),
('Sofía',  'López',   'sofia@example.com',  '1234', 'Belgrano 789',     '351‑4444444', 'usuario'),
('Ana',    'Ramos',   'ana@example.com',    '1234', 'Mitre 321',        '351‑5555555', 'usuario'),
('Anabella',    'Ramos',   'anita@example.com',    '1234', 'Mitre 321',        '351‑5555555', 'usuario'),
('Ema',    'Ramos',   'admin@gmail.com',    '1', 'Mitre 321',        '351‑5555555', 'admin');

/* -------------  FAVORITOS  ------------- */
INSERT INTO favorito (id_usuario, id_producto) VALUES
(2, 1),
(2, 3),
(3, 2),
(3, 5),
(4, 4),
(4, 6),
(5, 1),
(5, 7),
(6, 8),
(6, 10);
