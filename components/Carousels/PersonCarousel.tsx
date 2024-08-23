import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cast } from "@/types";
import { handleDisplayImage } from "@/lib/utils";

interface props {
  cast: Cast[];
}

export default function PersonCarousel({ cast }: props) {
  if (cast.length === 0)
    return (
      <SectionContainer>
        <p>No cast to display</p>
      </SectionContainer>
    );

  return (
    <SectionContainer>
      <Carousel className="rounded-xl pl-2 pr-6">
        <CarouselContent className="-ml-1">
          {cast.map((person) => {
            return (
              <CarouselItem
                key={person.id}
                className="pl-1 basis-1/1 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
              >
                <motion.div>
                  <div className="space-y-5 border flex flex-col items-center w-[8.95rem] rounded-lg pb-2">
                    <Link href={`/person/${person.id}`}>
                      <Image
                        className="rounded-t-lg"
                        src={handleDisplayImage(
                          "original",
                          person.profile_path
                        )}
                        width={140}
                        height={140}
                        alt=""
                      />
                      <div className="p-2">
                        <p className="font-bold max-w-[10rem] line-clamp-2">
                          {person.name}
                        </p>
                        <p>{person.character}</p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="mr-[4.5rem]" />
      </Carousel>
    </SectionContainer>
  );

  function SectionContainer({ children }: { children: React.ReactNode }) {
    return (
      <section>
        <h2 className="text-title font-semibold pb-5 pt-8">Top Billed Cast</h2>
        {children}
      </section>
    );
  }
}
