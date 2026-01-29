import { PageHeader } from '@/components/page-header';
import { teams, matches } from '@/lib/data';
import { TeamCard } from '@/components/team-card';

export default function TeamsPage() {
  const teamsWithStats = teams.map((team) => {
    const wins = matches.filter((m) => m.winnerId === team.id).length;
    const totalMatches = matches.filter(
      (m) => m.team1Id === team.id || m.team2Id === team.id
    ).length;
    return { ...team, wins, totalMatches };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teams"
        description="Explore all the teams competing in the IPL."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamsWithStats.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
