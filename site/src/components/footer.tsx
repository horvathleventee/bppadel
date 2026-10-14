import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram } from "lucide-react";
import { club, navigation, legalNavigation } from "@/lib/config";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link
            href="/"
            aria-label="Budapest Padel – kezdőlap"
            className="logo"
          >
            <Image
              src="/images/logo.png"
              alt="Budapest Padel"
              width={2688}
              height={1217}
              unoptimized
            />
          </Link>
          <p>
            Több, mint egy játék.
            <br />
            Találkozunk a pályán.
          </p>
          <a href={club.instagram} className="social">
            <Instagram size={18} /> Instagram <ArrowUpRight size={16} />
          </a>
          <a href={club.facebook} className="social">
            Facebook <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <h3>Fedezd fel</h3>
          {navigation.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
          <Link href="/mi-az-a-padel/">Mi az a padel?</Link>
        </div>
        <div>
          <h3>Találkozzunk</h3>
          <a href={club.directions}>{club.address}</a>
          <a href={club.telephone}>{club.phone}</a>
          <a href={`mailto:${club.email}`}>{club.email}</a>
          <p>{club.hours}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Budapest Padel</span>
        <nav aria-label="Jogi információk">
          {legalNavigation.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>
        <span>MORE THAN A GAME.</span>
      </div>
    </footer>
  );
}
