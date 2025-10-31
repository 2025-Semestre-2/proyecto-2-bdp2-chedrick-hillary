USE WideWorldImporters;
GO

USE WideWorldImporters;
GO

CREATE OR ALTER VIEW vw_Proveedores AS
SELECT 
    s.SupplierID,
    s.SupplierName AS NombreProveedor,
    sc.SupplierCategoryName AS Categoria,
    ISNULL(dm.DeliveryMethodName, 'Sin método de entrega') AS MetodoEntrega,
    p1.FullName AS ContactoPrimario,
    p2.FullName AS ContactoAlternativo,
    s.PhoneNumber AS Telefono,
    s.FaxNumber AS Fax,
    s.WebsiteURL AS SitioWeb,
    s.DeliveryAddressLine1 AS DireccionEntrega,
    s.PostalAddressLine1 AS DireccionPostal,
    dc.CityName AS CiudadEntrega,
    pc.CityName AS CiudadPostal,
    s.DeliveryPostalCode AS CodigoPostal,
    s.BankAccountName AS NombreBanco,
    s.BankAccountBranch AS SucursalBanco,
    s.BankAccountNumber AS NumeroCuenta,
    ISNULL(s.PaymentDays, 0) AS DiasPago,
    CAST(s.DeliveryLocation.Lat AS FLOAT) AS Latitud,
    CAST(s.DeliveryLocation.Long AS FLOAT) AS Longitud
FROM Purchasing.Suppliers s
JOIN Purchasing.SupplierCategories sc 
    ON s.SupplierCategoryID = sc.SupplierCategoryID
LEFT JOIN Application.DeliveryMethods dm 
    ON s.DeliveryMethodID = dm.DeliveryMethodID
LEFT JOIN Application.Cities dc 
    ON s.DeliveryCityID = dc.CityID
LEFT JOIN Application.Cities pc 
    ON s.PostalCityID = pc.CityID
LEFT JOIN Application.People p1 
    ON s.PrimaryContactPersonID = p1.PersonID
LEFT JOIN Application.People p2 
    ON s.AlternateContactPersonID = p2.PersonID;
GO

