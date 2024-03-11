"use client";

import React, { use, useEffect, useState } from "react";
import Explanation from "./Components/Explanation";
import apiExplanationResponse from "./utils/getApiExplanation";
import getRandomTopic from "./utils/getRandomTopic";

type HandleGoBack = () => void;

export default function Home() {
  const [randomTopicSelected, setRandomTopicSelected] =
    useState<boolean>(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [prevResponse, setPrevResponse] = useState<string | null>("");
  const [isExplained, setIsExplained] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>("");
  const [isSearching, setIsSearching] = useState(false);

  const handleClick = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await getRandomTopic();

        setTopic(data.message.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setIsSearching(false);

    setRandomTopicSelected(true);
  };

  const handleExplanationButton = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await apiExplanationResponse(topic, prevResponse);

        setResponse(data.message.content);
        setPrevResponse(data.message.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setIsSearching(false);

    setIsExplained(true);
  };

  const handleGoBack: HandleGoBack = () => {
    const timer = setTimeout(() => {
      setResponse(null);
      setIsExplained(false);
    }, 1500);

    return () => clearTimeout(timer);
  };

  return (
    <div className="font-pacifico w-full h-[80%] sm:w-2/3 flex flex-col items-center justify-between sm:max-w-5xl mx-auto">
      {isExplained ? (
        <Explanation
          topic={topic}
          response={response}
          prevResponse={prevResponse}
          handleGoBack={handleGoBack}
        />
      ) : (
        <>
          {randomTopicSelected ? (
            <>
              <p className="text-lg sm:text-3xl font-bold uppercase animate-textOpacity">
                Can you explain ?
              </p>
              {isSearching ? (
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white" />
              ) : (
                <h2 className="text-2xl sm:text-5xl w-full flex justify-center font-semibold sm:absolute sm:transform sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 animate-textOpacity">
                  {topic}
                </h2>
              )}

              <div className="flex flex-row w-full justify-around text-lg sm:text-2xl font-semibold animate-textOpacity">
                <button
                  className="flex flex-col items-center hover:animate-hoverScale animate-hoverScaleReverse"
                  onClick={handleClick}
                >
                  <p>Get random topic</p>
                  <img
                    src="/images/perspective-dice-six-faces-random-svgrepo-com.svg"
                    width={32}
                  />
                </button>
                <button
                  className="hover:animate-hoverScale self-start animate-hoverScaleReverse"
                  onClick={handleExplanationButton}
                >
                  Show explanation
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl sm:text-3xl font-bold font-pacifico uppercase animate-textOpacity">
                What will you learn today?
              </p>
              <button
                onClick={handleClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
              >
                <img
                  src="/images/perspective-dice-six-faces-random-svgrepo-com.svg"
                  width={300}
                  className={`${
                    isSearching ? "animate-gelatine" : "animate-textOpacity"
                  }`}
                />
                <p className="text-3xl animate-textOpacity">Get Started</p>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
