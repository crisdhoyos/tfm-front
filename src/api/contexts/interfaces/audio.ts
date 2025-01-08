import { ICategory } from "./category";

export interface IAudio {
  id: string;
  name?: string;
  link?: string;
  youtubeId?: string;
  keywords?: string; // lista separada por comas
  description?: string; // resumen creado a partir de la info obtenida
  duration: number;
  categories: ICategory[];
  transcription?: string;
  tokens?: string; // arreglo del vector de la descripción
  createdAt?: string;
  updatedAt?: string;
}

export interface IFilterAllAudios {
  categoryId?: string;
}
