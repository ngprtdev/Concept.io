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
        content: `Give a difficult random programming topic in max 2 words with only letters and numbers related to web development and different from one of the ${previousTopics}. Your answer must not include " or ' characters`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 3,
    temperature: 1,
  });
  return completion.choices[0];
};

export default getRandomTopic;
