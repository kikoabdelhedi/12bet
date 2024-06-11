import React, { useState, useEffect, useContext } from 'react';
import './NavBar.css';
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

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
    { label: 'GG', typeId: 74 },
    { label: 'NG', typeId: 76 }
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
          return odd.price;
        }
      }
    }
    return '-';
  };

  const handleCellClick = (eventName, headerType, value) => {
    if (value !== '-') {
      console.log(value);
      setSelectedEvents(prevEvents => [...prevEvents, { name: eventName, headerType, value }]);
    }
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
            {headers.map(header => (
              <th className="fifo" key={header.typeId}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventLiveData.map(event => (
            <tr key={event.id}>
              <td onClick={() => OneEvent(event.id)}>🌐 {event.name}</td>
              {headers.map(header => (
                <td
                  className="fifo"
                  key={header.typeId}
                  onClick={() =>
                    handleCellClick(
                      event.name,
                      header.label,
                      getOddsLiveByMarketIdAndTypeId(event.marketIds, header.typeId)
                    )
                  }
                >
                  {getOddsLiveByMarketIdAndTypeId(event.marketIds, header.typeId)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Soon;
