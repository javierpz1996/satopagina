"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type CarouselImage = {
  id: string;
  src: string;
  alt: string;
};

type Props = {
  images: CarouselImage[];
  onSelect?: (image: CarouselImage) => void;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      className="size-5"
      aria-hidden
    >
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const INTERVAL_MS = 5000;

export default function ImageCarousel({ images, onSelect }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = images.length;
  const current = Math.min(index, Math.max(count - 1, 0));

  useEffect(() => {
    if (count < 2 || paused) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setIndex((previous) => (previous + 1) % count);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  function goPrevious() {
    setIndex((previous) => (previous - 1 + count) % count);
  }

  function goNext() {
    setIndex((previous) => (previous + 1) % count);
  }

  return (
    <div
      className="relative border-2 border-background bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
        {images.map((image, imageIndex) => (
          <div
            key={image.id}
            aria-hidden={imageIndex !== current}
            className={`absolute inset-0 transition-opacity duration-500 ${
              imageIndex === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              tabIndex={imageIndex === current ? 0 : -1}
              onClick={() => onSelect?.(image)}
              className="block h-full w-full cursor-zoom-in"
              aria-label={`Ver ${image.alt} en grande`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 576px"
                className="object-cover"
                priority={imageIndex === 0}
              />
            </button>
          </div>
        ))}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center border-2 border-foreground bg-white/90 text-foreground transition-colors hover:bg-foreground hover:text-white"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center border-2 border-foreground bg-white/90 text-foreground transition-colors hover:bg-foreground hover:text-white"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((image, imageIndex) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`Ir a la imagen ${imageIndex + 1}`}
              aria-current={imageIndex === current}
              className={`size-2.5 rounded-full border border-foreground transition-colors ${
                imageIndex === current
                  ? "bg-foreground"
                  : "bg-white/80 hover:bg-background"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
