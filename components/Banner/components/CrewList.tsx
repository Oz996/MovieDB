import { getBaseUrl } from "@/lib/utils";
import { MediaCrew } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  crew: MediaCrew[];
  type: "movie" | "tv";
}

export default function CrewList({ crew, type }: props) {
  const [crewList, setCrewList] = useState<MediaCrew[]>([]);

  const rolesToList = ["Director", "Writer", "Screenplay", "Story", "Creator"];
  const crewToList = crew?.filter((crew) => rolesToList.includes(crew.job));

  // making sure that no person gets duplicated and turning persons job property to an array of all jobs
  useEffect(() => {
    const getCrewRoles = () => {
      const nameMap = new Map();

      for (const item of crewToList) {
        if (nameMap.has(item.name)) {
          nameMap.get(item.name).job.push(item.job);
        } else {
          nameMap.set(item.name, { ...item, job: [item.job] });
        }
      }
      const result = Array.from(nameMap.values()) as MediaCrew[];
      setCrewList(result);
    };
    getCrewRoles();
  }, []);

  const CrewListContainer = ({ children }: { children: React.ReactNode }) => {
    return <ul className="grid grid-cols-3 gap-y-1 pt-5">{children}</ul>;
  };

  if (type === "movie")
    return (
      <CrewListContainer>
        {crewList?.map((person) => (
          <li key={person.id}>
            <Link
              href={getBaseUrl() + `/person/${person.id}`}
              className="font-semibold"
            >
              {person.name}
            </Link>
            <p>
              {Array.isArray(person.job) ? person.job.join(", ") : person.job}
            </p>
          </li>
        ))}
      </CrewListContainer>
    );

  if (type === "tv")
    return (
      <CrewListContainer>
        {crew?.slice(0, 2).map((person) => (
          <li key={person.id}>
            <Link
              href={`${getBaseUrl()}/person/${person.id}`}
              className="font-semibold"
            >
              {person.name}
            </Link>
            <p>Creator</p>
          </li>
        ))}
      </CrewListContainer>
    );
}
