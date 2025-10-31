USE WideWorldImporters;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarProveedorPorID
    @SupplierID INT
AS
BEGIN
    SELECT *
    FROM vw_Proveedores
    WHERE SupplierID = @SupplierID;
END;
