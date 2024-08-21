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
