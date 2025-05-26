-- 003_add_email_to_paquetes.sql
ALTER TABLE paquetes
  ADD COLUMN email VARCHAR(255) NOT NULL DEFAULT '';