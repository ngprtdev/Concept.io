"use server";
import OpenAI from "openai";

const getRandomTopic = async function (previousTopics: string[]) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Give a random programming topic in max 3 words and using only letters or numbers related to web development and different from one of the ${previousTopics}`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 3,
    temperature: 1,
  });
  return completion.choices[0];
};

export default getRandomTopic;
