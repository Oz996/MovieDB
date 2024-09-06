import BannerLoader from "@/components/Banner/components/BannerLoader";
import LoaderCarousel from "@/components/Carousels/LoaderCarousel";
import React from "react";

export default function Loading() {
  return (
    <>
      <BannerLoader />
      <div className="container pt-20">
        <LoaderCarousel />
      </div>
    </>
  );
}
