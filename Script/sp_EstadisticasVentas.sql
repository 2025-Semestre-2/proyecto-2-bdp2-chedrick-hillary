CREATE OR ALTER PROCEDURE sp_EstadisticasVentas
    @Cliente NVARCHAR(100) = NULL,
    @Categoria NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Cliente,
        Categoria,
        MAX(TotalVenta) AS VentaMaxima,
        MIN(TotalVenta) AS VentaMinima,
        AVG(TotalVenta) AS PromedioVentas
    FROM vw_EstadisticasVentas
    WHERE
        (@Cliente IS NULL OR Cliente LIKE '%' + @Cliente + '%')
        AND (@Categoria IS NULL OR Categoria LIKE '%' + @Categoria + '%')
    GROUP BY ROLLUP (Cliente, Categoria)
    ORDER BY Cliente, Categoria;
END;
GO