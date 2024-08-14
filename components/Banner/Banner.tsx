"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Crew, Movie, Trailer, TvShow } from "@/types";
import Image from "next/image";
import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Play } from "lucide-react";
import Link from "next/link";
import { getMovieVideos } from "@/services/movies";
import TrailerIframe from "../TrailerIframe";
import BannerLoader from "./components/BannerLoader";
import { useMediaQuery } from "@uidotdev/usehooks";
import { getTvShowVideos } from "@/services/tvShows";
import {
  filterByTrailers,
  formatDate,
  getBaseUrl,
  handleDisplayImage,
} from "@/lib/utils";

interface props {
  movie?: Movie;
  tvShow?: TvShow;
  videos: Trailer[];
  isLoading: boolean;
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function Banner({
  movie,
  tvShow,
  videos,
  isLoading,
  setVideos,
}: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  const movieDate = new Date(movie?.release_date as string);
  const year = movieDate.getFullYear();
  const genres = movie?.genres || tvShow?.genres;

  const getTvShowDate = () => {
    const first = tvShow?.first_air_date?.slice(0, 4);
    const last = tvShow?.last_air_date?.slice(0, 4);

    if (tvShow?.in_production) {
      return `${first}-`;
    } else {
      return `${first} - ${last}`;
    }
  };

  const rolesToList = ["Director", "Writer", "Screenplay", "Story", "Creator"];
  const crew = movie?.credits?.crew?.filter((crew) =>
    rolesToList.includes(crew.job)
  );

  const dateToDisplay = movie ? year : getTvShowDate();

  const title = movie?.title || tvShow?.name;
  const image = movie?.poster_path || tvShow?.poster_path;
  const backdrop = movie?.backdrop_path || tvShow?.backdrop_path;
  const tagline = movie?.tagline || tvShow?.tagline;
  const overview = movie?.overview || tvShow?.overview;

  console.log("tvtv", tvShow);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const runtime = movie?.runtime;
  const getRunTime = () => {
    if (!runtime) return;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const rating = Math.ceil(
    movie?.vote_average! * 10 || tvShow?.vote_average! * 10
  );
  const getColor = () => {
    if (!rating) return "#ccc";
    if (rating >= 70) {
      return "#21d07a";
    } else if (rating >= 40) {
      return "#d2d531";
    } else {
      return "#db2360";
    }
  };

  // making sure that no person gets duplicated and turning persons job property to an array of all jobs
  const getCrewRoles = () => {
    if (!crew) return;
    const nameMap = new Map();

    for (const item of crew) {
      if (nameMap.has(item.name)) {
        nameMap.get(item.name).job.push(item.job);
      } else {
        nameMap.set(item.name, { ...item, job: [item.job] });
      }
    }
    const result: Crew[] = [];
    for (const item of crew) {
      const person = nameMap.get(item.name);
      if (person && !result.some((p) => p.name === person.name)) {
        result.push(person);
      }
    }

    return result;
  };

  const trailerToDisplay = videos[0]?.key;

  console.log("vidss", videos);

  const fetchVideos = async () => {
    try {
      if (movie) {
        const res = await getMovieVideos(movie?.id);
        const trailers = filterByTrailers(res!);
        setVideos(trailers);
      } else if (tvShow) {
        const res = await getTvShowVideos(tvShow?.id);
        const trailers = filterByTrailers(res!);
        setVideos(trailers);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleShowTrailer = () => {
    setPlayTrailer(true);
    if (videos?.length === 0) {
      fetchVideos();
    }
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  console.log("current movie", movie);

  const imageSize = () => {
    if (isMobile) {
      return 400;
    } else {
      return 300;
    }
  };

  if (isLoading) return <BannerLoader />;

  return (
    <section className="pt-16">
      {/* backdrop image */}
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop}")`,
        }}
        className="md:h-[32rem] flex items-center justify-center w-full relative before:bg-black/60 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        {/* image and other content */}
        <div className="z-20 flex max-md:flex-col gap-10 text-white container max-md:pb-5">
          <Image
            width={imageSize()}
            height={imageSize()}
            src={handleDisplayImage("w1280", image!)}
            alt="Movie poster"
            className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
          />
          <div className="flex flex-col justify-center md:pr-10">
            <div className="z-20 flex gap-2 text-2xl md:text-4xl">
              <h2 className="font-bold">{title}</h2>
              <span className="opacity-80 max-md:hidden">
                ({dateToDisplay})
              </span>
            </div>
            <div className="flex max-md:flex-col lg:items-center max-md:pt-3 gap-3">
              {<span>{formatDate(movie?.release_date!)}</span>}
              <div
                className={classNames({
                  "pl-3 relative": true,
                  "before:absolute before:content-['•'] before:left-0":
                    genres?.length! > 0,
                })}
              >
                {genres?.map((genre, i) => (
                  <Link key={genre.id} href="">
                    <span>
                      {genre.name}
                      {i === genres.length - 1 ? "" : ", "}
                    </span>
                  </Link>
                ))}
              </div>
              <span
                className={classNames({
                  "pl-3 relative flex gap-1": true,
                  "before:absolute before:content-['•'] before:left-0": runtime,
                })}
              >
                {getRunTime()}
              </span>
            </div>
            {rating !== 0 && (
              <div className="size-28 pt-5 flex gap-2 items-center">
                <CircularProgressbar
                  value={rating!}
                  text={`${rating}%`}
                  styles={{
                    text: {
                      fontSize: "2rem",
                      fill: "white",
                    },
                    trail: {
                      opacity: "40%",
                    },
                    path: {
                      stroke: getColor(),
                    },
                  }}
                  className="font-semibold"
                />
                <p className="font-semibold">
                  User <br /> Score
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                className="flex gap-1 cursor-pointer pt-2 pb-3"
                onClick={handleShowTrailer}
              >
                <Play size={22} aria-hidden="true" />
                <span className="font-semibold">Play Trailer</span>
              </button>
              <span className="italic opacity-80">{tagline}</span>
              <span className="text-xl">Overview</span>
              <p>{overview}</p>
              <ul className="grid grid-cols-3 pt-5">
                {movie
                  ? getCrewRoles()?.map((person) => (
                      <li key={person.id}>
                        <Link
                          href={getBaseUrl() + `/person/${person.id}`}
                          className="font-semibold"
                        >
                          {person.name}
                        </Link>
                        <p>
                          {Array.isArray(person.job)
                            ? person.job.join(", ")
                            : person.job}
                        </p>
                      </li>
                    ))
                  : tvShow?.created_by.map((person) => (
                      <li key={person.id}>
                        <Link
                          href={getBaseUrl() + `/person/${person.id}`}
                          className="font-semibold"
                        >
                          {person.name}
                        </Link>
                        <p>Creator</p>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <TrailerIframe
        play={playTrailer}
        trailer={trailerToDisplay!}
        handleClose={handleCloseTrailer}
      />
    </section>
  );
}
