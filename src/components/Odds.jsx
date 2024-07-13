import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Odds() {
    const [eventLiveData, setEventLiveData] = useState(null);
    const { market } = useParams();
    const { eventid } = useParams();
    const [selectedOdds, setSelectedOdds] = useState([]);
  console.log(market)
  console.log(eventid)
    // useEffect(() => {
    //   const fetchEventData = async (eventId) => {
    //     try {
    //       const response = await axios.get(
    //         `https://sb2frontend-1-altenar2.biahosted.com/api/widget/GetEventDetails?culture=en-GB&timezoneOffset=-60&integration=starsbet365&deviceType=1&numFormat=en-GB&countryCode=TN&eventId=${eventId}`
    //       );
    //       const eventData = response.data;
    //       setEventLiveData(eventData);
    //     } catch (error) {
    //       console.error('Error fetching event data:', error);
    //     }
    //   };
  
    //   fetchEventData(eventid);
    // }, [eventid]);
  
    // const renderOddsForMarket = (market) => {
    //   const matchedOdds = [];
    //   market.forEach((marketId) => {
    //     marketId = Number(marketId); // Convert marketId to a number
    //     eventLiveData.odds.forEach((odd) => {
    //       if (odd.id === marketId) {
    //         matchedOdds.push({ id: odd.id, name: odd.name, price: odd.price });
    //         console.log(`ID: ${odd.id}, Name: ${odd.name}, Price: ${odd.price}`); // Log odds data
    //       }
    //     });
    //   });
    //   setSelectedOdds(matchedOdds); // Update selectedOdds state with matched odds
    // };
  
    if (!eventLiveData) {
      return <div>Loading...</div>;
    }
 
      
  return (
    <div>Odds</div>
  )
}

export default Odds