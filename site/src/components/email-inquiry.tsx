"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Copy, Mail, X } from "lucide-react";
import { club } from "@/lib/config";

export default function EmailInquiry() {
  const dialog = useRef<HTMLDialogElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => setMounted(true), []);
  const subject = "Céges csapatépítő – ajánlatkérés";
  const body = "Sziasztok!\n\nCéges csapatépítőre szeretnék ajánlatot kérni.\n\nCégnév: \nTervezett létszám: \nIdőpont: \nIdőtartam: \nEgyéb igények: \n\nKöszönöm!";
  const gmail = `https://mail.google.com/mail/?${new URLSearchParams({view:"cm",fs:"1",to:club.email,su:subject,body})}`;
  const mailto = `mailto:${club.email}?${new URLSearchParams({subject,body}).toString().replace(/\+/g,"%20")}`;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(club.email);
      setMessage("Az e-mail-címet a vágólapra másoltuk.");
    } catch {
      emailField.current?.focus();
      emailField.current?.select();
      setMessage("A másolást a böngésző nem engedélyezte. A kijelölt címet kézzel is másolhatod.");
    }
  }
  return <>
    <button type="button" className="button" aria-haspopup="dialog" onClick={() => { setMessage(""); dialog.current?.showModal(); }}>
      Ajánlatot kérek e-mailben <ArrowUpRight size={19} aria-hidden="true" />
    </button>
    {mounted && createPortal(<dialog ref={dialog} className="booking-dialog email-dialog" aria-labelledby={titleId} onClick={e => { if(e.target===e.currentTarget) dialog.current?.close(); }}>
      <div className="booking-dialog-content">
        <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Ajánlatkérés bezárása"><X /></button>
        <p className="eyebrow ink">CÉGES CSAPATÉPÍTŐ</p>
        <h2 id={titleId}>Írj nekünk!</h2>
        <p>Válassz levelezőt, vagy másold ki az e-mail-címünket.</p>
        <div className="booking-options">
          <a href={gmail} target="_blank" rel="noopener noreferrer"><Mail aria-hidden="true" /><span><strong>Megnyitás Gmailben</strong><small>Új lapon, előre kitöltött levéllel</small></span><ArrowUpRight aria-hidden="true" /></a>
          <a href={mailto}><Mail aria-hidden="true" /><span><strong>Saját levelező megnyitása</strong><small>Ha van beállított levelezőprogramod</small></span><ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="email-copy"><label htmlFor={`${titleId}-email`}>E-mail-címünk</label><input id={`${titleId}-email`} ref={emailField} value={club.email} readOnly onFocus={e=>e.currentTarget.select()} /><button type="button" onClick={copyEmail}><Copy size={17} aria-hidden="true" />Cím másolása</button></div>
        <p role="status" className="email-status">{message}</p>
        <p className="email-note">A megnyitott levelet a saját leveleződben tudod elküldeni. Írd meg a létszámot, az időpontot és az elképzeléseiteket.</p>
      </div>
    </dialog>,document.body)}
  </>;
}
