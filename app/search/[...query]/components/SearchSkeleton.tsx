import { Skeleton } from "@/components/ui/skeleton";
import { typesToDisplay } from "@/lib/constants/mediaFilters";

export default function SearchSkeleton() {
  return (
    <section className="pt-28 grid grid-cols-1 lg:grid-cols-3 container">
      <div className="lg:w-[20rem] rounded-lg border lg:h-[14rem]">
        <div className="p-6 text-white bg-black rounded-t-lg flex gap-1 items-center justify-between">
          <h2 className="text-xl font-semibold">Search Results</h2>
        </div>
        <ul className="pb-2">
          {typesToDisplay.map((type) => (
            <li
              key={type.name}
              className="dropdown-list-item flex justify-between items-center"
            >
              <p>{type.name}</p>
              <Skeleton className="w-9 h-8" />
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-2 lg:-ml-20 max-lg:pt-5 space-y-5">
        {new Array(20).fill(0).map((_, index) => (
          <div key={index} className="flex gap-3 rounded-lg border">
            <Skeleton className="w-[5.5rem] h-32 lg:w-28 lg:h-40 flex-shrink-0" />
            <div className="flex flex-col justify-center gap-4 px-1 w-full">
              <div className="w-full space-y-2">
                <Skeleton className="w-full max-w-[12rem] h-[1.8rem]" />
                <Skeleton className="w-full max-w-[8rem] h-[1.8rem]" />
              </div>
              <Skeleton className="w-[95%] h-[2rem]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
