import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Movie, TvShow } from "@/types";

interface props {
  movie?: Movie | null;
  tvShow?: TvShow | null;
}

export default function ExternalLinks({ movie, tvShow }: props) {
  const item = movie || tvShow;
  return (
    <div className="flex gap-5">
      {item?.external_ids?.facebook_id && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://www.facebook.com/${item?.external_ids?.facebook_id}`}
                target="_blank"
              >
                <FaFacebook size={25} />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white border-none">
              <p className="text-lg">Visit Facebook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {item?.external_ids?.twitter_id && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://twitter.com/${item?.external_ids?.twitter_id}`}
                target="_blank"
              >
                <FaTwitter size={25} />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white border-none">
              <p className="text-lg">Visit Twitter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {item?.external_ids?.facebook_id && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://www.instagram.com/${item?.external_ids?.instagram_id}`}
                target="_blank"
              >
                <FaInstagram size={25} />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white border-none">
              <p className="text-lg">Visit Instagram</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href={item?.homepage} target="_blank" className="border-l pl-4">
              <FaLink size={23} />
            </a>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white border-none">
            <p className="text-lg">Visit Homepage</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
