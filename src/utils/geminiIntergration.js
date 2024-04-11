// node --version # Should be >= 18
// npm install @google/generative-ai
import { BASE_URL, GEMINI_API_KEY, options, requests } from "../constants";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import axiosClient from "./axiosClient";

const MODEL_NAME = "gemini-pro";

async function fetchSuggestion(media_type, name) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const parts = [
    {
      text: `give me only names of similar ${media_type}  of ${name} in array`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  return response.text();
}
async function getSuggestions(media_type, name) {
  let query = media_type;
  if (media_type === "tv") {
    query = "tv series";
  }
  let sugg = await fetchSuggestion(query, name);
  const regex = /^(?:[*-]\s*)?(.*?)(?:\s*\((\d{4})\))?$/gm;
  let match;
  const moviesWithYear = [];
  while ((match = regex.exec(sugg)) !== null) {
    const movie = {
      name: match[1]?.trim(),
      year: parseInt(match[2]),
    };
    moviesWithYear.push(movie);
  }
  const fetchPromises = moviesWithYear.map(async (movie) => {
    const res = await axiosClient.get(
      `${requests.search}/${media_type}?query=${movie.name}&language=en-US&page=1&year=${movie.year}`,
      options()
    );
    const data = res.data;
    return data.results[0];
  });

  const results = await Promise.all(fetchPromises);
  return results.filter((result) => result);
}
export default getSuggestions;
