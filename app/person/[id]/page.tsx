"use client";
import KnownForCarousel from "@/components/Carousels/KnownForCarousel";
import ExternalLinks from "@/components/ExternalLinks";
import { formatDate, handleDisplayImage } from "@/lib/utils";
import { getPersonDetails } from "@/services/person";
import { Person as IPerson } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Person({ params }: { params: { id: string } }) {
  const [person, setPerson] = useState<IPerson>();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      const res = await getPersonDetails(params.id);
      setPerson(res);
    };
    fetchPersonDetails();
  }, [params.id]);

  console.log(person);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const formattedBirth = formatDate(person?.birthday!);
  const currentDate = new Date();
  const birthDate = new Date(person?.birthday!);
  const currentAge = currentDate.getFullYear() - birthDate.getFullYear();

  console.log("current", currentAge);

  const personCredits = () => {
    const cast = person?.combined_credits.cast;
    const crew = person?.combined_credits.crew;

    if (cast && crew) {
      return [...cast, ...crew].length;
    }
  };

  const imageSize = () => {
    if (isMobile) {
      return 400;
    } else {
      return 300;
    }
  };

  return (
    <section className="pt-24 grid grid-cols-4 container">
      <div className="col-span-1">
        <Image
          width={imageSize()}
          height={imageSize()}
          src={handleDisplayImage("w1280", person?.profile_path!)}
          alt={`Image of ${person?.name}`}
          className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
        />
        <aside>
          <div className="flex flex-col gap-4 pt-8">
            <ExternalLinks person={person} />
            <p className="text-xl pt-4 font-semibold">Personal Info</p>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Known For</p>
              <p>{person?.known_for_department}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Known Credits</p>
              <p>{personCredits()}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Gender</p>
              <p>{person?.gender}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Birthday</p>
              <p>
                {formattedBirth} ({`${currentAge} years old`})
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Place of Birth</p>
              <p>{person?.place_of_birth}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Also Known As</p>
              {person?.also_known_as.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <h2 className="font-bold text-4xl">{person?.name}</h2>
        <div className="space-y-2">
          <p className="text-xl font-semibold">Biography</p>
          <p>{person?.biography}</p>
        </div>
        <KnownForCarousel person={person!} />
      </div>
    </section>
  );
}
