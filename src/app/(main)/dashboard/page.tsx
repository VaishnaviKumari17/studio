import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { TeamCharts } from '@/components/dashboard/team-charts';
import { matches, players, teams } from '@/lib/data';
import { Table2, Users } from 'lucide-react';
import { CricketBatBallIcon } from '@/components/icons/cricket-bat-ball';
import { WicketIcon } from '@/components/icons/wicket';

export default function DashboardPage() {
  const totalMatches = matches.length;
  const totalTeams = teams.length;

  const topScorer = players.reduce((prev, current) => 
    (prev.stats.runs > current.stats.runs) ? prev : current
  );

  const topWicketTaker = players.reduce((prev, current) => 
    (prev.stats.wickets > current.stats.wickets) ? prev : current
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="An overview of the IPL data, stats and more."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Matches"
          value={totalMatches.toString()}
          icon={<Table2 className="h-5 w-5" />}
        />
        <StatCard
          title="Total Teams"
          value={totalTeams.toString()}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Top Run Scorer"
          value={topScorer.name}
          description={`${topScorer.stats.runs} Runs`}
          icon={<CricketBatBallIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Top Wicket Taker"
          value={topWicketTaker.name}
          description={`${topWicketTaker.stats.wickets} Wickets`}
          icon={<WicketIcon className="h-5 w-5" />}
        />
      </div>
      <TeamCharts />
    </div>
  );
}
