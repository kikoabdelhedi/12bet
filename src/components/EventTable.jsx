import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';
import { useParams } from 'react-router-dom';
const EventTable = () => {
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const location = useLocation();
  const { champId } = useParams();

  const [eventData, setEventData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [oddData, setOddData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (champId) {
      fetchData(champId);
    }
  }, [champId]);

  const fetchData = async (champId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetOverviewByMarketTypes?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=0&sportId=0&champIds=${champId}`);
      const fetchedData = response.data;
      console.log('Fetched data:', fetchedData);

      const { events, markets, odds } = fetchedData;
      setEventData(events);
      setMarketData(markets);
      setOddData(odds);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
    { label: 'GG', typeId: 74 },
    { label: 'NG', typeId: 76 }
  ];

  const handleCellClick = (eventName, headerType, value) => {
    if (value !== '-') {
      setSelectedEvents(prevEvents => [...prevEvents, { name: eventName, headerType, value }]);
    }
  };

  const getOddsByMarketIdAndTypeId = (marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = marketData.find(market => market.id === marketId);
      if (market) {
        const odd = market.oddIds
          .map(oddId => oddData.find(odd => odd.id === oddId))
          .find(odd => odd && odd.typeId === typeId);
        if (odd) {
          return odd.price;
        }
      }
    }
    return '-';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Match</th>
          {headers.map(header => (
            <th className='fifo' key={header.typeId}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {eventData.map(event => (
          <tr key={event.id}>
            <td>{event.name}</td>
            {headers.map(header => (
              <td
                className='fifo'
                key={header.typeId}
                onClick={() => handleCellClick(
                  event.name,
                  header.label,
                  getOddsByMarketIdAndTypeId(event.marketIds, header.typeId)
                )}
              >
                {getOddsByMarketIdAndTypeId(event.marketIds, header.typeId)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
