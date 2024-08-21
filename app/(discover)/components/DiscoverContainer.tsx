import { Button } from "@/components/ui/button";
import React, { MouseEventHandler } from "react";

export const DiscoverContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="pt-24 container pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4">{children}</div>
    </section>
  );
};

export const FilterMenuButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      className="bg-black text-white text-lg rounded-full fixed bottom-5 left-5 px-10"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const DiscoverMediaDiv = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 sm:col-span-3">
      {children}
    </div>
  );
};
