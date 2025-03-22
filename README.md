# Nodepop - Plataforma para Venta de Artículos de Segunda Mano

**Nodepop** es una aplicación web pensada para la compra y venta de artículos de segunda mano. Los usuarios pueden publicar sus productos, buscarlos y gestionarlos de forma sencilla, todo desde una interfaz amigable, con filtros avanzados que permiten encontrar fácilmente lo que necesitas.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- EJS (para el renderizado del lado del servidor)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JohaDiaz/practica_node_backend_nodepop
   cd practica_node_backend_nodepop
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Inicialización de la Base de Datos

Para cargar datos de ejemplo, ejecuta el script `initDB.js`. Este eliminará las colecciones actuales y creará usuarios, tags y productos predefinidos:

```bash
npm run initDB
```

Se crearán los siguientes usuarios para realizar pruebas:

- `admin@example.com`
- `user1@example.com`
- `joha@kc.io`

Contraseña para todos: **1234**

## Puesta en marcha

### En modo producción:

```bash
npm start
```

### En modo desarrollo (con recarga automática):

```bash
npm run dev
```

## Estructura del Proyecto

- `app.js` → Configuración principal de la app y definición de rutas
- `/controllers` → Controladores que manejan la lógica de negocio
- `/models` → Modelos de Mongoose: `User`, `Product` y `Tag`
- `/lib` → Funciones auxiliares como la conexión a la base de datos o la gestión de sesiones
- `/public` → Archivos estáticos (CSS, imágenes, etc.)
- `/views` → Plantillas EJS para las vistas

## Funcionalidades

### Filtros de Búsqueda

La app permite filtrar productos desde el panel lateral. Los filtros disponibles son:

- **Nombre**: Búsqueda por nombre del producto
- **Tags**: Puedes seleccionar uno o varios (`work`, `lifestyle`, `motor`, `mobile`)
- **Rango de precios**: Establece un mínimo y máximo para filtrar resultados

Los filtros se aplican desde el formulario lateral y se procesan directamente desde el servidor.

### Gestión de Productos

Los usuarios logueados pueden:

- Crear productos
- Ver sus propios productos
- Eliminar productos creados por ellos mismos

Cada producto contiene:

- Nombre
- Precio
- Imagen (predefinida por ahora)
- Uno o varios tags

### Autenticación y Sesiones

- La app utiliza autenticación por sesiones.
- Solo los usuarios autenticados pueden acceder a zonas privadas.
- Los productos se gestionan exclusivamente por su creador.

## Notas finales

- Proyecto desarrollado como parte de una práctica de backend con Node.js y MongoDB.
