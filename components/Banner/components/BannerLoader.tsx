import { Skeleton } from "@/components/ui/skeleton";

export default function BannerLoader() {
  return (
    <section className="pt-24">
      <div className="h-[32rem] flex items-center justify-center w-full relative before:bg-black/65 bg-no-repeat bg-cover before:absolute before:inset-0">
        <div className="z-20 flex gap-10 text-white container w-full">
          <Skeleton className="w-[19rem] h-[27rem] rounded-lg" />

          <div className="flex flex-col justify-center pr-10">
            <div className="z-20 flex gap-2 text-4xl">
              <Skeleton className="w-[30rem] h-8" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="w-[26rem] h-6 mt-2" />
            </div>
            <Skeleton className="size-16 rounded-full mt-5" />

            <div className="flex flex-col gap-2">
              <div className="flex gap-1 cursor-pointer pt-2 pb-3">
                <Skeleton className="w-[8rem] h-7 my-3" />
              </div>

              <Skeleton className="w-[10rem] h-6" />
              <Skeleton className="w-[50rem] h-[5.5rem]" />

              <ul className="grid grid-cols-3 pt-5">
                {new Array(3).fill(0)?.map((_, i) => (
                  <li key={i}>
                    <Skeleton className="w-[10rem] h-6" />
                    <Skeleton className="w-[7rem] h-6 mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
