import React, { useState } from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";

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

  return (
    <div
      className={`w-full animate-textOpacity flex flex-col items-center justify-between grow py-8 ${
        closingAnimation && "opacity-0 transition-opacity duration-1000"
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-6 pt-4 max-sm:px-4">
        <h2 className="text-2xl sm:text-5xl font-semibold ">{question}</h2>
        <p className="text-xl sm:text-2xl font-semibold max-sm:overflow-y-scroll">
          Your answer: {answer}
        </p>
        <div className="max-sm:max-h-[300px] max-sm:overflow-y-scroll animate-textOpacity">
          <TextGenerateEffect words={explanation} />
        </div>
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
        <button className="hover:animate-hoverScale animate-hoverScaleReverse">
          Tell me more
        </button>
      </div>
    </div>
  );
};

export default QuizSolution;
