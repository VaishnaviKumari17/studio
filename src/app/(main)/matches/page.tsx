import { PageHeader } from '@/components/page-header';
import { matches, teams } from '@/lib/data';
import type { Match, Team } from '@/types';
import { MatchesList } from './matches-list';

export type MatchWithTeams = Match & {
  team1: Team;
  team2: Team;
  winner: Team | undefined;
};

export default function MatchesPage() {
  const matchesWithTeams: MatchWithTeams[] = matches.map((match) => {
    const team1 = teams.find((t) => t.id === match.team1Id)!;
    const team2 = teams.find((t) => t.id === match.team2Id)!;
    const winner = teams.find((t) => t.id === match.winnerId);
    return { ...match, team1, team2, winner };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Matches"
        description="Browse through all the IPL matches."
      />
      <MatchesList matches={matchesWithTeams} teams={teams} />
    </div>
  );
}
