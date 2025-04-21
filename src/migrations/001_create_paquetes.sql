CREATE TABLE paquetes (
  id SERIAL PRIMARY KEY,
  depto VARCHAR(50) NOT NULL,
  fecha_ingreso TIMESTAMP NOT NULL DEFAULT now(),
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente'
);
