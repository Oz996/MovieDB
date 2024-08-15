import { formatDate, getBaseUrl, handleDisplayImage } from "@/lib/utils";
import { Card } from "../../../ui/card";
import Image from "next/image";
import Link from "next/link";

export const MediaCard = ({
  children,
  type,
  id,
}: {
  children: React.ReactNode;
  type: "movie" | "tv" | "person";
  id: number;
}) => {
  return (
    <Card className="border rounded-lg shadow-md w-[11rem]">
      <Link href={getBaseUrl() + `/${type}/${id}`}>{children}</Link>
    </Card>
  );
};

export const MediaCardImage = ({ image }: { image: string }) => {
  return (
    <Image
      className="rounded-t-lg"
      src={handleDisplayImage("w342", image)}
      width={180}
      height={180}
      alt=""
    />
  );
};

export const MediaCardBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-1 p-2">{children}</div>;
};

export const MediaCardTitle = ({ title }: { title: string }) => {
  return <h3 className="font-semibold max-w-[10rem] line-clamp-2">{title}</h3>;
};

export const MediaCardDate = ({ date }: { date: string }) => {
  return <p className="text-gray-500">{formatDate(date!)}</p>;
};
