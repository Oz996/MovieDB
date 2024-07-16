import { Result } from "@/types";
import { getMovieList } from "./movies";

const token = process.env.TOKEN;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTAyMjFiYzZkNzQyMTc4MWVjN2NmM2E3MjlkMWU2NSIsInN1YiI6IjY0YTA3MDNlYzM5MGM1MDBjYWZmYWRiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W1T2Ad204uX43WIrXDRmfudR8rCdyLWuyVejhEIQOEU`,
  },
};

export const getAllTrending = async (time: string = "day") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/${time}?language=en-US`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getBackgroundImages = async () => {
  try {
    const popular = await getMovieList("popular");
    const ids = popular?.map((image) => image.id);

    const randomIndex = Math.floor(Math.random() * ids?.length!);
    const randomId = ids![randomIndex];

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${randomId}/images`,
      options
    );
    const data = await res.json();
    const result = data.posters[0].file_path;
    console.log("image res", data.posters);
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
};
