CREATE OR ALTER VIEW vw_EstadisticasCompras AS
SELECT 
    po.SupplierID,
    s.SupplierName AS Proveedor,
    sc.SupplierCategoryName AS Categoria,
    SUM(pol.OrderedOuters * pol.ExpectedUnitPricePerOuter) AS TotalCompra
FROM Purchasing.PurchaseOrders po
JOIN Purchasing.Suppliers s ON po.SupplierID = s.SupplierID
JOIN Purchasing.SupplierCategories sc ON s.SupplierCategoryID = sc.SupplierCategoryID
JOIN Purchasing.PurchaseOrderLines pol ON po.PurchaseOrderID = pol.PurchaseOrderID
GROUP BY ROLLUP (s.SupplierName, sc.SupplierCategoryName, po.SupplierID);
GO