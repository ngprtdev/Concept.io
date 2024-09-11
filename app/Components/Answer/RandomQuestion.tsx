import { useState } from "react";
import getRandomQuestion from "@/app/utils/getRandomQuestion";
import getQuestionExplanation from "@/app/utils/getQuestionExplanation";
import QuizSolution from "./QuizSolution";

type HandleGoBack = () => void;

export default function RandomQuestion() {
  const [question, setQuestion] = useState<string | null>("What is React ?");
  const [answer, setAnswer] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleClick = async () => {
    setIsSearching(true);
    const fetchData = async () => {
      try {
        const data = await getRandomQuestion();

        setQuestion(data.message.content);
        // setPreviousTopics((prev) => [...prev, data.message.content]);
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
        const data = await getQuestionExplanation(question, answer);

        setExplanation(data.message.content || "");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setIsAnswered(true);
  };

  const handleGoBack: HandleGoBack = async () => {
    const timer = setTimeout(() => {
      setQuestion(question);
      setAnswer("");
      setExplanation("");
      setIsAnswered(false);
      setIsSearching(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="w-full flex flex-col justify-between items-center grow">
      {isAnswered ? (
        <QuizSolution
          question={question}
          answer={answer}
          explanation={explanation}
          handleGoBack={handleGoBack}
        />
      ) : (
        <>
          <div className="h-1/2 w-full flex flex-col justify-around items-center animate-textOpacity">
            {isSearching ? (
              <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-white" />
            ) : (
              <h2 className="text-2xl sm:text-5xl font-semibold max-sm:px-4">
                {question}
              </h2>
            )}
            <textarea
              className="w-3/4 text-black p-4 rounded-md resize-none"
              placeholder="Answer here (max 200 characters)"
              maxLength={200}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-row w-full justify-around text-lg sm:text-2xl font-semibold animate-textOpacity">
            <button
              className="flex flex-col items-center hover:animate-hoverScale animate-hoverScaleReverse"
              onClick={handleClick}
              disabled={isSearching}
            >
              <p>Get random question</p>
              <img
                src="/images/perspective-dice-six-faces-random-svgrepo-com.svg"
                width={32}
              />
            </button>
            <button
              className="hover:animate-hoverScale self-start animate-hoverScaleReverse"
              onClick={handleExplanationButton}
            >
              Validate answer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
