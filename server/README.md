# Backend minimal para Mi Tienda

Este backend es un ejemplo minimal con Express y Postgres para soportar registro e inicio de sesión.

Requisitos:
- Node.js 18+
- Postgres (puedes gestionar la base con pgAdmin4)

Pasos rápidos (pgAdmin4):
1. Abre pgAdmin4 y crea una nueva base de datos, por ejemplo `mi_tienda_db`.
2. (Opcional) Crea un usuario/rol y dale permisos a la base.
3. Ejecuta el archivo `server/init.sql` en el Query Tool de pgAdmin para crear la tabla `users`.

Configurar variables de entorno:
- Copia `.env.example` a `.env` y ajusta `DATABASE_URL` con tus credenciales.

Instalar y correr:

```bash
cd server
npm install
npm run dev
```

El servidor correrá en `http://localhost:4000` por defecto y expondrá:
- POST /auth/register  — { name, email, password }
- POST /auth/login     — { email, password }

Notas de seguridad:
- En producción guardad `JWT_SECRET` en un lugar seguro.
- Considerad usar HTTPS y cookies HttpOnly para tokens si el cliente y servidor comparten dominio.
