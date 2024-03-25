import React, { useContext, useEffect, useState } from "react";
import "../../styles/about.css";
import { JumbotronAbout } from "../component/jumbotronAbout";
import { AboutCards } from "../component/aboutCards";



const About = () => {
  return (
    <>
      <div>
        <JumbotronAbout></JumbotronAbout>
      </div>
      <div>
        <AboutCards></AboutCards>
      </div>
    </>
  );
};

export default About;