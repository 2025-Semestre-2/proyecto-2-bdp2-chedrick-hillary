import { createContext, useState } from "react";

export const RolContext = createContext();

export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState("admin"); // admin | corporativo

  return (
    <RolContext.Provider value={{ rol, setRol }}>
      {children}
    </RolContext.Provider>
  );
};
