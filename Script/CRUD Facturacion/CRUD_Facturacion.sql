---------------------------------------------------------

---------------------------------------------------------
Use SucursalSJ;
---------------------------------------------------------
-- 2. VIEW FACTURAS CON DATOS DEL CLIENTE
---------------------------------------------------------
IF OBJECT_ID('dbo.vwFacturas', 'V') IS NOT NULL
    DROP VIEW dbo.vwFacturas;
GO

CREATE VIEW dbo.vwFacturas AS
SELECT 
    F.idFactura,
    F.fecha,
    F.idCliente,
    C.nombre,
    F.total,
    F.rowguid
FROM dbo.Facturas F
LEFT JOIN dbo.ClientesNoSensibles C ON C.idCliente = F.idCliente;
GO


---------------------------------------------------------
-- 3. SP: CREAR FACTURA
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Factura_Crear', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Factura_Crear;
GO

CREATE PROCEDURE dbo.sp_Factura_Crear
    @idCliente INT,
    @total DECIMAL(10,2)
AS
BEGIN
    -- Validar cliente
    IF NOT EXISTS (SELECT 1 FROM dbo.ClientesNoSensibles WHERE idCliente = @idCliente)
    BEGIN
        SELECT 'ERROR: El cliente no existe.' AS mensaje;
        RETURN;
    END

    INSERT INTO dbo.Facturas (fecha, idCliente, total)
    VALUES (GETDATE(), @idCliente, @total);

    SELECT 'Factura creada correctamente' AS mensaje;
END;
GO


---------------------------------------------------------
-- 4. SP: ACTUALIZAR FACTURA
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Factura_Actualizar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Factura_Actualizar;
GO

CREATE PROCEDURE dbo.sp_Factura_Actualizar
    @idFactura INT,
    @total DECIMAL(10,2)
AS
BEGIN
    UPDATE dbo.Facturas
    SET total = @total
    WHERE idFactura = @idFactura;

    SELECT 'Factura actualizada correctamente' AS mensaje;
END;
GO


---------------------------------------------------------
-- 5. SP: ELIMINAR FACTURA
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Factura_Eliminar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Factura_Eliminar;
GO

CREATE OR ALTER PROCEDURE sp_Factura_Eliminar
    @idFactura INT
AS
BEGIN
    -- Verificar si la factura tiene detalles asociados
    IF EXISTS (SELECT 1 FROM dbo.DetalleFactura WHERE idFactura = @idFactura)
    BEGIN
        SELECT 'ERROR: No se puede eliminar la factura porque tiene detalles asociados.' AS mensaje;
        RETURN;
    END

    -- Si no tiene detalles, eliminar
    DELETE FROM dbo.Facturas
    WHERE idFactura = @idFactura;

    SELECT 'Factura eliminada correctamente.' AS mensaje;
END;
GO




---------------------------------------------------------
-- 6. SP: OBTENER TODAS LAS FACTURAS
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Factura_Obtener', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Factura_Obtener;
GO

CREATE PROCEDURE dbo.sp_Factura_Obtener
AS
BEGIN
    SELECT * FROM dbo.vwFacturas ORDER BY fecha DESC;
END;
GO


---------------------------------------------------------
-- 7. SP: OBTENER FACTURA POR ID
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Factura_ObtenerPorId', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Factura_ObtenerPorId;
GO

CREATE PROCEDURE dbo.sp_Factura_ObtenerPorId
    @idFactura INT
AS
BEGIN
    SELECT * FROM dbo.vwFacturas
    WHERE idFactura = @idFactura;
END;
GO


---------------------------------------------------------
-- 8. SP: OBTENER FACTURAS POR CLIENTE
---------------------------------------------------------
IF OBJECT_ID('dbo.sp_Factura_ObtenerPorCliente', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Factura_ObtenerPorCliente;
GO

CREATE PROCEDURE dbo.sp_Factura_ObtenerPorCliente
    @idCliente INT
AS
BEGIN
    SELECT * FROM dbo.vwFacturas
    WHERE idCliente = @idCliente
    ORDER BY fecha DESC;
END;
GO


---------------------------------------------------------
-- 9. PRUEBAS DEL CRUD (DESCOMENTAR SI NECESITAS)
---------------------------------------------------------

-- Crear factura
EXEC sp_Factura_Crear 105, 15000.50;

-- Actualizar factura
EXEC sp_Factura_Actualizar 1, 19999.00;

-- Obtener todas
EXEC sp_Factura_Obtener;

-- Obtener por ID
EXEC sp_Factura_ObtenerPorId 1;

-- Obtener por cliente
EXEC sp_Factura_ObtenerPorCliente 1;

-- Eliminar
EXEC sp_Factura_Eliminar 1;

---------------------------------------------------------
-- FIN DEL ARCHIVO
---------------------------------------------------------
