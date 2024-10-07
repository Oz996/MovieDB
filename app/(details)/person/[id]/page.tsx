import { getPersonDetails } from "@/services/person";
import Image from "next/image";
import { handleDisplayImage } from "@/lib/utils";
import PersonAside from "./components/PersonAside";
import PersonBiography from "./components/PersonBiography";
import KnownForCarousel from "./components/KnownForCarousel";
import Filmography from "./components/Filmography/Filmography";

export default async function Person({ params }: { params: { id: string } }) {
  const person = await getPersonDetails(params.id);

  return (
    <section className="pt-24 grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-10 container">
      <div className="col-span-1">
        <div className="w-full">
          <Image
            priority
            width={300}
            height={300}
            src={handleDisplayImage("w500", person.profile_path)}
            alt={`Image of ${person.name}`}
            className="rounded lg:rounded-lg w-full max-md:max-w-[20rem] max-sm:mx-auto object-cover"
          />
        </div>
        <aside className="hidden md:block">
          <PersonAside person={person} />
        </aside>
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <h1 className="font-bold text-2xl md:text-4xl max-sm:pt-5">
          {person.name}
        </h1>
        <PersonBiography person={person} />
        <aside className="md:hidden">
          <PersonAside person={person} />
        </aside>

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
