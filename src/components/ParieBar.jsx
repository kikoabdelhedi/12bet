import React, { useContext, useEffect, useState } from 'react';
import './NavBar.css';
import data0 from '../data0';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';

function ParieBar() {
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

  const handleSportSelect = (sportId) => {
    setSelectedSport(prevSport => (prevSport === sportId ? null : sportId));
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(prevCategory => (prevCategory === categoryId ? null : categoryId));
  };

  const handleChampSelect = (champId) => {
    console.log('Selected champId:', champId);
    fetchData(champId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div className="hih-container">
    <aside className='bets'>
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
                      <strong onClick={() => handleCategorySelect(category.id)}>{category.name}</strong>
                      {selectedCategory === category.id && (
                        <ul>
                          {category.champIds.map((champId) => {
                            const champ = champsData.find((ch) => ch.id === champId);
                            if (!champ) return null;
                            return (
                              <li key={champ.id} onClick={() => handleChampSelect(champ.id)}>
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
    <div className="hih-table-container">
      <table>
        <thead>
          <tr>
            <th>Match</th>
            {headers.map(header => (
              <th className='hih-fifo' key={header.typeId}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventData.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              {headers.map(header => (
                <td
                  className='hih-fifo'
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
    </div>
  </div>
  );
}

export default ParieBar;
