import EmailInquiry from "./email-inquiry";
import { Eyebrow, Photo } from "./ui";
import { club } from "@/lib/config";
export default function TeamBuilding() {
  const services = ["Pályafoglalás kisebb és nagyobb céges csoportok számára", "Ütőbérlés a résztvevőknek", "Igény esetén oktató vagy szervezett játékforma", "Öltözők és zuhanyzók", "Ingyenes parkolás", "Bár és közösségi tér", "Egyedi időpont- és programajánlat"];
  return <>
    <section className="section team-intro"><div className="container split">
      <div><Eyebrow dark>Közös játék. Közös élmény.</Eyebrow><h2>MOZDULJATOK KI<br />AZ IRODÁBÓL!</h2>
      <p className="lead">Próbáljatok ki valami újat együtt!</p>
      <p>A padel könnyen megtanulható, látványos és közösségi sport, ezért kezdők és tapasztalt játékosok számára egyaránt remek választás céges csapatépítő programnak.</p>
      <p>A Budapest Padel 8 fedett, klimatizált pályával várja a csapatokat Budapest XVI. kerületében. A programot a résztvevők számához, a rendelkezésre álló időhöz és az igényekhez igazítjuk.</p></div>
      <div className="team-photo"><Photo id="venue-6" alt="A Budapest Padel fedett pályái céges csapatépítő programhoz" /></div>
    </div></section>
    <section className="section team-services"><div className="container split">
      <div><Eyebrow dark>A program részei</Eyebrow><h2>AMIT BIZTOSÍTANI<br />TUDUNK</h2><p>Korábbi padeltapasztalat nem szükséges – a játék szabályai gyorsan elsajátíthatók, így akár teljesen kezdő csapatok számára is ideális program.</p></div>
      <ul>{services.map((service,i)=><li key={service}><span aria-hidden="true">0{i+1}</span>{service}</li>)}</ul>
    </div></section>
    <section className="section team-offer" id="ajanlatkeres"><div className="container split">
      <div><Eyebrow dark>Rátok szabva</Eyebrow><h2>EGYEDI AJÁNLAT<br />CÉGEKNEK</h2><p>Minden céges eseményt egyedileg egyeztetünk a résztvevők száma, az időtartam és az igényelt szolgáltatások alapján.</p><p>Elsősorban e-mailben állunk rendelkezésre, de telefonon is szívesen segítünk a részletek egyeztetésében.</p><p>A szolgáltatásról természetesen céges, ÁFÁ-s számlát biztosítunk.</p></div>
      <div className="team-contact"><h3>Kérj egyedi ajánlatot csapatotok számára!</h3><p>Írd meg a tervezett létszámot, időpontot és az elképzeléseiteket.</p><EmailInquiry /><a href={`mailto:${club.email}`}>{club.email}</a><a href={club.telephone}>{club.phone}</a></div>
    </div></section>
  </>;
}
