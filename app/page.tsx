"use client";

import React, { useState } from "react";
import Result from "./Components/Result";
import Explanation from "./Components/Explanation";
import apiExplanationResponse from "./utils/getApiExplanation";
import getRandomTopic from "./utils/getRandomTopic";

type HandleGoBack = () => void;

export default function Home() {
  const [randomTopicSelected, setRandomTopicSelected] =
    useState<boolean>(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [isExplained, setIsExplained] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>("");

  const handleClick = () => {
    const fetchData = async () => {
      try {
        const data = await getRandomTopic();

        setTopic(data.message.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    setRandomTopicSelected(true);
  };

  const handleExplanationButton = async () => {
    const fetchData = async () => {
      try {
        const data = await apiExplanationResponse(topic);

        setResponse(data.message.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    setIsExplained(true);
  };

  const handleGoBack: HandleGoBack = () => {
    setIsExplained(false);
  };

  return (
    <div className="font-pacifico h-[80%] flex flex-col items-center justify-between max-w-5xl mx-auto">
      {isExplained ? (
        <Explanation
          topic={topic}
          response={response}
          handleGoBack={handleGoBack}
        />
      ) : (
        <>
          {randomTopicSelected ? (
            <>
              <p className="text-3xl font-bold uppercase mt-[100px] ">
                Can you explain the following topic?
              </p>
              <h2 className="text-5xl font-semibold absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {topic}
              </h2>
              <div className="flex flex-row w-full justify-around text-2xl font-semibold">
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
              <p className="text-2xl font-bold font-pacifico uppercase mt-[100px]">
                What will you learn today?
              </p>
              <button
                onClick={handleClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
              >
                <img
                  src="/images/perspective-dice-six-faces-random-svgrepo-com.svg"
                  width={300}
                  className="hover:animate-gelatine"
                />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
