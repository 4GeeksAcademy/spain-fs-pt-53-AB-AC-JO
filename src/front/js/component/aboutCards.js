import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";

export const AboutCards = () => {
    return (
        <>
            <div className="about-cards-container">
                <div className="top-left-corner">
                    <Swiper className="mySwiper">
                        <SwiperSlide>
                            <div className="cardAbout-body">
                                <h5 className="cardAbout-title text-center">Abielsaf</h5>
                                <p className="cardAbout-text">
                                    ¡Hola! Soy Ángel, un apasionado de la programación y la tecnología. Desde muy
                                    joven, he estado fascinado por el mundo de la informática y he dedicado mi vida
                                    a explorar y dominar diferentes lenguajes de programación y tecnologías
                                    emergentes.
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <a
                                    href="https://github.com/Abielsaf"
                                    target="_blank"
                                    className="btn btn-dark mr-2"
                                >
                                    <svg
                                        fill="white"
                                        viewBox="0 0 496 512"
                                        height="1.6em"
                                    >
                                        {/* SVG path content for the first card */}
                                    </svg>
                                    GitHub
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="bottom-right-corner">
                    <Swiper className="mySwiper">
                        <SwiperSlide>
                            <div className="cardAbout-body">
                                <h5 className="cardAbout-title text-center">AnaMCS26</h5>
                                <p className="cardAbout-text">
                                    ¡Hola! Soy Ana, un entusiasta de la programación con una pasión inquebrantable por la creación de software innovador y funcional. Desde que escribí mi primera línea de código, supe que había encontrado mi verdadera vocación.
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <a
                                    href="https://github.com/AnaMCS26"
                                    target="_blank"
                                    className="btn btn-dark mr-2"
                                >
                                    <svg
                                        fill="white"
                                        viewBox="0 0 496 512"
                                        height="1.6em"
                                    >
                                        {/* SVG path content for the second card */}
                                    </svg>
                                    GitHub
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>


        </>
    );
};
