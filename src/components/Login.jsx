import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';
import { useNavigate } from 'react-router-dom';
import './UserComponent.css';
import data0 from '../data0';
import BetGames from './BetGames'; // Move this import to the top
import './LiveNow.css';
import './Login.css';
axios.defaults.baseURL = 'http://192.168.1.239:4000'; // Set your server's base URL

// Your component code here


const Login = () => {
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const headerss = [
    { label: '📃', typeId: 1, path: '/Slip' },
    { label: '🏚️ ', typeId: 2, path: '/Home' },
    { label: '⚙️ ', typeId: 3 , path: '/Home'},
  ];

  const sport = [
    {
      name: 'FOOTBALL',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716804974/867482_xhhold.png',
       path: '/Home'
    },
    {
      name: 'BASKETBALL',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716805006/4855998_kwaqyf.png',
       path: '/Bascet'
    },
    {
      name: 'TENNIS',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716804974/5023365_ahpfwv.png',
       path: '/Tennis'
    },
    {
      name: 'Ice Hockey',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716804974/3753289_qizolb.png',
       path: '/Hockey'
    },
  ];
  const [eventData, setEventData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [oddData, setOddData] = useState([]);
  const [eventLiveNowData, setEventLiveNowData] = useState([]);
  const [marketLiveNowData, setMarketLiveNowData] = useState([]);
  const [oddLiveNowData, setOddLiveNowData] = useState([]);
  const [comLiveNowData, setComLiveNowData] = useState([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login || !password) {
      setMessage('Please fill in both fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/authenticate', { login, password });
      console.log('Server response:', response); // Log the entire response object
      if (response.status === 200) {
        const { id ,login, admin_name, shop_name  } = response.data; // Assuming the user data is returned in the response data
        localStorage.setItem('admin_name', admin_name); // Save the admin_name to localStorage
        localStorage.setItem('login', login); // Save the login to localStorage
        localStorage.setItem('shop_name', shop_name);
        localStorage.setItem('id', id); // Save the shop_name to localStorage
        console.log('User data saved to localStorage:', login, admin_name, shop_name); // Log the entire user data
        console.log('LocalStorage contents:', localStorage);
        setMessage('Authentication successful');
        localStorage.setItem('isConnected', 'true'); // Set the flag
        navigate('/Home'); // Redirect to home page after login
      }
    } catch (error) {
      console.error('Error during authentication:', error); // Log the error for debugging
      if (error.response && error.response.status === 401) {
        setMessage('Invalid login or password');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
  ];

  const fetchLiveNowData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetLivenow?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=10&sportId=66`
      );
      const fetchedLiveNowData = response.data;
      console.log('Fetched data:', fetchedLiveNowData);

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
  const [sportsData, setSportsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [champsData, setChampsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOdd, setSelectedOdd] = useState(null);
  const [selectedOdds, setSelectedOdds] = useState({}); // Change state to an object
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

  const headersss = [
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

  
  


  const getOddsLiveNowByMarketIdAndTypeId = (marketIds, typeId) => {
    for (let marketId of marketIds) {
      const market = marketLiveNowData.find(market => market.id === marketId);
      if (market && market.name === "1x2") {
        console.log(market.name);
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
    <div className="body">
      
      <div className="head-master">
         <header className="header11 ">
        <div className="header11">
          <div >
            <div >
              <div className="col-12 d-flex">
                <ul className="nav navigation-main align-items-center">
                <li className="nav-item">
                   <img className='im' src='https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_150/v1718367699/Koora-bet-365-removebg-preview_hrygyw.png' />
                  </li>
                <li> 
                <form className="login-form" onSubmit={handleSubmit}>
            <div>
                <input 
                    type="text" 
                    value={login} 
                    onChange={handleLoginChange} 
                    placeholder="Login"
                />
            </div>
            <div>
                <input 
                    type="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    placeholder="Password"
                />
            </div>
            <button type="submit" disabled={loading}>
                {'Login'}
            </button>
        </form>
                </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
</div>
<main className="main-container">
    
       
                    
    <img
      src="https://res.cloudinary.com/dqmhtibfm/image/upload/v1720711929/Ajouter_un_titre_1_vvk0yb.png"
      className="custom-slider-img"
      alt="SuperClue"
    />
  




</main>
<table className="center-table">
<thead>
<tr>
<th>🔴 Live</th>
{headerss.map(header => (
<th key={header.typeId} className="fifo">
{header.path ? (
<div to={header.path}>{header.label}</div>
) : (
header.label
)}
</th>
))}
</tr>
</thead>
<tbody>
<tr>
{sport.map((header, index) => (
<td key={index} className="fifo">
<div>{header.name}</div>
<div to={header.path}>
<img src={header.img} alt={header.name} />
</div>
</td>
))}
</tr>
</tbody>
</table>

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
              <tr  className={`fifo ${selectedOdds && selectedOdds.marketId === event.marketIds[0] && selectedOdds.typeId === event.typeId ? 'selected-odd' : ''}`} key={event.id}>
                <td onClick={() => OneEvent(event.id)}>
                  🔥 {homeTeam} vs {awayTeam} <br />
                  ⏳ {event.liveTime} <br />
                  Score: {event.score.join(' ')}
                </td>
                {headers.map(header => (
                  <td
                    className={`fifo ${selectedOdds[event.id] && selectedOdds[event.id].marketId === event.marketIds[0] && selectedOdds[event.id].typeId === header.typeId ? 'selected-odd' : ''}`} // Check for selected odd per event
                    key={header.typeId}
                    onClick={() =>
                      handleCellClick(
                        event.name, // Unique identifier for the event
                        header.label,
                        getOddsLiveNowByMarketIdAndTypeId(event.marketIds, header.typeId),
                        event.startDate, // Pass startDate to handleCellClick
                        event.marketIds[0], // Pass marketId to handleCellClick
                        header.typeId, // Pass typeId to handleCellClick
                        event.id // Pass eventId to handleCellClick
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
                 className={`fifo ${selectedOdds && selectedOdds[event.id] && selectedOdds[event.id].marketId === event.marketIds[0] && selectedOdds[event.id].typeId === header.typeId ? 'selected-odd' : ''}`} // Check for selected odd per event
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
      <BetGames />
    </div>
  );
};

export default Login;
