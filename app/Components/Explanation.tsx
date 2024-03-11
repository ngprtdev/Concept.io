import React, { useEffect, useState } from "react";
import apiExplanationResponse from "../utils/getApiExplanation";

interface ExplanationProps {
  topic: string | null;
  response: string | null;
  prevResponse: string | null;
  handleGoBack: () => void;
}

const Explanation: React.FC<ExplanationProps> = ({
  topic,
  response,
  prevResponse,
  handleGoBack,
}) => {
  const [openingAnimation, setOpeningAnimation] = useState<boolean>(true);
  const [closingAnimation, setClosingAnimation] = useState<boolean>(false);
  const [newExplanation, setNewExplanation] = useState(response);
  const [newExplanationLoader, setNewExplanationLoader] = useState(false);

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
    }, 1700);

    return () => clearTimeout(closingTimer);
  };

  const handleNewSearch = async () => {
    setNewExplanationLoader(true);
    const fetchData = async () => {
      try {
        const data = await apiExplanationResponse(topic, prevResponse);

        setNewExplanation(data.message.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setNewExplanationLoader(false);
  };

  return (
    <>
      <h2
        className={`text-2xl sm:text-5xl font-semibold w-full flex justify-center ${
          openingAnimation
            ? "animate-middleToTop h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
            : "animate-textOpacity"
        } ${
          closingAnimation
            ? "animate-topToMiddle h-full absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
            : ""
        }`}
      >
        {topic}
      </h2>
      <p
        className={`text-lg sm:text-xl font-semibold text-justify grow pt-16 ${
          openingAnimation
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-1000"
        }
        ${closingAnimation ? "hidden" : ""}`}
      >
        {newExplanationLoader ? (
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white" />
        ) : (
          <p className="animate-textOpacity">{newExplanation}</p>
        )}
      </p>
      <div
        className={`flex flex-row w-full justify-between text-2xl font-semibold ${
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
        <button
          className="hover:animate-hoverScale self-start animate-hoverScaleReverse"
          onClick={handleNewSearch}
        >
          Learn more...
        </button>
      </div>
    </>
  );
};

export default Explanation;
