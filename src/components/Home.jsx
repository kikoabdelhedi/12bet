import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './main.min.css'
import './print.min.css'
import './select2.min.css'
import ParieBar from './ParieBar'
import UserComponent from './UserComponent'
import BetGames from './BetGames'
import './BetGames.css'
import LiveNow from './LiveNow'
import Soon from './Soon'
import Hello from './Helloo'
import './Home.css' 

function Home() {
  return (
    <div className='home'>
      <UserComponent />
     <Hello />
      <LiveNow /> 
      <Soon /> 
    <ParieBar />
    <BetGames />
    </div>

    
  )
}

export default Home