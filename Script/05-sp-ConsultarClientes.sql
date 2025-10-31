USE WideWorldImporters;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarClientes
  @Filtro NVARCHAR(100) = ''
AS
BEGIN
  SELECT *
  FROM vw_Clientes
  WHERE NombreCliente LIKE '%' + @Filtro + '%'
  ORDER BY NombreCliente ASC;
END;
GO
