import { TvShow } from "@/types";
import { handleDisplayImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ExternalLinks from "@/components/ExternalLinks/ExternalLinks";

interface props {
  tvShow: TvShow;
}

export default function TvShowAside({ tvShow }: props) {
  return (
    <aside>
      <div className="flex flex-col gap-4 pt-12 w-[15rem]">
        <ExternalLinks links={tvShow.external_ids} homepage={tvShow.homepage} />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Status</p>
          <p>{tvShow.status}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Original Language</p>
          <p>{tvShow.original_language}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Network</p>
          <ul className="flex flex-col gap-2">
            {tvShow.networks?.map((network) => (
              <li key={network.id}>
                <Link href="">
                  <Image
                    width={100}
                    height={100}
                    src={handleDisplayImage("w342", network.logo_path)}
                    alt=""
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Keywords</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {tvShow.keywords?.results?.map((keyword) => (
              <div
                key={keyword.id}
                className="rounded-lg py-1 px-3 bg-gray-200"
              >
                <p>{keyword.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
