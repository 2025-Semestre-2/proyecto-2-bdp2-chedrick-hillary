CREATE OR ALTER PROCEDURE sp_Top10Productos
AS
BEGIN
    SELECT TOP 10
        p.idProducto,
        p.nombre,
        SUM(df.cantidad) AS totalVendido
    FROM vw_FacturasConsolidado f
    INNER JOIN DetalleFactura df ON f.idFactura = df.idFactura
    INNER JOIN Productos p ON df.idProducto = p.idProducto
    GROUP BY p.idProducto, p.nombre
    ORDER BY totalVendido DESC;
END;
