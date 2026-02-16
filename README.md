# Proyecto: API de Gestión de Productos

Este proyecto es una **API REST** desarrollada con **Node.js** y **Express**, que permite gestionar productos mediante operaciones **CRUD (Crear, Leer, Actualizar y Eliminar)**.

Además, incluye:

- 🔐 Autenticación con JWT  
- 🔒 Encriptación de contraseñas con bcryptjs  
- 🗄️ Base de datos MongoDB Atlas  
- 🧪 Pruebas automatizadas con Jest  
- 🚀 Despliegue en Vercel  
- 🔁 Pipeline CI/CD con GitHub Actions  

---

## Nota importante (cómo iniciar el servidor)

Para iniciar el servidor de manera local es necesario:

1. Abrir una terminal.
2. Entrar a la carpeta principal del proyecto usando:

```bash
cd Proyecto
```

3. Luego entrar a la carpeta del backend:

```bash
cd backend
```

4. Una vez dentro, instalar dependencias:

```bash
npm install
```

5. Finalmente iniciar el servidor:

```bash
node app.js
```

El servidor correrá en:

```
http://localhost:3000
```

---

# Estructura del Proyecto

```
Actividad-3-Desarrollo-Full-Stack/
│
├── Proyecto/
│   ├── backend/
│   │   ├── app.js               # Servidor principal
│   │   ├── package.json         # Dependencias del backend
│   │   ├── .env                 # Variables de entorno (NO se sube a GitHub)
│   │   ├── __tests__/           # Pruebas unitarias con Jest
│   │   |── models/              # Modelos de Mongoose
|		|   |── public/	
|   |   	|── index.html           # Login
│   │			├── administrador.html   # CRUD de productos
│   │   	├── register.html        # Registro
│   │   	├── atareas.html         # CRUD de productos
│   │   	└── styles.css					 # Diseño del index
│   | 
│   │   
│
├── .github/
│   └── workflows/
│       └── test.yml             # Pipeline CI/CD
│
└── README.md
```

---

# Requisitos

- Node.js instalado
- Cuenta en MongoDB Atlas
- Navegador web
- Git instalado
- Opcional: Postman

---

# Configuración del archivo .env (MUY IMPORTANTE)

El archivo `.env` **NO está incluido en el repositorio por razones de seguridad**.

Esto es porque contiene información sensible como:

- La conexión a MongoDB
- La clave secreta JWT

Por lo tanto, cada persona que descargue el proyecto debe crear su propio archivo `.env`.

---

## Cómo crear el .env

1. Entrar a la carpeta:

```
Proyecto/backend
```

2. Crear un archivo llamado:

```
.env
```

3. Dentro del archivo agregar lo siguiente cambiando el usuario por el tuyo y la contraseña por la tuya:

```
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/api-productos
JWT_SECRET=coloca_aqui_una_clave_secreta_larga_y_segura

```
NOTA IMPORTANTE: esto solo funciona si tienes descargado mongodb compass ya que esto es para conectarte de forma local a la base de datos no desde el deploy de vercel
### 🔐 Configuración de MongoDB Atlas (Opcional)

Si deseas utilizar MongoDB Atlas en lugar de MongoDB local, debes:

1. Crear un cluster en MongoDB Atlas.
2. Crear un usuario con acceso a la base de datos.
3. Obtener tu cadena de conexión (Connection String).
4. Colocar esa cadena en tu archivo `.env`:

MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
---

## Explicación de cada variable

- **PORT** → Puerto donde correrá el servidor.
- **MONGO_URI** → Cadena de conexión de MongoDB Atlas.
- **JWT_SECRET** → Clave secreta para generar y verificar tokens JWT.



---

# Instalación y ejecución

Desde la carpeta `Proyecto/backend`:

```bash
npm install
node app.js
```

---

# Funcionamiento de la API

## Autenticación

### POST /api/register
Permite registrar un nuevo usuario.

Body:

```json
{
  "usuario": "Ariel",
  "contraseña": "123456"
}
```

---

### POST /api/login
Devuelve un token JWT válido por 2 horas.

---

# Rutas protegidas (CRUD Productos)

Todas requieren token en el header:

```
Authorization: Bearer TU_TOKEN
```

---

### GET /api/productos
Obtiene los productos del usuario autenticado.

---

### POST /api/productos
Crea un nuevo producto.

---

### PUT /api/productos/:id
Actualiza un producto existente.

---

### DELETE /api/productos/:id
Elimina un producto.

---

# Pruebas con Jest

Para ejecutar pruebas:

```bash
npm test
```

Las pruebas cubren:

- Registro
- Login
- Crear producto
- Obtener productos
- Actualizar producto
- Eliminar producto

Todas las pruebas deben mostrarse en verde.

---

# CI/CD con GitHub Actions

Cada vez que se hace:

```
git push origin main
```

Se ejecutan automáticamente:

- Instalación de dependencias
- Pruebas unitarias
- Validación del proyecto

Si todo pasa correctamente, el commit queda aprobado.

---

# Despliegue en Vercel

El backend está desplegado en Vercel.

En Vercel no se usa `.env` físico, sino:

```
Project → Settings → Environment Variables
```

Ahí se configuran:

- MONGO_URI
- JWT_SECRET

---

# Notas Finales

- MongoDB se utiliza mediante Atlas.
- JWT protege todas las rutas de productos.
- Las contraseñas están encriptadas con bcryptjs.
- Se usa Mongoose para manejar los modelos.
- Se implementó CI/CD profesional.
- El proyecto está listo para producción.
