import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FixturesComponent.css';
const APIkey = 'ae5846873575d8d4b730458ed8c4479d221fafde23ae39845e5d2ceb91fd3da1';
const from = '2024-06-25';
const to = '2024-07-05';

const FixturesComponent = () => {
    const [slipBets, setSlipBets] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [finalResult, setFinalResult] = useState('');
    const [homeGoals, setHomeGoals] = useState([]);
    const [awayGoals, setAwayGoals] = useState([]);
    const [myHomeTeams, setMyHomeTeams] = useState([]);
    const [myAwayTeams, setMyAwayTeams] = useState([]);
    const [myTypes, setMyTypes] = useState([]);
    const [matchOutcomes, setMatchOutcomes] = useState({}); // State to store match outcomes

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fixturesResponse = await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${APIkey}&from=${from}&to=${to}`);
                setFixtures(fixturesResponse.data.result);
                console.log('Fixtures Data:', fixturesResponse.data.result);

                const response = await axios.get('/api/slipbets');
                setSlipBets(response.data);
                console.log('Slip Bets Data:', response.data);

                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const userLogin = localStorage.getItem('login');
    console.log('LocalStorage contents:', userLogin);

    // Filter slip bets based on the login from localStorage
    const filteredSlipBets = slipBets.filter(bet => bet.login === userLogin);
    console.log(filteredSlipBets, 'rer');

    useEffect(() => {
        // Process fixtures data
        const homeTeams = [];
        const awayTeams = [];
        const finalResults = [];
        const homeGoalsList = [];
        const awayGoalsList = [];

        fixtures.forEach(fixture => {
            homeTeams.push(fixture.event_home_team);
            awayTeams.push(fixture.event_away_team);
            finalResults.push(fixture.event_final_result);
            const [homeGoals, awayGoals] = fixture.event_final_result ? fixture.event_final_result.split('-').map(Number) : [0, 0];
            homeGoalsList.push(homeGoals);
            awayGoalsList.push(awayGoals);
        });

        setHomeTeam(homeTeams.join(', '));
        setAwayTeam(awayTeams.join(', '));
        setFinalResult(finalResults.join(', '));
        setHomeGoals(homeGoalsList);
        setAwayGoals(awayGoalsList);

        console.log('Processed Fixtures Data:');
        console.log('Home Team:', homeTeam);
        console.log('Away Team:', awayTeam);
        console.log('Final Result:', finalResult);
        console.log('Home Goals:', homeGoals);
        console.log('Away Goals:', awayGoals);

        // Process slip bets
        const filteredSlipBets = slipBets.filter(bet => bet.login === userLogin);
        const myHomeTeamsArray = [];
        const myAwayTeamsArray = [];
        const myTypesArray = [];

        filteredSlipBets.forEach(match => {
            match.match_info.forEach(one => {
                const [homeTeam, awayTeam] = one.name.split(' vs. ');
                myHomeTeamsArray.push(homeTeam);
                myAwayTeamsArray.push(awayTeam);
                myTypesArray.push(one.type);
            });
        });

        setMyHomeTeams(myHomeTeamsArray);
        setMyAwayTeams(myAwayTeamsArray);
        setMyTypes(myTypesArray);

        console.log('Processed Slip Bets Data:');
        console.log('My Home Teams:', myHomeTeams);
        console.log('My Away Teams:', myAwayTeams);
        console.log('My Types:', myTypes);
    }, [fixtures, slipBets]);

    const checkMatchResult = (homeTeam, awayTeam, type) => {
        const matchedFixture = fixtures.find(fixture =>
            (fixture.event_home_team === homeTeam && fixture.event_away_team === awayTeam)
        ); 
        // const homeSubstrings = getAllSubstrings(homeTeam, 3);
        // const awaySubstrings = getAllSubstrings(awayTeam, 3);
    
        // const matchedFixture = fixtures.find(fixture =>
        //     homeSubstrings.some(sub => fixture.event_home_team.includes(sub)) &&
        //     awaySubstrings.some(sub => fixture.event_away_team.includes(sub))
        // );
    
        if (!matchedFixture) {
            return { result: 'Match not finished', outcome: undefined };
        }
    
        if (!matchedFixture.event_final_result) {
            return { result: 'Match not finished', outcome: undefined };
        }
    
        const [homeGoals, awayGoals] = matchedFixture.event_final_result.split('-').map(Number);
    
        let matchResult = false;
    
        switch (type) {
            case '1':
                matchResult = homeGoals > awayGoals;
                break;
            case 'X':
                matchResult = homeGoals === awayGoals;
                break;
            case '2':
                matchResult = awayGoals > homeGoals;
                break;
            case 'GG':
                matchResult = homeGoals > 0 && awayGoals > 0;
                break;
            case 'NG':
                matchResult = homeGoals === 0 || awayGoals === 0;
                break;
            case 'Over 0.5':
                matchResult = homeGoals + awayGoals > 0.5;
                break;
            case 'Over 0.75':
                matchResult = homeGoals + awayGoals > 0.75;
                break;
            case 'Over 1':
                matchResult = homeGoals + awayGoals > 1;
                break;
            case 'Over 1.25':
                matchResult = homeGoals + awayGoals > 1.25;
                break;
            case 'Over 1.5':
                matchResult = homeGoals + awayGoals > 1.5;
                break;
            case 'Over 1.75':
                matchResult = homeGoals + awayGoals > 1.75;
                break;
            case 'Over 2':
                matchResult = homeGoals + awayGoals > 2;
                break;
            case 'Over 2.25':
                matchResult = homeGoals + awayGoals > 2.25;
                break;
            case 'Over 2.5':
                matchResult = homeGoals + awayGoals > 2.5;
                break;
            case 'Over 2.75':
                matchResult = homeGoals + awayGoals > 2.75;
                break;
            case 'Over 3':
                matchResult = homeGoals + awayGoals > 3;
                break;
            case 'Over 3.25':
                matchResult = homeGoals + awayGoals > 3.25;
                break;
            case 'Over 3.5':
                matchResult = homeGoals + awayGoals > 3.5;
                break;
            case 'Over 3.75':
                matchResult = homeGoals + awayGoals > 3.75;
                break;
            case 'Over 4':
                matchResult = homeGoals + awayGoals > 4;
                break;
            case 'Over 4.25':
                matchResult = homeGoals + awayGoals > 4.25;
                break;
            case 'Over 4.5':
                matchResult = homeGoals + awayGoals > 4.5;
                break;
            case 'Over 4.75':
                matchResult = homeGoals + awayGoals > 4.75;
                break;
            case 'Over 5':
                matchResult = homeGoals + awayGoals > 5;
                break;
            case 'Over 5.25':
                matchResult = homeGoals + awayGoals > 5.25;
                break;
            case 'Over 5.5':
                matchResult = homeGoals + awayGoals > 5.5;
                break;
            case 'Under 0.5':
                matchResult = homeGoals + awayGoals < 0.5;
                break;
            case 'Under 0.75':
                matchResult = homeGoals + awayGoals < 0.75;
                break;
            case 'Under 1':
                matchResult = homeGoals + awayGoals < 1;
                break;
            case 'Under 1.25':
                matchResult = homeGoals + awayGoals < 1.25;
                break;
            case 'Under 1.5':
                matchResult = homeGoals + awayGoals < 1.5;
                break;
            case 'Under 1.75':
                matchResult = homeGoals + awayGoals < 1.75;
                break;
            case 'Under 2':
                matchResult = homeGoals + awayGoals < 2;
                break;
            case 'Under 2.25':
                matchResult = homeGoals + awayGoals < 2.25;
                break;
            case 'Under 2.5':
                matchResult = homeGoals + awayGoals < 2.5;
                break;
            case 'Under 2.75':
                matchResult = homeGoals + awayGoals < 2.75;
                break;
            case 'Under 3':
                matchResult = homeGoals + awayGoals < 3;
                break;
            case 'Under 3.25':
                matchResult = homeGoals + awayGoals < 3.25;
                break;
            case 'Under 3.5':
                matchResult = homeGoals + awayGoals < 3.5;
                break;
            case 'Under 3.75':
                matchResult = homeGoals + awayGoals < 3.75;
                break;
            case 'Under 4':
                matchResult = homeGoals + awayGoals < 4;
                break;
            case 'Under 4.25':
                matchResult = homeGoals + awayGoals < 4.25;
                break;
            case 'Under 4.5':
                matchResult = homeGoals + awayGoals < 4.5;
                break;
            case 'Under 4.75':
                matchResult = homeGoals + awayGoals < 4.75;
                break;
            case 'Under 5':
                matchResult = homeGoals + awayGoals < 5;
                break;
            case 'Under 5.25':
                matchResult = homeGoals + awayGoals < 5.25;
                break;
            case 'Under 5.5':
                matchResult = homeGoals + awayGoals < 5.5;
                break;
            default:
                matchResult = false;
                break;
        }
    
        return {
            result: `${homeGoals} - ${awayGoals}`,
            outcome: matchResult
        };
    };
    
    // const getAllSubstrings = (str, length) => {
    //     if (!str || typeof str !== 'string') {
    //         return []; // Return an empty array if str is not defined or not a string
    //     }
        
    //     const substrings = [];
    //     for (let i = 0; i <= str.length - length; i++) {
    //         substrings.push(str.substring(i, i + length));
    //     }
    //     return substrings;
    // };
    

    const checkOverallOutcome = (slipBet) => {
        let hasIncorrect = false;
        let hasCorrect = false;
        let hasNotFinished = false;
    
        slipBet.match_info.forEach(match => {
            const [homeTeam, awayTeam] = match.name.split(' vs. ');
            const { outcome } = checkMatchResult(homeTeam, awayTeam, match.type);
    
            if (outcome === undefined) {
                hasNotFinished = true;
            } else if (outcome === true) {
                hasCorrect = true;
            } else {
                hasIncorrect = true;
            }
        });
    
        if (hasIncorrect) {
            return -1; // Incorrect
        }
    
        if (hasCorrect && hasNotFinished) {
            return 0; // Not finished
        }
    
        return hasCorrect ? 1 : 0; // Correct or Not finished
    };
    
    
    
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <div>
            <h1>Slip Bets</h1>
            <div className="slip-bets-grid14">
                {filteredSlipBets.map((bet) => {
                    const overallOutcome = checkOverallOutcome(bet);

                    return (
                        <div key={bet.id} className={`bet-card14`} data-outcome={overallOutcome}>
                            <h2>Match Info:</h2>
                            <ul>
                                {bet.match_info.map((match, index) => {
                                    const [homeTeam, awayTeam] = match.name.split(' vs. ');

                                    const { result, outcome } = checkMatchResult(homeTeam, awayTeam, match.type);

                                    return (
                                        <li key={`${bet.id}-${index}`}>
                                            <div className="bet-card">
                                                <i className="fa fa-dot-circle-o" aria-hidden="true" />
                                                <span className="bet-value">
                                                    🌐 {match.name} <br />
                                                    <span className="bet-value">
                                                        cote: {match.value} <br />
                                                    </span>
                                                    <span className="bet-value">
                                                        {match.type}
                                                    </span>
                                                </span>
                                                <div className="match-result">
                                                    <strong>Match Result: {result}</strong><br />
                                                    {outcome !== undefined && (
                                                        <span className={`outcome-indicator ${outcome ? 'correct' : 'incorrect'}`}>
                                                            {outcome ? 'Correct' : 'Incorrect'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="slip-outcome">
                                <strong>Slip Outcome: </strong>
                                <span className={`slip-outcome-indicator ${overallOutcome === 1 ? 'correct' : (overallOutcome === 0 ? 'not-finished' : 'incorrect')}`}>
                                    {overallOutcome === 1 ? 'Correct' : (overallOutcome === 0 ? 'Not Finished' : 'Incorrect')}
                                </span>
                            </div>

                            <p>Price: {bet.price}</p>
                            <p>Total Cote: {bet.totalcote}</p>
                            <p>Total Bonus: {bet.totalbonus}%</p>
                            <p>Total Win: {bet.totalwin}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}    

export default FixturesComponent;
