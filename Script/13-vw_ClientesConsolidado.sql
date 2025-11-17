CREATE VIEW vw_ClientesConsolidado AS
SELECT 
    CNS.idCliente,
    CNS.nombre,
    CNS.apellido,
    CS.telefono,
    CS.email,
    CS.direccion
FROM ClientesNoSensibles CNS
LEFT JOIN ClientesSensibles CS ON CNS.idCliente = CS.idCliente;
