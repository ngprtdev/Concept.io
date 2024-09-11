"use client";

import React, { useState } from "react";
import Explanation from "./Explanation";
import getTopicExplanation from "../../utils/getTopicExplanation";
import getRandomTopic from "../../utils/getRandomTopic";

type HandleGoBack = () => void;

interface TopicProps {
  firstTopic: string | null;
  handleNav: (value: boolean) => void;
}

export default function RandomTopic({ firstTopic, handleNav }: TopicProps) {
  const [topic, setTopic] = useState<string | null>(firstTopic);
  const [previousTopics, setPreviousTopics] = useState<string[]>([]);
  const [isExplained, setIsExplained] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const handleClick = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await getRandomTopic(previousTopics);

        setTopic(data.message.content);
        setPreviousTopics((prev) => [...prev, data.message.content ?? ""]);
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
        const data = await getTopicExplanation(topic);

        setResponse(data.message.content || "");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    handleNav(true);
    setIsSearching(false);

    setIsExplained(true);
  };

  const handleGoBack: HandleGoBack = async () => {
    const timer = setTimeout(() => {
      setResponse("");
      setIsExplained(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <>
      {isExplained ? (
        <Explanation
          topic={topic}
          response={response}
          handleGoBack={handleGoBack}
          handleNav={handleNav}
        />
      ) : (
        <>
          {isSearching ? (
            <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-t-4 border-b-4 border-white" />
          ) : (
            <h2 className="text-2xl sm:text-5xl w-full flex justify-center font-semibold sm:absolute sm:transform sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 animate-textOpacity">
              {topic}
            </h2>
          )}

          <div className="flex flex-row w-full justify-around text-lg sm:text-2xl font-semibold animate-textOpacity">
            <button
              className="flex flex-col items-center hover:animate-hoverScale animate-hoverScaleReverse"
              onClick={handleClick}
              disabled={isSearching}
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
              disabled={isSearching}
            >
              Show explanation
            </button>
          </div>
        </>
      )}
    </>
  );
}
