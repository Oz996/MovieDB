import { Skeleton } from "@/components/ui/skeleton";

export default function ResultSkeleton() {
  return (
    <section className="lg:col-span-2 lg:-ml-20 max-lg:pt-5 space-y-5">
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
    </section>
  );
}
