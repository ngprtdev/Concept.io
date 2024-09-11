"use client";

import React, { use, useState } from "react";

import getRandomTopic from "./utils/getRandomTopic";
import RandomTopic from "./Components/Explain/RandomTopic";
import RandomQuestion from "./Components/Answer/RandomQuestion";

export default function Home() {
  const [landingPage, setLandingPage] = useState<boolean>(true);
  const [firstTopic, setFirstTopic] = useState<string | null>(null);
  const [previousTopics, setPreviousTopics] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

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

  const NavBar = () => {
    const navElements = [
      { title: "ASK", index: 0 },
      {
        title: "RANDOM",
        index: 1,
      },
      { title: "QUIZ", index: 2 },
    ];

    return (
      <div
        className={`w-2/3 sm:w-3/4 xl:w-1/2 flex justify-between ${
          hideNav ? "hidden" : ""
        }`}
      >
        {navElements.map((item) => {
          return (
            <div key={item.index} className="flex flex-col">
              <button
                onClick={() => {
                  setCurrentIndex(item.index);
                }}
                className={`text-lg sm:text-3xl font-bold uppercase hover:animate-hoverScale hover:text-gray-300 animate-hoverScaleReverse  ${
                  currentIndex === item.index
                    ? "text-white hover:text-white"
                    : "text-gray-400"
                }`}
                disabled={item.index === 0}
              >
                {item.title}
              </button>
              {item.index === 0 && (
                <p className="max-sm:text-xs">Coming soon</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleNavbarDisplay = (value: boolean) => {
    setHideNav((prev) => value || !prev);
  };

  return (
    <div className="font-pacifico w-full h-[80%] sm:w-2/3 flex flex-col items-center justify-between mx-auto">
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
          <NavBar />
          {currentIndex === 1 && (
            <RandomTopic
              firstTopic={firstTopic}
              handleNav={handleNavbarDisplay}
            />
          )}

          {currentIndex === 2 && <RandomQuestion />}

          <a
            href="https://www.linkedin.com/in/nicolas-gasparetto-404ab110b/"
            className="absolute bottom-5 right-5 font-medium text-sm sm:text-xl"
          >
            @Developed by ngprt.
          </a>
        </>
      )}
    </div>
  );
}
