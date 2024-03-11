import React, { useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function GetAuthContext() {
  return React.useContext(AuthContext);
}
export function GetAuthUpdateContext() {
  return React.useContext(AuthUpdateContext);
}

export function UseAuth({ children }) {
  const [auth, setAuth] = useState(false);
  function toggleAuth() {
    setAuth(true);
  }
  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={toggleAuth}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
