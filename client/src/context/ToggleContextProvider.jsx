import React, { createContext, useState } from "react";

export const ToggleContext = createContext({});

export const ToggleContextProvider = ({ children }) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  return (
    <ToggleContext.Provider
      value={{ menuToggle, setMenuToggle, cartToggle, setCartToggle }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
