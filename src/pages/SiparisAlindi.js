import React from "react";
import "./SiparisAlindi.css";
import { useLocation } from "react-router-dom";
const SiparisAlindi = () => {
  const location = useLocation();
  const orderData = location.state;
  console.log(orderData);

  return (
    <div className="siparis-container">
      <h1 className="title">Teknolojik Yemekler</h1>
      <h2 className="subtitle">lezzetin yolda</h2>
      <h2 className="siparis-title">SİPARİŞ ALINDI</h2>

      <div className="order-details">
        <h3>{orderData.pizzaName}</h3>
        <p>Boyut: {orderData.size}</p>
        <p>Hamur: {orderData.thickness}</p>
        <p>
          Ek Malzemeler:{" "}
          {orderData.extraIngredients
            .filter((ingredient) => ingredient)
            .join(", ")}
        </p>{" "}
      </div>

      <div className="order-summary">
        <h4>Sipariş Toplamı</h4>
        <p>
          Seçimler:{" "}
          {/* {Object.values(orderData.extraIngredients).filter(Boolean).length * 5} */}
          {orderData.secimler}₺
        </p>
        <p>Toplam: {orderData.totalPrice}₺</p>
      </div>
    </div>
  );
};
export default SiparisAlindi;
