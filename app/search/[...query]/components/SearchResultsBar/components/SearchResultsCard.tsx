import { useRouter } from "next/navigation";
import { MediaDisplay } from "../SearchResultsBar";

interface props {
  type: MediaDisplay;
  search: string;
}

export default function SearchResultsCard({ type, search }: props) {
  const router = useRouter();

  const handleTypeClick = async (type: MediaDisplay) => {
    const searchType = type.value;
    router.push(`/search/${searchType}?query=${search}`);
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
