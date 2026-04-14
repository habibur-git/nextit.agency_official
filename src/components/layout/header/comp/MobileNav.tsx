"use client";

import { contactInfo, menuItems, socialMediaLinks } from "@/data/menu";
import { serviceCategories } from "@/data/serviceCategories";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
  onClose?: () => void;
}

export default function MobileNav({ onClose }: MobileNavProps) {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const handleMenuClick = (
    e: React.MouseEvent,
    itemId: number,
    hasSubmenu: boolean
  ) => {
    if (hasSubmenu) {
      e.preventDefault(); // prevent navigation
      setOpenSubmenu(openSubmenu === itemId ? null : itemId);
    } else {
      onClose?.();
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 inset-0 z-50 flex bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar */}
      <motion.div
        className="bg-theme w-80 h-screen flex flex-col border-r border-border/30"
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              width={140}
              height={60}
              src="/assets/img/sec-logo.svg"
              alt="DevioNex Logo"
              priority
            />
          </Link>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white border border-border hover:bg-secondary/10 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => {
              const hasSubmenu = !!(
                item.subMenuItems && item.subMenuItems.length > 0
              );

              return (
                <li key={item.id}>
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={(e) => handleMenuClick(e, item.id, hasSubmenu)}
                  >
                    {/* Menu link */}
                    <Link
                      href={item.link || "#"}
                      className="block py-2 text-base text-white font-title font-medium hover:scale-105 transition-transform"
                    >
                      {item.title}
                    </Link>

                    {/* Chevron */}
                    {hasSubmenu && (
                      <ChevronDown
                        size={16}
                        className={`ml-2 text-white transition-transform duration-200 ${
                          openSubmenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  {/* Submenu */}
                  {hasSubmenu && openSubmenu === item.id && (
                    <div className="pl-4 mt-2">
                      {serviceCategories.map((section) => (
                        <div key={section.title}>
                          {/* Section title */}
                          <p className="text-xs uppercase text-white/50 font-semibold px-3 mt-4 mb-2">
                            {section.title}
                          </p>

                          {/* Section items */}
                          <ul className="flex flex-col">
                            {section.items.map((subItem) => (
                              <li key={subItem.slug}>
                                <Link
                                  href={`/services/${subItem.slug}`}
                                  onClick={onClose}
                                  className="flex items-center justify-between py-2 px-5 text-white text-base hover:bg-white/10 rounded-2xl transition"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 mx-6" />

        {/* Contact Info */}
        <div className="p-6 space-y-4">
          <div className="text-sm space-y-2 font-medium">
            <p className="text-white">{contactInfo.phone}</p>
            <p className="text-white">{contactInfo.email}</p>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            {socialMediaLinks.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-gray-200 transition-colors flex items-center justify-center min-w-12 min-h-12"
              >
                {social.icon ? (
                  (() => {
                    const Icon = social.icon as React.ElementType;
                    return <Icon className="text-xl text-white" />;
                  })()
                ) : social.image ? (
                  <Image
                    src={social.image}
                    alt={social.label}
                    width={24}
                    height={24}
                    className="min-w-6 min-h-6"
                  />
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      <div className="flex-1 bg-transparent" onClick={onClose} />
    </motion.div>
  );
}
