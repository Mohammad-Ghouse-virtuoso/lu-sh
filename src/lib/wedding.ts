export const WEDDING = {
  groom: {
    fullName: "Shaik Mohammad Lukhman-E-Hayath",
    shortName: "Lukhman",
    designation: "MCA, Manager in Energy India",
  },
  bride: {
    fullName: "Shaik Shaheen Banu",
    shortName: "Shaheen",
    designation: "Alimah",
  },
  parents: "Mr. & Mrs. Shaik Shaiksha Vali",
  /** Father of the groom (host) */
  parentsDesignation: "Muazzin Sahab, Mominabad Masjid, Guntakal",
  contacts: ["7569678692", "7670978692", "9959995847"],
  blessingHeading: "UNDER THE BLESSINGS OF AQTAAB-E-VELLORE",
  blessingSubheading: "BUJURGAAN-E-DEEN",
  openingBlessing: {
    line1: 'In the name of "ALLAH"',
    line2: "the most Beneficent & Merciful",
  },
  invitationText: [
    "With joyful hearts, we request the honour",
    "of your presence and blessings at the",
    "wedding ceremony of our beloved son",
  ],
  event: {
    title: "DAWAT-E-VALIMA",
    dateDisplay: "31 AUGUST 2026",
    day: "MONDAY",
    time: "1:00 PM",
    islamicDate: "17th Rabi-ul-Awwal, 1448 Hijri",
    /** Asia/Kolkata wall time */
    isoLocal: "2026-08-31T13:00:00+05:30",
  },
  venue: {
    name: "MASTAN VALI FUNCTION HALL",
    lines: ["Bellary Road,", "Petrol Bunk (Backside),", "Guntakal"],
    mapsUrl:
      "https://www.google.com/maps/place/Hazarath+mastan+vali+function+hall,+Backside+devi+devendra+petrol+pump,+Ballari+-+Nellore+Rd,+Donimukkala,+Guntakal,+Andhra+Pradesh+515803/data=!4m2!3m1!1s0x3bb6e539b4664ff5:0xa1af5d60aed48c67",
  },
  gallery: [
    {
      src: "/wedding/gallery/01-masjid-day.jpg",
      alt: "A peaceful moment before the Prophet's Mosque",
    },
    {
      src: "/wedding/gallery/02-nikah.jpg",
      alt: "Hands joined in Nikah under the blessings of the Quran",
    },
    {
      src: "/wedding/gallery/03-quran.jpg",
      alt: "United under the blessings of the Quran",
    },
    {
      src: "/wedding/gallery/04-masjid-dusk.jpg",
      alt: "Walking forward together in Allah's mercy",
    },
  ],
  closing: {
    complimentsFrom: "WITH BEST COMPLIMENTS FROM",
    relatives: "Near & Dear",
    giftNote:
      "Your presence is the greatest gift we could hope to receive. Kindly bring no gifts — your prayers and blessings are gift enough.",
  },
  scratch: {
    tease: "A SPECIAL DATE",
    teaseSub: "AWAITS...",
    hint: "SCRATCH HERE",
  },
  countdownLabel: "COUNTING DOWN TO THE CELEBRATION",
  celebrationBegun: "THE CELEBRATION HAS BEGUN",
  tapToOpen: "TAP TO OPEN",
} as const;

export type WeddingConfig = typeof WEDDING;
