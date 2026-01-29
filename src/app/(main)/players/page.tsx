import { PageHeader } from '@/components/page-header';
import { players, teams } from '@/lib/data';
import type { Player, Team } from '@/types';
import { PlayersList } from './players-list';

export type PlayerWithTeam = Player & {
  team: Team;
};

export default function PlayersPage() {
  const playersWithTeam: PlayerWithTeam[] = players.map((player) => {
    const team = teams.find((t) => t.id === player.teamId)!;
    return { ...player, team };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Players"
        description="Browse statistics for all IPL players."
      />
      <PlayersList players={playersWithTeam} teams={teams} />
    </div>
  );
}
