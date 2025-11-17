-- Tabla de usuarios
CREATE TABLE Usuarios (
    iduser INT IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARBINARY(256) NOT NULL,            -- encriptada
    fullname VARCHAR(100),
    active BIT DEFAULT 1,
    rol VARCHAR(20),
    email VARCHAR(100),
    hiredate DATE
);
GO


-- Tabla de productos (CATÁLOGO REPLICADO)
CREATE TABLE Productos (
    idProducto INT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(250),
    precio DECIMAL(10,2)
);
GO

-----Estadisticas de ventas por sucursal
CREATE TABLE Estadisticas (
    idEstadistica INT IDENTITY PRIMARY KEY,
    fecha DATETIME NOT NULL,
    sucursal VARCHAR(20) NOT NULL, -- 'SJ', 'LM', 'CONS'
    totalVentas DECIMAL(12,2),
    totalFacturas INT,
    totalClientes INT,
    rowguid UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID()
);

-- Tabla de proveedores (CATÁLOGO REPLICADO)
CREATE TABLE Proveedores (
    idProveedor INT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100)
);
GO

-- Clientes SENSIBLES (solo corporativo)
CREATE TABLE ClientesSensibles (
    idCliente INT PRIMARY KEY,
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    email VARCHAR(100),
    fechaNacimiento DATE
);
GO

-- Clientes NO sensibles (CATÁLOGO REPLICADO)
CREATE TABLE ClientesNoSensibles (
    idCliente INT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    genero CHAR(1)
);
GO
