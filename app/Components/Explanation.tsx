import React, { useEffect, useState } from "react";

interface ExplanationProps {
  topic: string | null;
  response: string | null;
  handleGoBack: () => void;
}

const Explanation: React.FC<ExplanationProps> = ({
  topic,
  response,
  handleGoBack,
}) => {
  const [activeAnimation, setActiveAnimation] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveAnimation(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h2
        className={` animate-middleToTop text-5xl font-semibold ${
          activeAnimation
            ? "h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
            : "mt-[100px] opacity-100 transition-opacity duration-200"
        }`}
      >
        {topic}
      </h2>
      <p
        className={`text-xl font-semibold text-justify grow mt-10 ${
          activeAnimation
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        {response}
      </p>
      <div
        className={`flex flex-row w-full justify-between text-2xl font-semibold ${
          activeAnimation
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-200"
        }`}
      >
        <button
          className="hover:animate-hoverScale animate-hoverScaleReverse"
          onClick={handleGoBack}
        >
          Go back
        </button>
        <button className="hover:animate-hoverScale animate-hoverScaleReverse">
          Get another topic
        </button>
        <button className="hover:animate-hoverScale self-start animate-hoverScaleReverse">
          Learn more...
        </button>
      </div>
    </>
  );
};

export default Explanation;
