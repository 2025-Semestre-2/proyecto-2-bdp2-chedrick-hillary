Use Corporativa;
go

INSERT INTO Usuarios (username, password, fullname, rol, email, hiredate)
VALUES (
    'admin',
    HASHBYTES('SHA2_256', 'Admin123*'),
    'Administrador General',
    'Admin',
    'admin@wwi.com',
    GETDATE()
);
GO

select * from Usuarios;


----------------------------------
--- Vista para el login
----------------------------------
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

----------------------------------
--- sp para el login 
----------------------------------
CREATE PROCEDURE sp_LoginUsuario
    @username VARCHAR(50),
    @password VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        iduser,
        username,
        fullname,
        rol,
        active
    FROM vw_UsuariosLogin
    WHERE username = @username
      AND password = HASHBYTES('SHA2_256', @password)
      AND active = 1;
END;
GO

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------

----------------------------------
--- sp para el login 
----------------------------------
