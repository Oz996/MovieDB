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
    const results = data.results;
    console.log(results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};
