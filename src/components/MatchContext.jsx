// MatchContext.js

import React, { createContext, useState, useContext } from 'react';

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [selectedBetIds, setSelectedBetIds] = useState(null); // Initialize selectedBetIds state

    const selectMatch = (match, betIds) => {
        setSelectedMatch(match);
        setSelectedBetIds(betIds); // Set selectedBetIds along with selectedMatch
    };

    return (
        <MatchContext.Provider value={{ selectedMatch, selectedBetIds, selectMatch }}>
            {children}
        </MatchContext.Provider>
    );
};

export const useMatchContext = () => useContext(MatchContext);
