export const club = {
  name: "Budapest Padel",
  phone: "+36 70 554 0071",
  telephone: "tel:+36705540071",
  email: "budapestpadel@gmail.com",
  address: "1163 Budapest, Kövirózsa utca",
  hours: "Minden nap 08:00–23:00",
  instagram: "https://www.instagram.com/budapest.padel/",
  facebook: "https://www.facebook.com/profile.php?id=61560023067550",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Budapest+Padel+1163+Budapest+K%C3%B6vir%C3%B3zsa+utca",
};
export const BOOKING_URL = "https://playtomic.com/clubs/budapest-padel";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://budapestpadel.hu";
export const navigation = [
  { href: "/rolunk/", label: "A központról" },
  { href: "/palyak/", label: "Pályák" },
  { href: "/ghost-padel/", label: "Ghost Padel" },
  { href: "/araink/", label: "Áraink" },
  { href: "/galeria/", label: "Galéria" },
  { href: "/kapcsolat/", label: "Kapcsolat" },
];
export const legalNavigation = [
  { href: "/impresszum/", label: "Impresszum" },
  { href: "/adatkezelesi-tajekoztato/", label: "Adatkezelési tájékoztató" },
  { href: "/hazirend/", label: "Házirend" },
];
export const facilities = [
  {
    title: "Ütőbérlés",
    description:
      "Nincs saját ütőd? Bérelj egyet a recepción, és indulhat a játék.",
    icon: "racket",
  },
  {
    title: "Labdavásárlás",
    description: "A következő meccshez a labdákat is beszerezheted nálunk.",
    icon: "ball",
  },
  {
    title: "Öltözők és zuhanyzók",
    description:
      "Külön női és férfi öltözők, hogy kényelmesen készülhess a meccsre.",
    icon: "shower",
  },
  {
    title: "Kódos szekrények",
    description: "Tedd el a holmidat, és figyelj a következő labdamenetre.",
    icon: "lock",
  },
  {
    title: "Ingyenes parkolás",
    description: "Autóval érkezel? A központnál ingyenes parkolási lehetőség vár.",
    icon: "car",
  },
  {
    title: "Bár és közösségi tér",
    description:
      "Maradj még egy kicsit. A meccs utáni beszélgetésnek is van helye.",
    icon: "coffee",
  },
] as const;
