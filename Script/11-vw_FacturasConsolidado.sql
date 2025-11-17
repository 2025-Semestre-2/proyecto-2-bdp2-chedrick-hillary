CREATE OR ALTER VIEW vw_FacturasConsolidado AS
SELECT 
    idFactura,
    fecha,
    idCliente,
    total,
    'SJ' AS sucursal
FROM LINK_SJ.SucursalSJ.dbo.Facturas

UNION ALL

SELECT
    idFactura,
    fecha,
    idCliente,
    total,
    'LM' AS sucursal
FROM LINK_LM.SucursalLM.dbo.Facturas;
