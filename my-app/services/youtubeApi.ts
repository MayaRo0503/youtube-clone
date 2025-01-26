import axios from "axios";

const API_KEY = "AIzaSyBmAQ8iHgdOG_HIFs8ZRLw53oQjq8c8JjI";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const youtubeApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchVideos = async (query: string) => {
  try {
    const response = await youtubeApi.get("/search", {
      params: {
        part: "snippet",
        maxResults: 10,
        q: query,
        type: "video",
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};
