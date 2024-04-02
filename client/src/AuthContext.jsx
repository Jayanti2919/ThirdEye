import React, { useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();
const UnAuthContext = React.createContext();

export function GetAuthContext() {
  return React.useContext(AuthContext);
}
export function GetUnAuthContext() {
  return React.useContext(UnAuthContext);
}
export function GetAuthUpdateContext() {
  return React.useContext(AuthUpdateContext);
}

export function UseAuth({ children }) {
  const [auth, setAuth] = useState(false);
  function toggleAuth() {
    setAuth(true);
  }
  function AuthFalse() {
    setAuth(false);
  }
  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={toggleAuth}>
        <UnAuthContext.Provider value={AuthFalse}>
          {children}
          </UnAuthContext.Provider>
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
