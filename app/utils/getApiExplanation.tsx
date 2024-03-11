"use server";
import OpenAI from "openai";

const apiExplanationResponse = async function (
  topic?: string | null,
  prevResponse?: string | null
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You must always adapt your answer to a maximum of 500 tokens. Start by analyzing the content of ${prevResponse}. Your answer should differ from the content in ${prevResponse}`,
      },
      { role: "user", content: `What is ${topic}?` },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 500,
    temperature: 0.8,
  });
  return completion.choices[0];
};

export default apiExplanationResponse;
