"use client";

import { useEffect, useState } from "react";

const TERMINOS: { titulo: string; texto: string }[] = [
  {
    titulo: "1. Aceptación",
    texto:
      "Al acceder a este sitio aceptás estos términos y condiciones. Si no estás de acuerdo, por favor no utilices el sitio.",
  },
  {
    titulo: "2. Uso del sitio",
    texto:
      "El contenido se ofrece con fines informativos y de exhibición de trabajos. Te comprometés a no reproducir, revender ni explotar el material sin autorización escrita.",
  },
  {
    titulo: "3. Propiedad intelectual",
    texto:
      "Todas las ilustraciones, dibujos y piezas publicadas pertenecen a su autor. Queda prohibida su copia, modificación o distribución total o parcial.",
  },
  {
    titulo: "4. Comisiones y pagos",
    texto:
      "Las comisiones se rigen por el presupuesto acordado por escrito. Los anticipos no son reembolsables una vez iniciado el trabajo, salvo pacto en contrario.",
  },
  {
    titulo: "5. Contenido sensible",
    texto:
      "La sección de comisiones NSFW es mayor de 18 años. Su contenido no puede compartirse ni distribuirse a terceros.",
  },
  {
    titulo: "6. Responsabilidad",
    texto:
      "El sitio se ofrece tal cual, sin garantías de disponibilidad ininterrumpida. No nos responsabilizamos por daños derivados del uso o imposibilidad de uso del sitio.",
  },
  {
    titulo: "7. Contacto",
    texto:
      "Para dudas sobre estos términos escribinos a través de los canales de contacto indicados en el sitio.",
  },
];

export default function TermsButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full border-2 border-background bg-white px-5 py-4 text-center text-base font-bold uppercase leading-tight tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-white sm:text-lg"
      >
        termino y condiciones
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminos-titulo"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-2xl flex-col border-2 border-foreground bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b-2 border-foreground bg-background px-4 py-3">
              <h2
                id="terminos-titulo"
                className="text-base font-bold uppercase tracking-wide sm:text-lg"
              >
                termino y condiciones
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="border-2 border-foreground bg-white px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-foreground hover:text-white sm:text-sm"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-4 overflow-auto px-4 py-4 text-sm leading-relaxed text-foreground/90 sm:px-6 sm:py-6">
              {TERMINOS.map(({ titulo, texto }) => (
                <section key={titulo}>
                  <h3 className="font-semibold text-foreground">{titulo}</h3>
                  <p>{texto}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
