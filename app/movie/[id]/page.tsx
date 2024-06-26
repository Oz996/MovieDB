"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Crew, Movie } from "@/types";
import Image from "next/image";
import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(params.id as string);
        setMovie(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [params]);

  const date = new Date(movie?.release_date as string);
  const genres = movie?.genres;

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const crewToList = ["Director", "Writer", "Screenplay", "Story"];

  const crew = movie?.credits.crew.filter((crew) => {
    if (typeof crew.job === "string") return crewToList.includes(crew.job);
  });

  // if same person has several roles we create an array of jobs connected to that person in order to not list duplicates of a person
  const getCrewRoles = () => {
    if (!crew) return null;
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

  console.log("crew", getCrewRoles());

  const getReleaseDate = () => {
    if (!year) return null;
    return `${month}/${day}/${year}`;
  };

  const time = movie?.runtime;
  const getRunTime = () => {
    if (!time) return null;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
  };

  const rating = Math.ceil(movie?.vote_average! * 10);
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

  return (
    <section className="pt-24">
      {/* backdrop image */}
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}")`,
        }}
        className="h-[32rem] flex items-center justify-center w-full relative before:bg-black/60 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        {/* image and other content */}
        <div className="z-20 flex gap-10 text-white">
          <Image
            width={300}
            height={350}
            src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
            alt="Movie Poster"
            className="z-20 rounded-lg"
          />
          <div className="flex flex-col pr-10">
            <div className="z-20 flex gap-2 text-4xl">
              <h2 className="font-bold">{movie?.title}</h2>
              <p className="opacity-80">({year})</p>
            </div>
            <div className="flex items-center gap-3">
              <p>{getReleaseDate()}</p>
              <div
                className={classNames({
                  "pl-3 relative flex gap-1": true,
                  "before:absolute before:content-['•'] before:left-0":
                    genres?.length! > 0,
                })}
              >
                {genres?.map((genre, i) => (
                  <p key={genre.id}>
                    {genre.name}
                    {i === genres.length - 1 ? "" : ", "}
                  </p>
                ))}
              </div>
              <p
                className={classNames({
                  "pl-3 relative flex gap-1": true,
                  "before:absolute before:content-['•'] before:left-0": time,
                })}
              >
                {getRunTime()}
              </p>
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
            <div className="flex flex-col gap-1">
              <p className="italic opacity-80">{movie?.tagline}</p>
              <p className="text-xl">Overview</p>
              <p>{movie?.overview}</p>
              <ul className="grid grid-cols-3 pt-5">
                {getCrewRoles()?.map((person) => (
                  <li key={person.id}>
                    <p className="font-semibold">{person.name}</p>
                    <p>
                      {Array.isArray(person.job)
                        ? person.job.join(", ")
                        : person.job}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
