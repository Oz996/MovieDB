import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";

export default function LoaderCarousel() {
  return (
    <Carousel className="pt-20 container">
      <CarouselContent className="-ml-1">
        {new Array(20).fill(0).map((_, i) => (
          <CarouselItem
            key={i}
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
      <CarouselPrevious disabled />
      <CarouselNext disabled />
    </Carousel>
  );
}
