import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';


function Live() {
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [eventLiveNowData, setEventLiveNowData] = useState([]);
  const [marketLiveNowData, setMarketLiveNowData] = useState([]);
  const [oddLiveNowData, setOddLiveNowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logEventNames = () => {
    eventLiveNowData.map(async event => {
      if (event.liveTime === "38'") {
        console.log(event.name, event.score, event.liveTime, 'hthhtht');
        
        // Make POST request to save event data
        try {
          const response = await fetch('https://back-jcpa.onrender.com/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: event.name,
              liveTime: event.liveTime,
              score: event.score,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Event saved:', data);
        } catch (error) {
          console.error('Error saving event:', error);
        }
      }
      return null; // Returning null to satisfy the map function
    });
  };

  useEffect(() => {
    logEventNames();
  }, [eventLiveNowData]);

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
    { label: 'GG', typeId: 74 },
    { label: 'NG', typeId: 76 }
  ];

  const fetchLiveNowData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetLivenow?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&sportId=66&eventCount=20`);
      const fetchedLiveNowData = response.data;
      console.log('Fetched data:', fetchedLiveNowData);

      const { events, markets, odds } = fetchedLiveNowData;
      setEventLiveNowData(events);
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

  const handleCellClick = (eventName, headerType, value) => {
    if (value !== '-') {
      const newEvent = { name: eventName, headerType, value };
      const updatedEvents = [...selectedEvents, newEvent];
      setSelectedEvents(updatedEvents);
      localStorage.setItem('selectedEvents', JSON.stringify(updatedEvents));
    }
  };

  const getOddsLiveNowByMarketIdAndTypeId = (marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = marketLiveNowData.find(market => market.id === marketId);
      if (market) {
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
          {eventLiveNowData.map(event => (
            <tr className='fifo' key={event.id}>
              <td>
                🔥 {event.name} <br />
                ⏳ {event.liveTime} <br />
                Score: {event.score.join(' ')}
              </td>
              {headers.map(header => (
                <td
                  className='fifo'
                  key={header.typeId}
                  onClick={() => handleCellClick(
                    event.name,
                    header.label,
                    getOddsLiveNowByMarketIdAndTypeId(event.marketIds, header.typeId)
                  )}
                >
                  {getOddsLiveNowByMarketIdAndTypeId(event.marketIds, header.typeId)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Live;
