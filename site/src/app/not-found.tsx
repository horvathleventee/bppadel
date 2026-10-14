import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found">
      <h1>OUT!</h1>
      <p>Ez a labda pályán kívülre került. A keresett oldal nem található.</p>
      <Button href="/">Vissza a kezdőlapra</Button>
    </section>
  );
}
