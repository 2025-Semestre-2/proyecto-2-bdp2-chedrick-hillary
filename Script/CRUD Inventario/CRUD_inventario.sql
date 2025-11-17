---------------------------------------------------------

---------------------------------------------------------


---------------------------------------------------------
-- 2. VIEW DE INVENTARIO 
---------------------------------------------------------
IF OBJECT_ID('dbo.vwInventario', 'V') IS NOT NULL
    DROP VIEW dbo.vwInventario;
GO

CREATE VIEW dbo.vwInventario AS
SELECT 
    I.idInventario,
    I.idProducto,
    I.cantidad,
    I.rowguid
FROM dbo.Inventario I
LEFT JOIN dbo.Productos P ON P.idProducto = I.idProducto;
GO

---------------------------------------------------------
-- 3. SP: CREAR INVENTARIO
---------------------------------------------------------
ALTER PROCEDURE sp_Inventario_Crear
    @idProducto INT,
    @cantidad INT
AS
BEGIN
    IF NOT EXISTS(SELECT 1 FROM Productos WHERE idProducto = @idProducto)
    BEGIN
        SELECT 'ERROR: El producto no existe en el catálogo.' AS mensaje;
        RETURN;
    END

    INSERT INTO Inventario (idProducto, cantidad)
    VALUES (@idProducto, @cantidad);

    SELECT 'Inventario creado correctamente' AS mensaje;
END;



---------------------------------------------------------
-- 4. SP: ACTUALIZAR INVENTARIO
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Inventario_Actualizar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Inventario_Actualizar;
GO

CREATE PROCEDURE dbo.sp_Inventario_Actualizar
    @idInventario INT,
    @cantidad INT
AS
BEGIN
    UPDATE dbo.Inventario
    SET cantidad = @cantidad
    WHERE idInventario = @idInventario;

    SELECT 'Inventario actualizado correctamente' AS mensaje;
END;
GO


---------------------------------------------------------
-- 5. SP: ELIMINAR INVENTARIO
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Inventario_Eliminar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Inventario_Eliminar;
GO

CREATE PROCEDURE dbo.sp_Inventario_Eliminar
    @idInventario INT
AS
BEGIN
    DELETE FROM dbo.Inventario
    WHERE idInventario = @idInventario;

    SELECT 'Inventario eliminado correctamente' AS mensaje;
END;
GO


---------------------------------------------------------
-- 6. SP: OBTENER TODO EL INVENTARIO
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Inventario_Obtener', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Inventario_Obtener;
GO

CREATE PROCEDURE dbo.sp_Inventario_Obtener
AS
BEGIN
    SELECT * FROM dbo.vwInventario ORDER BY idProducto;
END;
GO


---------------------------------------------------------
-- 7. SP: OBTENER INVENTARIO POR PRODUCTO
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Inventario_ObtenerPorProducto', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Inventario_ObtenerPorProducto;
GO

CREATE PROCEDURE dbo.sp_Inventario_ObtenerPorProducto
    @idProducto INT
AS
BEGIN
    SELECT *
    FROM dbo.vwInventario
    WHERE idProducto = @idProducto;
END;
GO


---------------------------------------------------------
-- 8. SP: OBTENER INVENTARIO POR idInventario
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Inventario_ObtenerPorId', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Inventario_ObtenerPorId;
GO

CREATE PROCEDURE dbo.sp_Inventario_ObtenerPorId
    @idInventario INT
AS
BEGIN
    SELECT *
    FROM dbo.vwInventario
    WHERE idInventario = @idInventario;
END;
GO


---------------------------------------------------------
-- 9. PRUEBAS
---------------------------------------------------------

-- INSERTAR
EXEC sp_Inventario_Crear 7, 120;
EXEC sp_Inventario_Crear 2, 30;

-- ACTUALIZAR
-- EXEC sp_Inventario_Actualizar 1, 100;

-- OBTENER TODO
 EXEC sp_Inventario_Obtener;

-- OBTENER POR PRODUCTO
EXEC sp_Inventario_ObtenerPorProducto 7;

-- OBTENER POR ID
EXEC sp_Inventario_ObtenerPorId 1;

-- ELIMINAR
-- EXEC sp_Inventario_Eliminar 1;

---------------------------------------------------------
-- FIN DEL ARCHIVO
---------------------------------------------------------
