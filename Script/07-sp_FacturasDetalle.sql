CREATE PROCEDURE sp_FacturasDetalle
    @sucursal VARCHAR(10)
AS
BEGIN
    SELECT 
        F.idFactura,
        F.fecha,
        F.idCliente,
        F.total,
        D.idProducto,
        D.cantidad,
        D.precioUnitario
    FROM Facturas F
    INNER JOIN DetalleFactura D ON F.idFactura = D.idFactura
    WHERE F.sucursal = @sucursal;
END;
