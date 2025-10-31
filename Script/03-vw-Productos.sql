USE WideWorldImporters;
GO

CREATE OR ALTER VIEW vw_Productos AS
SELECT 
    si.StockItemID,
    si.StockItemName AS NombreProducto,
    s.SupplierID AS ProveedorID,
    s.SupplierName AS NombreProveedor,
    c.ColorName AS Color,
    up.PackageTypeName AS UnidadEmpaquetamiento,
    op.PackageTypeName AS Empaquetamiento,
    si.QuantityPerOuter AS CantidadEmpaque,
    si.Brand AS Marca,
    si.Size AS Talla,
    si.TaxRate AS Impuesto,
    si.UnitPrice AS PrecioUnitario,
    si.RecommendedRetailPrice AS PrecioVenta,
    si.TypicalWeightPerUnit AS Peso,
    si.SearchDetails AS PalabrasClave,
    h.QuantityOnHand AS CantidadDisponible,
    h.BinLocation AS Ubicacion
FROM Warehouse.StockItems si
INNER JOIN Purchasing.Suppliers s 
    ON si.SupplierID = s.SupplierID
INNER JOIN Warehouse.Colors c 
    ON si.ColorID = c.ColorID
LEFT JOIN Warehouse.PackageTypes up 
    ON si.UnitPackageID = up.PackageTypeID
LEFT JOIN Warehouse.PackageTypes op 
    ON si.OuterPackageID = op.PackageTypeID
LEFT JOIN Warehouse.StockItemHoldings h 
    ON si.StockItemID = h.StockItemID;
GO
