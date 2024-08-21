"use client";
import KnownForCarousel from "./components/KnownForCarousel";
import { handleDisplayImage } from "@/lib/utils";
import { getPersonDetails } from "@/services/person";
import { Person as IPerson } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import PersonLoader from "./components/PersonLoader";
import Filmography from "./components/Filmography/Filmography";
import PersonAside from "./components/PersonAside";

export default function Person({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState<IPerson | null>(null);

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

  console.log(person);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  if (isLoading || !person) return <PersonLoader />;

  return (
    <section className="pt-24 grid grid-cols-1 md:grid-cols-4 container">
      <div className="col-span-1">
        <div className="md:h-[28rem]">
          <Image
            width={isMobile ? 400 : 300}
            height={isMobile ? 400 : 300}
            src={handleDisplayImage("w1280", person.profile_path)}
            alt={`Image of ${person.name}`}
            className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
          />
        </div>
        {!isMobile && <PersonAside person={person} />}
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <h2 className="font-bold text-4xl max-sm:pt-5">{person.name}</h2>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Biography</h3>
          <p>{person.biography}</p>
        </div>
        {isMobile && <PersonAside person={person} />}
        <KnownForCarousel
          cast={person.combined_credits.cast}
          crew={person.combined_credits.crew}
        />
        <Filmography
          cast={person.combined_credits.cast}
          crew={person.combined_credits.crew}
        />
      </div>
    </section>
  );
}
