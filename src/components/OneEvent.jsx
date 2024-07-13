import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SelectedEventsContext } from './SelectedEventsContext';
import './OneEvent.css';
import Hello from './Helloo';
import BetGames from './BetGames';

const OneEvent = () => {
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [eventLiveData, setEventLiveData] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedOddNames, setSelectedOddNames] = useState([]);
  const [selectedOddPrices, setSelectedOddPrices] = useState([]);
  const [selectedOddIndex, setSelectedOddIndex] = useState(null); // Add state for selected odd index
  const [selectedOdd, setSelectedOdd] = useState({}); // Initialize as an empty object
  const { eventid } = useParams();

  useEffect(() => {
    const fetchEventData = async (eventId) => {
      try {
        const response = await axios.get(
          `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetEventDetails?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventId=${eventId}`
        );
        const eventData = response.data;
        setEventLiveData(eventData);
      } catch (error) {
        return;
      }
    };

    fetchEventData(eventid);
  }, [eventid]);

  const handleMarketClick = (shortName) => {
    const uniqueMarketNames = new Set();
    const market = eventLiveData.markets.find(market => {
      if (uniqueMarketNames.has(market.shortName)) {
        return false; // Skip if market shortName is already in the set
      }
      uniqueMarketNames.add(market.shortName);
      return market.shortName === shortName;
    });

    setSelectedMarket(market);
    const selectedOddsId = market.desktopOddIds.flat().map(oddId => Number(oddId));

    const loggedOddsId = new Set();
    const uniqueNames = new Set();
    const names = [];
    const prices = [];

    selectedOddsId.forEach(oddId => {
      if (!loggedOddsId.has(oddId)) {
        loggedOddsId.add(oddId);
        const matchingOdd = eventLiveData.odds.find(odd => odd.id === oddId);
        if (matchingOdd) {
          if (!uniqueNames.has(matchingOdd.name)) {
            uniqueNames.add(matchingOdd.name);
            names.push(matchingOdd.name);
            prices.push(matchingOdd.price);
          }
        }
      }
    });

    setSelectedOddNames(names);
    setSelectedOddPrices(prices);
  };

  if (!eventLiveData) {
    return <div>Loading...</div>;
  }

  const { competitors, markets, startDate } = eventLiveData;
  const uniqueMarketNames = Array.from(new Set(markets.map(market => market.shortName)));
  const nameCom = competitors.map(competitor => competitor.name).join(" vs ");

  const formatDateAndTime = (startDate) => {
    const date = new Date(startDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateAndTime(startDate);

  const handleCellClick = (eventName, headerType, value, startDate, marketId, typeId, eventId, idx) => {
    const { formattedDate, formattedTime } = formatDateAndTime(startDate);
    const selectedMarket = '1x2';
    setSelectedOddIndex(idx);
    // Check if the event already exists in selectedEvents
    const existingEventIndex = selectedEvents.findIndex(event => event.nameCom === eventName);

    if (existingEventIndex !== -1) {
      // Event already exists, update it
      const updatedEvents = [...selectedEvents];
      updatedEvents[existingEventIndex] = {
        ...selectedEvents[existingEventIndex],
        name: headerType,
        idx: value,
        formattedDate,
        formattedTime,
        selectedMarket,
      };

      setSelectedEvents(updatedEvents);
    } else {
      // Event doesn't exist, add it to selectedEvents
      setSelectedEvents(prevEvents => [
        ...prevEvents,
        { nameCom: eventName, name: headerType, idx: value, formattedDate, formattedTime, selectedMarket }
      ]);
    }

    // Track the selected odd per event
    setSelectedOdd(prevSelectedOdds => ({
      ...prevSelectedOdds,
      [eventId]: { marketId, typeId }
    }));
  };

  return (
    <div className="one-event">
      <Hello />
      <h1 className="competitors">{nameCom}</h1>
      <div>
        {uniqueMarketNames.map((marketName, index) => (
          <div key={index} className={`market`}>
            <span onClick={() => handleMarketClick(marketName)}>{marketName}</span>
            {selectedMarket && selectedMarket.shortName === marketName && (
              <>
                <table className="odds-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOddNames.map((name, idx) => (
                      <tr key={idx} onClick={() => handleCellClick(nameCom, name, selectedOddPrices[idx], startDate, selectedMarket.marketId, idx, eventid)}
                      className={`fifo ${selectedOddIndex === idx ? 'selected-odd' : ''}`}>
                        <td>{name}</td>
                        <td>{selectedOddPrices[idx]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ))}
      </div>
      <BetGames />
    </div>
  );
};

export default OneEvent;
