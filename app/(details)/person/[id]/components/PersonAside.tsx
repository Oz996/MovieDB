import ExternalLinks from "@/components/ExternalLinks/ExternalLinks";
import { formatDate } from "@/lib/utils";
import { Person } from "@/types";

interface props {
  person: Person;
}

// Sending the whole person object as a prop cause it would get cluttered with props otherwise

export default function PersonAside({ person }: props) {
  const currentDate = new Date();
  const birthDate = new Date(person.birthday);
  const deathDate = new Date(person.deathday);
  const currentAge = currentDate.getFullYear() - birthDate.getFullYear();

  const ageOfDeath = () => {
    const age = deathDate.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDay();

    const deathMonth = deathDate.getMonth();
    const deathday = deathDate.getDay();

    if (
      birthMonth > deathMonth ||
      (birthMonth === deathMonth && birthDay > deathday)
    ) {
      return age - 1;
    }
    return age;
  };

  const personCredits = () => {
    const cast = person.combined_credits.cast;
    const crew = person.combined_credits.crew;
    return [...cast, ...crew].length;
  };

  const personGender = person.gender === 1 ? "Female" : "Male";

  return (
    <>
      <div className="flex flex-col gap-4 md:pt-8">
        <ExternalLinks links={person.external_ids} homepage={person.homepage} />
        <p className="text-xl pt-4 font-semibold">Personal Info</p>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Known For</p>
          <p>{person.known_for_department}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Known Credits</p>
          <p>{personCredits()}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Gender</p>
          <p>{personGender}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Birthday</p>
          <p>
            {formatDate(person.birthday) ?? "Unknown Date"}{" "}
            {!person.deathday && `(${currentAge} years old)`}
          </p>
        </div>
        {person.deathday && (
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Day of Death</p>
            <p>
              {formatDate(person.deathday)} ({`${ageOfDeath()} years old`})
            </p>
          </div>
        )}
        {person.place_of_birth && (
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Place of Birth</p>
            <p>{person.place_of_birth}</p>
          </div>
        )}
        {person.also_known_as.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Also Known As</p>
            {person.also_known_as.map((name) => (
              <p key={name}>{name}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
