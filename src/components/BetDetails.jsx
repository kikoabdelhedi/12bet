import React from 'react';
import { useSlipContext } from './SlipContext';
import { useNavigate } from 'react-router-dom';
import { useMatchContext } from './MatchContext';
import './FixturesComponent.css';
import UserComponent from './UserComponent'
import Hello from './Helloo'
function SlipBetDetail() {
    const navigate = useNavigate();
    const { selectedBet } = useSlipContext();
    const { selectMatch } = useMatchContext();

    if (!selectedBet) return <div>Error: No bet details found</div>;

    const handleClick = (match) => {
        selectMatch(match, selectedBet.ids); // Pass both match and selectedBet.ids
        navigate(`/MatchDetail`);
    };

    return (
        <div>
             <UserComponent />
             <Hello />
             <div className="slip-bet-detail">
            
            <div>
                
                <ul>
                    {selectedBet.match_info.map((match, index) => {
                        const [homeTeam, awayTeam] = match.name.split(' vs ');
                        return (
                            <li key={index} onClick={() => handleClick(match)} className="match-info">
                                <span>🌐 {homeTeam} vs {awayTeam}</span>
                                <span>Cote: {match.value}</span>
                                <span>{match.type}</span>
                            </li>
                        );
                    })}
                </ul>
                <p>Price: {selectedBet.price}</p>
                <p>Total Cote: {selectedBet.totalcote}</p>
                <p>Total Win: {selectedBet.totalwin}</p>
            </div>
        </div>
        </div>
       
    );
}

export default SlipBetDetail;
