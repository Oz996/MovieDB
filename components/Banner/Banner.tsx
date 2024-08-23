interface props {
  background: string;
  children: React.ReactNode;
}

export default function BannerContainer({ background, children }: props) {
  return (
    <section className="pt-16">
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${background}")`,
        }}
        className="md:min-h-[35rem] flex-centered w-full relative before:bg-black/60 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        <div className="z-20 grid grid-cols-4 max-md:flex max-md:flex-col gap-10 text-white container max-md:pb-5 max-md:p-5">
          {children}
        </div>
      </div>
    </section>
  );
}
