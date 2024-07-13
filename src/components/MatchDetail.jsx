import React from 'react';
import { useMatchContext } from './MatchContext';
import axios from 'axios';
import './FixturesComponent.css';
import UserComponent from './UserComponent'
import Hello from './Helloo'
// const APIkey = 'ae5846873575d8d4b730458ed8c4479d221fafde23ae39845e5d2ceb91fd3da1';
// const from = '2024-07-05';
// const to = '2024-07-12';

const MatchDetail = () => {
    const { selectedMatch } = useMatchContext();
    const { name, value, type, date, time, market , state } = selectedMatch;
    console.log(state)
    const [homeTeam, awayTeam] = name.split(' vs ');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const fixturesResponse = await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${APIkey}&from=${from}&to=${to}`);
//                 setFixtures(fixturesResponse.data.result);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Error fetching data');
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const allEventHomeTeams = fixtures.map(fix => fix.event_home_team);
//         const allEventAwayTeams = fixtures.map(fix => fix.event_away_team);
//         const allEventDates = fixtures.map(fix => fix.event_date);
//         const allEventTimes = fixtures.map(fix => fix.event_time);
     

//         setFixTeamHome(allEventHomeTeams);
//         setFixTeamAway(allEventAwayTeams);
//         setFixDate(allEventDates);
//         setFixTime(allEventTimes);

//     }, [fixtures]); 


//     const getAllSubstrings = (str, length) => {
//         if (!str || typeof str !== 'string') {
//             return []; // Return an empty array if str is not defined or not a string
//         }

//         const substrings = [];
//         for (let i = 0; i <= str.length - length; i++) {
//             substrings.push(str.substring(i, i + length));
//         }
//         return substrings;
//     };

//     const checkMatchResult = (type, market) => {
//         const homeSubstrings = getAllSubstrings(homeTeam, 3);
//         const awaySubstrings = getAllSubstrings(awayTeam, 3);

//         const matchedFixture = fixtures.find(fixture =>
//             homeSubstrings.some(sub => fixture.event_home_team.includes(sub)) &&
//             awaySubstrings.some(sub => fixture.event_away_team.includes(sub))
//         );

//         if (!matchedFixture || !matchedFixture.event_final_result) {
//             return { result: 'Match not finished', outcome: undefined };
//         }
//         if (!matchedFixture || !matchedFixture.event_halftime_result) {
//             return { result: 'Match not finished', outcome: undefined };
//         }
       
//         // const cornersStat = matchedFixture.statistics.find(stat => stat.type === 'Corners');
//         // if (!cornersStat) {
//         //     console.log('No corners found.');
//         // } 
//         // const  homeCorner = cornersStat.home 
//         //       const awayCorner = cornersStat.away 
//         //       console.log(homeCorner , awayCorner )
//         //       const totalCorners = homeCorner + awayCorner;
               
//         const [homeGoals, awayGoals] = matchedFixture.event_final_result.split('-').map(Number);
//         const [homeGoalsMT, awayGoalsMT] = matchedFixture.event_halftime_result.split('-').map(Number);
//         const secondHalfGoalsHome = homeGoals  - homeGoalsMT;
//         const secondHalfGoalsAway =  awayGoals -  awayGoalsMT;
//         const secondHalfGoals = (homeGoals + awayGoals) - (homeGoalsMT + awayGoalsMT); 
//         const totalGoals = homeGoals + awayGoals;
//         const isDraw = homeGoals === awayGoals;
//         const homeWin = homeGoals > awayGoals;
//         const homeWinHT = homeGoalsMT > awayGoalsMT;
//         const awayWin = homeGoals < awayGoals;
//         const awayWinHT = homeGoalsMT < awayGoalsMT;
//         const bothTeamsScore = homeGoals > 0 && awayGoals > 0;
//         const anyCleanSheet = homeGoals === 0 || awayGoals === 0;
//         const noGoal = totalGoals === 0;
//         console.log(homeGoalsMT, awayGoalsMT);
//         let matchResult = false;

//         switch (market) {
//             case '1x2':
//                 switch (type) {
//                     case '1':
//                         matchResult = homeGoals > awayGoals;
//                         break;
//                     case 'Draw':
//                         matchResult = homeGoals === awayGoals;
//                         break;
//                     case '2':
//                         matchResult = awayGoals > homeGoals;
//                         break;
//                 }
//                 break;
//             case 'GG/NG':
//                 switch (type) {
//                     case 'GG':
//                         matchResult = homeGoals > 0 && awayGoals > 0;
//                         break;
//                     case 'NG':
//                         matchResult = homeGoals === 0 || awayGoals === 0;
//                         break;
//                 }
//                 break;
//                 case 'Total':
//                     switch (type) {
//                         case 'Over 0.5':
//                             matchResult = homeGoals + awayGoals > 0.5;
//                             break;
//                         case 'Over 0.75':
//                             matchResult = homeGoals + awayGoals > 0.75;
//                             break;
//                         case 'Over 1':
//                             matchResult = homeGoals + awayGoals > 1;
//                             break;
//                         case 'Over 1.25':
//                             matchResult = homeGoals + awayGoals > 1.25;
//                             break;
//                         case 'Over 1.5':
//                             matchResult = homeGoals + awayGoals > 1.5;
//                             break;
//                         case 'Over 1.75':
//                             matchResult = homeGoals + awayGoals > 1.75;
//                             break;
//                         case 'Over 2':
//                             matchResult = homeGoals + awayGoals > 2;
//                             break;
//                         case 'Over 2.25':
//                             matchResult = homeGoals + awayGoals > 2.25;
//                             break;
//                         case 'Over 2.5':
//                             matchResult = homeGoals + awayGoals > 2.5;
//                             break;
//                         case 'Over 2.75':
//                             matchResult = homeGoals + awayGoals > 2.75;
//                             break;
//                         case 'Over 3':
//                             matchResult = homeGoals + awayGoals > 3;
//                             break;
//                         case 'Over 3.25':
//                             matchResult = homeGoals + awayGoals > 3.25;
//                             break;
//                         case 'Over 3.5':
//                             matchResult = homeGoals + awayGoals > 3.5;
//                             break;
//                         case 'Over 3.75':
//                             matchResult = homeGoals + awayGoals > 3.75;
//                             break;
//                         case 'Over 4':
//                             matchResult = homeGoals + awayGoals > 4;
//                             break;
//                         case 'Over 4.25':
//                             matchResult = homeGoals + awayGoals > 4.25;
//                             break;
//                         case 'Over 4.5':
//                             matchResult = homeGoals + awayGoals > 4.5;
//                             break;
//                         case 'Over 4.75':
//                             matchResult = homeGoals + awayGoals > 4.75;
//                             break;
//                         case 'Over 5':
//                             matchResult = homeGoals + awayGoals > 5;
//                             break;
//                         case 'Over 5.25':
//                             matchResult = homeGoals + awayGoals > 5.25;
//                             break;
//                         case 'Over 5.5':
//                             matchResult = homeGoals + awayGoals > 5.5;
//                             break;
//                         case 'Under 0.5':
//                             matchResult = homeGoals + awayGoals < 0.5;
//                             break;
//                         case 'Under 0.75':
//                             matchResult = homeGoals + awayGoals < 0.75;
//                             break;
//                         case 'Under 1':
//                             matchResult = homeGoals + awayGoals < 1;
//                             break;
//                         case 'Under 1.25':
//                             matchResult = homeGoals + awayGoals < 1.25;
//                             break;
//                         case 'Under 1.5':
//                             matchResult = homeGoals + awayGoals < 1.5;
//                             break;
//                         case 'Under 1.75':
//                             matchResult = homeGoals + awayGoals < 1.75;
//                             break;
//                         case 'Under 2':
//                             matchResult = homeGoals + awayGoals < 2;
//                             break;
//                         case 'Under 2.25':
//                             matchResult = homeGoals + awayGoals < 2.25;
//                             break;
//                         case 'Under 2.5':
//                             matchResult = homeGoals + awayGoals < 2.5;
//                             break;
//                         case 'Under 2.75':
//                             matchResult = homeGoals + awayGoals < 2.75;
//                             break;
//                         case 'Under 3':
//                             matchResult = homeGoals + awayGoals < 3;
//                             break;
//                         case 'Under 3.25':
//                             matchResult = homeGoals + awayGoals < 3.25;
//                             break;
//                         case 'Under 3.5':
//                             matchResult = homeGoals + awayGoals < 3.5;
//                             break;
//                         case 'Under 3.75':
//                             matchResult = homeGoals + awayGoals < 3.75;
//                             break;
//                         case 'Under 4':
//                             matchResult = homeGoals + awayGoals < 4;
//                             break;
//                         case 'Under 4.25':
//                             matchResult = homeGoals + awayGoals < 4.25;
//                             break;
//                         case 'Under 4.5':
//                             matchResult = homeGoals + awayGoals < 4.5;
//                             break;
//                         case 'Under 4.75':
//                             matchResult = homeGoals + awayGoals < 4.75;
//                             break;
//                         case 'Under 5':
//                             matchResult = homeGoals + awayGoals < 5;
//                             break;
//                         case 'Under 5.25':
//                             matchResult = homeGoals + awayGoals < 5.25;
//                             break;
//                         case 'Under 5.5':
//                             matchResult = homeGoals + awayGoals < 5.5;
//                             break;
//                     }
//                     break; 
//                     case 'Halftime/fulltime':
//                 switch (type) {
//                     case '1/1':
//                         matchResult = homeGoalsMT > awayGoalsMT && homeGoals > awayGoals;
//                         break;
//                     case 'X/1':
//                         matchResult = (homeGoalsMT === awayGoalsMT) && homeGoals > awayGoals;
//                         break;
//                     case '2/1':
//                         matchResult = homeGoalsMT < awayGoalsMT && homeGoals > awayGoals;
//                         break;
//                     case '1/X':
//                         matchResult = homeGoalsMT > awayGoalsMT && homeGoals === awayGoals;
//                         break;
//                     case 'X/X':
//                         matchResult = homeGoalsMT === awayGoalsMT && homeGoals === awayGoals;
//                         break;
//                     case '2/X':
//                         matchResult = homeGoalsMT < awayGoalsMT && homeGoals === awayGoals;
//                         break;
//                     case '1/2':
//                         matchResult = homeGoalsMT > awayGoalsMT && homeGoals < awayGoals;
//                         break;
//                     case 'X/2':
//                         matchResult = homeGoalsMT === awayGoalsMT && homeGoals < awayGoals;
//                         break;
//                     case '2/2':
//                         matchResult = homeGoalsMT < awayGoalsMT && homeGoals < awayGoals;
//                         break;
//                 }
//                 break; 
//                 case '1X2 Halftime/ DC Fulltime':
//                 switch (type) {
//                     case '1/1X':
//                     matchResult = homeGoalsMT > awayGoalsMT && homeGoals > awayGoals || (homeGoals === awayGoals);
//                     break;
//                 case '1/12':
//                     matchResult = homeGoalsMT > awayGoalsMT && homeGoals > awayGoals || (homeGoals < awayGoals);
//                     break;
//                 case '1/X2':
//                     matchResult = homeGoalsMT > awayGoalsMT && homeGoals === awayGoals || (homeGoals < awayGoals);
//                     break;
//                 case 'X/1X':
//                     matchResult = homeGoalsMT === awayGoalsMT && homeGoals > awayGoals || (homeGoals === awayGoals);
//                     break;
//                 case 'X/12':
//                     matchResult = homeGoalsMT === awayGoalsMT && homeGoals > awayGoals || (homeGoals < awayGoals);
//                     break;
//                 case 'X/X2':
//                     matchResult = homeGoalsMT === awayGoalsMT && homeGoals === awayGoals || (homeGoals < awayGoals);
//                     break;
//                 case '2/1X':
//                     matchResult = homeGoalsMT < awayGoalsMT && homeGoals > awayGoals || (homeGoals === awayGoals);
//                     break;
//                 case '2/12':
//                     matchResult = homeGoalsMT < awayGoalsMT && homeGoals > awayGoals || (homeGoals < awayGoals);
//                     break;
//                 case '2/X2':
//                     matchResult = homeGoalsMT < awayGoalsMT && homeGoals === awayGoals || (homeGoals < awayGoals);
//                     break;
//                 }
//                 break;
//                 case 'DC Halftime/ 1X2 Fulltime':
//                 switch (type) {
//                     case '1X/1':
//                         matchResult =  (homeGoalsMT >= awayGoalsMT) && homeGoals > awayGoals;
//                         break;
//                     case '1X/X':
//                         matchResult =  (homeGoalsMT >= awayGoalsMT) && homeGoals === awayGoals;
//                         break;
//                     case '1X/2':
//                         matchResult = (homeGoals >= awayGoals) && homeGoals < awayGoals;
//                         break;
//                     case '12/1':
//                         matchResult = homeGoalsMT > awayGoalsMT || (homeGoalsMT < awayGoalsMT) && homeGoals > awayGoals;
//                         break;
//                     case '12/X':
//                         matchResult =  homeGoalsMT > awayGoalsMT || (homeGoalsMT < awayGoalsMT) && homeGoals === awayGoals;
//                         break;
//                     case '12/2':
//                         matchResult =  homeGoalsMT > awayGoalsMT || (homeGoalsMT < awayGoalsMT) && homeGoals < awayGoals;
//                         break;
//                     case 'X2/1':
//                         matchResult = homeGoalsMT <= awayGoalsMT &&  homeGoals > awayGoals;
//                         break;
//                     case 'X2/X':
//                         matchResult = homeGoalsMT <= awayGoalsMT  && homeGoals === awayGoals;
//                         break;
//                     case 'X2/2':
//                         matchResult = homeGoalsMT <= awayGoalsMT  && homeGoals < awayGoals;
//                         break;
//                 }
//                 break;
//                 case 'DC Halftime/ DC Fulltime':
//                     switch (type) {
//                         case '12/12':
//                             matchResult = homeGoalsMT > awayGoalsMT   || homeGoalsMT < awayGoalsMT   && homeGoals > awayGoals || homeGoals < awayGoals;
//                             break;
//                         case '12/1X':
//                             matchResult = homeGoalsMT > awayGoalsMT   || homeGoalsMT < awayGoalsMT   && homeGoals > awayGoals || homeGoals === awayGoals;
//                             break;
//                         case '12/X2':
//                             matchResult = homeGoalsMT > awayGoalsMT   || homeGoalsMT < awayGoalsMT   && homeGoals === awayGoals || homeGoals < awayGoals;
//                             break;
//                         case '1X/12':
//                             matchResult = homeGoalsMT > awayGoalsMT   || homeGoalsMT === awayGoalsMT   && homeGoals > awayGoals || homeGoals < awayGoals;
//                             break;
//                         case '1X/1X':
//                             matchResult = homeGoalsMT > awayGoalsMT   || homeGoalsMT === awayGoalsMT   && homeGoals > awayGoals || homeGoals === awayGoals;
//                             break;
//                         case '1X/X2':
//                             matchResult = homeGoalsMT > awayGoalsMT   || homeGoalsMT === awayGoalsMT   && homeGoals === awayGoals || homeGoals < awayGoals;
//                             break;
//                         case 'X2/12':
//                             matchResult = homeGoalsMT === awayGoalsMT   || homeGoalsMT < awayGoalsMT   && homeGoals > awayGoals || homeGoals < awayGoals;
//                             break;
//                         case 'X2/1X':
//                             matchResult = homeGoalsMT === awayGoalsMT   || homeGoalsMT < awayGoalsMT   && homeGoals === awayGoals || homeGoals > awayGoals;
//                             break;
//                         case 'X2/X2':
//                             matchResult = homeGoalsMT === awayGoalsMT   || homeGoalsMT < awayGoalsMT   && homeGoals === awayGoals || homeGoals < awayGoals;
//                             break;
//                     }
//                     break; 
//                     case 'Double chance':
//                 switch (type) {
//                     case '1 or draw':
//                         matchResult = homeGoals > awayGoals || awayGoals === homeGoals;
//                         break;
//                     case '1 or 2':
//                         matchResult = homeGoals > awayGoals || awayGoals > homeGoals;
//                         break;
//                         case 'Draw or 2':
//                             matchResult = homeGoals < awayGoals || awayGoals === homeGoals;
//                             break;
//                 }
//                 break;
//                 case 'Odd/even':
                   
//                     switch (type) {
//                         case 'Odd':
//                             matchResult = totalGoals % 2 !== 0;
//                             break;
//                         case 'Even':
//                             matchResult = totalGoals % 2 === 0;
//                             break;
//                     }
//                     break;
//                     case 'Goal range':
//             const totalGoalsForRange = homeGoals + awayGoals;
//             switch (type) {
//                 case '0-1':
//                     matchResult = totalGoalsForRange >= 0 && totalGoalsForRange <= 1;
//                     break;
//                 case '2-3':
//                     matchResult = totalGoalsForRange >= 2 && totalGoalsForRange <= 3;
//                     break;
//                 case '4-6':
//                     matchResult = totalGoalsForRange >= 4 && totalGoalsForRange <= 6;
//                     break;
//                 case '7+':
//                     matchResult = totalGoalsForRange >= 7;
//                     break;
//             }
//             break;
//             case '1 Total':
//                 switch (type) {
//                     case 'Over 0.5':
//                         matchResult = homeGoals > 0.5;
//                         break;
//                     case 'Over 1.5':
//                         matchResult = homeGoals > 1.5;
//                         break;
//                     case 'Over 2.5':
//                         matchResult = homeGoals > 2.5;
//                         break;
//                     case 'Under 0.5':
//                         matchResult = homeGoals < 0.5;
//                         break;
//                     case 'Under 1.5':
//                         matchResult = homeGoals < 1.5;
//                         break;
//                     case 'Under 2.5':
//                         matchResult = homeGoals < 2.5;
//                         break;
//                 }
//                 break;
//                 case '2 total goals':
//                     switch (type) {
//                         case 'Over 0.5':
//                             matchResult = awayGoals > 0.5;
//                             break;
//                         case 'Over 1.5':
//                             matchResult = awayGoals > 1.5;
//                             break;
//                         case 'Over 2.5':
//                             matchResult = awayGoals > 2.5;
//                             break;
//                         case 'Under 0.5':
//                             matchResult = awayGoals < 0.5;
//                             break;
//                         case 'Under 1.5':
//                             matchResult = awayGoals < 1.5;
//                             break;
//                         case 'Under 2.5':
//                             matchResult = awayGoals < 2.5;
//                             break;
//                     }
//                     break; 
//                     case '1 exact goals':
//     switch (type) {
//         case '0':
//             matchResult = homeGoals === 0;
//             break;
//         case '1':
//             matchResult = homeGoals === 1;
//             break;
//         case '2':
//             matchResult = homeGoals === 2;
//             break;
//         case '3+':
//             matchResult = homeGoals >= 3;
//             break;
//     }
//     break;
//     case '2 exact goals':
//     switch (type) {
//         case '0':
//             matchResult = awayGoals === 0;
//             break;
//         case '1':
//             matchResult = awayGoals === 1;
//             break;
//         case '2':
//             matchResult = awayGoals === 2;
//             break;
//         case '3+':
//             matchResult = awayGoals >= 3;
//             break;
//     }
//     break;
//     case '1 to Score':
//     switch (type) {
//         case 'Yes':
//             matchResult = homeGoals > 0;
//             break;
//         case 'No':
//             matchResult = homeGoals === 0;
//             break;
//     }
//     break;

// case '2 to Score':
//     switch (type) {
//         case 'Yes':
//             matchResult = awayGoals > 0;
//             break;
//         case 'No':
//             matchResult = awayGoals === 0;
//             break;
//     }
//     break;
//     case '1st half - 1x2':
//         switch (type) {
//             case '1':
//                 matchResult = homeGoalsMT > awayGoalsMT;
//                 break;
//             case 'Draw':
//                 matchResult = homeGoalsMT === awayGoalsMT;
//                 break;
//             case '2':
//                 matchResult = awayGoalsMT > homeGoalsMT;
//                 break;
//         }
//         break;
//         case '1st half - Double Chance':
//     switch (type) {
//         case '1 or draw':
//             matchResult = homeGoalsMT >= awayGoalsMT;
//             break;
//         case '1 or 2':
//             matchResult = homeGoalsMT > awayGoalsMT || homeGoalsMT < awayGoalsMT;
//             break;
//         case 'Draw or 2':
//             matchResult = awayGoalsMT >= homeGoalsMT;
//             break;
//     }
//     break;
//     case '1st half - Total':
//     switch (type) {
//         case 'Over 0.5':
//             matchResult = homeGoalsMT + awayGoalsMT > 0.5;
//             break;
//         case 'Over 1.5':
//             matchResult = homeGoalsMT + awayGoalsMT > 1.5;
//             break;
//         case 'Over 2.5':
//             matchResult = homeGoalsMT + awayGoalsMT > 2.5;
//             break;
//         case 'Under 0.5':
//             matchResult = homeGoalsMT + awayGoalsMT < 0.5;
//             break;
//         case 'Under 1.5':
//             matchResult = homeGoalsMT + awayGoalsMT < 1.5;
//             break;
//         case 'Under 2.5':
//             matchResult = homeGoalsMT + awayGoalsMT < 2.5;
//             break;
//     }
//     break;
//     case '1st half - 1 total':
//         switch (type) {
//             case 'Over 0.5':
//                 matchResult = homeGoalsMT > 0.5;
//                 break;
//             case 'Over 1.5':
//                 matchResult = homeGoalsMT > 1.5;
//                 break;
//             case 'Under 0.5':
//                 matchResult = homeGoalsMT < 0.5;
//                 break;
//             case 'Under 1.5':
//                 matchResult = homeGoalsMT < 1.5;
//                 break;
//         }
//         break;
//         case '1st half - 2 total':
//             switch (type) {
//                 case 'Over 0.5':
//                     matchResult = awayGoalsMT > 0.5;
//                     break;
//                 case 'Over 1.5':
//                     matchResult = awayGoalsMT > 1.5;
//                     break;
//                 case 'Under 0.5':
//                     matchResult = awayGoalsMT <= 0.5;
//                     break;
//                 case 'Under 1.5':
//                     matchResult = awayGoalsMT <= 1.5;
//                     break;
//             }
//             break;
//             case '1st half - both teams to score':
//                 switch (type) {
//                     case 'Yes':
//                         matchResult = homeGoalsMT > 0 && awayGoalsMT > 0;
//                         break;
//                     case 'No':
//                         matchResult = homeGoalsMT === 0 || awayGoalsMT === 0;
//                         break;
//                 }
//                 break;
//                 case '1st half - odd/even':
//                     switch (type) {
//                         case 'Odd':
//                             matchResult = (homeGoalsMT + awayGoalsMT) % 2 !== 0;
//                             break;
//                         case 'Even':
//                             matchResult = (homeGoalsMT + awayGoalsMT) % 2 === 0;
//                             break;
//                     }
//                     break;
//                     case 'Correct score':
//                         switch (type) {
//                     case '1:0':
//                         matchResult = homeGoals === 1 && awayGoals === 0;
//                         break;
//                     case '2:0':
//                         matchResult = homeGoals === 2 && awayGoals === 0;
//                         break;
//                     case '2:1':
//                         matchResult = homeGoals === 2 && awayGoals === 1;
//                         break;
//                     case '3:0':
//                         matchResult = homeGoals === 3 && awayGoals === 0;
//                         break;
//                     case '3:1':
//                         matchResult = homeGoals === 3 && awayGoals === 1;
//                         break;
//                     case '3:2':
//                         matchResult = homeGoals === 3 && awayGoals === 2;
//                         break;
//                     case '4:0':
//                         matchResult = homeGoals === 4 && awayGoals === 0;
//                         break;
//                     case '4:1':
//                         matchResult = homeGoals === 4 && awayGoals === 1;
//                         break;
//                     case '4:2':
//                         matchResult = homeGoals === 4 && awayGoals === 2;
//                         break;
//                     case '4:3':
//                         matchResult = homeGoals === 4 && awayGoals === 3;
//                         break;
//                     case '0:0':
//                         matchResult = homeGoals === 0 && awayGoals === 0;
//                         break;
//                     case '1:1':
//                         matchResult = homeGoals === 1 && awayGoals === 1;
//                         break;
//                     case '2:2':
//                         matchResult = homeGoals === 2 && awayGoals === 2;
//                         break;
//                     case '3:3':
//                         matchResult = homeGoals === 3 && awayGoals === 3;
//                         break;
//                     case '4:4':
//                         matchResult = homeGoals === 4 && awayGoals === 4;
//                         break;
//                     case 'Other':
//                         matchResult = homeGoals > 4 || awayGoals > 4;
//                         break;
//                     case '0:1':
//                         matchResult = homeGoals === 0 && awayGoals === 1;
//                         break;
//                     case '0:2':
//                         matchResult = homeGoals === 0 && awayGoals === 2;
//                         break;
//                     case '1:2':
//                         matchResult = homeGoals === 1 && awayGoals === 2;
//                         break;
//                     case '0:3':
//                         matchResult = homeGoals === 0 && awayGoals === 3;
//                         break;
//                     case '1:3':
//                         matchResult = homeGoals === 1 && awayGoals === 3;
//                         break;
//                     case '2:3':
//                         matchResult = homeGoals === 2 && awayGoals === 3;
//                         break;
//                     case '0:4':
//                         matchResult = homeGoals === 0 && awayGoals === 4;
//                         break;
//                     case '1:4':
//                         matchResult = homeGoals === 1 && awayGoals === 4;
//                         break;
//                     case '2:4':
//                         matchResult = homeGoals === 2 && awayGoals === 4;
//                         break;
//                     case '3:4':
//                         matchResult = homeGoals === 3 && awayGoals === 4;
//                         break;   
//                         } 
//                         break; 
                        
                        

//                          case '1st half - correct score':
//             switch (type) {
//                 case '1:0':
//                     matchResult = homeGoalsMT === 1 && awayGoalsMT === 0;
//                     break;
//                 case '2:0':
//                     matchResult = homeGoalsMT === 2 && awayGoalsMT === 0;
//                     break;
//                 case '2:1':
//                     matchResult = homeGoalsMT === 2 && awayGoalsMT === 1;
//                     break;
//                 case '0:0':
//                     matchResult = homeGoalsMT === 0 && awayGoalsMT === 0;
//                     break;
//                 case '1:1':
//                     matchResult = homeGoalsMT === 1 && awayGoalsMT === 1;
//                     break;
//                 case '2:2':
//                     matchResult = homeGoalsMT === 2 && awayGoalsMT === 2;
//                     break;
//                 case 'Other':
//                     matchResult  = homeGoalsMT > 2 || awayGoalsMT > 2;
//                     break;
//                 case '0:1':
//                     matchResult = homeGoalsMT === 0 && awayGoalsMT === 1;
//                     break;
//                 case '0:2':
//                     matchResult = homeGoalsMT === 0 && awayGoalsMT === 2;
//                     break;
//                 case '1:2':
//                     matchResult = homeGoalsMT === 1 && awayGoalsMT === 2;
//                     break;                               

//         }
//         break; 
//         case '2nd half - total':
//             switch (type) {
//                 case 'Over 0.5':
//                     matchResult = secondHalfGoals > 0.5;
//                     break;
//                 case 'Over 1.5':
//                     matchResult = secondHalfGoals > 1.5;
//                     break;
//                 case 'Over 2.5':
//                     matchResult = secondHalfGoals > 2.5;
//                     break;
//                 case 'Under 0.5':
//                     matchResult = secondHalfGoals < 0.5;
//                     break;
//                 case 'Under 1.5':
//                     matchResult = secondHalfGoals < 1.5;
//                     break;
//                 case 'Under 2.5':
//                     matchResult = secondHalfGoals < 2.5;
//                     break;
//             }
//                 break;
//                 case '2nd half - 1 total':
//                     switch (type) {
//                         case 'Over 0.5':
//                             matchResult = secondHalfGoalsHome > 0.5;
//                             break;
//                         case 'Over 1.5':
//                             matchResult = secondHalfGoalsHome > 1.5;
//                             break;
//                         case 'Over 2.5':
//                             matchResult = secondHalfGoalsHome > 2.5;
//                             break;
//                         case 'Under 0.5':
//                             matchResult = secondHalfGoalsHome < 0.5;
//                             break;
//                         case 'Under 1.5':
//                             matchResult = secondHalfGoalsHome < 1.5;
//                             break;
//                         case 'Under 2.5':
//                             matchResult = secondHalfGoalsHome < 2.5;
//                             break;
//                     }
//                         break;
//                         case '2nd half - 2 total':
//                             switch (type) {
//                                 case 'Over 0.5':
//                                     matchResult = secondHalfGoalsAway > 0.5;
//                                     break;
//                                 case 'Over 1.5':
//                                     matchResult = secondHalfGoalsAway > 1.5;
//                                     break;
//                                 case 'Over 2.5':
//                                     matchResult = secondHalfGoalsAway > 2.5;
//                                     break;
//                                 case 'Under 0.5':
//                                     matchResult = secondHalfGoalsAway < 0.5;
//                                     break;
//                                 case 'Under 1.5':
//                                     matchResult = secondHalfGoalsAway < 1.5;
//                                     break;
//                                 case 'Under 2.5':
//                                     matchResult = secondHalfGoalsAway < 2.5;
//                                     break;
//                             }
//                                 break;
//                                 case '2nd half - both teams to score':
//                 switch (type) {
//                     case 'Yes':
//                         matchResult = secondHalfGoalsHome > 0 && secondHalfGoalsAway > 0;
//                         break;
//                     case 'No':
//                         matchResult = secondHalfGoalsHome === 0 || secondHalfGoalsAway === 0;
//                         break;
//                 }
//                 break;
//                 case '2nd half - 1 to score':
//                     switch (type) {
//                         case 'Yes':
//                             matchResult = secondHalfGoalsHome > 0 ;
//                             break;
//                         case 'No':
//                             matchResult = secondHalfGoalsHome === 0 ;
//                             break;
//                     }
//                     break;
//                     case '2nd half - 2 to score':
//                         switch (type) {
//                             case 'Yes':
//                                 matchResult = secondHalfGoalsAway > 0 ;
//                                 break;
//                             case 'No':
//                                 matchResult = secondHalfGoalsAway === 0 ;
//                                 break;
//                         }
//                         break; 
//                         case '1st half - 1x2 & total':
//                             switch (type) {
//                                 case '1 & over 1.5':
//                                     matchResult = homeGoalsMT > awayGoalsMT && secondHalfGoals > 1.5;
//                                     break;
//                                 case '2 & over 1.5':
//                                     matchResult = homeGoalsMT < awayGoalsMT && secondHalfGoals > 1.5;
//                                     break;
//                                 case 'Draw & over 1.5':
//                                     matchResult = homeGoalsMT === awayGoalsMT && secondHalfGoals > 1.5;
//                                     break;
//                                 case '2 & under 1.5':
//                                     matchResult = homeGoalsMT < awayGoalsMT&& secondHalfGoals < 1.5;
//                                     break;
//                                 case '1 & under 1.5':
//                                     matchResult = homeGoalsMT > awayGoalsMT && secondHalfGoals < 1.5;
//                                     break;
//                                 case 'Draw & under 1.5':
//                                     matchResult = homeGoalsMT > awayGoalsMT && secondHalfGoals < 1.5;
//                                     break;
                          
                    
//                             } 
//                             break;
//                             case '1st half - 1x2 & both teams to score':
//                             switch (type) {
//                                 case '1 & yes':
//                                     matchResult = homeGoalsMT > awayGoalsMT && homeGoalsMT > 0 && awayGoalsMT > 0;
//                                     break;
//                                 case 'Draw & yes':
//                                     matchResult =homeGoalsMT === awayGoalsMT && homeGoalsMT > 0 && awayGoalsMT > 0;
//                                     break;
//                                 case '2 & yes':
//                                     matchResult = homeGoalsMT < awayGoalsMT && homeGoalsMT > 0 && awayGoalsMT > 0;
//                                     break;
//                                 case '1 & no':
//                                     matchResult =  homeGoalsMT > awayGoalsMT && homeGoalsMT === 0 || awayGoalsMT === 0;
//                                     break;
//                                 case 'Draw & no':
//                                     matchResult = homeGoalsMT === awayGoalsMT && homeGoalsMT === 0 || awayGoalsMT === 0;
//                                     break;
//                                 case '2 & no':
//                                     matchResult = homeGoalsMT < awayGoalsMT && homeGoalsMT === 0 || awayGoalsMT === 0;
//                                     break;
                          
                    
//                             } 
//                             break;
//                             case '1st half - double chance & both teams to score':
//                             switch (type) {
//                                 case '1X & yes':
//                                     matchResult = homeGoalsMT >= awayGoalsMT && homeGoalsMT > 0 && awayGoalsMT > 0;
//                                     break;
//                                 case '12 & yes':
//                                     matchResult = homeGoalsMT <  awayGoalsMT && homeGoalsMT<  awayGoalsMT && homeGoalsMT > 0 && awayGoalsMT > 0;
//                                     break;
//                                 case 'X2 & yes':
//                                     matchResult = homeGoalsMT <= awayGoalsMT && homeGoalsMT > 0 && awayGoalsMT > 0;
//                                     break;
//                                 case '1X & no':
//                                     matchResult =  homeGoalsMT >= awayGoalsMT && homeGoalsMT === 0 || awayGoalsMT === 0;
//                                     break;
//                                 case '12 & no':
//                                     matchResult =  homeGoalsMT < awayGoalsMT && homeGoalsMT > awayGoalsMT && homeGoalsMT === 0 || awayGoalsMT === 0;
//                                     break;
//                                 case 'X2 & no':
//                                     matchResult = homeGoalsMT <= awayGoalsMT && homeGoalsMT === 0 || awayGoalsMT === 0;
//                                     break;
                          
                    
//                             } 
//                             break;
//                             case 'Halftime/fulltime correct score':
//                                 switch (type) {
//                                     case '1:0 1:0':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && homeGoals === 1 && awayGoals === 0;
//                                         break;
//                                     case '1:0 1:1':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && homeGoals === 1 && awayGoals === 1;
//                                         break;
//                                     case '1:0 2:0':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && homeGoals === 2 && awayGoals === 0;
//                                         break;
//                                     case '1:0 2:1':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && homeGoals === 2 && awayGoals === 1;
//                                         break;
//                                     case '1:0 3:0':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && homeGoals === 3 && awayGoals === 0;
//                                         break;
//                                     case '1:0 1:2':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && homeGoals === 1 && awayGoals === 2;
//                                         break;
//                                     case '1:0 4+':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 0 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '2:0 2:0':
//                                         matchResult = homeGoalsMT === 2 && awayGoalsMT === 0 && homeGoals === 2 && awayGoals === 0;
//                                         break;
//                                     case '2:0 2:1':
//                                         matchResult = homeGoalsMT === 2 && awayGoalsMT === 0 && homeGoals === 2 && awayGoals === 1;
//                                         break;
//                                     case '2:0 3:0':
//                                         matchResult = homeGoalsMT === 2 && awayGoalsMT === 0 && homeGoals === 3 && awayGoals === 0;
//                                         break;
//                                     case '2:0 4+':
//                                         matchResult = homeGoalsMT === 2 && awayGoalsMT === 0 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '2:1 2:1':
//                                         matchResult = homeGoalsMT === 2 && awayGoalsMT === 1 && homeGoals === 2 && awayGoals === 1;
//                                         break;
//                                     case '2:1 4+':
//                                         matchResult = homeGoalsMT === 2 && awayGoalsMT === 1 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '3:0 3:0':
//                                         matchResult = homeGoalsMT === 3 && awayGoalsMT === 0 && homeGoals === 3 && awayGoals === 0;
//                                         break;
//                                     case '3:0 4+':
//                                         matchResult = homeGoalsMT === 3 && awayGoalsMT === 0 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '0:0 0:0':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 0 && awayGoals === 0;
//                                         break;
//                                     case '0:0 1:0':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 1 && awayGoals === 0;
//                                         break;
//                                     case '0:0 1:1':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 1 && awayGoals === 1;
//                                         break;
//                                     case '0:0 0:1':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 0 && awayGoals === 1;
//                                         break;
//                                     case '0:0 2:0':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 2 && awayGoals === 0;
//                                         break;
//                                     case '0:0 2:1':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 2 && awayGoals === 1;
//                                         break;
//                                     case '0:0 0:2':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 0 && awayGoals === 2;
//                                         break;
//                                     case '0:0 1:2':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 1 && awayGoals === 2;
//                                         break;
//                                     case '0:0 3:0':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 3 && awayGoals === 0;
//                                         break;
//                                     case '0:0 0:3':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && homeGoals === 0 && awayGoals === 3;
//                                         break;
//                                     case '0:0 4+':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 0 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '1:1 1:1':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 1 && homeGoals === 1 && awayGoals === 1;
//                                         break;
//                                     case '1:1 2:1':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 1 && homeGoals === 2 && awayGoals === 1;
//                                         break;
//                                     case '1:1 1:2':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 1 && homeGoals === 1 && awayGoals === 2;
//                                         break;
//                                     case '1:1 4+':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 1 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '4+ 4+':
//                                         matchResult = homeGoals >= 4 && awayGoals >= 4;
//                                         break;
//                                     case '0:1 0:1':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && homeGoals === 0 && awayGoals === 1;
//                                         break;
//                                     case '0:1 0:2':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && homeGoals === 0 && awayGoals === 2;
//                                         break;
//                                     case '0:1 0:3':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && homeGoals === 0 && awayGoals === 3;
//                                         break;
//                                     case '0:1 1:1':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && homeGoals === 1 && awayGoals === 1;
//                                         break;
//                                     case '0:1 1:2':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && homeGoals === 1 && awayGoals === 2;
//                                         break;
//                                     case '0:1 2:1':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && homeGoals === 2 && awayGoals === 1;
//                                         break;
//                                     case '0:1 4+':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 1 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '0:2 0:2':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 2 && homeGoals === 0 && awayGoals === 2;
//                                         break;
//                                     case '0:2 0:3':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 2 && homeGoals === 0 && awayGoals === 3;
//                                         break;
//                                     case '0:2 1:2':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 2 && homeGoals === 1 && awayGoals === 2;
//                                         break;
//                                     case '0:2 4+':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 2 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '0:3 0:3':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 3 && homeGoals === 0 && awayGoals === 3;
//                                         break;
//                                     case '0:3 4+':
//                                         matchResult = homeGoalsMT === 0 && awayGoalsMT === 3 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                     case '1:2 1:2':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 2 && homeGoals === 1 && awayGoals === 2;
//                                         break;
//                                     case '1:2 4+':
//                                         matchResult = homeGoalsMT === 1 && awayGoalsMT === 2 && (homeGoals >= 4 || awayGoals >= 4);
//                                         break;
//                                 }
//                                 break;
//                                 case 'Both team to score or Total 2.5':
//                                     switch (type) {
//                                         case 'Over 2.5 or yes':
//                                             matchResult = homeGoals + awayGoals > 2.5 || homeGoals > 0 && awayGoals > 0;
//                                             break;
//                                         case 'Over 2.5 or no':
//                                             matchResult = homeGoals + awayGoals <= 2.5 || homeGoals === 0 || awayGoals === 0;
//                                             break;
//                                         case 'Under 2.5 or no':
//                                             matchResult = homeGoals + awayGoals > 2.5 || homeGoals === 0 || awayGoals === 0;
//                                             break;
//                                     }
//                                     break;
//                                       case '1 or over 2.5':
//             switch (type) {
//                 case 'yes':
//                     matchResult = homeWin || totalGoals > 2.5;
//                     break;
//                 case 'no':
//                     matchResult = !homeWin && totalGoals <= 2.5;
//                     break;
//             }
//             break;

//         case 'Draw or over 2.5':
//             switch (type) {
//                 case 'yes':
//                     matchResult = isDraw || totalGoals > 2.5;
//                     break;
//                 case 'no':
//                     matchResult = !isDraw && totalGoals <= 2.5;
//                     break;
//             }
//             break;

//         case '2 or over 2.5':
//             switch (type) {
//                 case 'yes':
//                     matchResult = awayWin || totalGoals > 2.5;
//                     break;
//                 case 'no':
//                     matchResult = !awayWin && totalGoals <= 2.5;
//                     break;
//             }
//             break;

//         case '1 or under 2.5':
//             switch (type) {
//                 case 'yes':
//                     matchResult = homeWin || totalGoals <= 2.5;
//                     break;
//                 case 'no':
//                     matchResult = !homeWin && totalGoals > 2.5;
//                     break;
//             }
//             break;

//         case 'Draw or under 2.5':
//             switch (type) {
//                 case 'yes':
//                     matchResult = isDraw || totalGoals <= 2.5;
//                     break;
//                 case 'no':
//                     matchResult = !isDraw && totalGoals > 2.5;
//                     break;
//             }
//             break;

//         case '2 or under 2.5':
//             switch (type) {
//                 case 'yes':
//                     matchResult = awayWin || totalGoals <= 2.5;
//                     break;
//                 case 'no':
//                     matchResult = !awayWin && totalGoals > 2.5;
//                     break;
//             }
//             break;

//         case '1 or both teams to score':
//             switch (type) {
//                 case 'yes':
//                     matchResult = homeWin || bothTeamsScore;
//                     break;
//                 case 'no':
//                     matchResult = !homeWin && !bothTeamsScore;
//                     break;
//             }
//             break;

//         case 'Draw or both teams to score':
//             switch (type) {
//                 case 'yes':
//                     matchResult = isDraw || bothTeamsScore;
//                     break;
//                 case 'no':
//                     matchResult = !isDraw && !bothTeamsScore;
//                     break;
//             }
//             break;

//         case '2 or both teams to score':
//             switch (type) {
//                 case 'yes':
//                     matchResult = awayWin || bothTeamsScore;
//                     break;
//                 case 'no':
//                     matchResult = !awayWin && !bothTeamsScore;
//                     break;
//             }
//             break;

//         case '1 or any clean sheet':
//             switch (type) {
//                 case 'yes':
//                     matchResult = homeWin || anyCleanSheet;
//                     break;
//                 case 'no':
//                     matchResult = !homeWin && !anyCleanSheet;
//                     break;
//             }
//             break;

//         case 'Draw or any clean sheet':
//             switch (type) {
//                 case 'yes':
//                     matchResult = isDraw || anyCleanSheet;
//                     break;
//                 case 'no':
//                     matchResult = !isDraw && !anyCleanSheet;
//                     break;
//             }
//             break;

//         case '2 or any clean sheet':
//             switch (type) {
//                 case 'yes':
//                     matchResult = awayWin || anyCleanSheet;
//                     break;
//                 case 'no':
//                     matchResult = !awayWin && !anyCleanSheet;
//                     break;
//             }
//             break;

//         case 'Multigoals':
//             switch (type) {
//                 case '1-2':
//                     matchResult = totalGoals >= 1 && totalGoals <= 2;
//                     break;
//                 case '1-3':
//                     matchResult = totalGoals >= 1 && totalGoals <= 3;
//                     break;
//                 case '1-4':
//                     matchResult = totalGoals >= 1 && totalGoals <= 4;
//                     break;
//                 case '1-5':
//                     matchResult = totalGoals >= 1 && totalGoals <= 5;
//                     break;
//                 case '1-6':
//                     matchResult = totalGoals >= 1 && totalGoals <= 6;
//                     break;
//                 case '2-3':
//                     matchResult = totalGoals >= 2 && totalGoals <= 3;
//                     break;
//                 case '2-4':
//                     matchResult = totalGoals >= 2 && totalGoals <= 4;
//                     break;
//                 case '2-5':
//                     matchResult = totalGoals >= 2 && totalGoals <= 5;
//                     break;
//                 case '2-6':
//                     matchResult = totalGoals >= 2 && totalGoals <= 6;
//                     break;
//                 case '3-4':
//                     matchResult = totalGoals >= 3 && totalGoals <= 4;
//                     break;
//                 case '3-5':
//                     matchResult = totalGoals >= 3 && totalGoals <= 5;
//                     break;
//                 case '3-6':
//                     matchResult = totalGoals >= 3 && totalGoals <= 6;
//                     break;
//                 case '4-5':
//                     matchResult = totalGoals >= 4 && totalGoals <= 5;
//                     break;
//                 case '4-6':
//                     matchResult = totalGoals >= 4 && totalGoals <= 6;
//                     break;
//                 case '5-6':
//                     matchResult = totalGoals >= 5 && totalGoals <= 6;
//                     break;
//                 case '7+':
//                     matchResult = totalGoals >= 7;
//                     break;
//                 case 'No goal':
//                     matchResult = totalGoals === 0;
//                     break;
//             }
//             break; 
//             case 'Total & GG/NG':
//                 switch (type) {
//                     case 'over 2.5 & GG':
//                         matchResult = totalGoals > 2.5 && bothTeamsScore;
//                         break;
//                     case 'over 2.5 & NG':
//                         matchResult = totalGoals > 2.5 && !bothTeamsScore;
//                         break;
//                     case 'under 2.5 & GG':
//                         matchResult = totalGoals <= 2.5 && bothTeamsScore;
//                         break;
//                     case 'under 2.5 & NG':
//                         matchResult = totalGoals <= 2.5 && !bothTeamsScore;
//                         break;
//                 }
//                 break;
//                 case 'Double chance & total 1.5':
//                     switch (type) {
//                         case '1/X & over 1.5':
//                             matchResult = (homeWin || isDraw) && totalGoals > 1.5;
//                             break;
//                         case 'X/2 & over 1.5':
//                             matchResult = (isDraw || awayWin) && totalGoals > 1.5;
//                             break;
//                         case '1/2 & over 1.5':
//                             matchResult = (homeWin || awayWin) && totalGoals > 1.5;
//                             break;
//                         case '1/X & under 1.5':
//                             matchResult = (homeWin || isDraw) && totalGoals <= 1.5;
//                             break;
//                         case 'X/2 & under 1.5':
//                             matchResult = (isDraw || awayWin) && totalGoals <= 1.5;
//                             break;
//                         case '1/2 & under 1.5':
//                             matchResult = (homeWin || awayWin) && totalGoals <= 1.5;
//                             break;
//                     }
//                     break;
        
//                 case 'Double chance & total 2.5':
//                     switch (type) {
//                         case '1/X & over 2.5':
//                             matchResult = (homeWin || isDraw) && totalGoals > 2.5;
//                             break;
//                         case 'X/2 & over 2.5':
//                             matchResult = (isDraw || awayWin) && totalGoals > 2.5;
//                             break;
//                         case '1/2 & over 2.5':
//                             matchResult = (homeWin || awayWin) && totalGoals > 2.5;
//                             break;
//                         case '1/X & under 2.5':
//                             matchResult = (homeWin || isDraw) && totalGoals <= 2.5;
//                             break;
//                         case 'X/2 & under 2.5':
//                             matchResult = (isDraw || awayWin) && totalGoals <= 2.5;
//                             break;
//                         case '1/2 & under 2.5':
//                             matchResult = (homeWin || awayWin) && totalGoals <= 2.5;
//                             break;
//                     }
//                     break;
        
//                 case 'Double chance & total 3.5':
//                     switch (type) {
//                         case '1/X & over 3.5':
//                             matchResult = (homeWin || isDraw) && totalGoals > 3.5;
//                             break;
//                         case 'X/2 & over 3.5':
//                             matchResult = (isDraw || awayWin) && totalGoals > 3.5;
//                             break;
//                         case '1/2 & over 3.5':
//                             matchResult = (homeWin || awayWin) && totalGoals > 3.5;
//                             break;
//                         case '1/X & under 3.5':
//                             matchResult = (homeWin || isDraw) && totalGoals <= 3.5;
//                             break;
//                         case 'X/2 & under 3.5':
//                             matchResult = (isDraw || awayWin) && totalGoals <= 3.5;
//                             break;
//                         case '1/2 & under 3.5':
//                             matchResult = (homeWin || awayWin) && totalGoals <= 3.5;
//                             break;
//                     }
//                     break;
        
//                 case 'Double chance & both teams to score':
//                     switch (type) {
//                         case '1X & yes':
//                             matchResult = (homeWin || isDraw) && bothTeamsScore;
//                             break;
//                         case '1X & no':
//                             matchResult = (homeWin || isDraw) && !bothTeamsScore;
//                             break;
//                         case '12 & yes':
//                             matchResult = (homeWin || awayWin) && bothTeamsScore;
//                             break;
//                         case '12 & no':
//                             matchResult = (homeWin || awayWin) && !bothTeamsScore;
//                             break;
//                         case 'X2 & yes':
//                             matchResult = (isDraw || awayWin) && bothTeamsScore;
//                             break;
//                         case 'X2 & no':
//                             matchResult = (isDraw || awayWin) && !bothTeamsScore;
//                             break;
//                     }
//                     break;
        
//                 case 'Halftime/fulltime & 1st half total 1.5':
//                     switch (type) {
//                         case '1/1 & over 1.5':
//                             matchResult = homeWin && totalGoals > 1.5;
//                             break;
//                         case '1/X & over 1.5':
//                             matchResult = homeWin && totalGoals > 1.5;
//                             break;
//                         case '1/2 & over 1.5':
//                             matchResult = homeWin && totalGoals > 1.5;
//                             break;
//                         case 'Draw/1 & over 1.5':
//                             matchResult = isDraw && totalGoals > 1.5;
//                             break;
//                         case 'Draw/draw & over 1.5':
//                             matchResult = isDraw && totalGoals > 1.5;
//                             break;
//                         case 'X/2 & over 1.5':
//                             matchResult = isDraw && totalGoals > 1.5;
//                             break;
//                         case '2/2 & over 1.5':
//                             matchResult = awayWin && totalGoals > 1.5;
//                             break;
//                         case '2/draw & over 1.5':
//                             matchResult = awayWin && totalGoals > 1.5;
//                             break;
//                         case '2/1 & over 1.5':
//                             matchResult = awayWin && totalGoals > 1.5;
//                             break;
//                         case '1/1 & under 1.5':
//                             matchResult = homeWin && totalGoals <= 1.5;
//                             break;
//                         case '1/X & under 1.5':
//                             matchResult = homeWin && totalGoals <= 1.5;
//                             break;
//                         case '1/2 & under 1.5':
//                             matchResult = homeWin && totalGoals <= 1.5;
//                             break;
//                         case 'Draw/1 & under 1.5':
//                             matchResult = isDraw && totalGoals <= 1.5;
//                             break;
//                         case 'Draw/draw & under 1.5':
//                             matchResult = isDraw && totalGoals <= 1.5;
//                             break;
//                         case 'X/2 & under 1.5':
//                             matchResult = isDraw && totalGoals <= 1.5;
//                             break;
//                         case '2/2 & under 1.5':
//                             matchResult = awayWin && totalGoals <= 1.5;
//                             break;
//                         case '2/draw & under 1.5':
//                             matchResult = awayWin && totalGoals <= 1.5;
//                             break;
//                         case '2/1 & under 1.5':
//                             matchResult = awayWin && totalGoals <= 1.5;
//                             break;
//                     }
//                     break;
//                     case 'Double chance & total 1.5':
//                         switch (type) {
//                             case '1/X & over 1.5':
//                                 matchResult = (homeWin || isDraw) && totalGoals > 1.5;
//                                 break;
//                             case 'X/2 & over 1.5':
//                                 matchResult = (isDraw || awayWin) && totalGoals > 1.5;
//                                 break;
//                             case '1/2 & over 1.5':
//                                 matchResult = (homeWin || awayWin) && totalGoals > 1.5;
//                                 break;
//                             case '1/X & under 1.5':
//                                 matchResult = (homeWin || isDraw) && totalGoals <= 1.5;
//                                 break;
//                             case 'X/2 & under 1.5':
//                                 matchResult = (isDraw || awayWin) && totalGoals <= 1.5;
//                                 break;
//                             case '1/2 & under 1.5':
//                                 matchResult = (homeWin || awayWin) && totalGoals <= 1.5;
//                                 break;
//                         }
//                         break;
            
//                     case 'Double chance & total 2.5':
//                         switch (type) {
//                             case '1/X & over 2.5':
//                                 matchResult = (homeWin || isDraw) && totalGoals > 2.5;
//                                 break;
//                             case 'X/2 & over 2.5':
//                                 matchResult = (isDraw || awayWin) && totalGoals > 2.5;
//                                 break;
//                             case '1/2 & over 2.5':
//                                 matchResult = (homeWin || awayWin) && totalGoals > 2.5;
//                                 break;
//                             case '1/X & under 2.5':
//                                 matchResult = (homeWin || isDraw) && totalGoals <= 2.5;
//                                 break;
//                             case 'X/2 & under 2.5':
//                                 matchResult = (isDraw || awayWin) && totalGoals <= 2.5;
//                                 break;
//                             case '1/2 & under 2.5':
//                                 matchResult = (homeWin || awayWin) && totalGoals <= 2.5;
//                                 break;
//                         }
//                         break;
            
//                     case 'Double chance & total 3.5':
//                         switch (type) {
//                             case '1/X & over 3.5':
//                                 matchResult = (homeWin || isDraw) && totalGoals > 3.5;
//                                 break;
//                             case 'X/2 & over 3.5':
//                                 matchResult = (isDraw || awayWin) && totalGoals > 3.5;
//                                 break;
//                             case '1/2 & over 3.5':
//                                 matchResult = (homeWin || awayWin) && totalGoals > 3.5;
//                                 break;
//                             case '1/X & under 3.5':
//                                 matchResult = (homeWin || isDraw) && totalGoals <= 3.5;
//                                 break;
//                             case 'X/2 & under 3.5':
//                                 matchResult = (isDraw || awayWin) && totalGoals <= 3.5;
//                                 break;
//                             case '1/2 & under 3.5':
//                                 matchResult = (homeWin || awayWin) && totalGoals <= 3.5;
//                                 break;
//                         }
//                         break;
            
//                     case 'Double chance & both teams to score':
//                         switch (type) {
//                             case '1X & yes':
//                                 matchResult = (homeWin || isDraw) && bothTeamsScore;
//                                 break;
//                             case '1X & no':
//                                 matchResult = (homeWin || isDraw) && !bothTeamsScore;
//                                 break;
//                             case '12 & yes':
//                                 matchResult = (homeWin || awayWin) && bothTeamsScore;
//                                 break;
//                             case '12 & no':
//                                 matchResult = (homeWin || awayWin) && !bothTeamsScore;
//                                 break;
//                             case 'X2 & yes':
//                                 matchResult = (isDraw || awayWin) && bothTeamsScore;
//                                 break;
//                             case 'X2 & no':
//                                 matchResult = (isDraw || awayWin) && !bothTeamsScore;
//                                 break;
//                         }
//                         break;
            
//                         case 'Halftime/fulltime & 1st half total 1.5':
//                             switch (type) {
//                                 case '1/1 & over 1.5':
//                                     matchResult = homeWinHT > 0 && homeWin && totalGoals > 1.5;
//                                     break;
//                                 case '1/X & over 1.5':
//                                     matchResult = homeWinHT > 0 && isDraw && totalGoals > 1.5;
//                                     break;
//                                 case '1/2 & over 1.5':
//                                     matchResult = homeWinHT > 0 && awayWin && totalGoals > 1.5;
//                                     break;
//                                 case 'Draw/1 & over 1.5':
//                                     matchResult = homeWinHT === 0 && homeWin && totalGoals > 1.5;
//                                     break;
//                                 case 'Draw/draw & over 1.5':
//                                     matchResult = homeWinHT === 0 && isDraw && totalGoals > 1.5;
//                                     break;
//                                 case 'X/2 & over 1.5':
//                                     matchResult = homeWinHT === 0 && awayWin && totalGoals > 1.5;
//                                     break;
//                                 case '2/2 & over 1.5':
//                                     matchResult = awayWinHT > 0 && awayWin && totalGoals > 1.5;
//                                     break;
//                                 case '2/draw & over 1.5':
//                                     matchResult = awayWinHT > 0 && isDraw && totalGoals > 1.5;
//                                     break;
//                                 case '2/1 & over 1.5':
//                                     matchResult = awayWinHT > 0 && homeWin && totalGoals > 1.5;
//                                     break;
//                                 case '1/1 & under 1.5':
//                                     matchResult = homeWin && totalGoals <= 1.5;
//                                     break;
//                                 case '1/X & under 1.5':
//                                     matchResult = homeWin && totalGoals <= 1.5;
//                                     break;
//                                 case '1/2 & under 1.5':
//                                     matchResult = homeWin && totalGoals <= 1.5;
//                                     break;
//                                 case 'Draw/1 & under 1.5':
//                                     matchResult = isDraw && totalGoals <= 1.5;
//                                     break;
//                                 case 'Draw/draw & under 1.5':
//                                     matchResult = isDraw && totalGoals <= 1.5;
//                                     break;
//                                 case 'X/2 & under 1.5':
//                                     matchResult = isDraw && totalGoals <= 1.5;
//                                     break;
//                                 case '2/2 & under 1.5':
//                                     matchResult = awayWin && totalGoals <= 1.5;
//                                     break;
//                                 case '2/draw & under 1.5':
//                                     matchResult = awayWin && totalGoals <= 1.5;
//                                     break;
//                                 case '2/1 & under 1.5':
//                                     matchResult = awayWin && totalGoals <= 1.5;
//                                     break;
//                             }
//                             break;
                        
//                         case 'Halftime/fulltime & 1st half total 2.5':
//                             switch (type) {
//                                 case '1/1 & over 2.5':
//                                     matchResult = homeWinHT > 0 && homeWin && totalGoals > 2.5;
//                                     break;
//                                 case '1/X & over 2.5':
//                                     matchResult = homeWinHT > 0 && isDraw && totalGoals > 2.5;
//                                     break;
//                                 case '1/2 & over 2.5':
//                                     matchResult = homeWinHT > 0 && awayWin && totalGoals > 2.5;
//                                     break;
//                                 case 'Draw/1 & over 2.5':
//                                     matchResult = homeWinHT === 0 && homeWin && totalGoals > 2.5;
//                                     break;
//                                 case 'Draw/draw & over 2.5':
//                                     matchResult = homeWinHT === 0 && isDraw && totalGoals > 2.5;
//                                     break;
//                                 case 'X/2 & over 2.5':
//                                     matchResult = homeWinHT === 0 && awayWin && totalGoals > 2.5;
//                                     break;
//                                 case '2/2 & over 2.5':
//                                     matchResult = awayWinHT > 0 && awayWin && totalGoals > 2.5;
//                                     break;
//                                 case '2/draw & over 2.5':
//                                     matchResult = awayWinHT > 0 && isDraw && totalGoals > 2.5;
//                                     break;
//                                 case '2/1 & over 2.5':
//                                     matchResult = awayWinHT > 0 && homeWin && totalGoals > 2.5;
//                                     break;
//                                 case '1/1 & under 2.5':
//                                     matchResult = homeWin && totalGoals <= 2.5;
//                                     break;
//                                 case '1/X & under 2.5':
//                                     matchResult = homeWin && totalGoals <= 2.5;
//                                     break;
//                                 case '1/2 & under 2.5':
//                                     matchResult = homeWin && totalGoals <= 2.5;
//                                     break;
//                                 case 'Draw/1 & under 2.5':
//                                     matchResult = isDraw && totalGoals <= 2.5;
//                                     break;
//                                 case 'Draw/draw & under 2.5':
//                                     matchResult = isDraw && totalGoals <= 2.5;
//                                     break;
//                                 case 'X/2 & under 2.5':
//                                     matchResult = isDraw && totalGoals <= 2.5;
//                                     break;
//                                 case '2/2 & under 2.5':
//                                     matchResult = awayWin && totalGoals <= 2.5;
//                                     break;
//                                 case '2/draw & under 2.5':
//                                     matchResult = awayWin && totalGoals <= 2.5;
//                                     break;
//                                 case '2/1 & under 2.5':
//                                     matchResult = awayWin && totalGoals <= 2.5;
//                                     break;
//                             }
//                             break;
                            // case 'Total Corners':
                            //     switch (type) {
                            //         case 'Over 4.5':
                            //             matchResult = totalCorners > 4.5;
                            //             break;
                            //         case 'Over 5.5':
                            //             matchResult = totalCorners > 5.5;
                            //             break;
                            //         case 'Over 6.5':
                            //             matchResult = totalCorners > 6.5;
                            //             break;
                            //         case 'Over 7.5':
                            //             matchResult = totalCorners > 7.5;
                            //             break;
                            //         case 'Over 8.5':
                            //             matchResult = totalCorners > 8.5;
                            //             break;
                            //         case 'Over 9.5':
                            //             matchResult = totalCorners > 9.5;
                            //             break;
                            //         case 'Over 10.5':
                            //             matchResult = totalCorners > 10.5;
                            //             break;
                            //         case 'Over 11.5':
                            //             matchResult = totalCorners > 11.5;
                            //             break;
                            //         case 'Over 12.5':
                            //             matchResult = totalCorners > 12.5;
                            //             break;
                            //         case 'Over 13.5':
                            //             matchResult = totalCorners > 13.5;
                            //             break;
                            //         case 'Under 4.5':
                            //             matchResult = totalCorners < 4.5;
                            //             break;
                            //         case 'Under 5.5':
                            //             matchResult = totalCorners < 5.5;
                            //             break;
                            //         case 'Under 6.5':
                            //             matchResult = totalCorners < 6.5;
                            //             break;
                            //         case 'Under 7.5':
                            //             matchResult = totalCorners < 7.5;
                            //             break;
                            //         case 'Under 8.5':
                            //             matchResult = totalCorners < 8.5;
                            //             break;
                            //         case 'Under 9.5':
                            //             matchResult = totalCorners < 9.5;
                            //             break;
                            //         case 'Under 10.5':
                            //             matchResult = totalCorners < 10.5;
                            //             break;
                            //         case 'Under 11.5':
                            //             matchResult = totalCorners < 11.5;
                            //             break;
                            //         case 'Under 12.5':
                            //             matchResult = totalCorners < 12.5;
                            //             break;
                            //         case 'Under 13.5':
                            //             matchResult = totalCorners < 13.5;
                            //             break;
                            //     }
                            //     break;
        

    // }

//     return {
//         result: `${homeGoals} - ${awayGoals}`,
//         outcome: matchResult
//     };
// };

// useEffect(() => {
//     if (!selectedMatch) return;

//     const { result, outcome } = checkMatchResult(type, market);
//     setResult(result);

//     if (outcome === true) {
//         setLoading(true);

//         fetch('https://back-jcpa.onrender.com/update-match-info', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 outcomes: outcome,
//                 state: state,  // Assuming this is defined somewhere in your component
//                 names: name,   // Assuming this is defined somewhere in your component
//                 selectedBetIds: selectedBetIds // Assuming this is defined somewhere in your component
//             })
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Update successful:', data);
//             setLoading(false);
//             // Handle any further UI updates or state management here if needed
//         })
//         .catch(error => {
//             console.error('Error updating match_info:', error);
//             setLoading(false);
//             setError('Failed to update match info');
//         });
//     }
// }, [selectedMatch, fixtures, homeTeam, awayTeam, type, market]);

// if (loading) return <div>Loading...</div>;
// if (error) return <div>{error}</div>;
// if (!selectedMatch) return <div>Error: No match details found</div>;
return (
    <div>
        <UserComponent />
        <Hello />
        <div className="item">
      <span className="team-name">🌐 {homeTeam}</span>
</div>
<div className="item">
    <span className="team-name">🌐 {awayTeam}</span>
</div>
<div className="item">
    <span className="info">Cote: {value}</span>
</div>
<div className="item">
    <span className="info">Type: {type}</span>
</div>
<div className="item">
    <span className="info">Date: {date}</span>
</div>
<div className="item">
    <span className="info">Time: {time}</span>
</div>
    </div>
    

);
};

export default MatchDetail;