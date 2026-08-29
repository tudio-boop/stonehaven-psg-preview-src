export const OUTCOME_WORDS = [
  "CARE.",
  "SHOW UP.",
  "BUY IN.",
  "RESPOND.",
  "CHOOSE YOU.",
  "COME BACK.",
  "TAKE ACTION.",
] as const;

export type EvidenceStory = {
  id: string;
  title: string;
  client: string;
  objective: string;
  insight: string;
  move: string;
  resultLabel: string;
  resultValue: string;
  resultNote: string;
  receipt?: string;
};

/**
 * Only documented Stonehaven evidence. No invented view/ROI metrics.
 * Sources: Amazon outreach deck, sponsor spreadsheet, Eunice planning docs,
 * SOJUICE execution plan. Prior Results folders explicitly empty.
 */
export const EVIDENCE: EvidenceStory[] = [
  {
    id: "brand-rooms",
    title: "Brand rooms that ship content",
    client: "Jollibee · Virgin Plus · Miniso · Razer · Uniqlo · Shein",
    objective:
      "Put brands inside real rooms — activations that produce footage, not just logos on a wall.",
    insight:
      "Sponsors don’t buy parties. They buy audience access and content that travels after the night ends.",
    move:
      "Design sponsor-integrated activations, capture the room, and keep reel receipts on file for every partner.",
    resultLabel: "Documented partners",
    resultValue: "6+",
    resultNote:
      "Named brand activations with Instagram reel receipts retained by Stonehaven.",
    receipt: "Sponsor activation log — Eunice Birthday 2026 materials",
  },
  {
    id: "scale-shift",
    title: "From friend party to cultural property",
    client: "Unicycle’s Birthday · Eunice in Wonderland",
    objective:
      "Evolve a private birthday into an invite-only cultural night brands can own a slice of.",
    insight:
      "A 200-person $15 friend party and a 500-cap sponsored experience are different categories — the guest list is the media buy.",
    move:
      "Curate creators, build Wonderland as a content environment, and structure sponsorship around conversion — not wallpaper.",
    resultLabel: "Room scale",
    resultValue: "200→500",
    resultNote:
      "Documented shift from last year’s ~200-person ticketed friend party to a 500-capacity invite-only format.",
  },
  {
    id: "connected-room",
    title: "One room. Connected attention.",
    client: "Eunice in Wonderland · Oct 10, 2026",
    objective:
      "Gather Toronto’s social-first creators into one private basement and make the night travel beyond the venue.",
    insight:
      "Comedy, music, beauty, food, and K-pop audiences normally take separate campaigns. One curated room collapses that cost.",
    move:
      "Build the guest list as the media plan — expected attendees with 30M+ combined followers across platforms.",
    resultLabel: "Connected followers",
    resultValue: "30M+",
    resultNote:
      "Combined followers across expected attendees (outreach deck claim, qualifier retained).",
  },
  {
    id: "sojuice-launch",
    title: "Co-produced launch night",
    client: "Stonehaven × SOJUICE Canada",
    objective:
      "Co-produce a private Halloween launch with category exclusivity, controlled door, and a midnight skill moment.",
    insight:
      "Behaviour moves when the night has a reason to gather, a brand woven into the experience, and a climax people stay for.",
    move:
      "Joint venture production at 777 Richmond St. W. — tickets, VIP lounges, brand pour, and skill-based contest architecture.",
    resultLabel: "Capacity target",
    resultValue: "300",
    resultNote:
      "Documented capacity target for the Oct 25, 2025 private launch (door close 11:00pm).",
  },
];

export const METHOD_STEPS = [
  {
    id: "01",
    title: "OUTCOME",
    question: "What needs to happen?",
  },
  {
    id: "02",
    title: "UNDERSTAND",
    question: "What conditions could produce that outcome?",
  },
  {
    id: "03",
    title: "FIND",
    question: "Where do those conditions exist?",
  },
  {
    id: "04",
    title: "DESIGN",
    question: "What intervention can move behaviour?",
  },
  {
    id: "05",
    title: "EXECUTE",
    question: "Promotion. Campaign. Partnership. Media. Activation.",
  },
  {
    id: "06",
    title: "MEASURE",
    question: "Did people actually move?",
  },
] as const;

export const NAV_LINKS = [
  {
    label: "Entertainment, Events & Media",
    href: "https://stonehavenentertainment.com/entertainment",
  },
  {
    label: "Promotions, Strategy & Growth",
    href: "#promise",
    current: true,
  },
  {
    label: "Research",
    href: "https://stonehavenentertainment.com/research",
  },
  {
    label: "Ask Stonehaven",
    href: "https://stonehavenentertainment.com/ask",
  },
] as const;
