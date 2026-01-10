# Sergio Nolasco - Backend API

Backend API desarrollado con NestJS 11, Fastify, MongoDB y JWT para la plataforma "Formando Empresarios con Propósito".

## 🚀 Características

- ✅ Autenticación JWT con cookies HttpOnly
- ✅ Registro de usuarios con verificación de email
- ✅ Recuperación de contraseña
- ✅ Validación de datos con class-validator
- ✅ Manejo centralizado de errores
- ✅ Envío de correos electrónicos con templates HTML personalizados
- ✅ Arquitectura modular siguiendo principios SOLID

## 📋 Requisitos Previos

- Node.js 20.x o superior
- MongoDB 8.0 o superior
- npm o yarn

## 🔧 Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

3. Configura las variables de entorno en `.env`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sergio-nolasco
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your-cookie-secret-change-in-production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sergionolasco.com
FRONTEND_URL=http://localhost:4321
```

## 🏃 Ejecutar la aplicación

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

## 📚 Endpoints de la API

### Autenticación

- `POST /auth/register` - Registro de nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión
- `POST /auth/forgot-password` - Solicitar recuperación de contraseña
- `POST /auth/reset-password` - Restablecer contraseña
- `POST /auth/verify-email/:token` - Verificar email

### Usuarios

- `GET /users/me` - Obtener perfil del usuario autenticado (requiere autenticación)

## 🔐 Autenticación

La autenticación se maneja mediante JWT almacenado en cookies HttpOnly para mayor seguridad. Las cookies se envían automáticamente en cada solicitud.

## 📧 Configuración de Email

Para usar Gmail, necesitas generar una "Contraseña de aplicación":

1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos
3. Contraseñas de aplicación
4. Genera una nueva contraseña para "Correo"
5. Usa esa contraseña en `EMAIL_PASS`

## 🏗️ Estructura del Proyecto

```
src/
├── auth/              # Módulo de autenticación
│   ├── dto/           # Data Transfer Objects
│   ├── guards/        # Guards de autenticación
│   ├── strategies/    # Estrategias de Passport
│   └── decorators/    # Decoradores personalizados
├── users/             # Módulo de usuarios
│   ├── dto/
│   └── schemas/       # Esquemas de Mongoose
├── email/              # Módulo de correos
├── config/            # Configuraciones
└── common/            # Código compartido (filters, etc.)
```

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📝 Licencia

UNLICENSED
