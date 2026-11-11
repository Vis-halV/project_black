"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/create", label: "Create" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-gray-50/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-playfair text-xl font-medium tracking-tight">
            feltnotsaid
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-light tracking-wide transition-colors duration-200 px-2 py-1 ${
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faXmark : faBars}
              className="text-gray-800 text-xl"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-light tracking-wide transition-colors duration-200 px-2 ${
                      pathname === item.href
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-black'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
