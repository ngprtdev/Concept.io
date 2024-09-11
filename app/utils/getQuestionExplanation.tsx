"use server";
import OpenAI from "openai";

const getQuestionExplanation = async function (
  question?: string | null,
  answer?: string | null
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You must always adapt your answer to a maximum of 500 tokens.`,
      },
      {
        role: "user",
        content: `The user is asked ${question} and gives the following answer: ${answer}. Provide a correct the answer`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 500,
    temperature: 0.8,
  });
  return completion.choices[0];
};

export default getQuestionExplanation;
