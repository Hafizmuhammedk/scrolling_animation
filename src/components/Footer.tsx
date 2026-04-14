export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-white/[0.08] bg-black">
      {/* Disclaimer */}
      <div className="max-w-[980px] mx-auto px-6 py-4 border-b border-white/[0.08]">
        <p className="text-[11px] text-[#6e6e73] leading-relaxed">
          iPhone Air is a conceptual product. This page is a design exercise and
          not affiliated with Apple Inc. All product names, logos, and brands are
          property of their respective owners.
        </p>
      </div>

      {/* Footer Links Grid */}
      <div className="max-w-[980px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-white/90 text-[11px] font-semibold mb-3">
              Shop and Learn
            </h3>
            <ul className="space-y-2">
              {["Store", "iPhone", "Mac", "iPad", "Watch", "AirPods"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-[#6e6e73] hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white/90 text-[11px] font-semibold mb-3">
              Services
            </h3>
            <ul className="space-y-2">
              {["Apple Music", "Apple TV+", "Apple Arcade", "iCloud", "Apple Pay"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-[#6e6e73] hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white/90 text-[11px] font-semibold mb-3">
              Apple Store
            </h3>
            <ul className="space-y-2">
              {["Find a Store", "Genius Bar", "Today at Apple", "Apple Camp", "Financing"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-[#6e6e73] hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white/90 text-[11px] font-semibold mb-3">
              For Business
            </h3>
            <ul className="space-y-2">
              {["Apple and Business", "Shop for Business"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-[#6e6e73] hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-white/90 text-[11px] font-semibold mb-3">
              Apple Values
            </h3>
            <ul className="space-y-2">
              {["Accessibility", "Environment", "Privacy", "Supply Chain"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-[#6e6e73] hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[980px] mx-auto px-6 py-4 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#6e6e73]">
            Conceptual design © {new Date().getFullYear()} Design Exercise
          </p>
          <div className="flex items-center gap-3 text-[11px] text-[#6e6e73]">
            <a href="#" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white/80 transition-colors">
              Terms of Use
            </a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white/80 transition-colors">
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
