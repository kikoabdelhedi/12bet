import React, { createContext, useState, useContext } from 'react';

const SlipContext = createContext();

export const SlipProvider = ({ children }) => {
    const [selectedBet, setSelectedBet] = useState(null);

    const selectBet = (bet) => {
        setSelectedBet(bet);
    };

    return (
        <SlipContext.Provider value={{ selectedBet, selectBet }}>
            {children}
        </SlipContext.Provider>
    );
};

export const useSlipContext = () => useContext(SlipContext);
