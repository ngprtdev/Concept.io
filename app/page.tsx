"use client";

import React, { use, useState } from "react";

import getRandomTopic from "./utils/getRandomTopic";
import RandomTopic from "./Components/RandomTopic";

export default function Home() {
  const [landingPage, setLandingPage] = useState<boolean>(true);
  const [firstTopic, setFirstTopic] = useState<string | null>(null);
  const [previousTopics, setPreviousTopics] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  const StartingClick = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await getRandomTopic(previousTopics);

        setFirstTopic(data.message.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setIsSearching(false);

    setLandingPage(false);
  };

  const handleNavbarDisplay = (value: boolean) => {
    setHideNav((prev) => value || !prev);
  };

  return (
    <div className="font-pacifico w-full h-[80%] sm:w-2/3 flex flex-col items-center justify-between  mx-auto">
      {landingPage ? (
        <>
          <p className="text-xl sm:text-3xl font-bold font-pacifico uppercase animate-textOpacity">
            What will you learn today?
          </p>
          <button
            onClick={StartingClick}
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
      ) : (
        <>
          <p
            className={`text-lg sm:text-3xl font-bold uppercase animate-textOpacity ${
              hideNav ? "hidden" : ""
            }`}
          >
            Can you explain ?
          </p>
          <RandomTopic
            firstTopic={firstTopic}
            handleNav={handleNavbarDisplay}
          />
        </>
      )}
    </div>
  );
}
