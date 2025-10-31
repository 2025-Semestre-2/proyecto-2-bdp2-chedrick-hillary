USE WideWorldImporters;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarClientePorID
    @CustomerID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        C.CustomerID AS IDCliente,
        C.CustomerName AS NombreCliente,
        CC.CustomerCategoryName AS Categoria,
        BG.BuyingGroupName AS GrupoCompra,
        C.PhoneNumber AS Telefono,
        C.FaxNumber AS Fax,
        C.WebsiteURL AS SitioWeb,
        DM.DeliveryMethodName AS MetodoEntrega,
        C.DeliveryCityID,
        CT.CityName AS CiudadEntrega,
        C.DeliveryPostalCode AS CodigoPostal,
        C.BillToCustomerID AS ClienteFacturar,
        C.PaymentDays AS DiasPago,
        C.DeliveryAddressLine1 AS DireccionEntrega,
        C.PostalAddressLine1 AS DireccionPostal,
        C.DeliveryLocation.Lat AS Latitud,
        C.DeliveryLocation.Long AS Longitud
    FROM Sales.Customers AS C
    LEFT JOIN Sales.CustomerCategories AS CC ON C.CustomerCategoryID = CC.CustomerCategoryID
    LEFT JOIN Sales.BuyingGroups AS BG ON C.BuyingGroupID = BG.BuyingGroupID
    LEFT JOIN Application.DeliveryMethods AS DM ON C.DeliveryMethodID = DM.DeliveryMethodID
    LEFT JOIN Application.Cities AS CT ON C.DeliveryCityID = CT.CityID
    WHERE C.CustomerID = @CustomerID;
END;