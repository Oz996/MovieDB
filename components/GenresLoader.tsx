import { Skeleton } from "./ui/skeleton";

export default function GenresLoader() {
  return (
    <>
      {new Array(16).fill(0).map((_, i) => (
        <Skeleton key={i} className="rounded-full w-[5rem] h-7" />
      ))}
    </>
  );
}
