CREATE OR ALTER PROCEDURE sp_EstadisticasVentasConsolidado
AS
BEGIN
    SELECT 
        COUNT(*) AS cantidadFacturas,
        SUM(total) AS totalVentas
    FROM vw_FacturasConsolidado;
END;
