import { Media } from "@/types";
import options, { tmdbURL } from "./options";

export const getAllTrending = async (
  time: string = "day"
): Promise<Media[]> => {
  try {
    const res = await fetch(
      tmdbURL + `trending/all/${time}?language=en-US`,
      options
    );
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

// export const getBackgroundImages = async () => {
//   try {
//     const popular = await getMovieList("popular");
//     const ids = popular?.map((image) => image.id);

//     const randomIndex = Math.floor(Math.random() * ids?.length!);
//     const randomId = ids![randomIndex];

//     const res = await fetch(
//       `https://api.themoviedb.org/3/movie/${randomId}/images`,
//       options
//     );
//     const data = await res.json();
//     const result = data.posters[0].file_path;
//     console.log("image res", data.posters);
//     return result;
//   } catch (error: any) {
//     console.error(error.message);
//   }
// };
