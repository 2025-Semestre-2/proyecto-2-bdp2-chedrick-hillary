CREATE OR ALTER PROCEDURE sp_Top5ClientesFacturas
    @AnioInicio INT,
    @AnioFin INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Facturas AS (
        SELECT 
            YEAR(i.InvoiceDate) AS Anio,
            c.CustomerName AS Cliente,
            COUNT(i.InvoiceID) AS CantFacturas,
            SUM(il.Quantity * il.UnitPrice) AS MontoTotal,
            DENSE_RANK() OVER (PARTITION BY YEAR(i.InvoiceDate) ORDER BY COUNT(i.InvoiceID) DESC) AS RankCliente
        FROM Sales.Invoices i
        JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
        JOIN Sales.Customers c ON i.CustomerID = c.CustomerID
        WHERE YEAR(i.InvoiceDate) BETWEEN @AnioInicio AND @AnioFin
        GROUP BY YEAR(i.InvoiceDate), c.CustomerName
    )
    SELECT Anio, Cliente, CantFacturas, MontoTotal
    FROM CTE_Facturas
    WHERE RankCliente <= 5
    ORDER BY Anio, CantFacturas DESC;
END;
GO