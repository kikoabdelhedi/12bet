import React, { useContext, useEffect, useState } from 'react';
import './ParieBar.css'; // Including ParieBar.css
import data0 from '../data0';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';
import { useNavigate } from 'react-router-dom';

function ParieBar() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [oddData, setOddData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sportsData, setSportsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [champsData, setChampsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [selectedOdd, setSelectedOdd] = useState(null);

  useEffect(() => {
    const fetchDataForSelectedSport = async () => {
      try {
        const data = await data0;
        setSportsData(data.sports);
        setCategoriesData(data.categories);
        setChampsData(data.champs);
      } catch (error) {
        setError(error);
      }
    };

    fetchDataForSelectedSport();
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
    setSelectedOdd(prevSelectedOdds => ({
      ...prevSelectedOdds,
      [eventId]: { marketId, typeId }
    }));
  };

  const fetchData = async (champId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetOverviewByMarketTypes?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=0&sportId=0&champIds=${champId}`
      );
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
  ];

  const getOddsByMarketIdAndTypeId = (marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = marketData.find((market) => market.id === marketId);
      if (market) {
        const odd = market.oddIds
          .map((oddId) => oddData.find((odd) => odd.id === oddId))
          .find((odd) => odd && odd.typeId === typeId);
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

  const handleSportSelect = (sportId) => {
    setSelectedSport((prevSport) => (prevSport === sportId ? null : sportId));
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevCategory) => (prevCategory === categoryId ? null : categoryId));
  };

  const handleChampSelect = (champId) => {
    console.log('Selected champId:', champId);
    fetchData(champId);
  };

  const OneEvent = (eventid) => {
    navigate(`/OneEvent/${eventid}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <div className="table1">
        <table>
          <thead>
            <tr>
              <th>Match</th>
              {headers.map((header) => (
                <th key={header.typeId}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {eventData.map((event) => {
              const [homeTeam, awayTeam] = event.name.split(' vs. ');
              return (
                <tr className='fifo' key={event.id}>
                  <td onClick={() => OneEvent(event.id)}>
                    🌐 {homeTeam} vs {awayTeam} <br />
                    {formatDatee(event.startDate).formattedDate} {formatDatee(event.startDate).formattedTime}
                  </td>
                  {headers.map(header => (
                    <td
                      className={`fifo ${selectedOdd && selectedOdd[event.id] && selectedOdd[event.id].marketId === event.marketIds[0] && selectedOdd[event.id].typeId === header.typeId ? 'selected-odd' : ''}`} // Check for selected odd per event
                      key={header.typeId}
                      onClick={() =>
                        handleCellClick(
                          `${homeTeam} vs ${awayTeam}`, // Unique identifier for the event
                          header.label,
                          getOddsByMarketIdAndTypeId(event.marketIds, header.typeId),
                          event.startDate, // Pass startDate to handleCellClick
                          event.marketIds[0], // Pass marketId to handleCellClick
                          header.typeId, // Pass typeId to handleCellClick
                          event.id // Pass eventId to handleCellClick
                        )
                      }
                    >
                      {getOddsByMarketIdAndTypeId(event.marketIds, header.typeId)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <aside>
        <p>Menu</p>
        <ul>
          {sportsData.map((sport) => (
            <li key={sport.id}>
              <strong onClick={() => handleSportSelect(sport.id)}>{sport.name}</strong>
              {selectedSport === sport.id && (
                <ul>
                  {sport.catIds.map((catId) => {
                    const category = categoriesData.find((cat) => cat.id === catId);
                    if (!category) return null;
                    return (
                      <li key={category.id}>
                        <strong onClick={() => handleCategorySelect(category.id)}>
                          {category.name}
                        </strong>
                        {selectedCategory === category.id && (
                          <ul>
                            {category.champIds.map((champId) => {
                              const champ = champsData.find((ch) => ch.id === champId);
                              if (!champ) return null;
                              return (
                                <li
                                  key={champ.id}
                                  onClick={() => handleChampSelect(champ.id)}
                                >
                                  {champ.name}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default ParieBar;
