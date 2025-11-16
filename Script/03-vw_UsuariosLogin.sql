CREATE VIEW vw_UsuariosLogin AS
SELECT 
    iduser,
    username,
    password,
    fullname,
    rol,
    active
FROM Usuarios;
GO
