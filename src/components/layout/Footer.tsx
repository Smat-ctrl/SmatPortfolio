import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige bg-cream px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-serif text-lg text-espresso">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-mocha">
            Building software with care and curiosity.
          </p>
        </div>
        <p className="text-sm text-mocha">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
