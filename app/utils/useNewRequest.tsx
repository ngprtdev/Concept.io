import { useState } from "react";
import getNewExplanation from "./getNewExplanation";

const useNewRequest = (initialExplanation: string) => {
  const [newExplanation, setNewExplanation] = useState(initialExplanation);
  const [newExplanationLoader, setNewExplanationLoader] = useState(false);
  const [prevExplanation, setPrevExplanation] = useState([initialExplanation]);

  const fetchNewExplanation = async () => {
    setNewExplanationLoader(true);
    try {
      const data = await getNewExplanation(prevExplanation);
      setNewExplanation(data.message.content || "");
      setPrevExplanation([...prevExplanation, data.message.content || ""]);
    } catch (error) {
      console.error("Error fetching new explanation:", error);
    } finally {
      setNewExplanationLoader(false);
    }
  };

  return {
    newExplanation,
    newExplanationLoader,
    setPrevExplanation,
    fetchNewExplanation,
  };
};

export default useNewRequest;
