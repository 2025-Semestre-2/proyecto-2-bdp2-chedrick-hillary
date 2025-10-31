USE WideWorldImporters;
GO

CREATE OR ALTER VIEW vw_Ventas AS
SELECT 
    i.InvoiceID AS NumeroFactura,
    i.InvoiceDate AS FechaFactura,
    c.CustomerName AS Cliente,
    s.StockItemName AS Producto,
    il.Quantity AS Cantidad,
    il.UnitPrice AS PrecioUnitario,
    (il.Quantity * il.UnitPrice) AS Total
FROM Sales.Invoices i
JOIN Sales.InvoiceLines il 
    ON i.InvoiceID = il.InvoiceID
JOIN Sales.Customers c 
    ON i.CustomerID = c.CustomerID
JOIN Warehouse.StockItems s 
    ON il.StockItemID = s.StockItemID;
GO