import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      <section className="pt-24 px-[5rem]">
        <Tabs defaultValue="today">
          <div className="w-full flex items-center gap-5">
            <h2 className="text-xl font-semibold">Trending</h2>
            <TabsList>
              <TabsTrigger value="today" className="text-md">
                Today
              </TabsTrigger>
              <TabsTrigger value="thisWeek" className="text-md">
                This Week
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="today">
            <Carousel>
              <CarouselContent className="-ml-1">
                {Array.from({ length: 12 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/6"
                  >
                    <div className="p-1">
                      <div>
                        <div className="flex aspect-square items-center justify-center p-6 border">
                          <span className="text-2xl font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <p>Title</p>
                        <p>date</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
