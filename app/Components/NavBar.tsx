"use client";
import React from "react";

interface NavBarProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  hideNav: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  currentIndex,
  setCurrentIndex,
  hideNav,
}) => {
  const navElements = [
    { title: "ASK", index: 0 },
    { title: "RANDOM", index: 1 },
    { title: "QUIZ", index: 2 },
  ];

  return (
    <div
      className={`w-2/3 sm:w-3/4 xl:w-1/2 flex justify-between ${
        hideNav ? "hidden" : ""
      }`}
    >
      {navElements.map((item) => (
        <div key={item.index} className="flex flex-col">
          <button
            onClick={() => setCurrentIndex(item.index)}
            className={`text-lg sm:text-3xl font-bold uppercase hover:animate-hoverScale hover:text-gray-300 animate-hoverScaleReverse  ${
              currentIndex === item.index
                ? "text-white hover:text-white"
                : "text-gray-400"
            }`}
            disabled={item.index === 0}
          >
            {item.title}
          </button>
          {item.index === 0 && <p className="max-sm:text-xs">Coming soon</p>}
        </div>
      ))}
    </div>
  );
};

export default NavBar;
