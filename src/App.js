import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SlipBets from './components/SlipBets';
import ParieBar from './components/ParieBar';
import LiveNow from './components/LiveNow';
import Soon from './components/Soon';
import BetGames from './components/BetGames';
import Events from './components/Events';
import { SelectedEventsProvider } from './components/SelectedEventsContext';
import Live from './components/Live';
import Helloo from './components/Helloo';
import UserComponent from './components/UserComponent';
import OneEvent from './components/OneEvent';
import Odds from './components/Odds';
import Tennis from './components/Tennis';
import Bascet from './components/Bascet';
import Hockey from './components/Hockey';
import Slip from './components/Slip';
import BetDetails from './components/BetDetails';
import { SlipProvider } from './components/SlipContext';
import MatchDetail from './components/MatchDetail';
import { MatchProvider } from './components/MatchContext';
import ForceRedirect from './components/ForceRedirect'; // Import ForceRedirect
import PaymentForm from './components/PaymentForm';
import Footer from './components/Footer'; 

const App = () => {
  return (
    <SelectedEventsProvider>
      <SlipProvider>
        <MatchProvider>
          <Router>
            <div className="App">
              <Routes>
              <Route path="/PaymentForm" element={<PaymentForm />} />
                <Route path="/" element={<Login />} />
                <Route path="/ParieBar" element={
                  <ForceRedirect>
                    <ParieBar />
                  </ForceRedirect>
                } />
                 <Route path="/Home" element={
                  <ForceRedirect>
                    <Home />
                  </ForceRedirect>
                } />
                 <Route path="/Helloo" element={
                  <ForceRedirect>
                    <Helloo />
                  </ForceRedirect>
                } />
                 <Route path="/Tennis" element={
                  <ForceRedirect>
                    <Tennis />
                  </ForceRedirect>
                } />
                 <Route path="/Bascet" element={
                  <ForceRedirect>
                    <Bascet />
                  </ForceRedirect>
                } />
                 <Route path="/Hockey" element={
                  <ForceRedirect>
                    <Hockey />
                  </ForceRedirect>
                } />
                <Route path="/BetDetail" element={
                  <ForceRedirect>
                    <BetDetails />
                  </ForceRedirect>
                } />
                <Route path="/MatchDetail" element={
                  <ForceRedirect>
                    <MatchDetail />
                  </ForceRedirect>
                } />
                <Route path="/Slip" element={
                  <ForceRedirect>
                    <Slip />
                  </ForceRedirect>
                } />
                <Route path="/bet" element={
                  <ForceRedirect>
                    <BetDetails />
                  </ForceRedirect>
                } />
                <Route path="/Odds/:market,:eventid" element={
                  <ForceRedirect>
                    <Odds />
                  </ForceRedirect>
                } />
                <Route path="/OneEvent/:eventid" element={
                
                    <OneEvent />
                 
                } />
                <Route path="/UserComponent" element={
                  <ForceRedirect>
                    <UserComponent />
                  </ForceRedirect>
                } />
                <Route path="/Live" element={
                  <ForceRedirect>
                    <Live />
                  </ForceRedirect>
                } />
                <Route path="/Events" element={
                  <ForceRedirect>
                    <Events />
                  </ForceRedirect>
                } />
                <Route path="/BetGames" element={
                  
                    <BetGames />
                
                } />
                <Route path="/Soon" element={
                  <ForceRedirect>
                    <Soon />
                  </ForceRedirect>
                } />
                <Route path="/LiveNow" element={
                  <ForceRedirect>
                    <LiveNow />
                  </ForceRedirect>
                } />
                <Route path="/SlipBets" element={
                  <ForceRedirect>
                    <SlipBets />
                  </ForceRedirect>
                } />
              </Routes>
            </div>
            <Footer />
          </Router>
         
        </MatchProvider>
      </SlipProvider>
    </SelectedEventsProvider>
  );
};

export default App;
