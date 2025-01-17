import OpenAI from "openai";
import { ApiError } from "../utils/ApiError.js";
import { extractText } from "./ocr.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const SUMMARY_LENGTH_PROMPTS = {
  short:
    "Create a concise 2-3 sentence summary that captures the most crucial points and main ideas. Focus on the essential takeaways.",
  medium:
    "Provide a balanced 4-6 sentence summary that outlines key points and important details. Include main arguments and significant supporting evidence.",
  long: "Generate a comprehensive 8-10 sentence summary that thoroughly covers main ideas, key arguments, important details, and their relationships. Maintain the logical flow of information.",
};

const SYSTEM_MESSAGES = {
  short:
    "You are a precise document summarizer skilled at distilling complex information into essential points. Focus on the most impactful ideas and critical takeaways.",
  medium:
    "You are an expert document summarizer who balances detail and brevity. Identify and connect key points while maintaining clarity and context.",
  long: "You are a comprehensive document summarizer who creates detailed yet focused summaries. Capture main ideas, supporting points, and their relationships while maintaining readability.",
};

export async function generateSummaryFromFile(file, summaryType) {
  const text = await extractText(file);
  return await generateSummaryFromText(text, summaryType);
}

export async function generateSummaryFromText(text, summaryType) {
  const prompt = SUMMARY_LENGTH_PROMPTS[summaryType];
  const systemMessage = SYSTEM_MESSAGES[summaryType];

  if (!prompt || !systemMessage) {
    throw new ApiError(400, "Unsupported summary length type");
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: `
            Please analyze the following text and ${prompt}
            
            When creating the summary:
            - Identify and emphasize key points and main ideas
            - Maintain logical flow and connections between ideas
            - Preserve essential context
            - Use clear and concise language
            
            Text to summarize: ${text}
          `,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7, // Balanced between creativity and consistency
    max_tokens:
      summaryType === "short" ? 150 : summaryType === "medium" ? 300 : 500,
  });

  const summary = completion.choices[0].message.content;
  return { summary, originalText: text };
}
