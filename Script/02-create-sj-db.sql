-- Inventario (fragmentación horizontal)
CREATE TABLE Inventario (
    idInventario INT IDENTITY PRIMARY KEY,
    idProducto INT,
    cantidad INT,
    FOREIGN KEY(idProducto) REFERENCES Productos(idProducto)
);
GO

-- Facturación (fragmentación horizontal)
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