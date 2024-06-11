import { options } from "./all";

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
    console.log("search", results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

// export const getMultiSearch = async (query: string, maxPages = 3) => {
//     let allResults = [];
//     let currentPage = 1;
//     let totalPages = 1;

//     try {
//       while (currentPage <= totalPages && currentPage <= maxPages) {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/search/multi?query=${query}&page=${currentPage}`,
//           options
//         );
//         const data = await res.json();
//         if (currentPage === 1) {
//           totalPages = data.total_pages;
//         }
//         allResults = [...allResults, ...data.results];
//         currentPage++;
//       }

//       console.log("Search results (limited pages)", allResults);
//       return allResults;
//     } catch (error: any) {
//       console.error(error.message);
//     }
//   };
