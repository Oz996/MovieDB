import { useRouter } from "next/navigation";
import { MediaType } from "../SearchResultsBar";
import { Dispatch, SetStateAction } from "react";
import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";

interface props {
  type: MediaType;
  setType: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}

export default function SearchResultsCard({ type, setType, isLoading }: props) {
  const { query } = useSearch();
  const router = useRouter();

  const handleTypeClick = async (type: MediaType) => {
    const searchType = type.value;
    setType(searchType);
    router.push(`/search/query?search=${query}&type=${type.value}`);
  };

  return (
    <li
      onClick={() => handleTypeClick(type)}
      key={type.name}
      className="dropdown-list-item flex justify-between items-center"
    >
      <p>{type.name}</p>
      {isLoading ? (
        <Skeleton className="w-9 h-8" />
      ) : (
        <span className="bg-gray-200 p-1 px-4 rounded">{type?.results}</span>
      )}
    </li>
  );
}
