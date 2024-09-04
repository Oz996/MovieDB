"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { getBaseUrl, handleUpcomingDates } from "@/lib/utils";

export default function NavbarDesktop() {
  const { todaysDate, untilDate } = handleUpcomingDates();

  return (
    <header className="absolute inset-0 h-[4rem] bg-black flex items-center md:px-6 text-white max-md:hidden">
      <div className="container flex items-center gap-5 ">
        <Link href="/" className="text-3xl font-bold tracking-[2px]">
          MovieDB
        </Link>
        <NavigationMenu className="flex gap-10 z-50">
          <NavigationMenuList className="flex items-center gap-5 font-semibold">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[14rem]">
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link
                        href={
                          getBaseUrl() + "/movies/popular?vote_count.gte=100"
                        }
                        className="block w-full h-full"
                      >
                        Popular
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link
                        href={
                          getBaseUrl() +
                          `/movies/upcoming?primary_release_date.gte=${todaysDate}&primary_release_date.lte=${untilDate}`
                        }
                        className="block w-full h-full"
                      >
                        Upcoming
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link
                        href={
                          getBaseUrl() +
                          "/movies/top-rated?sort_by=vote_average.desc&vote_count.gte=300"
                        }
                        className="block w-full h-full"
                      >
                        Top Rated
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tv Shows</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[14rem]">
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link
                        href={
                          getBaseUrl() + "/shows/popular?vote_count.gte=100"
                        }
                        className="block w-full h-full"
                      >
                        Popular
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href="/" className="block w-full h-full">
                        Airing Today
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href="/" className="block w-full h-full">
                        On Tv
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link
                        href={
                          getBaseUrl() +
                          "/shows/top-rated?sort_by=vote_average.desc&vote_count.gte=300"
                        }
                        className="block w-full h-full"
                      >
                        Top Rated
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>People</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[14rem]">
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href="/" className="block w-full h-full">
                        Popular
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Searchbar />
      </div>
    </header>
  );
}
