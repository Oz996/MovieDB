import { TvShow } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import CircleRatingBar from "../../../../../components/Banner/components/CircleRatingBar";
import { Play } from "lucide-react";
import CrewList from "../../../../../components/Banner/components/CrewList";
import { getBaseUrl } from "@/lib/utils";

interface props {
  tvShow: TvShow;
  handleShowTrailer: () => void;
}

export default function TvShowDetails({ tvShow, handleShowTrailer }: props) {
  const getTvShowDate = () => {
    const first = tvShow.first_air_date?.slice(0, 4);
    const last = tvShow.last_air_date?.slice(0, 4);

    if (tvShow.in_production) {
      return `${first}-`;
    } else {
      return `${first} - ${last}`;
    }
  };

  return (
    <div className="flex flex-col justify-center md:pr-10 col-span-3">
      <div className="flex gap-2 text-2xl md:text-4xl">
        <h1 className="font-bold">{tvShow.name}</h1>
        <span className="opacity-80 max-md:hidden">({getTvShowDate()})</span>
      </div>
      <div className="flex flex-wrap lg:items-center max-md:pt-3 gap-3">
        <div
          className={classNames({
            "pl-3 relative": true,
            "before:absolute before:content-['•'] before:left-0":
              tvShow.genres?.length > 0,
          })}
        >
          {tvShow.genres?.map((genre) => (
            <Link
              key={genre.id}
              href={
                getBaseUrl() +
                `/shows/popular?vote_count.gte=100&with_genres=${genre.id}`
              }
              className="after:content-[',_'] last:after:content-['']"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
      {tvShow.vote_average !== 0 && (
        <div className="size-28 pt-5 flex gap-2 items-center">
          <CircleRatingBar rating={Math.floor(tvShow.vote_average * 10)} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <button
          className="flex gap-1 cursor-pointer pt-2 pb-3 w-[7rem"
          onClick={handleShowTrailer}
        >
          <Play size={22} aria-hidden="true" />
          <span className="font-semibold">Play Trailer</span>
        </button>
        <span className="italic opacity-80">{tvShow.tagline}</span>
        <span className="text-xl">Overview</span>
        <p>{tvShow.overview}</p>
        <CrewList type="tv" crew={tvShow.credits.crew} />
      </div>
    </div>
  );
}
