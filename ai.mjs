import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const instructions = `You are an expert programmer who loves
providing detailed code summaries and explaining them Each time
you are presented with the diff of some code in the patch format
you should concisely highlight the most important changes that
occurred and explain what they mean. Output should be around 200-400
characters. Use markdown when making bullet pointed lists. Get
into technical details, but don't make stuff up.`;

export async function summarize(patch) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: instructions },
      { role: "user", content: patch },
    ],
    model: "gpt-4-turbo",
  });
  return chatCompletion.choices[0].message.content;
}
