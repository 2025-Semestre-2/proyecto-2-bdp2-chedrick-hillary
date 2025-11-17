CREATE VIEW vw_InventarioConsolidado AS
SELECT 
    I.idProducto,
    P.nombre,
    SUM(I.cantidad) AS inventarioTotal,
    COUNT(*) AS cantidadSucursales
FROM Inventario I
INNER JOIN Productos P ON I.idProducto = P.idProducto
GROUP BY I.idProducto, P.nombre;
