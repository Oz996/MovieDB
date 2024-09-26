"use client";
import { useRouter } from "next/navigation";
import { MediaDisplay } from "../SearchResultsBar";
import { useSearch } from "@/hooks/useSearch";

interface props {
  type: MediaDisplay;
}

export default function SearchResultsCard({ type }: props) {
  const { query, setType } = useSearch();
  const router = useRouter();

  const handleTypeClick = async (type: MediaDisplay) => {
    const searchType = type.value;
    setType(searchType);
    router.push(`/search/${searchType}?query=${query}`);
  };

  return (
    <li
      onClick={() => handleTypeClick(type)}
      key={type.name}
      className="dropdown-list-item flex justify-between items-center"
    >
      <p>{type.name}</p>
      <span className="bg-gray-200 p-1 px-4 rounded">{type?.results}</span>
    </li>
  );
}
