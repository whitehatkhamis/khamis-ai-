import { GoogleGenerativeAI } from "@google/generative-ai";

// HANKALI: Saka Key naka nan kai tsaye don gwaji kawai
const API_KEY = "AQ.Ab8RN6IgGngocdH_jyfUu5uMqg0P8MzOGF4zqlHy9LDvRRQgZg"; 

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.status(200).json({ text: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
