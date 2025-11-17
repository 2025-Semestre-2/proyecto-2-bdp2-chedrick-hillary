CREATE OR ALTER PROCEDURE sp_Productos_ObtenerPorId
    @idProducto INT
AS
BEGIN
    SELECT * FROM Productos WHERE idProducto = @idProducto;
END
GO
