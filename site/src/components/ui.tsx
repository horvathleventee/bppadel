import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/config";
export function Button({
  href = BOOKING_URL,
  children = "Pályafoglalás",
  secondary = false,
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
    >
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p className={`eyebrow ${dark ? "ink" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function Photo({
  id,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  id: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={`/images/${id}.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`photo ${className}`}
    />
  );
}
export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow dark>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
