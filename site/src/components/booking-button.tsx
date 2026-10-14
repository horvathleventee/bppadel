"use client";
import { useId, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Phone, Mail, X } from "lucide-react";
import { BOOKING_URL, club } from "@/lib/config";

export default function BookingButton({ children = "Pályafoglalás", className = "button", onOpen }: { children?: React.ReactNode; className?: string; onOpen?: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>
    <button type="button" className={className} onClick={() => { onOpen?.(); dialog.current?.showModal(); }}>
      {children}<ArrowUpRight size={19} aria-hidden="true" />
    </button>
    {mounted && createPortal(<dialog ref={dialog} className="booking-dialog" aria-labelledby={titleId} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="booking-dialog-content">
        <button className="dialog-close" aria-label="Foglalási lehetőségek bezárása" onClick={() => dialog.current?.close()}><X /></button>
        <p className="eyebrow ink">IRÁNY A PÁLYA</p>
        <h2 id={titleId}>Hogyan foglalnál?</h2>
        <p>Válaszd a neked kényelmes megoldást.</p>
        <div className="booking-options">
          <a href={club.telephone}><Phone aria-hidden="true" /><span><strong>Telefonon</strong><small>{club.phone}</small></span><ArrowUpRight aria-hidden="true" /></a>
          <a href={BOOKING_URL}><ArrowUpRight aria-hidden="true" /><span><strong>Playtomic</strong><small>Szabad időpontok és online foglalás</small></span><ArrowUpRight aria-hidden="true" /></a>
          <a href={`mailto:${club.email}`}><Mail aria-hidden="true" /><span><strong>E-mailben</strong><small>{club.email}</small></span><ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </dialog>, document.body)}
  </>;
}
