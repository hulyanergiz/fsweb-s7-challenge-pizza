import React from "react";
import backgroundImage from "../mvp-banner.png";
import { NavLink } from "reactstrap";
const AnaSayfa = () => {
  return (
    <div className="anasayfa">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3%",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "white", marginBottom: "10px", fontSize: "2em" }}>
            Teknolojik Yemekler
          </h1>
          <h2 style={{ color: "white", marginBottom: "30px", fontSize: "4em" }}>
            KOD ACIKTIRIR
          </h2>
          <h2 style={{ color: "white", marginBottom: "30px", fontSize: "4em" }}>
            PIZZA, DOYURUR
          </h2>
        </div>
        <NavLink href="/pizza">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "yellow",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ACIKTIM
          </button>
        </NavLink>
      </div>
    </div>
  );
};
export default AnaSayfa;
