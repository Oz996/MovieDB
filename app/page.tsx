import TrendingCarousel from "@/components/Carousels/TrendingCarousel";
import PopularCarousel from "@/components/Carousels/PopularCarousel";
import TvShowsCarousel from "@/components/Carousels/TvShowsCarousel";

export default function Home() {
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

      <TrendingCarousel />
      <PopularCarousel />
      <TvShowsCarousel />
    </>
  );
}
