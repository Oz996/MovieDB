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
import { useEffect, useState } from "react";
import { getAllTrending } from "@/services/all";
import { Menu, X } from "lucide-react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    getAllTrending();
  }, []);

  const handleToggleNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <>
      {/* desktop header */}
      <header className="absolute top-0 left-0 right-0 w-full h-[4rem] bg-black px-[20rem] text-white flex items-center gap-5 max-md:hidden">
        <Link href="/" className="text-3xl font-bold tracking-[2px]">
          MovieDB
        </Link>
        <NavigationMenu className="flex gap-10 z-20">
          <NavigationMenuList className="flex items-center gap-5 font-semibold">
            <NavigationMenuItem className="">
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

      {/* tablet/mobile header */}
      <header className="absolute top-0 left-0 right-0 w-full h-[4rem] bg-black px-4 text-white flex items-center gap-5 md:hidden">
        {navbar ? (
          <X
            size={25}
            className="md:hidden shrink-0 cursor-pointer"
            onClick={handleToggleNavbar}
          />
        ) : (
          <Menu
            size={25}
            className="md:hidden shrink-0 cursor-pointer"
            onClick={handleToggleNavbar}
          />
        )}
        <Link href="/" className="text-3xl font-bold tracking-[2px]">
          MovieDB
        </Link>
        <AnimatePresence>
          {navbar && (
            <motion.ul
              key="navbar-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col py-5 items-center gap-1 absolute left-0 right-0 top-[4rem] w-full z-10 bg-black rounded-b-lg"
            >
              <p className="text-lg font-semibold">Movies</p>
              <li className="dropdown-list-item">
                <Link href="/">Popular</Link>
              </li>
              <li className="dropdown-list-item">
                <Link href="/">Now Playing</Link>
              </li>
              <li className="dropdown-list-item">
                <Link href="/">Upcoming</Link>
              </li>
              <li className="dropdown-list-item">
                <Link href="/">Top Rated</Link>
              </li>
              <p className="text-lg font-semibold">Tv Shows</p>
              <li className="dropdown-list-item">
                <Link href="/">Popular</Link>
              </li>
              <li className="dropdown-list-item">
                <Link href="/">Airing Today</Link>
              </li>
              <li className="dropdown-list-item">
                <Link href="/">On Tv</Link>
              </li>
              <li className="dropdown-list-item">
                <Link href="/">Top Rated</Link>
              </li>
              <p className="text-lg font-semibold">People</p>
              <li className="dropdown-list-item">
                <Link href="/">Popular</Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
        <Searchbar />
      </header>
    </>
  );
}
