CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('conserje','residente'))
);

-- Reemplaza <HASH_CONSERJE> y <HASH_RESIDENTE> con bcrypt.hashSync('secret',10)
INSERT INTO usuarios (username, password, role) VALUES
  ('conserje1', '<HASH_CONSERJE>', 'conserje'),
  ('residente1', '<HASH_RESIDENTE>', 'residente');
