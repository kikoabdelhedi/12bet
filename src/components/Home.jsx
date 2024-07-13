import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data0 from '../data0';
import ParieBar from './ParieBar';
import UserComponent from './UserComponent';
import BetGames from './BetGames';
import LiveNow from './LiveNow';
import Soon from './Soon';
import Hello from './Helloo';

import './main.min.css';
import './print.min.css';
import './select2.min.css';



function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
    <div className='home'>
      <UserComponent />
      <Hello />
      <LiveNow />
      <Soon />
      <ParieBar />
      <BetGames />
    </div>
  );
}

export default Home;
