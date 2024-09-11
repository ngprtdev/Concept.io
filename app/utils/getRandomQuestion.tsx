"use server";
import OpenAI from "openai";

const getRandomQuestion = async function () {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Ask a difficult question related to a concept in web development like you're interviewing. Limit your question to max 5 words. Your question must never includes characters like " or '.`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 10,
    temperature: 1,
  });
  return completion.choices[0];
};

export default getRandomQuestion;
