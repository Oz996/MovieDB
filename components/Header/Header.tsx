"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Searchbar from "./components/Searchbar";
import { useEffect } from "react";
import { getAllTrending } from "@/services/all";

export default function Header() {
  useEffect(() => {
    getAllTrending();
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 w-full h-[4rem] bg-black px-[20rem] text-white flex items-center gap-5">
      <Link href="/" className="text-3xl font-bold tracking-[2px]">
        MovieDB
      </Link>
      <NavigationMenu className="flex gap-10 z-20">
        <NavigationMenuList className="flex items-center gap-5 font-semibold">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[10rem]">
                <li className="dropdown-list-item">
                  <NavigationMenuLink asChild>
                    <Link href="/">Popular</Link>
                  </NavigationMenuLink>
                </li>
                <li className="dropdown-list-item">
                  <NavigationMenuLink asChild>
                    <Link href="/">Now Playing</Link>
                  </NavigationMenuLink>
                </li>
                <li className="dropdown-list-item">
                  <NavigationMenuLink asChild>
                    <Link href="/">Upcoming</Link>
                  </NavigationMenuLink>
                </li>
                <li className="dropdown-list-item">
                  <NavigationMenuLink asChild>
                    <Link href="/">Top Rated</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tv Shows</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[10rem]">
                <li className="dropdown-list-item">
                  <NavigationMenuLink asChild>
                    <Link href="/">Popular</Link>
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
                    <Link href="/">Top Rated</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>People</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[10rem]">
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
    </header>
  );
}
