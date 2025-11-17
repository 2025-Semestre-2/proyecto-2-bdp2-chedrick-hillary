---------- crear proveedor
IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Proveedores_Crear')
    DROP PROCEDURE sp_Proveedores_Crear;
GO

CREATE PROCEDURE sp_Proveedores_Crear
    @idProveedor INT,
    @nombre VARCHAR(100),
    @telefono VARCHAR(20),
    @email VARCHAR(100)
AS
BEGIN
    INSERT INTO Proveedores (idProveedor, nombre, telefono, email, rowguid)
    VALUES (@idProveedor, @nombre, @telefono, @email, NEWID());

    SELECT 'Proveedor creado correctamente' AS mensaje, @idProveedor AS idCreado;
END;
GO

---------- actualizar proveedor
IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Proveedores_Actualizar')
    DROP PROCEDURE sp_Proveedores_Actualizar;
GO

CREATE PROCEDURE sp_Proveedores_Actualizar
    @idProveedor INT,
    @nombre VARCHAR(100),
    @telefono VARCHAR(20),
    @email VARCHAR(100)
AS
BEGIN
    UPDATE Proveedores
    SET nombre = @nombre,
        telefono = @telefono,
        email = @email
    WHERE idProveedor = @idProveedor;

    SELECT 'Proveedor actualizado correctamente' AS mensaje, @idProveedor AS idActualizado;
END;
GO

---------------obtener todos
IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Proveedores_ObtenerTodos')
    DROP PROCEDURE sp_Proveedores_ObtenerTodos;
GO

CREATE PROCEDURE sp_Proveedores_ObtenerTodos
AS
BEGIN
    SELECT *
    FROM Proveedores
    ORDER BY nombre;
END;
GO

---------------obtener por id
IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Proveedores_ObtenerPorId')
    DROP PROCEDURE sp_Proveedores_ObtenerPorId;
GO

CREATE PROCEDURE sp_Proveedores_ObtenerPorId
    @idProveedor INT
AS
BEGIN
    SELECT *
    FROM Proveedores
    WHERE idProveedor = @idProveedor;
END;
GO

---------------------eliminar
IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'sp_Proveedores_Eliminar')
    DROP PROCEDURE sp_Proveedores_Eliminar;
GO

CREATE PROCEDURE sp_Proveedores_Eliminar
    @idProveedor INT
AS
BEGIN
    DELETE FROM Proveedores
    WHERE idProveedor = @idProveedor;

    SELECT 'Proveedor eliminado correctamente' AS mensaje, @idProveedor AS idEliminado;
END;
GO

---------------------------------------------------------
-- PROBAR CREAR
---------------------------------------------------------
EXEC sp_Proveedores_Crear 
    @idProveedor = 1,
    @nombre = 'Tech Solutions CR',
    @telefono = '2288-7766',
    @email = 'info@techcr.com';

EXEC sp_Proveedores_Crear 
    @idProveedor = 2,
    @nombre = 'Distribuidora Omega',
    @telefono = '2222-3333',
    @email = 'contacto@omega.com';


---------------------------------------------------------
-- PROBAR ACTUALIZAR
---------------------------------------------------------
EXEC sp_Proveedores_Actualizar 
    @idProveedor = 1,
    @nombre = 'Tech Solutions Costa Rica',
    @telefono = '8888-9999',
    @email = 'ventas@techcr.com';


---------------------------------------------------------
-- PROBAR OBTENER TODOS
---------------------------------------------------------
EXEC sp_Proveedores_ObtenerTodos;


---------------------------------------------------------
-- PROBAR OBTENER POR ID
---------------------------------------------------------
EXEC sp_Proveedores_ObtenerPorId 1;
EXEC sp_Proveedores_ObtenerPorId 2;


---------------------------------------------------------
-- PROBAR ELIMINAR
---------------------------------------------------------
EXEC sp_Proveedores_Eliminar 1;
EXEC sp_Proveedores_Eliminar 2;
