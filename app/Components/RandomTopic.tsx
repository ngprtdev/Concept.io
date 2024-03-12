"use client";

import React, { useEffect, useState } from "react";
import Explanation from "../Components/Explanation";
import apiExplanationResponse from "../utils/getApiExplanation";
import getRandomTopic from "../utils/getRandomTopic";

type HandleGoBack = () => void;

interface TopicProps {
  firstTopic: string | null;
}

export default function RandomTopic({ firstTopic }: TopicProps) {
  const [topic, setTopic] = useState<string | null>(firstTopic);
  const [previousTopics, setPreviousTopics] = useState<string[]>([]);
  const [isExplained, setIsExplained] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>("");
  const [isSearching, setIsSearching] = useState(false);

  const handleClick = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await getRandomTopic(previousTopics);

        setTopic(data.message.content);
        setPreviousTopics((prev) => [...prev, data.message.content]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setIsSearching(false);
  };

  const handleExplanationButton = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await apiExplanationResponse(topic);

        setResponse(data.message.content);
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
    <>
      {isExplained ? (
        <Explanation
          topic={topic}
          response={response}
          handleGoBack={handleGoBack}
        />
      ) : (
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
      )}
    </>
  );
}
