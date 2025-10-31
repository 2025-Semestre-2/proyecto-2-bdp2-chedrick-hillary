USE WideWorldImporters;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarProveedores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT SupplierID, NombreProveedor, Categoria, MetodoEntrega
    FROM vw_Proveedores
    ORDER BY NombreProveedor ASC;
END;
GO

