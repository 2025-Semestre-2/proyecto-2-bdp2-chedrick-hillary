/******************************************************************************************
    CRUD CLIENTES - BASES DISTRIBUIDAS
    - ClientesNoSensibles → Sucursales (SJ y LM)
    - ClientesSensibles → Corporativa
******************************************************************************************/

/******************************************************************************************
    1. CRUD CLIENTES NO SENSIBLES (SUCURSALES)
******************************************************************************************/

---------------------------------------------
-- BORRAR SP SI EXISTEN
---------------------------------------------
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesNoSensibles_Crear')
    DROP PROCEDURE sp_ClientesNoSensibles_Crear;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesNoSensibles_Actualizar')
    DROP PROCEDURE sp_ClientesNoSensibles_Actualizar;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesNoSensibles_Eliminar')
    DROP PROCEDURE sp_ClientesNoSensibles_Eliminar;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesNoSensibles_ObtenerTodos')
    DROP PROCEDURE sp_ClientesNoSensibles_ObtenerTodos;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesNoSensibles_ObtenerPorId')
    DROP PROCEDURE sp_ClientesNoSensibles_ObtenerPorId;
GO

---------------------------------------------
-- CREAR CLIENTE NO SENSIBLE (Sucursal)
---------------------------------------------
CREATE PROCEDURE sp_ClientesNoSensibles_Crear
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @genero CHAR(1)
AS
BEGIN
    INSERT INTO ClientesNoSensibles(nombre, apellido, genero)
    VALUES (@nombre, @apellido, @genero);

    SELECT SCOPE_IDENTITY() AS idCliente;
END;
GO

---------------------------------------------
-- ACTUALIZAR CLIENTE NO SENSIBLE
---------------------------------------------
CREATE PROCEDURE sp_ClientesNoSensibles_Actualizar
    @idCliente INT,
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @genero CHAR(1)
AS
BEGIN
    UPDATE ClientesNoSensibles
    SET nombre = @nombre,
        apellido = @apellido,
        genero = @genero
    WHERE idCliente = @idCliente;

    SELECT 'Cliente actualizado correctamente' AS mensaje;
END;
GO

---------------------------------------------
-- ELIMINAR CLIENTE NO SENSIBLE
---------------------------------------------
CREATE PROCEDURE sp_ClientesNoSensibles_Eliminar
    @idCliente INT
AS
BEGIN
    DELETE FROM ClientesNoSensibles WHERE idCliente = @idCliente;

    SELECT 'Cliente eliminado' AS mensaje;
END;
GO

---------------------------------------------
-- OBTENER TODOS
---------------------------------------------
CREATE PROCEDURE sp_ClientesNoSensibles_ObtenerTodos
AS
BEGIN
    SELECT * FROM ClientesNoSensibles;
END;
GO

---------------------------------------------
-- OBTENER POR ID
---------------------------------------------
CREATE PROCEDURE sp_ClientesNoSensibles_ObtenerPorId
    @idCliente INT
AS
BEGIN
    SELECT * 
    FROM ClientesNoSensibles
    WHERE idCliente = @idCliente;
END;
GO



/******************************************************************************************
    2. CRUD CLIENTES SENSIBLES (CORPORATIVA)
******************************************************************************************/

---------------------------------------------
-- BORRAR SP SI EXISTEN
---------------------------------------------
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesSensibles_Crear')
    DROP PROCEDURE sp_ClientesSensibles_Crear;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesSensibles_Actualizar')
    DROP PROCEDURE sp_ClientesSensibles_Actualizar;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesSensibles_Eliminar')
    DROP PROCEDURE sp_ClientesSensibles_Eliminar;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesSensibles_ObtenerTodos')
    DROP PROCEDURE sp_ClientesSensibles_ObtenerTodos;
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'sp_ClientesSensibles_ObtenerPorId')
    DROP PROCEDURE sp_ClientesSensibles_ObtenerPorId;
GO

---------------------------------------------
-- CREAR CLIENTE SENSIBLE (Corporativa)
---------------------------------------------
CREATE PROCEDURE sp_ClientesSensibles_Crear
    @idCliente INT,
    @telefono VARCHAR(20),
    @direccion VARCHAR(200),
    @email VARCHAR(100),
    @fechaNacimiento DATE
AS
BEGIN
    INSERT INTO ClientesSensibles(idCliente, telefono, direccion, email, fechaNacimiento)
    VALUES (@idCliente, @telefono, @direccion, @email, @fechaNacimiento);

    SELECT 'Cliente sensible creado' AS mensaje;
END;
GO

---------------------------------------------
-- ACTUALIZAR CLIENTE SENSIBLE
---------------------------------------------
CREATE PROCEDURE sp_ClientesSensibles_Actualizar
    @idCliente INT,
    @telefono VARCHAR(20),
    @direccion VARCHAR(200),
    @email VARCHAR(100),
    @fechaNacimiento DATE
AS
BEGIN
    UPDATE ClientesSensibles
    SET telefono = @telefono,
        direccion = @direccion,
        email = @email,
        fechaNacimiento = @fechaNacimiento
    WHERE idCliente = @idCliente;

    SELECT 'Cliente sensible actualizado' AS mensaje;
END;
GO

---------------------------------------------
-- ELIMINAR CLIENTE SENSIBLE
---------------------------------------------
CREATE PROCEDURE sp_ClientesSensibles_Eliminar
    @idCliente INT
AS
BEGIN
    DELETE FROM ClientesSensibles WHERE idCliente = @idCliente;
    SELECT 'Cliente sensible eliminado' AS mensaje;
END;
GO

---------------------------------------------
-- OBTENER TODOS
---------------------------------------------
CREATE PROCEDURE sp_ClientesSensibles_ObtenerTodos
AS
BEGIN
    SELECT * FROM ClientesSensibles;
END;
GO

---------------------------------------------
-- OBTENER POR ID
---------------------------------------------
CREATE PROCEDURE sp_ClientesSensibles_ObtenerPorId
    @idCliente INT
AS
BEGIN
    SELECT *
    FROM ClientesSensibles
    WHERE idCliente = @idCliente;
END;
GO
