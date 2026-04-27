"use client";

import Button from "@/components/button/Button";
import { menuItems } from "@/data/menu";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import MobileNav from "./comp/MobileNav";
import Submenu from "./comp/Submenu";

type HeaderProps = {
  variant?: "auto" | "white";
};

export default function Header({ variant = "auto" }: HeaderProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const useWhiteVariant = variant === "white";
  const textColorClass = isScrolled
    ? "text-desc"
    : useWhiteVariant
      ? "text-white"
      : "text-title/65";
  const activeClass =
    useWhiteVariant && !isScrolled
      ? "text-white font-semibold"
      : "text-theme font-semibold";
  const linkBaseClass =
    "font-title font-medium transition-transform duration-300 hover:scale-105";

  const glassSurfaceClass =
    useWhiteVariant && !isScrolled
      ? "bg-white/[0.08] backdrop-blur-xl backdrop-saturate-150"
      : isScrolled
        ? "bg-bg/80 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-150"
        : " backdrop-blur-xl backdrop-saturate-150";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(
        currentScrollY <= lastScrollY.current || currentScrollY <= 100,
      );
      setIsScrolled(currentScrollY > 4);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
      }}
      className={`fixed top-0 z-50 h-20 w-full min-w-0 max-w-full transition-[background-color,box-shadow,border-color] duration-300 ease-out ${glassSurfaceClass}`}
    >
      <div className="flex h-full min-w-0 items-center justify-center px-4">
        <div className="flex h-16 w-full min-w-0 max-w-[1400px] items-center justify-between px-1.5">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/img/logo.svg"
              width={238}
              height={50}
              alt="NextIT Logo"
              priority
              className="h-auto w-[140px]"
            />
          </Link>

          <ul className="hidden h-full items-center gap-8 lg:flex">
            {menuItems.map((item) => {
              const isActive = Boolean(item.link && pathname === item.link);
              const linkTone = isActive ? activeClass : textColorClass;
              const linkClass = `${linkBaseClass} ${linkTone}`;
              const hasSubmenu = Boolean(item.subMenuItems?.length);
              const hoverHandlers = hasSubmenu
                ? {
                    onMouseEnter: () => setOpenDropdown(item.id),
                    onMouseLeave: () => setOpenDropdown(null),
                  }
                : {};

              return (
                <li
                  key={item.id}
                  className="relative flex h-full items-center"
                  {...hoverHandlers}
                >
                  {hasSubmenu ? (
                    <>
                      <Link
                        href={item.link || "#"}
                        className={`group flex items-center gap-1 ${linkClass}`}
                      >
                        {item.title}
                        <BiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      </Link>
                      <Submenu isOpen={openDropdown === item.id} />
                    </>
                  ) : (
                    <Link href={item.link || "#"} className={linkClass}>
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button
                label="Contact Us"
                href="/contact"
                variant={
                  useWhiteVariant && !isScrolled ? "secondary" : "primary"
                }
                showIconArea={false}
              />
            </div>

            <button
              type="button"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-theme text-white lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileNav onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </motion.header>
  );
}
