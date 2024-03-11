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
        content: `Give a random programming topic in max 3 words related to web development. Your answer must not mix different concepts`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 5,
    temperature: 1.8,
  });
  return completion.choices[0];
};

export default getRandomTopic;
