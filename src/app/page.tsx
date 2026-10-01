import ImageBoard from "@/components/ImageBoard";
import TermsButton from "@/components/TermsButton";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col px-4 py-6 sm:py-10">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-5 xl:block">
        {/* Botón de términos: apilado arriba en pantallas chicas, absoluto a la izquierda desde xl */}
        <div className="w-full max-w-xs xl:absolute xl:inset-y-0 xl:left-0 xl:flex xl:w-56 xl:items-center">
          <TermsButton />
        </div>

        <ImageBoard />
      </div>
    </main>
  );
}
