import React from "react";
import "../../styles/cardabout.css";

const CardAbout = ({ image, name, description, buttonText, buttonIcon }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="content">
          <div>
            <img src={image} alt={name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{description}</p>
              <button className="Btn">
                
                
                <span className="BG"></span>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAbout;