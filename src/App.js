import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SlipBets from './components/SlipBets';
import AddUser from './components/AddUser';
import ParieBar from './components/ParieBar';
import LiveNow from './components/LiveNow';
import Soon from './components/Soon';
import SlotMachine from './components/SlotMachine';
import BetGames from './components/BetGames';
import Events from './components/Events';
import { SelectedEventsProvider } from './components/SelectedEventsContext';
import Live from './components/Live';
import Volley from './components/Volley';
import Tennis from './components/Tennis'; 
import TennisTable from './components/TennisTable';
import Snooker from './components/Snooker';
import Squash from './components/Sqaush'; 
import Mma from './components/Mma'; 
import Golf from './components/Golf'; 
import Darts from './components/Darts';
import Bascet from './components/Bascet';
import Rugby from './components/Rugby'; 
import Olympics from './components/Olympics'; 
import Waterpolo from './components/Waterpolo';
import Handball from './components/HandBall';
import UserComponent from './components/UserComponent';
import OneEvent from './components/OneEvent';
const App = () => {
  return (
    <SelectedEventsProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/OneEvent/:eventid" element={<OneEvent />} />
          <Route path="/UserComponent" element={<UserComponent />} />
          <Route path="/Handball" element={<Handball />} />
          <Route path="/Waterpolo" element={<Waterpolo />} />
          <Route path="/Olympics" element={<Olympics />} />
          <Route path="/Rugby" element={<Rugby />} />
          <Route path="/Volley" element={<Volley />} />
          <Route path="/Tennis" element={<Tennis/>} />
          <Route path="/TennisTable" element={<TennisTable />} />
          <Route path="/Snooker" element={<Snooker />} />
          <Route path="/Squash" element={<Squash />} />
          <Route path="/Mma" element={<Mma />} />
          <Route path="/Golf" element={<Golf />} />
          <Route path="/Darts" element={<Darts />} />
          <Route path="/Bascet" element={<Bascet />} />
          <Route path="/Live" element={<Live />} />
          <Route path="/Events" element={<Events />} />
            <Route path="/BetGames" element={<BetGames />} />
            <Route path="/Soon" element={<Soon />} />
            <Route path="/LiveNow" element={<LiveNow />} />
            <Route path="/ParieBar" element={<ParieBar />} />
           
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/SlipBets" element={<SlipBets />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SlotMachine" element={<SlotMachine />} />
          </Routes>
        </div>
      </Router>
    </SelectedEventsProvider>
  );
};

export default App;
