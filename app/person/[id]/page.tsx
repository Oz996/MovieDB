"use client";
import KnownForCarousel from "./components/KnownForCarousel";
import { handleDisplayImage } from "@/lib/utils";
import { getPersonDetails } from "@/services/person";
import { Cast, Crew, Person as IPerson } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import PersonLoader from "./components/PersonLoader";
import SideContent from "./components/SideContent";
import Link from "next/link";

export default function Person({ params }: { params: { id: string } }) {
  const [person, setPerson] = useState<IPerson | null>(null);
  const [credits, setCredits] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      setIsLoading(true);
      try {
        const res = await getPersonDetails(params.id);
        setPerson(res!);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersonDetails();
  }, [params.id]);

  const cast = person?.combined_credits.cast;
  const currentYear = new Date().getFullYear();
  console.log(currentYear);

  useEffect(() => {
    if (!cast) return;

    const uniqueMedia = new Map();
    for (const media of cast) {
      const title = media.original_title || media.original_name;
      if (!uniqueMedia.has(title)) {
        uniqueMedia.set(title, media);
      }
    }

    const filtered = Array.from(uniqueMedia.values());
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date!).getFullYear();
      const dateB = new Date(b.release_date || b.first_air_date!).getFullYear();

      // NaN values caused issues with sorting, here is a solution I found:
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateB - dateA;
    });

    setCredits(sorted);
  }, [cast]);

  console.log(person);
  console.log(credits);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const imageSize = () => {
    if (isMobile) {
      return 400;
    } else {
      return 300;
    }
  };

  if (isLoading) return <PersonLoader />;

  return (
    <section className="pt-24 grid grid-cols-4 container">
      <div className="col-span-1">
        <div className="h-[28rem]">
          <Image
            width={imageSize()}
            height={imageSize()}
            src={handleDisplayImage("w1280", person?.profile_path!)}
            alt={`Image of ${person?.name}`}
            className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
          />
        </div>
        <SideContent person={person!} />
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <h2 className="font-bold text-4xl">{person?.name}</h2>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Biography</h3>
          <p>{person?.biography}</p>
        </div>
        <KnownForCarousel person={person!} />
        <div>
          <h3 className="text-xl font-semibold pb-5">Acting</h3>
          <ol className="flex flex-col gap-4 list-disc py-5 px-10 border shadow-lg">
            {credits?.map((item) => {
              const title = item.name || item.title;
              const date =
                new Date(item.release_date!).getFullYear() ||
                new Date(item.first_air_date!).getFullYear();
              return (
                <li key={item.id}>
                  <div className="flex gap-2">
                    {Number(date) && <p>{date}</p>}
                    <Link
                      href={`http://localhost:3000/${item.media_type}/${item.id}`}
                    >
                      <p className="font-semibold">{title}</p>
                    </Link>
                  </div>
                  {item.character && (
                    <p className="text-gray-400 pl-10">
                      as <span className="text-gray-600">{item.character}</span>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
