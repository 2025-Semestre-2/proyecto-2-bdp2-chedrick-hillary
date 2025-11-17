CREATE PROCEDURE sp_LoginCorporativo
    @username VARCHAR(50),
    @password VARCHAR(100)
AS
BEGIN
    SELECT 
        idUser,
        username,
        fullname,
        rol,
        active
    FROM Usuarios
    WHERE username = @username
      AND active = 1
      AND password = ENCRYPTBYPASSPHRASE('ClaveSegura1', @password);
END;
