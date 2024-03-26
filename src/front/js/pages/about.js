import React, { useContext, useEffect, useState } from "react";
import "../../styles/about.css";
import { JumbotronAbout } from "../component/jumbotronAbout";
import { AboutCards } from "../component/aboutCards";



const About = () => {
  return (
    <div className="mx-3">
      <div>
        <JumbotronAbout></JumbotronAbout>
      </div>
      <div>
        <AboutCards></AboutCards>
      </div>
      <div className="text-center">
        <h4>Agradecimientos:</h4>
        <p>
          Imagen librería: <a href="https://www.freepik.es/foto-gratis/gran-estanteria-madera-anticuada-biblioteca-interior-generada-inteligencia-artificial_122400454.htm#fromView=search&page=1&position=27&uuid=8f701962-f796-480e-b44f-181efbba9a28">Imagen de vecstock</a> en Freepik
        </p>
        <p>
          Icono del home: <a href="https://www.freepik.com/icon/reading_4072049">Icon by mangsaabguru</a> en Freepik
        </p>
      </div>
    </div>
  );
};


export default About;