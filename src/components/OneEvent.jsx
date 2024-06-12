
  
  import React, { useEffect, useState, useContext } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import { SelectedEventsContext } from './SelectedEventsContext';
  
  const OneEvent = () => {
    const [eventLiveData, setEventLiveData] = useState([]);
    const [marketLiveData, setMarketLiveData] = useState([]);
    const [oddLiveData, setOddLiveData] = useState([]);
    const { eventid } = useParams();
    const { setSelectedEvents } = useContext(SelectedEventsContext);
  
    const headers = [
      { label: '1', typeId: 1 },
      { label: 'X', typeId: 2 },
      { label: '2', typeId: 3 },
      { label: 'GG', typeId: 74 },
      { label: 'NG', typeId: 76 },
      { label: '1 or x', typeId: 9 },
      { label: '1 or 2', typeId: 10 },
      { label: 'x or 2', typeId: 11 },
      { label: 'Odd', typeId: 70 },
      { label: 'Even', typeId: 72 },
      { label: '1 & GG', typeId: 78 },
      { label: 'X & GG', typeId: 82 },
      { label: '2 & GG', typeId: 86 },
      { label: '1 & NG', typeId: 80 },
      { label: 'X & NG', typeId: 84 },
      { label: '2 & NG', typeId: 88 },
      { label: '1x & GG', typeId: 1718 },
      { label: '1x & NG', typeId: 1719 },
      { label: '12 & GG', typeId: 1720 },
      { label: '12 & NG', typeId: 1721 },
      
    ];
  
    const fetchEventData = async (eventId) => {
      try {
        const response = await axios.get(
          `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetEventDetails?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventId=${eventId}`
        );
        const eventData = response.data;
        const { markets, odds, name } = eventData;
        
        setMarketLiveData(markets);
        setOddLiveData(odds);
        setEventLiveData([{ id: eventId, name, marketIds: markets.map(market => market.id) }]);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
  
    const getOddsLiveByMarketIdAndTypeId = (markets, odds, marketIds, typeId) => {
      for (let marketId of marketIds) {
        const market = markets.find(market => market.id === marketId);
        if (market && market.desktopOddIds) {
          for (let oddIds of market.desktopOddIds) {
            const oddId = oddIds.find(id => {
              const odd = odds.find(odd => odd.id === id && odd.typeId === typeId);
              return odd !== undefined;
            });
            if (oddId) {
              const odd = odds.find(odd => odd.id === oddId);
              if (odd) {
                return odd.price;
              }
            }
          }
        }
      }
      return '-';
    };
  
    const EventTable = ({ markets, odds, headers, eventData }) => {
      const handleCellClick = (eventName, headerType, value) => {
        if (value !== '-') {
          setSelectedEvents(prevEvents => [...prevEvents, { name: eventName, headerType, value }]);
        }
      };
  
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
                          getOddsLiveByMarketIdAndTypeId(markets, odds, event.marketIds, header.typeId)
                        )
                      }
                    >
                      {getOddsLiveByMarketIdAndTypeId(markets, odds, event.marketIds, header.typeId)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
  
    useEffect(() => {
      fetchEventData(eventid);
    }, [eventid]);
  
    return (
      <div>
        <EventTable
          markets={marketLiveData}
          odds={oddLiveData}
          headers={headers}
          eventData={eventLiveData}
        />
      </div>
    );
  };
  
  export default OneEvent;
  