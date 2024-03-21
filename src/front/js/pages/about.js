import React from "react";
import CardAbout from "../component/cardabout";
import "../../styles/about.css";

const About = () => {
  const cardData = [
    {
      image: "path/to/photo1.jpg",
      name: "Abielsaf",
      description: "Description 1",
      buttonIcon: "path/to/button-icon.svg",
      buttonText: "Button 1",
    },
    {
      image: "path/to/photo2.jpg",
      name: "AnaMCS26",
      description: "Description 2",
      buttonIcon: "path/to/button-icon.svg",
      buttonText: "Button 2",
    },
  ];

  return (
    <div className="row">
      <div className="col-6">
        <CardAbout data={cardData[0]} />
      </div>
      <div className="col-6">
        <CardAbout data={cardData[1]} />
      </div>
      <div className="text-center mt-5">
        <p>Gracias por vistar nuestra app!</p>
      </div>
    </div>
  );
};

export default About;