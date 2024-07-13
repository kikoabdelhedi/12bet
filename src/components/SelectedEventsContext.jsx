import React, { createContext, useState } from 'react';

export const SelectedEventsContext = createContext();

export const SelectedEventsProvider = ({ children }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);

  const addEvent = (event) => {
    setSelectedEvents((prevEvents) => {
      if (prevEvents.length < 20) {
        return [...prevEvents, event];
      } else {
        console.warn('Maximum of 20 events can be selected.');
        return prevEvents;
      }
    });
  };

  const removeEvent = (updatedEvents) => {
    setSelectedEvents(updatedEvents);
  };

  return (
    <SelectedEventsContext.Provider
      value={{ selectedEvents, addEvent, removeEvent, setSelectedEvents }}
    >
      {children}
    </SelectedEventsContext.Provider>
  );
};
