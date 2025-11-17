CREATE OR ALTER PROCEDURE sp_EstadisticasVentasSucursal
AS
BEGIN
    SELECT 
        COUNT(*) AS cantidadFacturas,
        SUM(total) AS totalVentas
    FROM Facturas;
END;
