import React from 'react';
import { useState, useEffect } from "react";
import "../../styles/textEffect.css";


const useTypingEffect = (text, duration, isTypeByLetter = false) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const items = isTypeByLetter ? text.split("") : text.split(" ");

    useEffect(() => {
        setCurrentPosition(0);
    }, [text]);

    useEffect(() => {
        if (currentPosition >= items.length) return;

        const intervalId = setInterval(() => {
            setCurrentPosition((prevPosition) => prevPosition + 1);
        }, duration);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentPosition, items, duration]);

    return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ");
};

const texts = [
    "Explora un mundo de conocimiento literario con nuestra plataforma de reseñas de libros.",
    "Cada página es una nueva aventura por descubrir.",
    "Descubre tu próxima lectura favorita con nuestras reseñas detalladas y opiniones de lectores reales.",
    "Navega por un mar de palabras y opiniones con nuestra comunidad de amantes de la lectura.",
    "Encuentra la reseña perfecta para el libro que siempre has querido leer.",
    "Conviértete en un experto en literatura con nuestra biblioteca virtual de reseñas de libros.",
    "¿Buscas una guía confiable para tus próximas lecturas? No busques más.",
    "Nuestra plataforma de reseñas de libros te ofrece críticas honestas y perspicaces para ayudarte a elegir tu próximo libro.",
    "Tu próxima gran historia te espera.",
];

const TIME_TO_FADE = 300;
const TIME_INTERVAL = 3000;
const TIME_PER_LETTER = 100;

export const TextEffects = (text, duration, isTypeByLetter = false) => {
    const [textIndex, setTextIndex] = useState(0);
    const [fadeText, setFadeText] = useState(true);
    const [fadeCircle, setFadeCircle] = useState(true);
    const textToShow = useTypingEffect(texts[textIndex], TIME_PER_LETTER, false);

    const timeToTypeText = texts[textIndex].split(" ").length * TIME_PER_LETTER;

    useEffect(() => {
        const circleTimeout = setTimeout(() => {
            setFadeCircle(false);
        }, timeToTypeText + 1000);

        const textTimeout = setTimeout(() => {
            setFadeText(false);

            setTimeout(() => {
                setTextIndex((prevIndex) =>
                    prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
                );
                setFadeCircle(true);
                setFadeText(true);
            }, TIME_TO_FADE);
        }, TIME_INTERVAL);

        return () => {
            clearTimeout(circleTimeout);
            clearTimeout(textTimeout);
        };
    }, [textIndex]);

    return (
        <>
            <div
                className={`text-effect text-style ${fadeText ? "" : "text-effect-hidden"
                    }`}
                key={textIndex}
            >
                <span>
                    {textToShow}
                    <span
                        className={`ml-2 inline-block h-3 w-3 rounded-full ${fadeCircle ? "" : "circle-effect-hidden"
                            }`}
                    />{" "}
                </span>
            </div>
        </>
    );
};