import React from 'react'
import { useNavigate } from 'react-router-dom'
function Footer() {
    const navigate = useNavigate();
    const pay = () => {
        navigate(`/PaymentForm`);
      };
  return (
    <div>
        <footer className="footer">
        <div className="footer-wrapper">
          <div className="container-footer">
            <div className="row">
              <div className="col-2 hidden-md-down footer-menu">
                <h4 className="footer-title">Links</h4>
              </div> 
              <div className="col-3 flex-unordered footer-payment">
                <h4 className="footer-title" onClick={pay}>Payment methods</h4>
              </div>
              <div className="col-12 col-lg-4 flex-unordered footer-copyright">
                <div className="footer-copyright-top">
                  <b>Copyright © 2024 koora-bet365. All Rights Reserved.2024</b>
                </div>
                <p>
                  Date 16/May/2024
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer