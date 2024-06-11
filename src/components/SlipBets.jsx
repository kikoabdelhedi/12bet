import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SlipBets = () => {
    const [slipBets, setSlipBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSlipBets = async () => {
            try {
                const response = await axios.get('/api/slipbets');
                setSlipBets(response.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlipBets();
    }, []);

    const userLogin = localStorage.getItem('login');
    console.log('LocalStorage contents:', userLogin);

    // Filter slip bets based on the login from localStorage
    const filteredSlipBets = slipBets.filter(bet => bet.login === userLogin);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    console.log(slipBets)

    return (
        <div className="container14">
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
                                    <div data-v-56810392="" className="slider_hover-images-zone">
                                        <img
                                            src="https://cdn1win.com/img/1winpoker_en_hover-min.1860b42ef-1979.png"
                                            className="VPicture_opaqueImage_St2Jk VPicture_image_wmhVO"
                                            loading="eager"
                                        />
                                        <div
                                            data-v-56810392=""
                                            className="slider-click-zones-containers"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div data-v-56810392="" className="slider_buttons-container">
                                <div
                                    data-v-56810392=""
                                    className="slider_button slider_button--before"
                                >
                                    <div data-v-56810392="" className="button-angle" />
                                </div>
                                <div data-v-56810392="" className="slider_button slider_button--next">
                                    <div data-v-56810392="" className="button-angle" />
                                </div>
                            </div>
                            <div data-v-56810392="" className="banner-controls">
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control" />
                                <div data-v-56810392="" className="carousel-control active"></div>
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
            <h1>Slip Bets</h1> 
            <div className="slip-bets-grid14">
                {filteredSlipBets.map((bet) => (
                    <div key={bet.id} className="bet-card14">
                        <h2>Match Info:</h2>
                        <ul>
                            {bet.match_info.map((match, index) => (
                                <li key={`${bet.id}-${index}`}>
                                    <div  className="bet-card">
                                 <i className="fa fa-dot-circle-o" aria-hidden="true" />
                                 <span className="bet-value">
                                 🌐 {match.name}  <br/>
                                   <span className="bet-value">
                                   cote: {match.value} <br/>
                                   </span>
                                   <span className="bet-value">
                                   {match.type}
                                   </span>
                                 </span>
                        
                               </div>
                                </li>
                                
                            ))}
                            
                        </ul>
                        <p>Price: {bet.price}</p>
                        <p>Total Cote: {bet.totalcote}</p>
                        <p>Total Bonus: {bet.totalbonus}%</p>
                        <p>Total Win: {bet.totalwin}</p>
                       
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default SlipBets;
