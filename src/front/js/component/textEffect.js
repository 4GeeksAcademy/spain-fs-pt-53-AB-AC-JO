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
    "This is a simple text typing effect in React",
    "This effect is created using React Hooks",
    "We can use this effect to create a typing effect for your portfolio",
    "We can also use this effect to create a typing effect for your resume",
    "or for your blog",
    "or for your landing page",
    "let's go",
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