USE WideWorldImporters;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarDetalleVenta
    @NumeroFactura INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        NumeroFactura,
        Cliente,
        MetodoEntrega,
        Producto,
        Cantidad,
        PrecioUnitario,
        ImpuestoAplicado,
        (Cantidad * PrecioUnitario) AS TotalLinea
    FROM vw_VentasDetalle
    WHERE NumeroFactura = @NumeroFactura;
END;
GO