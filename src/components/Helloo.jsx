import React from 'react';
import './Hello.css';
import { Link } from 'react-router-dom';
function Hello() {
  const headers = [
    { label: '📃', typeId: 1, path: '/Slip' },
    { label: '🏚️ ', typeId: 2, path: '/Home' },
    { label: '⚙️ ', typeId: 3 , path: '/Home'},
  ];

  const sport = [
    {
      name: 'FOOTBALL',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716804974/867482_xhhold.png',
       path: '/Home'
    },
    {
      name: 'BASKETBALL',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716805006/4855998_kwaqyf.png',
       path: '/Bascet'
    },
    {
      name: 'TENNIS',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716804974/5023365_ahpfwv.png',
       path: '/Tennis'
    },
    {
      name: 'Ice Hockey',
      img: 'https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_50/v1716804974/3753289_qizolb.png',
       path: '/Hockey'
    },
  ];

  return (
    <div className="body">
      
      <header className="header ">
        <div className="head-nav-wrap hidden-md-down">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex">
                <ul className="nav navigation-main align-items-center">
                  <li className="nav-item">
                    <a
                      href=""
                      className="nav-link active"
                      title="Sports Betting"
                    >
                      Sports Betting{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href=""
                      className="nav-link "
                      title="Live Betting"
                    >
                      Live Betting{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href=""
                      className="nav-link "
                      title="Casino"
                    >
                      Games of skill{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href=""
                      className="nav-link "
                      title="Live Games"
                    >
                      Live Games{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="main-container">
    
       
                    
                      <img
                        src="https://res.cloudinary.com/dqmhtibfm/image/upload/v1720711929/Ajouter_un_titre_1_vvk0yb.png"
                        className="custom-slider-img"
                        alt="SuperClue"
                      />
                    
                
                
          
     
    </main>
      <table className="center-table">
      <thead>
        <tr>
          <th>🔴 Live</th>
          {headers.map(header => (
            <th key={header.typeId} className="fifo">
              {header.path ? (
                <Link to={header.path}>{header.label}</Link>
              ) : (
                header.label
              )}
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
          <tr>
            {sport.map((header, index) => (
              <td key={index} className="fifo">
                <div>{header.name}</div>
                <Link to={header.path}>
                <img src={header.img} alt={header.name} />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Hello;

