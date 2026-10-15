import ScrollShot from "./scroll-shot";
import {
  ArrowDown,
  ArrowUpRight,
  Car,
  LockKeyhole,
  ShowerHead,
  Coffee,
  CircleDot,
  Grid2X2,
  MapPin,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

import { Button, TextLink, Eyebrow, Photo, SectionHeading } from "./ui";
import { club, facilities } from "@/lib/config";
const facilityIcons = {
  racket: Grid2X2,
  ball: CircleDot,
  shower: ShowerHead,
  lock: LockKeyhole,
  car: Car,
  coffee: Coffee,
};
export function Hero() {
  return (
    <section className="hero">
      <Photo
        id="venue-4"
        alt="Játék a Budapest Padel kék pályáján"
        priority
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <Eyebrow>Budapest · XVI. kerület</Eyebrow>
        <h1>
          ITT KEZDŐDIK
          <br />A <span>JÁTÉK.</span>
        </h1>
        <div className="hero-bottom">
          <div>
            <p>
              Nyolc pálya. Egy közös szenvedély.
              <br />
              Lépj pályára, és találd meg a saját ritmusod.
            </p>
            <div className="button-row">
              <Button />
              <a className="hero-explore" href="#kozpont">
                Fedezd fel a központot <ArrowDown size={18} />
              </a>
            </div>
          </div>
          <div className="hero-coordinate">
            <span>MORE THAN A GAME.</span>
            <span>BUDAPEST / HU</span>
          </div>
        </div>
      </div>
      <a
        href="#kozpont"
        className="hero-scroll"
        aria-label="Tovább a központ bemutatásához"
      >
        <ArrowDown size={20} />
      </a>
      <div className="hero-index">01 / BUDAPEST PADEL</div>
    </section>
  );
}
export function Facts() {
  return (
    <div className="facts">
      <div className="container facts-grid">
        <div>
          <strong>08</strong>
          <span>
            Szuperpanorámás
            <br />
            padel pálya
          </span>
        </div>
        <div>
          <strong>08–23</strong>
          <span>
            Minden nap.
            <br />A te idődben.
          </span>
        </div>
        <div>
          <span className="fact-cross" aria-hidden="true">
            ↗
          </span>
          <span>
            Több, mint egy játék.
            <br />
            <b>Egy közösség.</b>
          </span>
        </div>
      </div>
    </div>
  );
}
export function About({ full = false }: { full?: boolean }) {
  return (
    <section id="kozpont" className="section about">
      <div className="container split">
        <div className="about-picture">
          <Photo
            id="venue-6"
            alt="A Budapest Padel egymás mellett elhelyezkedő szuperpanorámás pályái"
          />
          <span className="image-stamp">
            BUDAPEST
            <br />
            PADEL CLUB <ArrowUpRight size={26} />
          </span>
          <span className="photo-caption">
            A játék otthona. Budapest, XVI. kerület.
          </span>
        </div>
        <div className="about-copy">
          <Eyebrow dark>Ez a Budapest Padel</Eyebrow>
          <h2>
            TÖBB, MINT
            <br />
            EGY <span className="title-accent">pálya.</span>
          </h2>
          <p className="lead">
            Az első labdamenettől a meccs utáni beszélgetésig.
          </p>
          <p>
            Egy hely, ahol a sport és a közösség összeér. Nyolc szuperpanorámás
            pálya, átgondolt felszereltség és tér a közös pillanatoknak. Érkezz
            barátokkal, vagy hozd a megszokott párosodat.
          </p>
          {full && (
            <p>
              A központ ötlete 2024 elején született: közelebb hozni a padelt és
              az olasz padelkultúra közösségi élményét Budapesthez. Kezdőként és
              rutinos játékosként is ugyanaz vár: a játék öröme.
            </p>
          )}
          <TextLink href={full ? "/palyak/" : "/rolunk/"}>
            {full ? "Nézd meg a pályákat" : "Ismerd meg a központot"}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
export function Courts({ full = false }: { full?: boolean }) {
  return (
    <section className="section courts">
      <div className="container">
        <SectionHeading
          label="A játék tere"
          title="A PÁLYA A TIÉD."
          description="A jó meccshez jó pálya kell. A többit rád és a párosodra bízzuk."
        />
        <div className="court-image">
          <Photo
            id="venue-4"
            alt="A központ üvegfalakkal körülvett kék padelpályája"
            sizes="100vw"
          />
          <div className="court-image-top">
            <span>01—08 / SZUPERPANORÁMÁS PÁLYÁK</span>
            <span>BUDAPEST PADEL</span>
          </div>
          <div className="court-image-bottom">
            <span>
              TERET ADUNK
              <br />A JÁTÉKODNAK.
            </span>
            <Button href={full ? undefined : "/palyak/"}>
              {full ? "Pályafoglalás" : "Fedezd fel a pályákat"}
            </Button>
          </div>
        </div>
        <div className="court-specs">
          <div>
            <span>01 / FELÜLET</span>
            <h3>MONDO XN SUPERCOURT</h3>
            <p>A központ felszereltségének része.</p>
          </div>
          <div>
            <span>02 / KÉNYELEM</span>
            <h3>Ingyenes parkolás</h3>
            <p>Érkezz kényelmesen, közvetlenül a központhoz.</p>
          </div>
          <div>
            <span>03 / ÉLMÉNY</span>
            <h3>Szuperpanorámás kialakítás</h3>
            <p>Üvegfalak. Szabad rálátás.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Ghost({ full = false }: { full?: boolean }) {
  return (
    <section
      id="ghostpadel"
      className={`ghost section ${full ? "ghost-full" : ""}`}
    >
      <div className="ghost-court" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container ghost-layout">
        <div>
          <Eyebrow>Különleges alkalmak. Más dimenzió.</Eyebrow>
          <h2>
            LIGHTS OFF.
            <br />
            <span>GAME ON.</span>
          </h2>
          <p className="ghost-subtitle">EZ A GHOST PADEL.</p>
        </div>
        <div className="ghost-copy">
          <span className="ghost-orbit" aria-hidden="true" />
          <h3>
            Amikor lekapcsoljuk a fényt,
            <br />
            új játék kezdődik.
          </h3>
          <p>
            Sötét pálya, fluoreszkáló vonalak, világító labdák és ruhák. Ugyanaz
            a sport, egészen más hangulat.
          </p>
          <p className="ghost-note">
            A Ghost Padel különleges alkalmakon érhető el. A következő
            lehetőségről érdeklődj nálunk.
          </p>
          <Button
            href={
              full
                ? `mailto:${club.email}?subject=Ghost%20Padel%20érdeklődés`
                : "/ghost-padel/"
            }
          >
            {full ? "Érdeklődöm e-mailben" : "Fedezd fel a Ghost Padelt"}
          </Button>
        </div>
      </div>
    </section>
  );
}
export function Facilities() {
  return (
    <section className="section facilities">
      <div className="container">
        <SectionHeading
          label="Minden a helyén"
          title="CSAK A JÁTÉKRA KONCENTRÁLJ."
        />
        <div className="facilities-grid">
          {facilities.map((f, i) => {
            const Icon = facilityIcons[f.icon];
            return (
              <article key={f.title}>
                <span className="facility-number">0{i + 1}</span>
                <Icon size={29} strokeWidth={1.4} aria-hidden="true" />
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Beginner() {
  return (
    <section className="beginner">
      <div className="container beginner-grid">
        <div>
          <Eyebrow dark>Az első meccsed itt kezdődik</Eyebrow>
          <h2>
            MÉG NEM
            <br />
            <span className="title-accent">próbáltad?</span>
          </h2>
          <p>
            Két páros, egy pálya és rengeteg közös labdamenet. Ismerd meg a
            padel alapjait, hozd a barátaidat, az ütőt pedig béreld nálunk.
          </p>
          <TextLink href="/mi-az-a-padel/">Mi az a padel?</TextLink>
        </div>
        <ScrollShot />
      </div>
    </section>
  );
}
export function Pricing() {
  return <section className="section pricing"><div className="container">
    <SectionHeading label="Áraink" title="A KÖVETKEZŐ MECCSED." description="Foglalj pályát a csapatnak. Ha nincs saját ütőd, nálunk bérelhetsz." />
    <div className="price-grid">
      <article className="price-card"><span>01 / PÁLYABÉRLÉS</span><h3>16.000 <small>Ft</small></h3><p>pálya / óra</p><p className="price-detail">A teljes pálya bérleti díja egy órára.</p><Button>Foglalj pályát</Button></article>
      <article className="price-card"><span>02 / ÜTŐBÉRLÉS</span><h3>1.500 <small>Ft</small></h3><p>ütő / alkalom</p><p className="price-detail">Felszerelés a játékhoz, a recepción.</p><TextLink href="/kapcsolat/">Elérhetőségeink</TextLink></article>
    </div>
  </div></section>;
}
export function Gallery() {
  const captions = ["Ütők a következő meccshez", "A Budapest Padel központ", "Közösségi tér a pályák mellett", "Játék a kék pályán", "Pihenő a meccs után", "Szuperpanorámás pályák"];  const newPhotos = Array.from({ length: 37 }, (_, index) => ({
    file: `gallery-${String(index + 1).padStart(2, "0")}.webp`,
    label: `Budapest Padel galériafotó ${String(index + 1).padStart(2, "0")}`,
  }));
  return <section className="section"><div className="container">
    <SectionHeading label="Galéria" title="NÉZZ KÖRÜL NÁLUNK." description="Pályák, közös terek és a játék hangulata. Ez a Budapest Padel." />
    <div className="venue-gallery">{captions.map((caption,i)=><figure key={caption}><a href={`/images/venue-${i+1}-1920.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${caption} – nagy kép megnyitása`}><Photo id={`venue-${i+1}`} alt={caption} /></a><figcaption>0{i+1} / {caption}</figcaption></figure>)}</div>    <div className="gallery-divider"><span>ÚJ KÉPEK A BUDAPEST PADELBŐL</span></div>
    <div className="venue-gallery venue-gallery-new">{newPhotos.map((photo,index)=><figure key={photo.file}><a href={`/images/gallery/${photo.file}`} target="_blank" rel="noopener noreferrer" aria-label={`${photo.label} – nagy kép megnyitása`}><img src={`/images/gallery/${photo.file}`} alt={photo.label} loading="lazy" /></a><figcaption>{String(index + 7).padStart(2, "0")} / BUDAPEST PADEL</figcaption></figure>)}</div>
  </div></section>;
}
export function Community() {
  return (
    <section className="community section">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow dark>A pályán túl</Eyebrow>
            <h2>
              A MECCS VÉGET ÉR.
              <br />
              AZ ÉLMÉNY <span className="title-accent">marad.</span>
            </h2>
          </div>
          <TextLink href={club.instagram}>@budapest.padel</TextLink>
        </div>
        <div className="community-gallery">
          <figure>
            <div>
              <Photo
                id="venue-5"
                alt="Kanapék és pihenőtér a Budapest Padel pályái mellett"
              />
            </div>
            <figcaption>01 / MÉG EGY KIS KÖZÖS IDŐ</figcaption>
          </figure>
          <figure>
            <div>
              <Photo
                id="venue-1"
                alt="Bérelhető padelütők a Budapest Padel központban"
              />
            </div>
            <figcaption>02 / VÁLASZD KI A TÁRSAD</figcaption>
          </figure>
          <figure>
            <div>
              <Photo id="venue-3" alt="A pályák közötti közösségi tér" />
            </div>
            <figcaption>03 / TALÁLKOZUNK A PÁLYÁN</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
export function Booking() {
  return (
    <section className="booking">
      <div className="container">
        <Eyebrow dark>A következő labda a tiéd</Eyebrow>
        <div className="booking-row">
          <h2>
            KÉSZEN ÁLLSZ
            <br />A KÖVETKEZŐ
            <br />
            <span className="title-accent">meccsre?</span>
          </h2>
          <div>
            <span className="booking-arrow" aria-hidden="true">
              ↗
            </span>
            <Button className="button-dark">Foglalj pályát</Button>
            <a className="booking-phone" href={club.telephone}>
              Vagy hívj minket: {club.phone}
            </a>
            <p>Foglalás telefonon, Playtomicon vagy e-mailben.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section className="section contact" id="kapcsolat">
      <div className="container contact-grid">
        <div>
          <Eyebrow dark>Budapest · XVI. kerület</Eyebrow>
          <h2>
            ITT
            <br />
            <span className="title-accent">találkozunk.</span>
          </h2>
          <div className="contact-list">
            <a href={club.directions}>
              <MapPin size={20} />
              <span>
                {club.address}
                <small>Útvonaltervezés ↗</small>
              </span>
            </a>
            <div>
              <Clock size={20} />
              <span>{club.hours}</span>
            </div>
            <a href={club.telephone}>
              <Phone size={20} />
              <span>{club.phone}</span>
            </a>
            <a href={`mailto:${club.email}`}>
              <Mail size={20} />
              <span>{club.email}</span>
            </a>
          </div>
        </div>
        <div className="location-panel">
          <Photo
            id="venue-3"
            alt="A Budapest Padel központ pályái és pihenőtere"
          />
          <div>
            <span>BUDAPEST PADEL</span>
            <h3>
              Kövirózsa utca.
              <br />A játékhoz vezető út.
            </h3>
            <Button href={club.directions}>Útvonaltervezés</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
