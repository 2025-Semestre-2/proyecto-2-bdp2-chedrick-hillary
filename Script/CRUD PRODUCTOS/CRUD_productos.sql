/* ================================================================
   CRUD TABLA Productos
   Tabla:
      idProducto INT NOT NULL PRIMARY KEY
      nombre VARCHAR(100)
      descripcion VARCHAR(250)
      precio DECIMAL(10,2)
      rowguid UNIQUEIDENTIFIER NOT NULL
================================================================ */

/* ======================== CREAR =============================== */

IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Productos_Crear')
    DROP PROCEDURE sp_Productos_Crear;
GO

CREATE PROCEDURE sp_Productos_Crear
    @idProducto INT,
    @nombre VARCHAR(100),
    @descripcion VARCHAR(250),
    @precio DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Productos (idProducto, nombre, descripcion, precio, rowguid)
    VALUES (@idProducto, @nombre, @descripcion, @precio, NEWID());

    SELECT 'Producto creado correctamente' AS mensaje, @idProducto AS idCreado;
END;
GO

/* ======================== OBTENER TODOS ======================= */

IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Productos_ObtenerTodos')
    DROP PROCEDURE sp_Productos_ObtenerTodos;
GO

CREATE PROCEDURE sp_Productos_ObtenerTodos
AS
BEGIN
    SELECT idProducto, nombre, descripcion, precio
    FROM Productos
    ORDER BY idProducto;
END;
GO

/* ======================== OBTENER POR ID ====================== */

IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Productos_ObtenerPorId')
    DROP PROCEDURE sp_Productos_ObtenerPorId;
GO

CREATE PROCEDURE sp_Productos_ObtenerPorId
    @idProducto INT
AS
BEGIN
    SELECT idProducto, nombre, descripcion, precio
    FROM Productos
    WHERE idProducto = @idProducto;
END;
GO

/* ======================== ACTUALIZAR ========================== */

IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Productos_Actualizar')
    DROP PROCEDURE sp_Productos_Actualizar;
GO

CREATE PROCEDURE sp_Productos_Actualizar
    @idProducto INT,
    @nombre VARCHAR(100),
    @descripcion VARCHAR(250),
    @precio DECIMAL(10,2)
AS
BEGIN
    UPDATE Productos
    SET nombre = @nombre,
        descripcion = @descripcion,
        precio = @precio
    WHERE idProducto = @idProducto;

    SELECT 'Producto actualizado correctamente' AS mensaje;
END;
GO

/* ======================== ELIMINAR ============================ */

IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Productos_Eliminar')
    DROP PROCEDURE sp_Productos_Eliminar;
GO

CREATE PROCEDURE sp_Productos_Eliminar
    @idProducto INT
AS
BEGIN
    DELETE FROM Productos
    WHERE idProducto = @idProducto;

    SELECT 'Producto eliminado correctamente' AS mensaje;
END;
GO

/* ================================================================
   ====================  PRUEBAS DE LOS SP  ======================
================================================================ */

/* ------- CREAR -------- */
EXEC sp_Productos_Crear
    @idProducto = 108,
    @nombre = 'Monitor Gamer 27"',
    @descripcion = 'Panel IPS 144Hz',
    @precio = 189900;
GO

EXEC sp_Productos_Crear
    @idProducto = 105,
    @nombre = 'Teclado Mecánico RGB',
    @descripcion = 'Switch Red',
    @precio = 35900;
GO

/* ------- OBTENER TODOS -------- */
EXEC sp_Productos_ObtenerTodos;
GO

/* ------- OBTENER POR ID ------- */
EXEC sp_Productos_ObtenerPorId @idProducto = 1;
GO

/* ------- ACTUALIZAR ----------- */
EXEC sp_Productos_Actualizar
    @idProducto = 1,
    @nombre = 'Monitor Gamer 27" 165Hz',
    @descripcion = 'IPS 165Hz FreeSync',
    @precio = 199900;
GO

/* ------- ELIMINAR ------------- */
EXEC sp_Productos_Eliminar @idProducto = 105;
-- GO
