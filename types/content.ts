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

export interface RichTextSegment {
  text: string;
  href?: string;
}

export interface InfoRowData {
  icon: string;
  label: string;
  body: string;
  bodySegments?: RichTextSegment[];
}

export interface CelebrationContent {
  heading: string;
  description: string;
  events: CelebrationEvent[];
  infoRows: InfoRowData[];
  rsvpUrl: string;
  venueUrl: string;
  mainImage: string;
  overlayImage: string;
}

export interface TravelContent {
  heading: string;
  body: string;
  whereToStayFineprint: string;
  whereToStayFineprintSegments?: RichTextSegment[];
}

export interface TravelCard {
  overline: string;
  heading: string;
  body: string;
  link?: string;
}

export interface RSVPContent {
  body: string;
  url: string;
}

export interface RegistryItem {
  name: string;
  url: string;
  description: string;
}

export interface RegistryContent {
  heading: string;
  body: string;
  viewAllUrl: string;
  items: RegistryItem[];
  photo: string;
}

export interface ColophonContent {
  definition: string;
  para1: string;
  para2: string;
  para2Segments?: RichTextSegment[];
  para3: string;
  para3Segments?: RichTextSegment[];
  para4: string;
  para4Segments?: RichTextSegment[];
}

export interface SiteContent {
  story: StoryCard[];
  marquee: { text: string };
  celebration: CelebrationContent;
  travel: TravelContent;
  whereToStay: TravelCard[];
  whereToEat: TravelCard[];
  activities: TravelCard[];
  rsvp: RSVPContent;
  registry: RegistryContent;
  colophon: ColophonContent;
}

export interface HistorySnapshot {
  id: string;
  timestamp: string;
  label: string;
  content: SiteContent;
}
