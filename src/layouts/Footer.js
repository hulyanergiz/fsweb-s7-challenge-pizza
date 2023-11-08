import React from "react";
import "./Footer.css";
import iconFirst from "../Assets/adv-aseets/icons/icon-1.png";
import iconSecond from "../Assets/adv-aseets/icons/icon-2.png";
import iconThird from "../Assets/adv-aseets/icons/icon-3.png";
import insta1 from "../Assets/adv-aseets/insta/li-0.png";
import insta2 from "../Assets/adv-aseets/insta/li-1.png";
import insta3 from "../Assets/adv-aseets/insta/li-2.png";
import insta4 from "../Assets/adv-aseets/insta/li-3.png";
import insta5 from "../Assets/adv-aseets/insta/li-4.png";
import insta6 from "../Assets/adv-aseets/insta/li-5.png";
import twitter from "../Assets/twitter.svg";
const Footer = () => {
  return (
    <div className="footer-div">
      <div className="upper-footer-div">
        <div className="left-div">
          <div className="contact">
            <h1>
              Teknolojik
              <br />
              Yemekler
            </h1>
            <div className="contact-div">
              <div>
                <img className="location-img" src={iconFirst} alt="location" />
                <p>
                  341 Londonderry Road, <br />
                  Istanbul Türkiye
                </p>
              </div>
              <div>
                <img src={iconSecond} alt="email" />
                <p>aciktim@teknolojikyemekler.com</p>
              </div>
              <div>
                <img src={iconThird} alt="phone" />
                <p>+90 216 123 45 67</p>
              </div>
            </div>
          </div>
          <div className="sicacik-menuler">
            <h2 className="sicacik-menuler-heading">Sıccacık Menuler</h2>
            <p className="sicacik-menuler-p">Terminal Pizza</p>
            <p className="sicacik-menuler-p">5 Kişilik Hackathlon Pizza</p>
            <p className="sicacik-menuler-p">useEffect Tavuklu Pizza</p>
            <p className="sicacik-menuler-p">Beyaz Console Frosty</p>
            <p className="sicacik-menuler-p">Testler Geçti Mutlu Burger</p>
            <p className="sicacik-menuler-p">Position Absolute Acı Pizza</p>
          </div>
        </div>

        <div className="right-div">
          <h2 className="right-heading">Instagram</h2>
          <div className="insta-grid">
            <img src={insta1} alt="food" />
            <img src={insta2} alt="food" />
            <img src={insta3} alt="food" />
            <img src={insta4} alt="food" />
            <img src={insta5} alt="food" />
            <img src={insta6} alt="food" />
          </div>
        </div>
      </div>
      <div className="below-footer-div">
        <p>© 2023 Teknolojik Yemekler. </p>
        <img src={twitter} alt="twitter" />
      </div>
    </div>
  );
};
export default Footer;
