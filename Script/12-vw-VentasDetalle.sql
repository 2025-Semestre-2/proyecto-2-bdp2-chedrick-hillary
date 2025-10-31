USE WideWorldImporters;
GO

CREATE OR ALTER VIEW vw_VentasDetalle AS
SELECT
    i.InvoiceID AS NumeroFactura,
    i.InvoiceDate AS FechaFactura,
    c.CustomerName AS Cliente,
    dm.DeliveryMethodName AS MetodoEntrega,
    il.Description AS Producto,
    il.Quantity AS Cantidad,
    il.UnitPrice AS PrecioUnitario,
    il.TaxRate AS ImpuestoAplicado,
    (il.Quantity * il.UnitPrice) AS TotalLinea
FROM Sales.Invoices i
INNER JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
INNER JOIN Sales.Customers c ON i.CustomerID = c.CustomerID
INNER JOIN Application.DeliveryMethods dm ON i.DeliveryMethodID = dm.DeliveryMethodID;
GO