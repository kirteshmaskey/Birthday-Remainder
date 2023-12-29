import React, { createContext, useState } from "react";

export const LoginContext = createContext("");

const Context = ({ children }) => {
  const [validLogin, setValidLogin] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ validLogin, setValidLogin }}>
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default Context;
