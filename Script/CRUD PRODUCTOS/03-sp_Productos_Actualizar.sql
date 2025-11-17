CREATE OR ALTER PROCEDURE sp_Productos_Actualizar
    @idProducto INT,
    @nombre VARCHAR(100),
    @precio DECIMAL(10,2),
    @stock INT,
    @idProveedor INT
AS
BEGIN
    UPDATE Productos
    SET nombre = @nombre,
        precio = @precio,
        stock = @stock,
        idProveedor = @idProveedor
    WHERE idProducto = @idProducto;
END
GO
