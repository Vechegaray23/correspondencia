-- Añade receptor, destinatario, comentarios y urgencia a paquetes
ALTER TABLE paquetes
  ADD COLUMN receptor TEXT,
  ADD COLUMN destinatario TEXT,
  ADD COLUMN comentarios TEXT,
  ADD COLUMN urgencia BOOLEAN NOT NULL DEFAULT FALSE;

-- (Opcional) Asegura que fecha_ingreso tenga valor por defecto
ALTER TABLE paquetes
  ALTER COLUMN fecha_ingreso SET DEFAULT now();
