CREATE OR ALTER VIEW vw_EstadisticasVentas AS
SELECT 
    c.CustomerID,
    c.CustomerName AS Cliente,
    cc.CustomerCategoryName AS Categoria,
    SUM(il.Quantity * il.UnitPrice) AS TotalVenta
FROM Sales.Invoices i
JOIN Sales.Customers c ON i.CustomerID = c.CustomerID
JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
JOIN Sales.CustomerCategories cc ON c.CustomerCategoryID = cc.CustomerCategoryID
GROUP BY ROLLUP (c.CustomerName, cc.CustomerCategoryName, c.CustomerID);
GO