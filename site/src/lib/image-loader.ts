"use client";
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  return `${src.replace(/\.[^.]+$/, "")}-${width}.webp`;
}
