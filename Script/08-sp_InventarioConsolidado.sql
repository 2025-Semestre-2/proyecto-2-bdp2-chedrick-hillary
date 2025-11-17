CREATE PROCEDURE sp_InventarioConsolidado
AS
BEGIN
    SELECT 
        I.idProducto,
        P.nombre,
        SUM(I.cantidad) AS totalCantidad
    FROM Inventario I
    INNER JOIN Productos P ON I.idProducto = P.idProducto
    GROUP BY I.idProducto, P.nombre
    ORDER BY totalCantidad DESC;
END;
