import React, { createContext, useState, useContext } from "react";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  
 const [user, setUser] = useState(() => {
   return JSON.parse(localStorage.getItem("user")) || null;
 });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };


  return (
    <authContext.Provider value={{ user, login }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default ContextProvider;
