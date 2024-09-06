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
    <Carousel>
      <CarouselContent className="-ml-1">
        {new Array(20).fill(0).map((_, index) => (
          <CarouselItem key={index} className="flex-centered">
            <div className="p-1">
              <div className="space-y-5">
                <div className="flex items-centerjustify-center">
                  <Skeleton className="w-[9.5rem] h-[13.5rem]" />
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
