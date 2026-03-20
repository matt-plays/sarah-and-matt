export interface HeroContent {
  name1Full: string;
  name2Full: string;
  date: string;
  year: string;
  time1: string;
  time2: string;
  venue: string;
  address: string;
  city: string;
  website: string;
}

export interface StoryCard {
  id: string;
  year: string;
  heading: string;
  body: string;
}

export interface CelebrationEvent {
  time: string;
  label: string;
}

export interface InfoRowData {
  icon: string;
  label: string;
  body: string;
}

export interface CelebrationContent {
  heading: string;
  description: string;
  events: CelebrationEvent[];
  eventDetails: string;
  infoRows: InfoRowData[];
  rsvpUrl: string;
  venueUrl: string;
  mainImage: string;
  overlayImage: string;
}

export interface TravelContent {
  heading: string;
  body: string;
}

export interface TravelCard {
  overline: string;
  heading: string;
  body: string;
}

export interface RSVPContent {
  heading: string;
  body: string;
  deadline: string;
  url: string;
}

export interface RegistryItem {
  name: string;
  url: string;
  description: string;
}

export interface RegistryContent {
  heading: string;
  subheading: string;
  body: string;
  viewAllUrl: string;
  items: RegistryItem[];
  photo: string;
}

export interface FooterContent {
  names: string;
  date: string;
}

export interface SiteContent {
  hero: HeroContent;
  story: StoryCard[];
  marquee: { text: string };
  celebration: CelebrationContent;
  travel: TravelContent;
  whereToStay: TravelCard[];
  whereToEat: TravelCard[];
  activities: TravelCard[];
  rsvp: RSVPContent;
  registry: RegistryContent;
  footer: FooterContent;
}

export interface HistorySnapshot {
  id: string;
  timestamp: string;
  label: string;
  content: SiteContent;
}
