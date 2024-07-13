import React, { useState, useEffect, useContext } from 'react';
import './LiveNow.css';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';
import { useNavigate } from 'react-router-dom';

const Soon = () => {
  const navigate = useNavigate();
  const [eventLiveData, setEventLiveData] = useState([]);
  const [marketLiveData, setMarketLiveData] = useState([]);
  const [oddLiveData, setOddLiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [selectedOdd, setSelectedOdd] = useState({}); // Initialize as an empty object

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
  ];

  const fetchLiveData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetUpcoming?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=10&sportId=66`
      );
      const fetchedLiveData = response.data;
      console.log('Fetched data:', fetchedLiveData);

      const { events, markets, odds } = fetchedLiveData;
      setEventLiveData(events);
      setMarketLiveData(markets);
      setOddLiveData(odds);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getOddsLiveByMarketIdAndTypeId = (marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = marketLiveData.find(market => market.id === marketId);
      if (market) {
        const odd = market.oddIds
          .map(oddId => oddLiveData.find(odd => odd.id === oddId))
          .find(odd => odd && odd.typeId === typeId);
        if (odd) {
          if (odd.price === 0) {
            return '-';
          }
          return odd.price;
        }
      }
    }
    return '-';
  };

  const formatDate = (startDate) => {
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

  const handleCellClick = (eventName, headerType, value, startDate, marketId, typeId, eventId) => {
    const { formattedDate, formattedTime } = formatDate(startDate);
    const selectedMarket = '1x2';

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
        selectedMarket
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

  const OneEvent = (eventid) => {
    navigate(`/OneEvent/${eventid}`);
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  return (
    <div className="table1">
      <table>
        <thead>
          <tr>
            <th>Soon</th>
            <th>🌐 Soon</th>
            {headers.map(header => (
              <th className="fifo" key={header.typeId}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventLiveData.map(event => {
            const [homeTeam, awayTeam] = event.name.split(' vs. ');
            return (
              <tr className="fifo" key={event.id}>
                <td onClick={() => OneEvent(event.id)}>
                  🌐 {homeTeam} vs {awayTeam} <br />
                  {formatDate(event.startDate).formattedDate} {formatDate(event.startDate).formattedTime}
                </td>
                {headers.map(header => (
                  <td
                    className={`fifo ${selectedOdd[event.id] && selectedOdd[event.id].marketId === event.marketIds[0] && selectedOdd[event.id].typeId === header.typeId ? 'selected-odd' : ''}`} // Check for selected odd per event
                    key={header.typeId}
                    onClick={() =>
                      handleCellClick(
                        `${homeTeam} vs ${awayTeam}`, // Unique identifier for the event
                        header.label,
                        getOddsLiveByMarketIdAndTypeId(event.marketIds, header.typeId),
                        event.startDate, // Pass startDate to handleCellClick
                        event.marketIds[0], // Pass marketId to handleCellClick
                        header.typeId, // Pass typeId to handleCellClick
                        event.id // Pass eventId to handleCellClick
                      )
                    }
                  >
                    {getOddsLiveByMarketIdAndTypeId(event.marketIds, header.typeId)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Soon;
