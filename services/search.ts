import { ResultObject } from "@/types";
import options from "./options";

export const getSearchResults = async (
  query: string,
  type: string = "multi",
  page: number = 1
): Promise<ResultObject> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};
