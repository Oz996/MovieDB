import options from "./options";

export const getSearchResults = async (
  query: string,
  type: string = "multi",
  page: number = 1
) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}`,
      options
    );
    const data = await res.json();
    const results = data.results;
    console.log("search", data);
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};
