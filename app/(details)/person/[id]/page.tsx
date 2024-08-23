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
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Person({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
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

  const handleExpanded = () => {
    setExpanded(true);
  };

  if (isLoading || !person) return <PersonLoader />;

  return (
    <section className="pt-24 grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-10 container">
      <div className="col-span-1">
        <div className="w-full">
          <Image
            width={isMobile ? 400 : 300}
            height={isMobile ? 400 : 300}
            src={handleDisplayImage("w1280", person.profile_path)}
            alt={`Image of ${person.name}`}
            className="z-20 rounded lg:rounded-lg w-full max-md:max-w-[20rem] max-sm:mx-auto"
          />
        </div>
        {!isMobile && <PersonAside person={person} />}
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <h1 className="font-bold text-2xl md:text-4xl max-sm:pt-5">
          {person.name}
        </h1>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Biography</h3>
          {expanded ? (
            <p>{person.biography}</p>
          ) : (
            <>
              <p className="line-clamp-6">{person.biography}</p>
              <Button
                onClick={handleExpanded}
                className="bg-transparent border-none p-0 hover:bg-transparent text-black text-lg place-self-end"
              >
                Read More
                <ChevronDown size={20} />
              </Button>
            </>
          )}
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
