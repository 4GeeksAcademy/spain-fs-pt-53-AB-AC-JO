import React, { useContext, useEffect, useState } from "react";
import "../../styles/about.css";





const About = () => {
  return (
    <div className="container">
      <div class="jumbotron">
        <div className="logo-container">
          <img src="path/to/logo.png" alt="App Logo" className="logo" />
        </div>
        <h1 class="display-4">Hola</h1>
         <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4"/>
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    
    </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card1 h-100">
            <img src="path/to/photo1.jpg" alt="Description 1" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Abielsaf</h5>
              <p className="card-text">Description 1</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card1 h-100">
            <img src="path/to/photo2.jpg" alt="Description 2" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">AnaMCS26</h5>
              <p className="card-text">Description 2</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <p>Gracias por vistar nuestra app!</p>
      </div>
    </div>
  );
};

export default About;