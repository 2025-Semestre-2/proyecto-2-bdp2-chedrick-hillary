CREATE OR ALTER PROCEDURE sp_ClientesConMasCompras
AS
BEGIN
    SELECT TOP 10 
        c.idCliente,
        CONCAT(c.nombre, ' ', c.apellido) AS nombre_cliente,
        SUM(f.total) AS totalComprado
    FROM Facturas f
    INNER JOIN ClientesNoSensibles c
        ON f.idCliente = c.idCliente
    GROUP BY c.idCliente, c.nombre, c.apellido
    ORDER BY totalComprado DESC;
END
GO