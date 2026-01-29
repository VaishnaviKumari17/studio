export type User = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
};

export type Team = {
  id: string;
  name: "Chennai Super Kings" | "Mumbai Indians" | "Royal Challengers Bangalore" | "Kolkata Knight Riders" | "Sunrisers Hyderabad" | "Punjab Kings" | "Rajasthan Royals" | "Delhi Capitals";
  shortName: "CSK" | "MI" | "RCB" | "KKR" | "SRH" | "PBKS" | "RR" | "DC";
  logoUrl: string;
  logoHint: string;
};

export type Player = {
  id: string;
  name: string;
  teamId: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder';
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    strikeRate: number;
  };
};

export type Match = {
  id: string;
  season: number;
  date: string;
  team1Id: string;
  team2Id: string;
  winnerId: string;
  venue: string;
  result: string; // e.g., "CSK won by 27 runs"
};
