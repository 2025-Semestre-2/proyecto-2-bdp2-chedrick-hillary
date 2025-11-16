
CREATE TABLE Productos (
    idProducto INT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(250),
    precio DECIMAL(10,2)
);
GO

CREATE TABLE Proveedores (
    idProveedor INT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100)
);
GO

CREATE TABLE ClientesNoSensibles (
    idCliente INT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    genero CHAR(1)
);
GO

CREATE TABLE Inventario (
    idInventario INT IDENTITY PRIMARY KEY,
    idProducto INT,
    cantidad INT,
    FOREIGN KEY(idProducto) REFERENCES Productos(idProducto)
);
GO

CREATE TABLE Facturas (
    idFactura INT IDENTITY PRIMARY KEY,
    fecha DATETIME,
    idCliente INT,
    total DECIMAL(10,2),
    FOREIGN KEY(idCliente) REFERENCES ClientesNoSensibles(idCliente)
);
GO

CREATE TABLE DetalleFactura (
    idDetalle INT IDENTITY PRIMARY KEY,
    idFactura INT,
    idProducto INT,
    cantidad INT,
    precioUnitario DECIMAL(10,2),
    FOREIGN KEY(idFactura) REFERENCES Facturas(idFactura),
    FOREIGN KEY(idProducto) REFERENCES Productos(idProducto)
);
GO