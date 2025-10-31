USE WideWorldImporters;
GO
CREATE OR ALTER PROCEDURE sp_ConsultarVentas
    @NombreCliente NVARCHAR(100) = NULL,
    @FechaInicio DATE = NULL,
    @FechaFin DATE = NULL,
    @MontoMin DECIMAL(18,2) = NULL,
    @MontoMax DECIMAL(18,2) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        NumeroFactura,
        FechaFactura,
        Cliente,
        MetodoEntrega,
        SUM(TotalLinea) AS MontoTotal
    FROM vw_VentasDetalle
    WHERE
        (@NombreCliente IS NULL OR Cliente LIKE '%' + @NombreCliente + '%')
        AND (@FechaInicio IS NULL OR FechaFactura >= @FechaInicio)
        AND (@FechaFin IS NULL OR FechaFactura <= @FechaFin)
        AND (@MontoMin IS NULL OR TotalLinea >= @MontoMin)
        AND (@MontoMax IS NULL OR TotalLinea <= @MontoMax)
    GROUP BY NumeroFactura, FechaFactura, Cliente, MetodoEntrega
    ORDER BY Cliente ASC;
END;
GO
