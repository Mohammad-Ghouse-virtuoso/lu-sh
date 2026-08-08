export const WEDDING = {
  groom: {
    fullName: "Shaik Mohammad Lukhman-E-Hayath",
    shortName: "Lukhman",
  },
  bride: {
    fullName: "Shaik Shaheen Banu",
    shortName: "Shaheen",
  },
  parents: "Mr. & Mrs. Shaik Shaiksha Vali",
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
  closing: {
    complimentsFrom: "WITH BEST COMPLIMENTS FROM",
    relatives: "ALL RELATIVES & FRIENDS",
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
