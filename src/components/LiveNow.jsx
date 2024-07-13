import React, { useState, useEffect, useContext } from 'react';
import './LiveNow.css';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';
import { useNavigate } from 'react-router-dom';

function LiveNow() {
  const navigate = useNavigate();
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [eventLiveNowData, setEventLiveNowData] = useState([]);
  const [marketLiveNowData, setMarketLiveNowData] = useState([]);
  const [oddLiveNowData, setOddLiveNowData] = useState([]);
  const [comLiveNowData, setComLiveNowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOdds, setSelectedOdds] = useState({});

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 }
  ];

  const fetchLiveNowData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetLivenow?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=10&sportId=66`
      );
      const fetchedLiveNowData = response.data;
      const { events, markets, odds, competitors } = fetchedLiveNowData;
      setEventLiveNowData(events);
      setComLiveNowData(competitors);
      setMarketLiveNowData(markets);
      setOddLiveNowData(odds);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveNowData();
    }, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const formatDatee = (startDate) => {
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
    const { formattedDate, formattedTime } = formatDatee(startDate);
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
    setSelectedOdds(prevSelectedOdds => ({
      ...prevSelectedOdds,
      [eventId]: { marketId, typeId }
    }));
  };

  const getOddsLiveNowByMarketIdAndTypeId = (marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = marketLiveNowData.find(market => market.id === marketId);
      if (market && market.name === "1x2") {
        const odd = market.oddIds
          .map(oddId => oddLiveNowData.find(odd => odd.id === oddId))
          .find(odd => odd && odd.typeId === typeId);
        if (odd) {
          return odd.price;
        }
      }
    }
    return '-';
  };

  const OneEvent = (eventid) => {
    navigate(`/OneEvent/${eventid}`);
  };

  return (
    <div className="table1">
      <table>
        <thead>
          <tr>
            <th>💢 Live Now</th>
            {headers.map(header => (
              <th key={header.typeId} className='fifo'>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventLiveNowData.map(event => {
            const [homeTeam, awayTeam] = event.name.split(' vs. ');
            return (
              <tr className='fifo' key={event.id}>
                <td onClick={() => OneEvent(event.id)}>
                  🔥 {homeTeam} vs {awayTeam} <br />
                  ⏳ {event.liveTime} <br />
                  Score: {event.score.join(' ')}
                </td>
                {headers.map(header => (
                  <td
                    className={`fifo ${selectedOdds[event.id] && selectedOdds[event.id].marketId === event.marketIds[0] && selectedOdds[event.id].typeId === header.typeId ? 'selected-odd' : ''}`}
                    key={header.typeId}
                    onClick={() =>
                      handleCellClick(
                        `${homeTeam} vs ${awayTeam}`,
                        header.label,
                        getOddsLiveNowByMarketIdAndTypeId(event.marketIds, header.typeId),
                        event.startDate,
                        event.marketIds[0],
                        header.typeId,
                        event.id
                      )
                    }
                  >
                    {getOddsLiveNowByMarketIdAndTypeId(event.marketIds, header.typeId)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LiveNow;
