USE WideWorldImporters;
GO

CREATE OR ALTER VIEW vw_Clientes
AS
SELECT 
    c.CustomerID,
    c.CustomerName AS NombreCliente,
    cc.CustomerCategoryName AS Categoria,
    dm.DeliveryMethodName AS MetodoEntrega
FROM Sales.Customers c
JOIN Sales.CustomerCategories cc 
    ON c.CustomerCategoryID = cc.CustomerCategoryID
JOIN Application.DeliveryMethods dm 
    ON c.DeliveryMethodID = dm.DeliveryMethodID;
GO
