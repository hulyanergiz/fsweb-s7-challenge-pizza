import React from "react";
import { Switch, Route } from "react-router-dom";
import Anasayfa from "../pages/AnaSayfa";
import SiparisFormu from "../pages/SiparisFormu";
import SiparisAlindi from "../pages/SiparisAlindi";
import "./Main.css";

function Main(props) {
  let price = 85.5;
  return (
    <Switch>
      <Route exact path="/">
        <Anasayfa />
      </Route>
      <Route path="/pizza">
        <div className="heading-path">
          <p className="heading-p">
            <a className="homePage" href="/">
              Anasayfa
            </a>
            -Seçenekler-<strong>Sipariş Oluştur</strong>
          </p>
        </div>
        <div className="main">
          <h3>Position Absolute Acılı Pizza</h3>{" "}
          {/* idsi name-input olan input olcak */}
          <div className="digital-container">
            <div className="price">{price}₺</div>
            <div className="rating">
              <div>4.9</div>
              <div>(200)</div>
            </div>
          </div>
          <p>
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre.Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. Küçük pizzaya bazen pizzetta denir.{" "}
          </p>
          <SiparisFormu price={price} />
        </div>
      </Route>
      <Route path="/siparisalindi">
        <SiparisAlindi />
      </Route>
    </Switch>
  );
}
export default Main;
