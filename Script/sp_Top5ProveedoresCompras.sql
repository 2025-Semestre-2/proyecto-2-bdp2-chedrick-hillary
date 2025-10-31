CREATE OR ALTER PROCEDURE sp_Top5ProveedoresCompras
    @AnioInicio INT,
    @AnioFin INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Ordenes AS (
        SELECT 
            YEAR(po.OrderDate) AS Anio,
            s.SupplierName AS Proveedor,
            COUNT(po.PurchaseOrderID) AS CantOrdenes,
            SUM(pol.OrderedOuters * si.UnitPrice) AS MontoTotal,
            DENSE_RANK() OVER (PARTITION BY YEAR(po.OrderDate) ORDER BY COUNT(po.PurchaseOrderID) DESC) AS RankProveedor
        FROM Purchasing.PurchaseOrders po
        JOIN Purchasing.Suppliers s ON po.SupplierID = s.SupplierID
        JOIN Purchasing.PurchaseOrderLines pol ON po.PurchaseOrderID = pol.PurchaseOrderID
        JOIN Warehouse.StockItems si ON pol.StockItemID = si.StockItemID
        WHERE YEAR(po.OrderDate) BETWEEN @AnioInicio AND @AnioFin
        GROUP BY YEAR(po.OrderDate), s.SupplierName
    )
    SELECT Anio, Proveedor, CantOrdenes, MontoTotal
    FROM CTE_Ordenes
    WHERE RankProveedor <= 5
    ORDER BY Anio, CantOrdenes DESC;
END;
GO
