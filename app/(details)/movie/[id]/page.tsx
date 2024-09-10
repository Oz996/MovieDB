import { Movie as IMovie, Trailer } from "@/types";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import MediaCarousel from "../../components/MediaCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import MovieBanner from "./components/MovieBanner";
import MovieAside from "./components/MovieAside";
import {
  DetailsContainer,
  DetailsGridDiv,
} from "../../components/DetailsContainer";
import { filterByTrailers } from "@/lib/utils";
import { getMovieDetails } from "@/services/movies";

export default async function Movie({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);

  return (
    <DetailsContainer>
      <MovieBanner movie={movie} />
      <DetailsGridDiv>
        <div className="col-span-3 space-y-5 lg:-mr-8">
          <PersonCarousel cast={movie.credits.cast.slice(0, 8)} />
          <ReviewSection reviews={movie.reviews.results} />
          <MediaCarousel
            type="movie"
            id={params.id}
            videos={filterByTrailers(movie.videos.results)}
          />
          <SimilarCarousel
            type="movie"
            id={params.id}
            rating={Math.ceil(movie.vote_average * 10)}
          />
        </div>
        <MovieAside movie={movie} />
      </DetailsGridDiv>
    </DetailsContainer>
  );
}
