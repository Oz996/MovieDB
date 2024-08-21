import React from "react";

export const DetailsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <section className="flex flex-col">{children}</section>;
};

export const DetailsGridDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 container">{children}</div>
  );
};
