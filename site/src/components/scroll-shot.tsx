"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { clamp, shotAt, CONTACT } from "@/lib/shot-motion";
export default function ScrollShot() {
  const scene = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  const impact = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    const section = root.closest("section")!;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    const paint = (progress: number, reduced = false) => {
      const shot = shotAt(progress);
      root.dataset.phase = reduced ? "still" : shot.phase;
      root.dataset.progress = progress.toFixed(3);
      if (player.current)
        player.current.style.transform = reduced
          ? "none"
          : `translate3d(${shot.playerX}%,0,0) rotate(${shot.playerRotate}deg)`;
      if (ball.current) {
        ball.current.style.left = `${shot.x}%`;
        ball.current.style.top = `${shot.y}%`;
        ball.current.style.opacity = String(reduced ? 1 : shot.ballOpacity);
        ball.current.style.transform = `translate(-50%,-50%) scale(${shot.ballScale}) rotate(${shot.ballRotate}deg)`;
      }
      if (impact.current) {
        impact.current.style.opacity = String(reduced ? 0 : shot.impact);
        impact.current.style.transform = `translate(-50%,-50%) scale(${shot.impactScale})`;
      }
      if (trail.current) {
        const previous = shotAt(Math.max(CONTACT, progress - 0.04));
        const dx = shot.x - previous.x,
          dy = shot.y - previous.y;
        trail.current.style.left = `${shot.x}%`;
        trail.current.style.top = `${shot.y}%`;
        trail.current.style.opacity = String(
          reduced || progress < CONTACT ? 0 : shot.ballOpacity * 0.45,
        );
        trail.current.style.transform = `translate(-100%,-50%) rotate(${(Math.atan2(dy * root.clientHeight, dx * root.clientWidth) * 180) / Math.PI}deg)`;
      }
    };
    const update = () => {
      frame = 0;
      if (media.matches) {
        paint(CONTACT, true);
        return;
      }
      const rect = section.getBoundingClientRect();
      const travel =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      paint(clamp((travel - 0.12) / 0.74));
    };
    const requestUpdate = () => {
      if (!frame && visible && !media.matches)
        frame = requestAnimationFrame(update);
    };
    const onPreference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      update();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(section);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", onPreference);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", onPreference);
    };
  }, []);
  return (
    <div ref={scene} className="shot-scene">
      <span className="shot-word" aria-hidden="true">
        PLAY.
      </span>
      <div ref={player} className="shot-player">
        <Image
          src="/images/athlete-v2.webp"
          alt="Illusztratív padeljátékos világos pólóban, tenyeres ütés közben"
          fill
          sizes="(max-width: 650px) 100vw, 60vw"
        />
      </div>
      <div ref={trail} className="shot-trail" aria-hidden="true" />
      <div ref={impact} className="shot-impact" aria-hidden="true" />
      <div ref={ball} className="shot-ball" aria-hidden="true">
        <i />
        <i />
      </div>
    </div>
  );
}
