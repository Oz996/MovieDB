import { Skeleton } from "@/components/ui/skeleton";

export default function MediaLoader() {
  return (
    <>
      {new Array(20).fill(0).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded">
          <Skeleton className="w-[10rem] h-[16rem]" />
          <Skeleton className="w-[60%] h-6" />
          <Skeleton className="w-[40%] h-6" />
        </div>
      ))}
    </>
  );
}
