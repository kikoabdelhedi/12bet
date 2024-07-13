import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FixturesComponent.css';
import { useNavigate } from 'react-router-dom';
import { SlipProvider, useSlipContext } from './SlipContext';
import UserComponent from './UserComponent'
import Hello from './Helloo'

function Slip() {
    const { selectBet } = useSlipContext();
    const navigate = useNavigate();
    const [slipBets, setSlipBets] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.239:4000/api/slipbets');
                setSlipBets(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const userLogin = localStorage.getItem('login');
    const filteredSlipBets = slipBets.filter(bet => bet.login === userLogin);
    console.log('slip : ' , filteredSlipBets)
    const handleClick = (bet) => {
        selectBet(bet); // Assuming selectBet is a function to set the selected bet in context
        navigate(`/bet`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <SlipProvider>
            <UserComponent />
            <Hello />
            <div className="container">
                {filteredSlipBets.map((bet, betIndex) => (
                    <button
                        key={betIndex} // Using betIndex as the key
                        onClick={() => handleClick(bet)}
                        className="bet-button"
                    >
                        <div className="bet-card14">
                            <span>
                                {bet.match_info.map((match, matchIndex) => {
                                    const [homeTeam, awayTeam] = match.name.split(' vs ');
                                    return (
                                        <span key={`${betIndex}-${matchIndex}`}> {/* Ensure unique key */}
                                            <div className="bet-card">
                                                <span className="bet-value">
                                                    {homeTeam} <br /> {awayTeam}
                                                </span>
                                                <span className="">
                                                    <span className="cote">Cote: {match.value}</span><br />
                                                    <span className="type">{match.type}</span>
                                                </span>
                                            </div>
                                        </span>
                                    );
                                })}
                            </span>
                            <div className="bet-details">
    <p className="bet-detail">Price: {bet.price}</p>
    <p className="bet-detail">Cote: {parseFloat(bet.totalcote).toFixed(2)}</p>
    <p className="bet-detail">Total Bonus: {bet.totalbonus}%</p>
    <p className={`bet-detail ${bet.status === true ? 'green-background' : 'white-background'}`}>Win: {parseFloat(bet.totalwin).toFixed(2)}</p>
    {bet.statusfalse === true && (
        <p className="bet-detail red-background">Lost</p>
    )}
</div>

                        </div>
                    </button>
                ))}
            </div>
        </SlipProvider>
    );
}

export default Slip;
