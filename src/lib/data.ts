import type { Team, Player, Match } from '@/types';

export const teams: Team[] = [
  { id: 'csk', name: 'Chennai Super Kings', shortName: 'CSK', logoUrl: 'https://picsum.photos/seed/csk/200/200', logoHint: 'lion logo' },
  { id: 'mi', name: 'Mumbai Indians', shortName: 'MI', logoUrl: 'https://picsum.photos/seed/mi/200/200', logoHint: 'blue gold' },
  { id: 'rcb', name: 'Royal Challengers Bangalore', shortName: 'RCB', logoUrl: 'https://picsum.photos/seed/rcb/200/200', logoHint: 'lion red' },
  { id: 'kkr', name: 'Kolkata Knight Riders', shortName: 'KKR', logoUrl: 'https://picsum.photos/seed/kkr/200/200', logoHint: 'knight helmet' },
  { id: 'srh', name: 'Sunrisers Hyderabad', shortName: 'SRH', logoUrl: 'https://picsum.photos/seed/srh/200/200', logoHint: 'eagle orange' },
  { id: 'pbks', name: 'Punjab Kings', shortName: 'PBKS', logoUrl: 'https://picsum.photos/seed/pbks/200/200', logoHint: 'lion shield' },
  { id: 'rr', name: 'Rajasthan Royals', shortName: 'RR', logoUrl: 'https://picsum.photos/seed/rr/200/200', logoHint: 'royal emblem' },
  { id: 'dc', name: 'Delhi Capitals', shortName: 'DC', logoUrl: 'https://picsum.photos/seed/dc/200/200', logoHint: 'tiger blue' },
];

export const players: Player[] = [
  // CSK
  { id: 'p1', name: 'MS Dhoni', teamId: 'csk', role: 'Batsman', stats: { matches: 250, runs: 5082, wickets: 0, average: 38.79, strikeRate: 135.92 } },
  { id: 'p2', name: 'Ravindra Jadeja', teamId: 'csk', role: 'All-rounder', stats: { matches: 226, runs: 2692, wickets: 152, average: 26.65, strikeRate: 128.96 } },
  // MI
  { id: 'p3', name: 'Rohit Sharma', teamId: 'mi', role: 'Batsman', stats: { matches: 243, runs: 6211, wickets: 1, average: 29.58, strikeRate: 130.05 } },
  { id: 'p4', name: 'Jasprit Bumrah', teamId: 'mi', role: 'Bowler', stats: { matches: 120, runs: 69, wickets: 145, average: 23.3, strikeRate: 94.52 } },
  // RCB
  { id: 'p5', name: 'Virat Kohli', teamId: 'rcb', role: 'Batsman', stats: { matches: 237, runs: 7263, wickets: 4, average: 37.25, strikeRate: 130.02 } },
  { id: 'p6', name: 'Faf du Plessis', teamId: 'rcb', role: 'Batsman', stats: { matches: 130, runs: 4133, wickets: 0, average: 36.90, strikeRate: 134.14 } },
  // KKR
  { id: 'p7', name: 'Andre Russell', teamId: 'kkr', role: 'All-rounder', stats: { matches: 112, runs: 2262, wickets: 96, average: 29.0, strikeRate: 174.0 } },
  { id: 'p8', name: 'Sunil Narine', teamId: 'kkr', role: 'Bowler', stats: { matches: 162, runs: 1046, wickets: 163, average: 25.13, strikeRate: 159.69 } },
  // SRH
  { id: 'p9', name: 'Pat Cummins', teamId: 'srh', role: 'Bowler', stats: { matches: 42, runs: 379, wickets: 45, average: 30.16, strikeRate: 140.89 } },
  // PBKS
  { id: 'p10', name: 'Shikhar Dhawan', teamId: 'pbks', role: 'Batsman', stats: { matches: 217, runs: 6617, wickets: 4, average: 35.39, strikeRate: 127.18 } },
  // RR
  { id: 'p11', name: 'Sanju Samson', teamId: 'rr', role: 'Batsman', stats: { matches: 152, runs: 3888, wickets: 0, average: 29.23, strikeRate: 137.19 } },
  // DC
  { id: 'p12', name: 'David Warner', teamId: 'dc', role: 'Batsman', stats: { matches: 176, runs: 6397, wickets: 0, average: 41.54, strikeRate: 139.92 } },
];

export const matches: Match[] = [
  { id: 'm1', season: 2023, date: '2023-03-31', team1Id: 'csk', team2Id: 'mi', winnerId: 'csk', venue: 'Wankhede Stadium, Mumbai', result: 'CSK won by 7 wickets' },
  { id: 'm2', season: 2023, date: '2023-04-01', team1Id: 'rcb', team2Id: 'kkr', winnerId: 'kkr', venue: 'Eden Gardens, Kolkata', result: 'KKR won by 81 runs' },
  { id: 'm3', season: 2023, date: '2023-04-02', team1Id: 'srh', team2Id: 'pbks', winnerId: 'srh', venue: 'Rajiv Gandhi Stadium, Hyderabad', result: 'SRH won by 8 wickets' },
  { id: 'm4', season: 2023, date: '2023-04-03', team1Id: 'rr', team2Id: 'dc', winnerId: 'rr', venue: 'Sawai Mansingh Stadium, Jaipur', result: 'RR won by 57 runs' },
  { id: 'm5', season: 2022, date: '2022-04-10', team1Id: 'csk', team2Id: 'rcb', winnerId: 'rcb', venue: 'M. Chinnaswamy Stadium, Bangalore', result: 'RCB won by 13 runs' },
  { id: 'm6', season: 2022, date: '2022-04-11', team1Id: 'mi', team2Id: 'kkr', winnerId: 'mi', venue: 'Wankhede Stadium, Mumbai', result: 'MI won by 5 wickets' },
  { id: 'm7', season: 2022, date: '2022-04-12', team1Id: 'pbks', team2Id: 'rr', winnerId: 'rr', venue: 'Sawai Mansingh Stadium, Jaipur', result: 'RR won by 6 wickets' },
  { id: 'm8', season: 2022, date: '2022-04-13', team1Id: 'dc', team2Id: 'srh', winnerId: 'dc', venue: 'Arun Jaitley Stadium, Delhi', result: 'DC won by 21 runs' },
];

export const getTeamName = (teamId: string) => teams.find(t => t.id === teamId)?.name || 'Unknown';
export const getTeamShortName = (teamId: string) => teams.find(t => t.id === teamId)?.shortName || 'UNK';
export const getTeamLogo = (teamId: string) => teams.find(t => t.id === teamId)?.logoUrl;
