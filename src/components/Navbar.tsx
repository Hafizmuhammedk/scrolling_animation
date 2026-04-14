"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  useLenis(({ scroll }) => {
    // Only show navbar while in the hero section
    setIsVisible((prev) => {
      const shouldBeVisible = scroll < window.innerHeight * 0.85;
      return prev !== shouldBeVisible ? shouldBeVisible : prev;
    });
  });

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-transparent ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Apple Logo */}
          <a href="#" id="nav-logo" className="text-white/90 hover:text-white transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 17 21"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.174 11.168c-.026-2.61 2.133-3.862 2.23-3.923-1.213-1.775-3.104-2.019-3.778-2.047-1.608-.163-3.14.947-3.956.947-.816 0-2.078-.923-3.414-.898-1.757.026-3.377 1.022-4.282 2.594-1.826 3.17-.467 7.87 1.313 10.443.87 1.259 1.908 2.672 3.27 2.622 1.313-.053 1.81-.85 3.398-.85 1.588 0 2.036.85 3.425.823 1.413-.025 2.308-1.284 3.174-2.546.999-1.46 1.412-2.874 1.436-2.948-.031-.014-2.755-1.058-2.781-4.197zm-2.607-7.71C11.356 2.51 11.862.958 11.698 0c-1.312.053-2.903.874-3.844 1.978-.845.978-1.584 2.537-1.385 4.035 1.462.114 2.954-.743 3.748-1.978l.35-.577z" />
            </svg>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {["iPhone Air", "Features", "Specs", "Design"].map((item) => (
              <a
                key={item}
                href="#"
                id={`nav-${item.toLowerCase().replace(" ", "-")}`}
                className="text-[11px] text-white/80 hover:text-white transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#"
            id="nav-buy-btn"
            className="text-[11px] text-[#0071e3] hover:text-white hover:bg-[#0071e3] 
                       px-4 py-1.5 rounded-full border border-[#0071e3] transition-all duration-300 tracking-wide"
          >
            Buy
          </a>
        </div>
      </div>
    </nav>
  );
}
