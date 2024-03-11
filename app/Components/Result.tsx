import React, { useState } from "react";

type HandleExplanationButtonType = (value: boolean) => void;

interface ResultProps {
  handleExplanationButton: HandleExplanationButtonType;
}

export default function Result({ handleExplanationButton }: ResultProps) {
  const [randomTopicSelected, setRandomTopicSelected] =
    useState<boolean>(false);
  const [topic, setTopic] = useState<string>("Higher Order Function");

  const handleClick = () => {
    setRandomTopicSelected(true);
    console.log(randomTopicSelected);
  };
  return (
    <>
      {randomTopicSelected ? (
        <>
          <p className="text-2xl font-bold uppercase mt-[100px] ">
            Can you explain the following topic?
          </p>
          <h2 className="text-4xl font-semibold">{topic}</h2>
          <div className="flex flex-row w-full justify-around text-xl font-semibold">
            <button className="flex flex-col items-center hover:animate-hoverScale animate-hoverScaleReverse">
              <p>Get random topic</p>
              <img
                src="/images/perspective-dice-six-faces-random-svgrepo-com.svg"
                width={32}
              />
            </button>
            <button
              className="hover:animate-hoverScale self-start animate-hoverScaleReverse"
              onClick={() => handleExplanationButton(true)}
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
  );
}
