CREATE OR ALTER PROCEDURE sp_EstadisticasCompras
    @Proveedor NVARCHAR(100) = NULL,
    @Categoria NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Proveedor,
        Categoria,
        MAX(TotalCompra) AS CompraMaxima,
        MIN(TotalCompra) AS CompraMinima,
        AVG(TotalCompra) AS PromedioCompras
    FROM vw_EstadisticasCompras
    WHERE
        (@Proveedor IS NULL OR Proveedor LIKE '%' + @Proveedor + '%')
        AND (@Categoria IS NULL OR Categoria LIKE '%' + @Categoria + '%')
    GROUP BY ROLLUP (Proveedor, Categoria)
    ORDER BY Proveedor, Categoria;
END;
GO
