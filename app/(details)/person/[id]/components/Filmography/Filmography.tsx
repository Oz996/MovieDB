"use client";
import { PersonCast, PersonCrew } from "@/types";
import { useEffect, useState } from "react";
import FilmographyCard from "./FilmographyCard";

interface props {
  cast: PersonCast[];
  crew: PersonCrew[];
}

export default function Filmography({ cast, crew }: props) {
  const [acting, setActing] = useState<PersonCast[]>([]);
  const [production, setProduction] = useState<PersonCrew[]>([]);
  const [writing, setWriting] = useState<PersonCrew[]>([]);
  const [creator, setCreator] = useState<PersonCrew[]>([]);

  useEffect(() => {
    const uniqueMedia = new Map();
    for (const media of cast) {
      const title = media.title ?? media.name;
      if (!uniqueMedia.has(title)) {
        uniqueMedia.set(title, media);
      }
    }

    const filtered = Array.from(uniqueMedia.values());
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.release_date ?? a.first_air_date!).getFullYear();
      const dateB = new Date(b.release_date ?? b.first_air_date!).getFullYear();

      // NaN values caused issues with sorting, here is a solution I found:
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateB - dateA;
    });
    setActing(sorted);
  }, [cast]);

  useEffect(() => {
    const uniqueMedia = new Map();
    for (const media of crew) {
      // creating a title-job key combination in order to keep track of unique items based on those instead of just title
      // because some titles exist under different jobs
      const title = media.title ?? media.name;
      const key = `${title}-${media.job}`;
      if (!uniqueMedia.has(key)) {
        uniqueMedia.set(key, media);
      }
    }

    const filtered = Array.from(uniqueMedia.values());
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.release_date ?? a.first_air_date!).getFullYear();
      const dateB = new Date(b.release_date ?? b.first_air_date!).getFullYear();

      // NaN values caused issues with sorting, here is a solution I found:
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateB - dateA;
    });

    const production = sorted.filter(
      (item) => item.department === "Production"
    );
    const writing = sorted.filter((item) => item.job === "Writer");
    const creator = sorted.filter((item) => item.department === "Creator");

    setProduction(production);
    setWriting(writing);
    setCreator(creator);
  }, [crew]);

  return (
    <section className="space-y-5 pb-10">
      {acting.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold pb-5">Acting</h3>
          <ol className="flex flex-col gap-4 list-disc py-5 px-10 border shadow-lg">
            {acting?.map((item, index) => (
              <FilmographyCard
                key={item.id}
                id={item.id}
                title={item.title ?? item.name!}
                character={item.character}
                date={item.release_date ?? item.first_air_date!}
                media_type={item.media_type}
                episode_count={item.episode_count ?? null}
                array={acting}
                i={index}
              />
            ))}
          </ol>
        </div>
      )}
      {production.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold pb-5">Production</h3>
          <ol className="flex flex-col gap-4 list-disc py-5 px-10 border shadow-lg">
            {production?.map((item, index) => (
              <FilmographyCard
                key={item.id}
                id={item.id}
                title={item.title ?? item.name!}
                job={item.job}
                date={item.release_date ?? item.first_air_date!}
                media_type={item.media_type}
                episode_count={item.episode_count ?? null}
                array={production}
                i={index}
              />
            ))}
          </ol>
        </div>
      )}
      {writing.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold pb-5">Writing</h3>
          <ol className="flex flex-col gap-4 list-disc py-5 px-10 border shadow-lg">
            {writing?.map((item, index) => (
              <FilmographyCard
                key={item.id}
                id={item.id}
                title={item.title ?? item.name!}
                job={item.job}
                date={item.release_date ?? item.first_air_date!}
                media_type={item.media_type}
                episode_count={item.episode_count ?? null}
                array={writing}
                i={index}
              />
            ))}
          </ol>
        </div>
      )}
      {creator.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold pb-5">Creator</h3>
          <ol className="flex flex-col gap-4 list-disc py-5 px-10 border shadow-lg">
            {creator?.map((item, index) => (
              <FilmographyCard
                key={item.id}
                id={item.id}
                title={item.title ?? item.name!}
                job={item.job}
                date={item.release_date ?? item.first_air_date!}
                media_type={item.media_type}
                episode_count={item.episode_count ?? null}
                array={creator}
                i={index}
              />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
