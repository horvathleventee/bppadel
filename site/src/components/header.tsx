"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation, BOOKING_URL } from "@/lib/config";
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className="site-header">
        <Link href="/" className="logo" aria-label="Budapest Padel – kezdőlap">
          <Image
            src="/images/logo.png"
            alt="Budapest Padel"
            width={2688}
            height={1217}
            unoptimized
            priority
          />
        </Link>
        <nav aria-label="Főmenü" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={BOOKING_URL} className="header-book">
          Pályafoglalás <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <button
          ref={trigger}
          className="menu-toggle"
          onClick={() => setOpen(true)}
          aria-label="Menü megnyitása"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <Menu />
        </button>
      </header>
      <dialog
        id="mobile-navigation"
        ref={dialog}
        className="mobile-dialog"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <span>BUDAPEST PADEL</span>
            <button onClick={close} aria-label="Menü bezárása">
              <X />
            </button>
          </div>
          <nav aria-label="Mobil főmenü">
            <Link href="/" onClick={close}>
              Kezdőlap
            </Link>
            {navigation.map((item, i) => (
              <Link key={item.href} href={item.href} onClick={close}>
                <span>0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="button" href={BOOKING_URL}>
            Pályafoglalás <ArrowUpRight size={20} />
          </a>
          <p>
            Budapest · XVI. kerület
            <br />
            Minden nap 08:00–23:00
          </p>
        </div>
      </dialog>
    </>
  );
}
