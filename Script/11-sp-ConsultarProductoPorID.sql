USE WideWorldImporters;
GO


CREATE OR ALTER PROCEDURE sp_ConsultarProductoPorID
    @StockItemID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * 
    FROM vw_Productos
    WHERE StockItemID = @StockItemID;
END;
GO
