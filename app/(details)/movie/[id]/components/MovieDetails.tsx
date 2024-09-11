import { formatDate, getBaseUrl } from "@/lib/utils";
import { Movie } from "@/types";
import classNames from "classnames";
import { Play } from "lucide-react";
import Link from "next/link";
import CircleRatingBar from "../../../../../components/Banner/components/CircleRatingBar";
import CrewList from "../../../../../components/Banner/components/CrewList";

interface props {
  movie: Movie;
  handleShowTrailer: () => void;
}

export default function MovieDetails({ movie, handleShowTrailer }: props) {
  const getRunTime = () => {
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="flex flex-col justify-center md:pr-10 col-span-3">
      <div className="z-20 flex gap-2 text-2xl md:text-4xl">
        <h1 className="font-bold">{movie.title}</h1>
        <span className="opacity-80 max-md:hidden">
          ({new Date(movie.release_date).getFullYear()})
        </span>
      </div>
      <div className="flex flex-wrap lg:items-center max-md:pt-3 gap-3">
        <span>{formatDate(movie.release_date)}</span>
        <div
          className={classNames({
            "pl-3 relative": true,
            "before:absolute before:content-['•'] before:left-0":
              movie.genres.length > 0,
          })}
        >
          {movie.genres?.map((genre) => (
            <Link
              key={genre.id}
              href={
                getBaseUrl() +
                `/movies/popular?vote_count.gte=100&with_genres=${genre.id}`
              }
              className="after:content-[',_'] last:after:content-['']"
            >
              {genre.name}
            </Link>
          ))}
        </div>
        <span
          className={classNames({
            "pl-3 relative flex gap-1": true,
            "before:absolute before:content-['•'] before:left-0": movie.runtime,
          })}
        >
          {getRunTime()}
        </span>
      </div>
      {movie.vote_average !== 0 && (
        <div className="size-28 pt-5 flex gap-2 items-center">
          <CircleRatingBar rating={Math.floor(movie.vote_average * 10)} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <button
          className="flex gap-1 cursor-pointer pt-2 pb-3 w-[7rem]"
          onClick={handleShowTrailer}
        >
          <Play size={22} aria-hidden="true" />
          <span className="font-semibold">Play Trailer</span>
        </button>
        <span className="italic opacity-80">{movie.tagline}</span>
        <span className="text-xl">Overview</span>
        <p>{movie.overview}</p>
        <CrewList type="movie" crew={movie.credits.crew} />
      </div>
    </div>
  );
}
