import ExternalLinks from "@/components/ExternalLinks";
import { formatDate } from "@/lib/utils";
import { Person } from "@/types";

interface props {
  person: Person;
}

export default function SideContent({ person }: props) {
  const formattedBirth = formatDate(person?.birthday!);
  const currentDate = new Date();
  const birthDate = new Date(person?.birthday!);
  const currentAge = currentDate.getFullYear() - birthDate.getFullYear();

  const personCredits = () => {
    const cast = person?.combined_credits.cast;
    const crew = person?.combined_credits.crew;

    if (cast && crew) {
      return [...cast, ...crew].length;
    }
  };

  return (
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
  );
}
