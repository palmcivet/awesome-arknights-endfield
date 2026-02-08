import banner from '@assets/banner.svg';

function Background() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Grid pattern  */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute left-1/4 top-1/4 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute right-1/4 top-1/3 size-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl animate-pulse-slow [animation-delay:1s]" />

      {/* Tech lines decoration */}
      <div className="absolute left-0 top-1/4 h-px w-1/3 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute right-0 top-2/3 h-px w-1/3 bg-linear-to-l from-transparent via-accent/40 to-transparent" />
    </div>
  );
}

function MechanicalCorners() {
  return (
    <>
      {/* Top-left corner */}
      <div className="absolute left-4 top-4 size-16 border-l-2 border-t-2 border-primary/30 opacity-60 sm:left-8 sm:top-8 sm:size-20" />
      <div className="absolute left-6 top-6 size-3 border border-primary/50 sm:left-10 sm:top-10 sm:size-4" />

      {/* Top-right corner */}
      <div className="absolute right-4 top-4 size-16 border-r-2 border-t-2 border-accent/30 opacity-60 sm:right-8 sm:top-8 sm:size-20" />
      <div className="absolute right-6 top-6 size-3 border border-accent/50 sm:right-10 sm:top-10 sm:size-4" />

      {/* Bottom-left corner */}
      <div className="absolute bottom-4 left-4 size-16 border-b-2 border-l-2 border-secondary/30 opacity-60 sm:bottom-8 sm:left-8 sm:size-20" />
      <div className="absolute bottom-6 left-6 size-3 border border-secondary/50 sm:bottom-10 sm:left-10 sm:size-4" />

      {/* Bottom-right corner */}
      <div className="absolute bottom-4 right-4 size-16 border-b-2 border-r-2 border-primary/30 opacity-60 sm:bottom-8 sm:right-8 sm:size-20" />
      <div className="absolute bottom-6 right-6 size-3 border border-primary/50 sm:bottom-10 sm:right-10 sm:size-4" />
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      <Background />

      <MechanicalCorners />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Banner Image */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <div className="relative">
            {/* Glow effect behind banner */}
            <div className="absolute inset-0 blur-2xl opacity-30 bg-linear-to-r from-primary via-accent to-secondary" />

            {/* Banner with border frame */}
            <div className="relative border-2 border-primary/20 bg-card/50 p-4 backdrop-blur-sm shadow-2xl shadow-primary/10 sm:p-8">
              <img
                src={banner}
                alt="Awesome Arknights Endfield"
                className="h-auto w-full max-w-xs object-contain drop-shadow-2xl sm:max-w-md md:max-w-lg lg:max-w-xl"
              />

              {/* Corner accents on banner frame */}
              <div className="absolute -left-1 -top-1 size-3 border-l-2 border-t-2 border-primary" />
              <div className="absolute -right-1 -top-1 size-3 border-r-2 border-t-2 border-accent" />
              <div className="absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-secondary" />
              <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-primary" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h1 className="mb-4 bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl">
            Awesome
            <br />
            <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text animate-text-shimmer bg-size-[200%] bg-pos-[0%]">
              Arknights Endfield
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-md md:text-lg">
            A curated collection of tools, resources, and community projects for
            Arknights: Endfield
          </p>
        </div>
      </div>
    </section>
  );
}
