CREATE OR ALTER PROCEDURE sp_Productos_Eliminar
    @idProducto INT
AS
BEGIN
    DELETE FROM Productos WHERE idProducto = @idProducto;
END
GO
