// ChampContext.js
import React, { createContext, useState } from 'react';

export const ChampContext = createContext();

export const ChampProvider = ({ children }) => {
  const [champId, setChampId] = useState(null);

  return (
    <ChampContext.Provider value={{ champId, setChampId }}>
      {children}
    </ChampContext.Provider>
  );
};
