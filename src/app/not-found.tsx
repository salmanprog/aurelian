import Link from "next/link";
import { Footer } from "@/components/site/Footer";

export default function NotFound() {
  return (
    <>
      <section className="flex min-h-[80svh] flex-col justify-center px-5 pt-28 md:px-10">
        <p className="label text-gold/80">404 — Nothing hangs here</p>
        <h1 className="display mt-8 text-[clamp(2.6rem,10vw,8rem)] leading-[0.88] text-ivory">
          This object
          <br />
          <span className="display-italic text-gold">never existed.</span>
        </h1>
        <p className="mt-8 max-w-[380px] text-[13px] leading-relaxed text-ivory/50">
          Chapters close. Objects sell out. The rest of the house is still open.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/shop" className="btn-line btn-gold label text-ivory" data-cursor="enter">
            Shop the house
          </Link>
          <Link href="/" className="btn-line label text-ivory/70">
            Return to the entrance
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
