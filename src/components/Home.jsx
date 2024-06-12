import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NavBar.css'
import data0 from '../data0'
import { Link } from 'react-router-dom';
import './desktop.99fbd35c0.css'
import './13748.fe3c11cb9.css'
import './66506.94e2ffff6.css'
import './72947.6737d5583.css'
import './45710.c53450864.css'
import './1302.321450720.css'
import './97428.1fdb236e6.css'
import './71277.f50bd4cfc.css'
import SlotMachine from './SlotMachine';
import EventTable from './EventTable';
function Home() {
  
  const handleEventNameClick = (eventId) => {
    console.log('Event ID:', eventId);
    // You can perform any additional actions here
  };
  //
  const fetchEventDetails = async (eventId) => {
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetEventDetails`, {
        params: {
          culture: 'en-GB',
          timezoneOffset: -60,
          integration: 'starsbet365',
          deviceType: 1,
          numFormat: 'en-GB',
          countryCode: 'TN',
          eventId: eventId
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      return null; // Return null or handle the error appropriately
    }
  };

  const handleDeleteEvent = (indexToDelete) => {
    setSelectedEvents((prevEvents) =>
      prevEvents.filter((_, index) => index !== indexToDelete)
    );
  };
  
  const logEventId = async (eventId) => {
    console.log('Clicked Event ID:', eventId);
    await OneData(eventId);
  };
  const userBets=localStorage.login
  console.log(userBets,'rrrrddd')
  const OneData = async (eventId) => {
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetEventDetails?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventId=${eventId}`);
      const OneData = response.data;
      console.log('Event Data:', OneData);
      // Now you have the eventData, you can do further processing here
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };
  
  
  const placeBet = async () => {
    if (!selectedEvents.length || result === null || inputNumber <= 0) {
      alert("Please select events and enter a valid bet amount.");
      return;
    }
  
    // Constructing match_info as an array of objects
    const match_info = selectedEvents.map(event => ({
      name: event.name,
      type: event.headerType,
      value: event.value
    }));
  
    const price = inputNumber;
    const userid = 5; // Replace with the actual user ID
    const totalcote = result;
    const totalbonus = bonusPercentage;
    const totalwin = finalResultWithBonus;
    const login = userBets;
    try {
      const response = await axios.post('https://back-jcpa.onrender.com/api/addSlipBet', {
        match_info,
        price,
        userid,
        totalcote,
        totalbonus,
        totalwin,
        login
      });
      if (response.data.success) {
        alert("Bet placed successfully!");
      } else {
        alert("Error placing bet.");
      }
    } catch (error) {
      console.error('Error placing bet:', error);
      alert("Error placing bet.");
    }
  };
  
  
  console.log(data0,'toktok')
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const [sportsData, setSportsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [champsData, setChampsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [eventLiveData, setEventLiveData] = useState([]);
  const [eventLiveNowData, setEventLiveNowData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [marketLiveData, setMarketLiveData] = useState([]);
  const [marketLiveNowData, setMarketLiveNowData] = useState([]);
  const [oddData, setOddData] = useState([]);
  const [oddLiveData, setOddLiveData] = useState([]);
  const [oddLiveNowData, setOddLiveNowData] = useState([]);
  const [competitorData, setCompetitorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [result, setResult] = useState(null);
  const [inputNumber, setInputNumber] = useState(1);
 


  const handleInputChange = (e) => {
    setInputNumber(e.target.value);
  };

  const calculateBonus = () => {
    let bonusPercentage = 0;

    if (selectedEvents.length >= 5) {
      bonusPercentage += 7;
      if (selectedEvents.length > 5) {
        bonusPercentage += (selectedEvents.length - 5) * 5;
      }
    }

    return bonusPercentage;
  };

  const bonusPercentage = calculateBonus();
  const multipliedResult = result !== null ? result * inputNumber : null;
  const finalResultWithBonus = multipliedResult !== null ? multipliedResult * (1 + bonusPercentage / 100) : null;

  const fetchData = async (champId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetOverviewByMarketTypes?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=0&sportId=0&champIds=${champId}`);
      const fetchedData = response.data;
      console.log('Fetched data:', fetchedData); // Log the fetched data here

      const { events, markets, odds, competitors } = fetchedData;
      setEventData(events);
      setMarketData(markets);
      setOddData(odds);
      setCompetitorData(competitors);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetUpcoming?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=10&sportId=66`);
      const fetchedLiveData = response.data;
      console.log('Fetched data11:', fetchedLiveData); // Log the fetched data here

      const { events, markets, odds} = fetchedLiveData;
      setEventLiveData(events);
      setMarketLiveData(markets);
      setOddLiveData(odds);
    
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

 
  const fetchLiveNowData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetLivenow?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventCount=10&sportId=66`);
      const fetchedLiveNowData = response.data;
      console.log('Fetched data333:', fetchedLiveNowData); // Log the fetched data here

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


  console.log(eventData,'hyhyhyhyhyhyh');

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
    fetchLiveData();
    fetchLiveNowData();
   
  }, []);
 

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

  useEffect(() => {
    if (selectedEvents.length > 0) {
      const result = selectedEvents.reduce((acc, val) => acc * val.value, 1);
      setResult(result);
    }
  }, [selectedEvents]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const headers = [
    { label: '1', typeId: 1 },
    { label: 'X', typeId: 2 },
    { label: '2', typeId: 3 },
    { label: 'GG', typeId: 74 },
    { label: 'NG', typeId: 76 }
  ];
  

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

  const handleCellClick = (eventName, headerType, value) => {
    if (value !== 'N/A') {
      console.log(value);
      setSelectedEvents(prevEvents => [...prevEvents, { name: eventName, headerType, value }]);
    }
  };

 
 
  return (
    <div>
       <body className="webp">
    <div id="app" data-v-app="">
        <div className="ColorScheme_root_XJLuF colorSchemeDark">
            <div id="app">
                <div data-v-5e0c26d4="">
                    <div data-v-5e0c26d4="" id="main-container" className="">
                        <div data-v-034aa6c6="" data-v-5e0c26d4="" className="header__line--top">
                            <div data-v-034aa6c6="" className="header-line-left">
                                <div data-v-034aa6c6="" className="level-item"></div>
                                <div data-v-034aa6c6="" className="divider"></div>
                                <a data-v-034aa6c6="" className="FreeMoneyLink_root_sudSD">
                                    <span className="FreeMoneyLink_text_qBSgN">login!</span>
                                    <img className="FreeMoneyLink_image_qU_wg" src='https://cdn1win.com/img/free-money-link-image.1ada0c9e1-120.png' />
                                </a>
                            </div>
                            <div data-v-034aa6c6="" className="header-line-right">
                                <div data-v-034aa6c6="" className="header-line-right--item">
                                    <div data-v-034aa6c6="" className="df">
                                        <div className="BonusLink_root_fPfSB">
                                            <div className="BonusLink_text_qr3iZ">Promotions and bonuses</div>
                                            <img className="BonusLink_image_LmUxS" src="./1win_files/present-with-light.bd57fb068-151.png" />
                                        </div>
                                        <a data-v-034aa6c6="" href="https://1wsqia.life/free-money" className="HeaderTopCarRaffle_root_cjP3m">
                                            <span className="HeaderTopCarRaffle_prefix_NNQsu" style={{ backgroundImage: "linear-gradient(161deg, rgb(109, 40, 255) 0.97%, rgb(250, 0, 255) 100%), linear-gradient(161deg, rgb(0, 178, 255) 0.97%, rgb(0, 61, 218) 100%)" }}>
                                                <img src="./1win_files/carRaffleDesktopHeaderTicket.1a4740acc.svg" />
                                            </span>
                                            <p className="HeaderTopCarRaffle_text_xl8mW">Lucky Drive</p>
                                            <img src="./1win_files/headerLink.png" className="HeaderTopCarRaffle_image_Crqu5" />
                                        </a>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                        {/* Remaining HTML elements here... */}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div data-v-62a02a6c="" className="home__header">
  <div data-v-62a02a6c="" className="home__header-content">
    <div data-v-62a02a6c="" className="home__header-carousel">
      <div
        data-v-56810392=""
        data-v-62a02a6c=""
        className="slider home__banner-carousel"
      >
        <div data-v-56810392="" className="slider_container">
          <div data-v-56810392="" className="slider_slide slider_slide--first">
            <img
              src="https://cdn1win.com/img/1winpoker_en-min.6d3a2845f-1979.png"
              className="VPicture_opaqueImage_St2Jk VPicture_image_wmhVO"
              loading="eager"
            />
           
          </div>
        </div>
       
        
      </div>
    </div>
    <div data-v-62a02a6c="" className='home__header-promo'>
      <div data-v-62a02a6c="">
        <div
          className="VScaler_item_Vw0Wh"
          style={{
            height: 320,
            transform: "scale(1.05937)",
            width: "276.578px"
          }}
        >
          <div className="VSlide_root_n31U8 VSlide_typeSmile_dNfKl">
            <img
              className="ResponsivePicture_img_N2UWA"
              src="https://res.cloudinary.com/dqmhtibfm/image/upload/v1716830618/220815-Crown-Perth-Gaming-Blackjack-1800x1200px-6_yi1ecr.jpg"
              loading="lazy"
            />
            <div className="VSlide_content_OTd5l">
              <div className="VSlide_title_wo5B8">
                Cashback up to 30% on casinos
              </div>
              <button
                type="button"
                className="VSlide_button_cgyZ1"
                style={{ fontSize: 18 }}
              >
                Go to casino
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-v-62a02a6c="" className='home__header-promo'>
      <div data-v-62a02a6c="">
        <div
          className="VScaler_item_Vw0Wh"
          style={{
            height: 320,
            transform: "scale(1.05937)",
            width: "276.578px"
          }}
        >
          <div className="VSlide_root_n31U8 VSlide_typeSmile_dNfKl">
            <img
              className="ResponsivePicture_img_N2UWA"
              src="https://casino.acp-tools.com/assets/uploadsmy/casino_games/Ceazy-Time-background_Game_1440x900.jpg"
              loading="lazy"
            />
            <div className="VSlide_content_OTd5l">
              <div className="VSlide_title_wo5B8">Bonus + 500%</div>
              <button
                type="button"
                className="VSlide_button_cgyZ1"
                style={{ fontSize: 18 }}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




<div data-v-62a02a6c="" className="home__promos home__section">
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/SlipBets'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
        MyBETS
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <a
    data-v-1e11f167=""
    data-v-62a02a6c=""
    href="https://1wsqia.life/casino"
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
        Сasino
      </div>
      <div data-v-1e11f167="" className="promo-card__message">
        Over 3000 games
      </div>
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </a>
  <a
    data-v-1e11f167=""
    data-v-62a02a6c=""
    href="https://1wsqia.life/casino/list/3"
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
        Live-Games
      </div>
      <div data-v-1e11f167="" className="promo-card__message">
        Live dealers
      </div>
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </a>
  <a
    data-v-1e11f167=""
    data-v-62a02a6c=""
    href="https://1wsqia.life/poker"
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
        Poker
      </div>
      <div data-v-1e11f167="" className="promo-card__message">
        Free Tournaments
      </div>
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </a>
</div>





</body>

   
      <>
        <div className="container">
        <aside className="menu">
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
          <div className="table-container">
         <table>
            <thead>
              <tr>
              <th>💢 Live Now </th>
                {headers.map(header => (
                  <th key={header.typeId} className='fifo'>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventLiveNowData.map(event => (
              
                <tr key={event.id} >
                 <td>
  🔥 {event.name} <br/>
  ⏳ {event.liveTime} <br/> 
      score :  {event.score.join(' ')}
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
            
            <div className="table1">
            <table>
            <thead>
              <tr>
              <th> Soon </th>
                {headers.map(header => (
                  <th className='fifo' key={header.typeId}>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
  {eventLiveData.map(event => (
    <tr key={event.id}>
      <td onClick={() => OneData(event.id)}>🌐 {event.name}</td>
      {headers.map(header => (
                    <td
                    className='fifo'
                      key={header.typeId}
                      onClick={() => handleCellClick(
                      event.name,
                        header.label,
                        getOddsLiveByMarketIdAndTypeId(event.marketIds, header.typeId)
                      )}
                    >
                      {getOddsLiveByMarketIdAndTypeId(event.marketIds, header.typeId)}
                    </td>
                  ))}
                </tr>
              ))}
</tbody>

          </table>
            </div>
          </div>
          <aside className="bets">
  <p className="bets-header">Bets</p>
  {selectedEvents.map((event, index) => (
    <div key={index} className="bet-card">
       <button
        onClick={() => handleDeleteEvent(index)} // Call handleDeleteEvent with the index of the event to delete
        className="delete-event-button"
      >
        ❌
      </button>
      <i className="fa fa-dot-circle-o" aria-hidden="true" />
      <span className="bet-value">
      🌐 {event.name}<br/>
        <span className="bet-value">
        cote:  {parseFloat(event.value).toFixed(2)}
        </span>
        <br />
        <span className="bet-value">
       {event.headerType}
        </span>
      </span>
     
    </div>
    
  ))}
  <div className="bet-summary">
    {result !== null && (
      <div>
        <div>
          Result: <span className="bet-result">{result.toFixed(2)}</span>
        </div>
        <div>
          Multiply by:
          <input
            type="number"
            value={inputNumber}
            onChange={handleInputChange}
            className="bet-input"
          />
        </div>
        <div>
          Multiplied Result:{" "}
          <span className="bet-multiplied-result">
            {multipliedResult.toFixed(2)}
          </span>
        </div>
        <div>
          Bonus Percentage:{" "}
          <span className="bet-bonus-percentage">
            {bonusPercentage.toFixed(2)}%
          </span>
        </div>
        <div>
          Final Result with Bonus:{" "}
          <span className="bet-final-result">
            {finalResultWithBonus.toFixed(2)}
          </span>
        </div>
        <button onClick={placeBet} className="bet-button">Place Bet</button>
      </div>
    )}
  </div>
</aside>

        </div>

        <div className="container">
          <aside>
          </aside>
          <div className="table-container">
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
                  <td onClick={() => OneData(event.id)}>{event.name}</td>
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
          </div>
          <aside>
          </aside>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div
                className="col-lg-12 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.25s"
              >
                <p>
                  © Copyright 2021 Space Dynamic Co. All Rights Reserved.
                  <br />
                  Design:{" "}
                  <a rel="nofollow" href="https://templatemo.com">
                    TemplateMo
                  </a>
                </p>
              </div>
            </div>z
          </div>
        </footer>
        {/* Scripts */}
      </>
    </div>
  );
}

export default Home;
