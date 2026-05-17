import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18nContext } from '@/i18n/i18n-react.js';

interface ScreenshotCarouselProps {
  screenshots: string[];
  projectName: string;
}

export default function ScreenshotCarousel({ screenshots, projectName }: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { LL } = useI18nContext();
  const count = screenshots.length;

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % count);
  }, [count]);

  if (count === 0) {
    return (
      <div className="bg-hatch flex aspect-video w-full items-center justify-center border-b border-border">
        <span className="font-mono text-xs text-foreground/20">{LL.drawer.noScreenshots()}</span>
      </div>
    );
  }

  const src = new URL(`../../data/screenshots/${screenshots[currentIndex]}`, import.meta.url).href;

  return (
    <div className="relative border-b border-border">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          key={currentIndex}
          src={src}
          alt={`${projectName} screenshot ${currentIndex + 1}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Navigation arrows */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground/60 backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground/60 backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
            aria-label="Next screenshot"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`size-1.5 transition-colors ${
                i === currentIndex ? 'bg-foreground/80' : 'bg-foreground/20'
              }`}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="absolute right-2 top-2 border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-foreground/60 backdrop-blur-sm">
        {currentIndex + 1}/{count}
      </div>
    </div>
  );
}
