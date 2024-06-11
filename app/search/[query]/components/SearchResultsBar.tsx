import { ResultObject } from "@/types";

interface props {
  searchResults: ResultObject;
}

const categories = [
  { name: "Movies" },
  { name: "TV Shows" },
  { name: "People" },
];
export default function SearchResultsBar({ searchResults }: props) {
  return (
    <div className="w-[20rem] rounded-lg border">
      <h2 className="p-6 text-xl font-semibold text-white bg-black rounded-t-lg">
        Search Results
      </h2>
      <ul className="pb-2">
        {categories.map((category) => (
          <li
            key={category.name}
            className="dropdown-list-item flex justify-between items-center"
          >
            <p>{category.name}</p>
            <span className="bg-gray-200 p-1 px-4 rounded">20</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
