"use client";
import { Button } from "@/components/ui/button";
import { Person } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface props {
  person: Person;
}

export default function PersonBiography({ person }: props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">Biography</h3>
      {expanded ? (
        <p>{person.biography}</p>
      ) : (
        <>
          <p className="line-clamp-6">{person.biography}</p>
          {person.biography.length > 864 && (
            <Button
              onClick={handleExpanded}
              className="bg-transparent border-none p-0 hover:bg-transparent text-black text-lg place-self-end"
            >
              Read More
              <ChevronDown size={20} />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
