![Banner](./images/banner.png)

# PROYECTO 6: Aplicación Backend con Autenticación

## **ÍNDICE**

* [1. Enunciado](#1-enunciado)
* [2. Entregas](#2-entregas)
* [3. Criterios de Evaluacion](#3-creterios-de-evaluacion)

****

## 1. Enunciado

Construirás una aplicación `backend` que maneja la autenticación y autorización de usuarios. La aplicación debe incluir un modelo de usuario y un modelo de `Producto` que puede ser cualquier elemento que desees enlazar con el usuario. 

Los modelos deben estar relacionados entre sí a través de `MongoDB` y la aplicación debe permitir las operaciones `CRUD` en los "productos".

A continuación, te presentamos una posible estructura de carpetas para tu aplicación:

```
EJEMPLO_TU_PROYECTO
├─ .env
├─ .gitignore
├─ README.md
├─ controllers
│  ├─ userController.js
│  └─ productController.js
├─ models
│  ├─ userModel.js
│  └─ productModel.js
├─ routes
│  ├─ userRoutes.js
│  └─ productRoutes.js
└─ server.js  <- TU ARCHIVO DE ENTRADA
```

En este proyecto, te enfrentarás a dos tareas principales:

- Crearás una aplicación backend con funciones de autenticación y autorización utilizando tecnologías como `JWT` (`JSON Web Tokens`). Esta aplicación te permitirá entender y experimentar la importancia de la seguridad en las aplicaciones web, así como también la manera en la que diferentes herramientas pueden ser utilizadas para implementar mecanismos de autenticación en los servidores.

- La aplicación deberá estar estructurada de tal manera que incluya dos modelos principales, uno para el `Usuario` y otro para cualquier `Producto` o elemento que desees enlazar a ese usuario. Estos productos pueden ser cualquier cosa, desde compras y artículos creados por el usuario hasta listas de tareas pendientes. La intención de esta estructura es que ambos modelos estén interrelacionados a través de `MongoDB`, la base de datos que has estado aprendiendo en las últimas semanas. Usarás `Mongoose` como ORM para facilitar esta interacción.

Además de lo anterior, estarás utilizando `OPENAPI` y `Swagger` para el proceso de documentación, de manera opcional. 

Finalmente, la entrega del proyecto se realizará a través de render.com, enfocándonos únicamente en el servicio web. Para el despliegue de la base de datos, usarás `MongoDB Atlas`.

Para el modelo del `producto` o elemento, deberás implementar el proceso de `CRUD` (Crear, Leer, Actualizar, Borrar) al desarrollar los servicios. Para esto, usarás express.js y cors, y deberás estructurar tus carpetas con controladores, modelos y rutas. También aplicarás dotenv para el manejo de las variables de entorno.

En caso de que lo necesites, puedes crear otro modelo adicional.

A continuación, se te compartirá los siguientes `endpoints`.

### Endpoints para Usuario:

|Descripción del Endpoint|	Método|	Endpoint|	Ejemplo. Caso de uso.|
|---|----|----|---|
|Registrar un usuario|	POST|	/api/user/register|	Como usuario, quiero registrarme en la plataforma proporcionando mi nombre, correo electrónico y una contraseña.|
|Iniciar sesión de usuario|	POST|	/api/user/login|	Como usuario, quiero iniciar sesión en la plataforma utilizando mi correo electrónico y contraseña para acceder a mis productos.|
|Verificar el token del usuario|	GET|	/api/user/verifytoken|	Como usuario, quiero que mi sesión se mantenga abierta y que la plataforma recuerde mi estado de inicio de sesión.|
|Actualizar información del usuario|	PUT|	/api/user/update|	Como usuario, quiero actualizar mi información de perfil, como mi nombre, correo electrónico y contraseña.|

### Endpoints para Producto:

|Descripción del Endpoint|	Método|	Endpoint|	Ejemplo. Caso de uso.|
|---|----|----|---|
|Crear un producto|	POST|	/api/product/create|	Como vendedor, quiero agregar un nuevo producto a mi catálogo proporcionando detalles como el nombre del producto, descripción y precio.|
|Leer todos los productos|	GET|	/api/product/readall|	Como comprador, quiero ver todos los productos disponibles en el catálogo para poder seleccionar uno para comprar.|
|Leer un producto específico|	GET|	/api/product/readone/:id|	Como comprador, quiero ver los detalles de un producto específico utilizando su ID para decidir si quiero comprarlo.|
|Actualizar un producto|	PUT|	/api/product/update/:id|	Como vendedor, quiero actualizar los detalles de un producto específico, como su nombre, descripción y precio.|
|Eliminar un producto|	DELETE|	/api/product/delete/:id	| Como vendedor, quiero eliminar un producto específico de mi catálogo cuando ya no esté disponible para la venta.|


****

## 2. Entregas

Usa esta lista para saber los requisitos mínimos del proyecto:

### GENERAL
- [ ] Realizarse de manera individual

### ARQUITECTURA DE CARPETAS

- [ ] Crear una arquitectura de carpetas y archivos, clara
 
### APLICACIÓN DE SERVICIOS CRUD

- [ ] Implementar autenticación y autorización en tu aplicación.
- [ ] Crear dos modelos, uno para el Usuario y otro para el Producto.
- [ ] Implementar operaciones CRUD para el modelo del Producto.
- [ ] Utilizar MongoDB y Mongoose para gestionar la base de datos.

### CONTROL DE VERSIONES
- [ ] Crear un repositorio en GitHub y subir el proyecto al mismo.


### ENTREGA A TIEMPO
- [ ] Entregar a tiempo el proyecto.


### DOCUMENTACIÓN DE LA API (OPCIONAL)

- [ ] Documentar todos los `endpoints` utilizando `Swagger` y `OpenAPI`


### DESPLIEGUE (OPCIONAL)
- [ ] Crear una URL de producción para este proyecto, a través de [render.com](https://render.com)

****

## 3. Criterios de evaluación

Tu calificación estará definida en base a los siguientes criterios:


| ÁREA       | % DEL TOTAL |
| ------------- |:-------------:|
|Arquitectura de carpetas y organización de código|30%
|Implementación de autenticación y autorización	|20%
|Implementación de modelado de producto	|20%
|Uso adecuado del control de versiones (Git & GitHub)| 20%
|Entrega a tiempo| 10%
