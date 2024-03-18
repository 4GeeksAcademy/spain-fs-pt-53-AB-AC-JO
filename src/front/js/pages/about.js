import React, { useContext, useEffect, useState } from "react";
// import "../../styles/about.css";




const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <img src="path/to/photo1.jpg" alt="Description 1" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Abielsaf</h5>
              <p className="card-text">Description 1</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
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