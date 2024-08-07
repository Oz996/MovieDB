"use client";
import KnownForCarousel from "./components/KnownForCarousel";
import { handleDisplayImage } from "@/lib/utils";
import { getPersonDetails } from "@/services/person";
import { Person as IPerson } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import PersonLoader from "./components/PersonLoader";
import SideContent from "./components/SideContent";
import Filmography from "./components/Filmography/Filmography";

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

  const imageSize = () => {
    if (isMobile) return 400;
    else return 300;
  };
  if (isLoading) return <PersonLoader />;

  return (
    <section className="pt-24 grid grid-cols-1 md:grid-cols-4 container">
      <div className="col-span-1">
        <div className="md:h-[28rem]">
          <Image
            width={imageSize()}
            height={imageSize()}
            src={handleDisplayImage("w1280", person?.profile_path!)}
            alt={`Image of ${person?.name}`}
            className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
          />
        </div>
        {!isMobile && <SideContent person={person!} />}
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <h2 className="font-bold text-4xl max-sm:pt-5">{person?.name}</h2>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Biography</h3>
          <p>{person?.biography}</p>
        </div>
        {isMobile && <SideContent person={person!} />}
        <KnownForCarousel person={person!} />
        <Filmography person={person!} />
      </div>
    </section>
  );
}
