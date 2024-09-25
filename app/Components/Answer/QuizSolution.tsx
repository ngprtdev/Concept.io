import React, { useState } from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import useNewRequest from "@/app/utils/useNewRequest";

interface ExplanationProps {
  question: string | null;
  answer: string | null;
  explanation: string;
  handleGoBack: () => void;
}

const QuizSolution: React.FC<ExplanationProps> = ({
  question,
  answer,
  explanation,
  handleGoBack,
}) => {
  const [closingAnimation, setClosingAnimation] = useState(false);

  const { newExplanation, newExplanationLoader, fetchNewExplanation } =
    useNewRequest(explanation);

  return (
    <div
      className={`w-full animate-textOpacity flex flex-col items-center justify-between grow py-8 sm:pt-20 ${
        closingAnimation && "opacity-0 transition-opacity duration-1000"
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-6 sm:gap-12 pt-4 max-sm:px-4 max-sm:mb-4 max-sm:max-h-[400px]">
        <h2 className="text-2xl sm:text-5xl font-semibold ">{question}</h2>
        <p className="text-xl sm:text-2xl font-semibold max-sm:overflow-y-scroll">
          Your answer: {answer}
        </p>
        {newExplanationLoader ? (
          <div className="max-sm:min-h-[300px]">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-t-4 border-b-4 border-white" />
          </div>
        ) : (
          <div className="max-sm:max-h-[300px] max-sm:overflow-y-scroll animate-textOpacity">
            <TextGenerateEffect words={newExplanation} />
          </div>
        )}
      </div>

      <div className="flex flex-row w-full justify-around text-lg sm:text-2xl font-semibold max-sm:px-4">
        <button
          className="hover:animate-hoverScale animate-hoverScaleReverse"
          onClick={() => {
            handleGoBack();
            setClosingAnimation(true);
          }}
        >
          Go back
        </button>
        <button
          className="hover:animate-hoverScale animate-hoverScaleReverse"
          onClick={fetchNewExplanation}
        >
          Tell me more
        </button>
      </div>
    </div>
  );
};

export default QuizSolution;
