
### Nombre y carné de los integrantes: Hillary Malespín Ulloa - 2021106074


### Estado del proyecto: Entregado
### Enlace del video:
Parte 1: https://youtu.be/cwljqfCSKi4
Parte 2: https://youtu.be/ZnyeTM7r7ik

# Proyecto 1 – Sistema de Estadísticas y Gestión de Ventas

Este proyecto consiste en el desarrollo de una aplicación web con **frontend en React** y **backend en Node.js con Express**, conectada a una base de datos **SQL Server**.
Utilizando WSL, con el editor de archivos VSCode con conexión ssh y extensiones del mismo que permitieron la conexión a sql server.
El sistema permite visualizar estadísticas, registrar ventas, clientes, productos y proveedores, así como obtener reportes dinámicos del sistema.

---

## 🚀 Objetivos Alcanzados

✅ **Conexión Backend–Base de Datos**
- Se estableció correctamente la conexión entre Node.js (Express) y SQL Server.
- Se implementó el archivo `server.js` para gestionar las rutas y la comunicación con el frontend.

✅ **Módulo de Ventas**
- Implementación de endpoints para registrar, consultar y filtrar ventas.
- Integración con procedimientos almacenados en SQL Server para obtener los datos.

  ✅ **Módulo de Clientes**
- Se pueden consultar todos los clientes.
- Se ve la informacion detallada de cada cliente.

  ✅ **Módulo de Inventario/productos**
- Se pueden consultar todos los productos.
- Se ve la informacion detallada de cada producto con enlace al proveedor.

  ✅ **Módulo de proveedor**
- Se pueden consultar todos los provedores.
- Se ve la informacion detallada de cada proveedor.

✅ **Módulo de Estadísticas**
- Implementación de una interfaz que muestra las estadísticas del sistema.
- Conexión correcta entre frontend y backend para la visualización de los resultados.

✅ **Diseño del Frontend**
- Interfaz desarrollada con React.
- Diseño limpio con navegación lateral y componentes visualmente diferenciados.
- Sección de estadísticas funcional con filtros y tabla de resultados.

✅ **Integración General**
- Comunicación estable entre el backend (puerto 8080) y el frontend (puerto 3000) mediante CORS.
- Pruebas locales exitosas con las rutas principales (`/api/clientes`, `/api/proveedores`, `/api/productos`, `/api/ventas`, `/api/estadisticas`).

---

## ⚠️ Objetivos No Alcanzados

 **Datos de Estadísticas Dinámicos**
- Algunas consultas de estadísticas no devuelven resultados debido (los top 5).

 **Validaciones de Entrada**
- Falta implementar validaciones más robustas en los formularios del frontend (por ejemplo, límites de búsqueda o campos vacíos).


---




