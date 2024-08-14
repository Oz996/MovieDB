import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Searchbar from "./Searchbar";
import { getBaseUrl } from "@/lib/utils";

export default function NavbarMobile() {
  const [navbar, setNavbar] = useState(false);

  const handleToggleNavbar = () => {
    setNavbar(!navbar);
  };
  return (
    <header className="absolute inset-0 w-full h-[4rem] bg-black px-4 text-white flex items-center gap-5 md:hidden">
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
            className="flex flex-col py-5 items-center gap-1 absolute left-0 right-0 top-[4rem] w-full z-50 bg-black rounded-b-lg"
          >
            <p className="text-lg font-semibold">Movies</p>
            <li onClick={handleToggleNavbar} className="dropdown-list-item">
              <Link href={getBaseUrl() + "/movies/popular"}>Popular</Link>
            </li>
            <li onClick={handleToggleNavbar} className="dropdown-list-item">
              <Link href={getBaseUrl() + "/movies/upcoming"}>Upcoming</Link>
            </li>
            <li onClick={handleToggleNavbar} className="dropdown-list-item">
              <Link href={getBaseUrl() + "/movies/top-rated"}>Top Rated</Link>
            </li>
            <p className="text-lg font-semibold">Tv Shows</p>
            <li onClick={handleToggleNavbar} className="dropdown-list-item">
              <Link href={getBaseUrl() + "/shows/popular"}>Popular</Link>
            </li>
            <li className="dropdown-list-item">
              <Link href="/">Airing Today</Link>
            </li>
            <li className="dropdown-list-item">
              <Link href="/">On Tv</Link>
            </li>
            <li className="dropdown-list-item">
              <Link href={getBaseUrl() + "/shows/top-rated"}>Top Rated</Link>
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
  );
}
