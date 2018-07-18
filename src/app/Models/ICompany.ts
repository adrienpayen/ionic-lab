export interface ICompany {
  name: string;
  founder: string;
  founded: string;
  employees: number;
  vehicles: number;
  launch_sites: number;
  test_sites: number;
  ceo: string;
  cto: string;
  coo: string;
  cto_propulsion: string;
  valuation: string;
  headquarters: Iheadquarters;
  summary: string;
}

export interface Iheadquarters {
  address: string;
  city: string;
  state: string;
}

export interface ICompanyHistory {
  event: HistoricEvent;
}

export interface HistoricEvent {
  title: string;
  event_date_utc: string;
  event_date_unix: string;
  flight_number?: string;
  details: string;
  links: Links;
}

export interface Links {
  reddit: string;
  article: string;
  wikipedia: string;
}