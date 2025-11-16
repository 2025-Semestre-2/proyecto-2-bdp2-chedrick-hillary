import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Bienvenido</h1>

            {user ? (
                <>
                    <p>Has iniciado sesión como:</p>
                    <h3>{user.fullname}</h3>
                    <p><b>Rol:</b> {user.rol}</p>
                </>
            ) : (
                <p>No hay usuario cargado</p>
            )}
        </div>
    );
}
