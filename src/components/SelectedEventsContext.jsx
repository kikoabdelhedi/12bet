// SelectedEventsContext.js
import React, { createContext, useState } from 'react';

export const SelectedEventsContext = createContext();

export const SelectedEventsProvider = ({ children }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);

  return (
    <SelectedEventsContext.Provider value={{ selectedEvents, setSelectedEvents }}>
      {children}
    </SelectedEventsContext.Provider>
  );
};
