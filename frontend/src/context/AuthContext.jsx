import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const resp = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                alert(data.mensaje || "Error en login");
                return false;
            }

            setUser(data.usuario);
            localStorage.setItem("user", JSON.stringify(data.usuario));
            return true;

        } catch (err) {
            console.error("Error en login:", err);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
