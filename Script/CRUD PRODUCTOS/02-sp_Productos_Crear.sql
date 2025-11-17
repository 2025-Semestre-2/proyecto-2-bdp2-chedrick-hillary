CREATE OR ALTER PROCEDURE sp_Productos_Crear
    @nombre VARCHAR(100),
    @precio DECIMAL(10,2),
    @stock INT,
    @idProveedor INT
AS
BEGIN
    INSERT INTO Productos(nombre, precio, stock, idProveedor)
    VALUES (@nombre, @precio, @stock, @idProveedor);

    SELECT SCOPE_IDENTITY() AS idProducto;
END
GO
