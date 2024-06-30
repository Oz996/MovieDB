import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface props {
  play: boolean;
  trailer: string;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

export default function TrailerIframe({ play, trailer, handleClose }: props) {
  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="video-player"
          className="fixed left-[20rem] top-[3.5rem] z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="fixed inset-0 w-full h-full bg-black/80" />
          <div className="relative top-0 py-2 px-4 flex justify-between items-center w-[1387px] h-[4rem] text-white bg-black z-50">
            <p className="text-lg">Play Trailer</p>
            <button
              onClick={handleClose as any}
              className="flex items-center justify-center p-3 bg-transparent hover:bg-white/20 duration-300 cursor-pointer group rounded-full"
            >
              <X size={17} className="group-hover:opacity-70" />
            </button>
          </div>
          <div className="z-50">
            <iframe
              className="fixed left-[20rem] top-[7rem]"
              width="1387"
              height="780"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              allow="autoplay"
            ></iframe>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
