"use server";
import OpenAI from "openai";

const getRandomTopic = async function () {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Give a random programming topic related to React. Your answer should not be a sentence but only the concept in max 3 words`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 10,
  });
  return completion.choices[0];
};

export default getRandomTopic;
