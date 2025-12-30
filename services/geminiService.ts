
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askStudyBuddy = async (question: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are 'DuoVU', a playful, encouraging study assistant for Virtual University students. 
      Keep your response short, formatted in Markdown, and use student-friendly language.
      Student Question: ${question}
      Course Context: ${context}`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My circuits got a bit tangled. Can you try asking that again?";
  }
};
