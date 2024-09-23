"use server";
import OpenAI from "openai";

const getNewExplanation = async function (prevResponse?: string[] | null) {
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
        content: `You must analyze the content of ${prevResponse} and give a totally different answer with new elements`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 500,
    temperature: 0.8,
  });
  return completion.choices[0];
};

export default getNewExplanation;
