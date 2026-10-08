import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Hearthside Home Services home">
          <span className="wordmark-icon" aria-hidden="true">H</span>
          <span>Hearthside</span>
        </Link>

        <div className="nav-links">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))} 
        </div>

        <Link className="nav-cta" href="/bookings/new">
          Book a Service
        </Link>
      </nav>
    </header>
  );
}
