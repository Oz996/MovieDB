interface props {
  backdrop_path: string;
  children: React.ReactNode;
}

export default function BannerContainer({ backdrop_path, children }: props) {
  return (
    <section className="pt-16">
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop_path}")`,
        }}
        className="md:h-[32rem] flex-centered w-full relative before:bg-black/60 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        <div className="z-20 flex max-md:flex-col gap-10 text-white container max-md:pb-5">
          {children}
        </div>
      </div>
    </section>
  );
}
