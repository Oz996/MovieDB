"use client";
import { useEffect } from "react";
import { getAllTrending } from "@/services/all";
import NavbarDesktop from "./components/NavbarDesktop";
import NavbarMobile from "./components/NavbarMobile";

export default function Header() {
  useEffect(() => {
    getAllTrending();
  }, []);

  return (
    <>
      {/* desktop header */}
      <NavbarDesktop />
      {/* tablet/mobile header */}
      <NavbarMobile />
    </>
  );
}
