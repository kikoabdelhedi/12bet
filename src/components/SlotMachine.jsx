import React from 'react';
import ParieBar from './ParieBar';
import LiveNow from './LiveNow';
import BetGames from './BetGames';
import { Link } from 'react-router-dom';
import Soon from './Soon';
import './NavBar.css'
import { SelectedEventsProvider } from './SelectedEventsContext';
import UserComponent from './UserComponent';
const SlotMachine = () => {
  return (
    <div >
        <div className="webp">
    <div id="app" data-v-app="">
        <div className="ColorScheme_root_XJLuF colorSchemeDark">
            <div id="app">
                <div data-v-5e0c26d4="">
                    <div data-v-5e0c26d4="" id="main-container" className="">
                        <div data-v-034aa6c6="" data-v-5e0c26d4="" className="header__line--top">
                            <div data-v-034aa6c6="" className="header-line-left">
                                <div data-v-034aa6c6="" className="level-item"></div>
                                <div data-v-034aa6c6="" className="divider"></div>
                                <a data-v-034aa6c6="" className="FreeMoneyLink_root_sudSD">
                                    <span className="FreeMoneyLink_text_qBSgN">Welcom</span>
                                    <img className="FreeMoneyLink_image_qU_wg" src='https://cdn1win.com/img/free-money-link-image.1ada0c9e1-120.png' />
                                </a>
                            </div>
                            <div data-v-034aa6c6="" className="header-line-right">
                                <div data-v-034aa6c6="" className="header-line-right--item">
                                   <UserComponent /> 
                                </div>
                                
                                
                            </div>
                        </div>
                        {/* Remaining HTML elements here... */}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div data-v-62a02a6c="" className="home__header">
  <div data-v-62a02a6c="" className="home__header-content">
    <div data-v-62a02a6c="" className="home__header-carousel">
      <div
        data-v-56810392=""
        data-v-62a02a6c=""
        className="slider home__banner-carousel"
      >
        <div data-v-56810392="" className="slider_container">
          <div data-v-56810392="" className="slider_slide slider_slide--first">
            <img
              src="https://cdn1win.com/img/1winpoker_en-min.6d3a2845f-1979.png"
              className="VPicture_opaqueImage_St2Jk VPicture_image_wmhVO"
              loading="eager"
            />
           
          </div>
        </div>
       
        
      </div>
    </div>
    <div data-v-62a02a6c="" className='home__header-promo'>
      <div data-v-62a02a6c="">
        <div
          className="VScaler_item_Vw0Wh"
          style={{
            height: 320,
            transform: "scale(1.05937)",
            width: "276.578px"
          }}
        >
          <div className="VSlide_root_n31U8 VSlide_typeSmile_dNfKl">
            <img
              className="ResponsivePicture_img_N2UWA"
              src="https://res.cloudinary.com/dqmhtibfm/image/upload/v1716830618/220815-Crown-Perth-Gaming-Blackjack-1800x1200px-6_yi1ecr.jpg"
              loading="lazy"
            />
            <div className="VSlide_content_OTd5l">
              <div className="VSlide_title_wo5B8">
                Cashback up to 30% on casinos
              </div>
              <button
                type="button"
                className="VSlide_button_cgyZ1"
                style={{ fontSize: 18 }}
              >
                Go to casino
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-v-62a02a6c="" className='home__header-promo'>
      <div data-v-62a02a6c="">
        <div
          className="VScaler_item_Vw0Wh"
          style={{
            height: 320,
            transform: "scale(1.05937)",
            width: "276.578px"
          }}
        >
          <div className="VSlide_root_n31U8 VSlide_typeSmile_dNfKl">
            <img
              className="ResponsivePicture_img_N2UWA"
              src="https://casino.acp-tools.com/assets/uploadsmy/casino_games/Ceazy-Time-background_Game_1440x900.jpg"
              loading="lazy"
            />
            <div className="VSlide_content_OTd5l">
              <div className="VSlide_title_wo5B8">Bonus + 500%</div>
              <button
                type="button"
                className="VSlide_button_cgyZ1"
                style={{ fontSize: 18 }}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




<div data-v-62a02a6c="" className="home__promos home__section">
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/SlipBets'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
        MyBETS
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Live'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      ⚽️ Football
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Bascet'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🏀 Basketball
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Tennis'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🥎 Tennis
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>

  
 
</div>
<div data-v-62a02a6c="" className="home__promos home__section">
<Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/TennisTable'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🏓 Table Tennis
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Volley'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🏐 Volleyball
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Hockey'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🏒 Ice Hockey
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Mma'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🥊 MMA
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>

  </div>
  <div data-v-62a02a6c="" className="home__promos home__section">
<Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Handball'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      ⚾️ Handball
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Golf'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      ⛳️ Golf
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Olympics'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🥇 Olympics
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Waterpolo'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🤽‍♀️ Waterpolo
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>

  </div>

  <div data-v-62a02a6c="" className="home__promos home__section">
<Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Snooker'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🎱 Snooker
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Rugby'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🏈 Rugby
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Squash'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🎾 Squash
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>
  <Link
    data-v-1e11f167=""
    data-v-62a02a6c=""
   to='/Darts'
    className="home__promo-card"
  >
    <div data-v-1e11f167="" className="promo-card">
      <div data-v-1e11f167="" className="promo-card__heading">
      🎯 Darts
      </div>
      
      <div data-v-1e11f167="" className="promo-card__pic-wrapper">
        <div data-v-1e11f167="" className="promo-card__pic-holder">
          <canvas
            data-v-1e11f167=""
            className="promo-card__pic"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  </Link>

  </div>

</div>
      <div>
      </div>
      <SelectedEventsProvider>
      <LiveNow />
      <Soon />
        <div className="components-container">
          <ParieBar />
          
          <BetGames />
        </div>
       
      </SelectedEventsProvider>
    </div>
  );
};

export default SlotMachine;
