import Image from "next/image";
import Button from "../components/button/Button";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";

export const metadata = {
  title:
    "Not Found - NextIT | UI Designers & Web Developers for Modern, Scalable Websites & Apps",
  description:
    "NextIT delivers modern UI design and scalable websites with expert web developers. Since 2011, we’ve helped startups and SMEs with quick delivery, 24/7 support, and budget-friendly solutions in UI/UX design, MERN apps, Next.js, front-end, and back-end development.",
};
export default function NotFoundPage() {
  return (
    <>
      <Header />

      <div className="h-screen flex justify-center text-center py-20">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <Image
            src="/assets/img/normal/404.png"
            alt="404 Error"
            width={856}
            height={246}
            className="mx-auto mb-10"
            priority={false}
          />

          <h2 className="text-3xl font-semibold mb-4">
            Looks Like You’re Lost
          </h2>

          <p className="sec-text mb-8">
            The link you followed is probably broken, or the page has been
            removed.
          </p>

          <div>
            <Button href="/" label="Back To Home" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
