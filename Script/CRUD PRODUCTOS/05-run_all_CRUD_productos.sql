EXEC sp_Productos_ObtenerTodos;

EXEC sp_Productos_ObtenerPorId @idProducto = 1;

EXEC sp_Productos_Crear 
    @nombre = 'Teclado Mecánico',
    @precio = 25000,
    @stock = 18,
    @idProveedor = 1;

EXEC sp_Productos_Crear 
    @nombre = 'Teclado Mecánico',
    @precio = 25000,
    @stock = 18,
    @idProveedor = 1;

EXEC sp_Productos_Actualizar
    @idProducto = 1,
    @nombre = 'Teclado Mecánico RGB',
    @precio = 29900,
    @stock = 25,
    @idProveedor = 1;
