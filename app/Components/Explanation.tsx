import React, { useEffect, useState } from "react";
import apiExplanationResponse from "../utils/getApiExplanation";
import { TextGenerateEffect } from "./ui/text-generate-effect";

interface ExplanationProps {
  topic: string | null;
  response: string;
  handleGoBack: () => void;
  handleNav: (value: boolean) => void;
}

const Explanation: React.FC<ExplanationProps> = ({
  topic,
  response,
  handleGoBack,
  handleNav,
}) => {
  const [openingAnimation, setOpeningAnimation] = useState<boolean>(true);
  const [closingAnimation, setClosingAnimation] = useState<boolean>(false);
  const [newExplanation, setNewExplanation] = useState<string>(response);
  const [newExplanationLoader, setNewExplanationLoader] = useState(false);
  const [prevResponse, setPrevResponse] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpeningAnimation(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const handleClosingAnimation = () => {
    setClosingAnimation(true);

    const closingTimer = setTimeout(() => {
      setClosingAnimation((prev) => false);
      handleNav(false);
    }, 1500);

    return () => clearTimeout(closingTimer);
  };

  return (
    <>
      <h2
        className={`text-2xl sm:text-5xl font-semibold max-sm:w-full flex justify-center ${
          openingAnimation
            ? "animate-middleToTopSmall sm:animate-middleToTopLarge h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
            : "animate-textOpacity"
        } ${
          closingAnimation
            ? "animate-topToMiddleSmall sm:animate-topToMiddleLarge h-screen fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
            : ""
        }`}
      >
        {topic}
      </h2>
      <p
        className={`text-lg sm:text-xl font-semibold text-justify grow sm:pt-16 ${
          openingAnimation
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-1000"
        }
        ${closingAnimation ? "hidden" : ""}`}
      >
        {newExplanationLoader ? (
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white" />
        ) : (
          <p className="max-sm:max-h-[300px] max-sm:overflow-y-scroll animate-textOpacity max-sm:mt-16 max-sm:px-4 ">
            <TextGenerateEffect words={newExplanation} />
          </p>
        )}
      </p>
      <div
        className={`flex flex-row w-full justify-around text-lg sm:text-2xl font-semibold max-sm:px-4 ${
          openingAnimation
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-1000"
        }
        ${closingAnimation ? "hidden" : ""}`}
      >
        <button
          className="hover:animate-hoverScale animate-hoverScaleReverse"
          onClick={() => {
            handleClosingAnimation(), handleGoBack();
          }}
        >
          Go back
        </button>
        <button className="hover:animate-hoverScale animate-hoverScaleReverse">
          Show code example
        </button>
      </div>
    </>
  );
};

export default Explanation;
