import TrendingCarousel from "./components/TrendingCarousel";
import PopularCarousel from "./components/PopularCarousel";
import TvShowsCarousel from "./components/TvShowsCarousel";
import { getAllTrending } from "@/services/all";
import { getMovieList } from "@/services/movies";

export default async function Home() {
  const [trending, popular] = await Promise.all([
    getAllTrending(),
    getMovieList(),
  ]);

  return (
    <>
      <section className="pt-24 container">
        <div className="w-full lg:h-[8rem] p-10 bg-black flex flex-col justify-center text-white rounded">
          <h2 className="text-2xl lg:text-4xl">Welcome.</h2>
          <p className="text-lg lg:text-2xl max-md:pt-1">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
      </section>

      <TrendingCarousel initialData={trending} />
      <PopularCarousel initialData={popular} />
      <TvShowsCarousel />
    </>
  );
}
