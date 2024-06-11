import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';

const BetGames = () => {
  const userLogin = localStorage.getItem('login');
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [result, setResult] = useState(null);
  const [inputNumber, setInputNumber] = useState(1);
  const [userBalance, setUserBalance] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user balance from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userLogin}`);
        const userData = response.data;
        setUserBalance(userData.balance);
        setUserId(userData.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [userLogin]);

  useEffect(() => {
    if (selectedEvents.length > 0) {
      const totalResult = selectedEvents.reduce((acc, event) => acc * parseFloat(event.value), 1);
      setResult(totalResult);
    } else {
      setResult(null);
    }
  }, [selectedEvents]);

  const handleDeleteEvent = (indexToDelete) => {
    const updatedEvents = selectedEvents.filter((_, index) => index !== indexToDelete);
    setSelectedEvents(updatedEvents);
    localStorage.setItem('selectedEvents', JSON.stringify(updatedEvents));
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

  const placeBet = async () => {
    if (!selectedEvents.length || result === null || inputNumber <= 0) {
      alert("Please select events and enter a valid bet amount.");
      return;
    }

    if (inputNumber > userBalance) {
      alert("Insufficient balance to place the bet.");
      return;
    }

    const match_info = selectedEvents.map(event => ({
      name: event.name,
      type: event.headerType,
      value: event.value
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
        // Deduct the amount from user's balance
        const deductResponse = await axios.put(`/api/users/${userid}/take-money`, { amount: price });
        if (deductResponse.data.success) {
          setUserBalance(prevBalance => prevBalance - price);
          alert("Bet placed successfully!");
        } else {
          alert("Bet placed successfully!");
        }
      } else {
        alert("Error placing bet.");
      }
    } catch (error) {
      console.error('Error placing bet:', error);
      alert("Error placing bet.");
    }
  };

  return (
    <div>
      <aside className='bets' >
        <p className="bets-header">Bets</p>
        {selectedEvents.map((event, index) => (
          <div key={index} className="bet-card">
            <button
              onClick={() => handleDeleteEvent(index)}
              className="delete-event-button"
            >
              ❌
            </button>
            <i className="fa fa-dot-circle-o" aria-hidden="true" />
            <span className="bet-value">
              🌐 {event.name}<br />
              <span className="bet-value">
                Cote: {parseFloat(event.value).toFixed(2)}
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
  );
};

export default BetGames;
