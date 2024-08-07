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
import { getBaseUrl } from "@/lib/utils";

export default function NavbarDesktop() {
  return (
    <header className="absolute top-0 left-0 right-0 w-full h-[4rem] bg-black flex items-center md:px-6 text-white max-md:hidden">
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
                      <Link href={getBaseUrl() + "/movies/popular"}>
                        Popular
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href={getBaseUrl() + "/movies/upcoming"}>
                        Upcoming
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href={getBaseUrl() + "/movies/top-rated"}>
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
                      <Link href={getBaseUrl() + "/shows/popular"}>
                        Popular
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href="/">Airing Today</Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href="/">On Tv</Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="dropdown-list-item">
                    <NavigationMenuLink asChild>
                      <Link href={getBaseUrl() + "/shows/top-rated"}>
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
                      <Link href="/">Popular</Link>
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
