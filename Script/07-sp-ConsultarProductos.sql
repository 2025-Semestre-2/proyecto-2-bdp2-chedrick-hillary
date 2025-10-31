USE WideWorldImporters;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarProductos
AS
BEGIN
    SELECT * 
    FROM vw_Productos;
END;
GO

