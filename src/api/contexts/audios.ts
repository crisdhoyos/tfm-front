import { getHeader } from "../config";
import { IAudio, IFilterAllAudios } from "./interfaces";

const API = process.env.REACT_APP_API_URL;

const getAllAudios = async (
  filters: IFilterAllAudios = {}
): Promise<IAudio[]> => {
  try {
    let url = `${API}/audios`;
    const queryString = new URLSearchParams(Object.entries(filters)).toString();
    if (queryString) {
      url = `${url}?${queryString}`;
    }
    const data = await fetch(url, getHeader);
    return data.json();
  } catch (error) {
    console.error("Error obteniendo los audios:", error);
    return [];
  }
};

const searchAudios = async (searchText: string): Promise<IAudio[]> => {
  try {
    let url = `${API}/audios/search/${searchText}`;
    const data = await fetch(url, getHeader);
    return data.json();
  } catch (error) {
    console.error("Error buscando los audios:", error);
    return [];
  }
};

export { getAllAudios, searchAudios };
