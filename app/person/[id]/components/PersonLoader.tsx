import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function PersonLoader() {
  return (
    <section className="pt-24 grid grid-cols-4 container">
      <div className="col-span-1">
        <Skeleton className="w-[19rem] h-[28rem] rounded-lg" />
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <Skeleton className="w-[15%] h-10" />
        <div className="space-y-2">
          <Skeleton className="w-[30%] h-8" />
          <Skeleton className="w-full h-32" />
        </div>
        <Carousel className="pt-20 container">
          <CarouselContent className="-ml-1">
            {new Array(20).fill(0).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/1 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
              >
                <div className="p-1">
                  <div className="space-y-5">
                    <div className="flex items-centerjustify-center">
                      <Skeleton className="w-[9.5rem] h-48" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="w-[80%] h-6" />
                      <Skeleton className="w-[40%] h-6" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
