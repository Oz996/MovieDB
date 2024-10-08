import { useMediaQuery } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MouseEventHandler } from "react";

interface props {
  play: boolean;
  trailer: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

export default function TrailerModal({ play, trailer, handleClose }: props) {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  if (trailer)
    return (
      <AnimatePresence>
        {play && (
          <motion.div
            key="video-player"
            className="fixed inset-0 flex-centered z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="fixed inset-0 w-full h-full bg-black/80" />
            <div className="w-screen flex-centered flex-col aspect-video md:aspect-[16/7]">
              <div className="relative top-0 py-1 px-4 flex justify-end w-[90%] max-w-[1387px] h-[2.5rem] text-white bg-black rounded-t-lg">
                <button
                  onClick={handleClose}
                  className="flex-centered p-2 bg-transparent hover:bg-white/20 duration-300 cursor-pointer group rounded-full"
                  aria-label="Close trailer"
                >
                  <X size={17} className="group-hover:opacity-70" />
                </button>
              </div>
              <iframe
                className="relative w-[90%] max-w-[1387px] rounded-b-lg h-full"
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
}
