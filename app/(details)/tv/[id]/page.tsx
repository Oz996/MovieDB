import TvShowBanner from "./components/TvShowBanner";
import MediaCarousel from "../../components/MediaCarousel";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import TvShowAside from "./components/TvShowAside";
import {
  DetailsContainer,
  DetailsGridDiv,
} from "../../components/DetailsContainer";
import { filterByTrailers } from "@/lib/utils";
import { getTvShowDetails } from "@/services/tvShows";

export default async function TvShow({ params }: { params: { id: string } }) {
  const tvShow = await getTvShowDetails(params.id);

  return (
    <DetailsContainer>
      <TvShowBanner tvShow={tvShow} />
      <DetailsGridDiv>
        <div className="col-span-3 space-y-5 lg:-mr-8">
          <PersonCarousel cast={tvShow.credits.cast.slice(0, 8)} />
          <ReviewSection reviews={tvShow.reviews.results} />
          <MediaCarousel
            type="tv"
            id={params.id}
            videos={filterByTrailers(tvShow.videos.results)}
          />
          <SimilarCarousel
            type="tv"
            id={params.id}
            rating={Math.ceil(tvShow.vote_average * 10)}
          />
        </div>
        <TvShowAside tvShow={tvShow} />
      </DetailsGridDiv>
    </DetailsContainer>
  );
}
