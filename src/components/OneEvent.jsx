import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SelectedEventsContext } from './SelectedEventsContext';

function OneEvent() {
  const [eventData,setEventData] = useState([])
  const [eventLiveData, setEventLiveData] = useState([]);
  const [marketLiveData, setMarketLiveData] = useState([]);
  const [oddLiveData, setOddLiveData] = useState([]);
  const { eventid } = useParams();
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
    { label: 'GG', typeId: 74 },
    { label: 'NG', typeId: 76 }
  ];

  const OneData = async (eventId) => {
    try {
      const response = await axios.get(
        `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetEventDetails?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventId=${eventId}`
      );
      const eventData = response.data;
      
      // Extract the 'sport' array and 'name' property
      const { markets } = eventData;
      setMarketLiveData(markets)
      const { odds } = eventData;
      setOddLiveData(odds)
      const eventName = eventData.name;
      setEventLiveData(eventName)
  
      // Now you can use 'sport' array and 'eventName' as needed
      console.log('Sport:', markets);
      console.log('odds:', odds);
      console.log('Event Name:', eventName);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };
  
  const getOddsLiveByMarketIdAndTypeId = (markets, odds, marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = markets.find(market => market.id === marketId);
      if (market) {
        const oddId = market.desktopOddIds[0].find(id => odds.find(odd => odd.id === id && odd.typeId === typeId));
        if (oddId) {
          const odd = odds.find(odd => odd.id === oddId);
          if (odd) {
            return odd.price;
          }
        }
      }
    }
    return '-';
  };
  

  const handleCellClick = (eventName, headerType, value) => {
    if (value !== '-') {
      setSelectedEvents(prevEvents => [...prevEvents, { name: eventName, headerType, value }]);
    }
  };

  useEffect(() => {
    OneData(eventid);
  }, [eventid]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Event Name</th>
            {headers.map(header => (
              <th key={header.typeId}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventData.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              {headers.map(header => (
                <td
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
}

export default OneEvent;
