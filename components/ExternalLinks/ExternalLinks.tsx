import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Movie, Person, TvShow } from "@/types";
import ExternalLink from "./ExternalLink";

interface props {
  movie?: Movie | null;
  tvShow?: TvShow | null;
  person?: Person | null;
}

export default function ExternalLinks({ movie, tvShow, person }: props) {
  const item = movie || tvShow || person;
  return (
    <div className="flex gap-5">
      {item?.external_ids?.facebook_id && (
        <ExternalLink
          link={item?.external_ids?.facebook_id}
          website="facebook"
        />
      )}
      {item?.external_ids?.twitter_id && (
        <ExternalLink link={item?.external_ids?.twitter_id} website="twitter" />
      )}
      {item?.external_ids?.instagram_id && (
        <ExternalLink
          link={item?.external_ids?.instagram_id}
          website="instagram"
        />
      )}
      {item?.homepage && (
        <ExternalLink link={item?.homepage} website="homepage" />
      )}
    </div>
  );
}
