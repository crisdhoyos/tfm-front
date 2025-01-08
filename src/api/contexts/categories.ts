import { getHeader } from "../config";
import { ICategory } from "./interfaces";

const API = process.env.REACT_APP_API_URL;

const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const url = `${API}/categories`;
    const data = await fetch(url, getHeader);
    return data.json();
  } catch (error) {
    console.error("Error obteniendo las categorias:", error);
    return [];
  }
};

export { getAllCategories };
