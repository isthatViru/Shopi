import { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [cartVisible, setCartVisible] = useState(false);
  return (
    <DrawerContext.Provider value={{ cartVisible, setCartVisible }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
