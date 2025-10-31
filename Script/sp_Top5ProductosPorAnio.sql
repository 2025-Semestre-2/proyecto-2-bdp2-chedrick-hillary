CREATE OR ALTER PROCEDURE sp_Top5ProductosPorAnio
    @Anio INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Ganancias AS (
        SELECT 
            YEAR(i.InvoiceDate) AS Anio,
            s.StockItemName AS Producto,
            SUM(il.Quantity * (il.UnitPrice - il.TaxRate)) AS GananciaTotal,
            DENSE_RANK() OVER (PARTITION BY YEAR(i.InvoiceDate) ORDER BY SUM(il.Quantity * (il.UnitPrice - il.TaxRate)) DESC) AS RankProducto
        FROM Sales.Invoices i
        JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
        JOIN Warehouse.StockItems s ON il.StockItemID = s.StockItemID
        WHERE YEAR(i.InvoiceDate) = @Anio
        GROUP BY YEAR(i.InvoiceDate), s.StockItemName
    )
    SELECT Anio, Producto, GananciaTotal
    FROM CTE_Ganancias
    WHERE RankProducto <= 5
    ORDER BY GananciaTotal DESC;
END;
GO