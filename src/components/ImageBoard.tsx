"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";

type Tab = "publico" | "nsfw";

// Imagen de ejemplo tomada de /public/imagenes.
const EXAMPLE_SRC = "/imagenes/imagen.1.png";

function makeExamples(idPrefix: string, altPrefix: string, count = 6) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${idPrefix}${index + 1}`,
    src: EXAMPLE_SRC,
    alt: `${altPrefix} ${index + 1}`,
  }));
}

const PUBLIC_IMAGES = makeExamples("", "Ejemplo público");
const NSFW_IMAGES = makeExamples("n", "Ejemplo comisión NSFW");

const TABS: { id: Tab; label: string }[] = [
  { id: "publico", label: "todo publico" },
  { id: "nsfw", label: "comisiones NSFW" },
];

export default function ImageBoard() {
  const [tab, setTab] = useState<Tab>("publico");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const images = tab === "publico" ? PUBLIC_IMAGES : NSFW_IMAGES;
  const selected = images.find((image) => image.id === selectedId) ?? null;

  function toggleTab(next: Tab) {
    if (next === tab) return;
    setTab(next);
    setSelectedId(null);
  }

  useEffect(() => {
    if (!selected) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mx-auto w-full max-w-md">
        <ImageCarousel
          key={tab}
          images={images}
          onSelect={(image) => setSelectedId(image.id)}
        />
      </div>

      <div className="relative mt-3 pt-8">
        <div className="absolute inset-x-0 top-0 z-10 flex items-end justify-between">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={tab === id}
              onClick={() => toggleTab(id)}
              className={`px-3 py-1 text-sm transition-colors ${
                tab === id
                  ? "border-2 border-background bg-background font-semibold text-foreground"
                  : "border-2 border-background/45 bg-white text-foreground/70 hover:border-background hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="min-h-[min(70vh,40rem)] border-2 border-background bg-white">
          <div className="h-full overflow-auto p-3">
            {images.length === 0 ? (
              <div className="flex h-full min-h-80 items-center justify-center text-sm text-black/30">
                Sin imágenes
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {images.map((image) => (
                  <li key={image.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(image.id)}
                      className="relative block aspect-[3/4] w-full overflow-hidden bg-black/5"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 45vw, 180px"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedId(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-white"
            aria-label="Cerrar"
            onClick={() => setSelectedId(null)}
          >
            Cerrar
          </button>
          <div
            className="relative h-[80vh] w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
