import type { IconType } from "react-icons";
import { FaBehance, FaDribbble, FaLinkedinIn } from "react-icons/fa";

interface SubMenuItem {
  label: string;
}

interface MenuItem {
  id: number;
  title: string;
  link?: string;
  subMenuItems?: SubMenuItem[];
  isActive?: boolean;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialMediaLink {
  id: number;
  href: string;
  label: string;
  icon?: IconType;
  image?: string;
}

export const menuItems: MenuItem[] = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Portfolio", link: "/work" },
  { id: 3, title: "Services", isActive: true, link: "/services" },
  { id: 5, title: "About", link: "/about" },
  // { id: 6, title: "Blog", link: "/blog" },
];

export const contactInfo: ContactInfo = {
  address: "House-01 Road-06, Dhaka 1216",
  phone: "+8801956463736",
  email: "info@nextit.agency",
};

export const socialMediaLinks: SocialMediaLink[] = [
  {
    id: 1,
    href: "https://clutch.co/profile/devionex",
    label: "Follow us on Clutch",
    image: "/assets/img/icon/clutch.svg",
  },
  {
    id: 2,
    href: "https://www.behance.net/devionex",
    label: "Follow us on Behance",
    icon: FaBehance,
  },
  {
    id: 3,
    href: "https://dribbble.com/devionex",
    label: "Follow us on Dribbble",
    icon: FaDribbble,
  },
  {
    id: 4,
    href: "https://www.linkedin.com/company/devionex",
    label: "Follow us on LinkedIn",
    icon: FaLinkedinIn,
  },
];
