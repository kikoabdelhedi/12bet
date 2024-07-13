import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';
import './BetGames.css';

const BetGames = () => {
  const userLogin = localStorage.getItem('login');
  const { selectedEvents, addEvent, removeEvent } = useContext(SelectedEventsContext);

  const [result, setResult] = useState(null);
  const [inputNumber, setInputNumber] = useState(1);
  const [userBalance, setUserBalance] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userLogin}`);
        const userData = response.data;
        setUserBalance(userData.balance);
        setUserId(userData.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userLogin]);

  useEffect(() => {
    if (selectedEvents.length > 0) {
      const totalResult = selectedEvents.reduce((acc, event) => acc * parseFloat(event.idx), 1);
      setResult(totalResult);
    } else {
      setResult(null);
    }
  }, [selectedEvents]);

  const handleInputChange = (e) => {
    setInputNumber(parseFloat(e.target.value));
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

  const placeBet = async () => {
    if (!selectedEvents.length || result === null || inputNumber <= 0) {
        alert("Please select events and enter a valid bet amount.");
        return;
    }

    if (userLogin === null) {
        alert('GO TO LOGIN');
        return;
    }

    // Fetch the latest user balance
    try {
        const balanceResponse = await axios.get(`/api/users/${userId}/balance`);
        if (balanceResponse.data.success) {
            const newBalance = balanceResponse.data.balance;
            setUserBalance(newBalance); // Correctly update the state
            console.log('userBalance', newBalance);

            // Perform the balance check after updating the state
            if (inputNumber > newBalance) {
                alert("Insufficient balance to place the bet.");
                return;
            }
        } else {
            alert("Error fetching balance.");
            return;
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        alert("Error fetching balance.");
        return;
    }

    const match_info = selectedEvents.map(event => ({
        name: event.nameCom,
        type: event.name,
        value: event.idx,
        date: event.formattedDate,
        time: event.formattedTime,
        market: event.selectedMarket,
        state: false
    }));

    const price = inputNumber;
    const userid = userId;
    const totalcote = result;
    const totalbonus = bonusPercentage;
    const totalwin = finalResultWithBonus;

    try {
        const response = await axios.post('http://localhost:4000/api/addSlipBet', {
            match_info,
            price,
            userid,
            totalcote,
            totalbonus,
            totalwin,
            login: userLogin
        });

        if (response.data.success) {
            const deductResponse = await axios.put(`/api/users/${userid}/take-money`, { amount: price });
            if (deductResponse.data.success) {
                setUserBalance(prevBalance => prevBalance - price);
                alert("Bet placed successfully!");
            } else {
                alert("Error deducting balance.");
            }
        } else {
            alert("Error placing bet.");
        }
    } catch (error) {
        console.error('Error placing bet:', error);
        alert("Error placing bet.");
    }
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev); // Toggle visibility state
  };

  const betGamesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (betGamesRef.current && !betGamesRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteEvent = (eventName) => {
    const updatedEvents = selectedEvents.filter(event => event.nameCom !== eventName);
    removeEvent(updatedEvents);
    localStorage.setItem('selectedEvents', JSON.stringify(updatedEvents));
  };

  return (
    <div ref={betGamesRef}>
      <aside className='bets'>
        <button className="bets-header" onClick={toggleVisibility}>Bets</button>
        <div className="bets-content">
          {isVisible && selectedEvents.map((event, index) => (
            <div key={index} className="bet-card">
              <button onClick={() => handleDeleteEvent(event.nameCom)} className="delete-event-button">
                ❌
              </button>
              <span className="bet-value">
                🌐 {event.nameCom}<br />
                <span className="bet-value">Cote: {parseFloat(event.idx).toFixed(2)}</span>
                <br />
                <span className="bet-value">{event.name}</span>
              </span>
            </div>
          ))}
          {isVisible && result !== null && (
            <div className="bet-summary">
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
                    {multipliedResult !== null ? multipliedResult.toFixed(2) : ''}
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
                    {finalResultWithBonus !== null ? finalResultWithBonus.toFixed(2) : ''}
                  </span>
                </div>
                <button onClick={placeBet} className="bet-button">Place Bet</button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default BetGames;
