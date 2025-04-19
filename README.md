# Sistema de Gestión de Correspondencia

Proyecto **MVP backend** (Node LTS + PostgreSQL 16) para registrar, notificar y entregar paquetes en edificios o comunidades.

## Requisitos
| Software | Versión recomendada |
|----------|--------------------|
| macOS | ≥ 12 |
| Homebrew | Última |
| **Node** (nvm) | LTS (`nvm install --lts`) |
| **PostgreSQL** | 16 (`brew install postgresql@16`) |

## Instalación rápida (desarrollo)
```bash
git clone git@github.com:<TU_USUARIO>/correspondencia.git
cd correspondencia
nvm install --lts
cp .env.example .env         # completa DATABASE_URL
npm install
npm run dev                  # http://localhost:3000/api/health
