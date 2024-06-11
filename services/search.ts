import { options } from "./all";

export const getMultiSearch = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=search`,
      options
    );
    const data = await res.json();
    console.log("search", data);
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};
