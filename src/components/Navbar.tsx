import Link from "next/link";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="size-5"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="size-5"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.25" />
      <path
        d="M5.5 19.2c.9-3.1 3.4-5.2 6.5-5.2s5.6 2.1 6.5 5.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="size-5"
      aria-hidden
    >
      <path d="M7 8V7a5 5 0 0 1 10 0v1" strokeLinecap="round" />
      <path d="M6.5 8h11l.8 12H5.7L6.5 8Z" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-background/90 backdrop-blur-md dark:border-white/12">
      <nav
        aria-label="Principal"
        className="relative flex min-h-16 items-center justify-between gap-2 px-4 py-2 sm:px-6"
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          sato
        </Link>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-sm font-medium tracking-wide uppercase"
        >
          home
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Cuenta"
          >
            <UserIcon />
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Bolsa"
          >
            <BagIcon />
          </button>
        </div>
      </nav>
    </header>
  );
}
