import { postHeader } from "../config";
import { IAudio } from "./interfaces";

const API = process.env.REACT_APP_API_URL;

const indexVideo = async (youtubeUrl: string): Promise<IAudio[]> => {
  try {
    let url = `${API}/youtube/index/${encodeURIComponent(youtubeUrl)}`;
    const data = await fetch(url, postHeader);
    if (!data.ok) {
      throw new Error("Error indexando el video");
    }
    return data.json();
  } catch (error) {
    console.error("Error indexando el video:", error);
    throw new Error("Error indexando el video");
  }
};

export { indexVideo };
