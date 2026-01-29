'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { teams as allTeams, players, matches } from '@/lib/data';

const teamWins = allTeams.map((team) => ({
  team: team.shortName,
  wins: matches.filter((match) => match.winnerId === team.id).length,
}));

const teamRuns = allTeams.map((team) => {
    const teamPlayers = players.filter(p => p.teamId === team.id);
    const totalRuns = teamPlayers.reduce((acc, player) => acc + player.stats.runs, 0);
    return {
        team: team.shortName,
        runs: totalRuns,
    };
});

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function TeamCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Wins per Team</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={teamWins} dataKey="wins" nameKey="team" innerRadius={60} outerRadius={80}>
                   {teamWins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Runs per Team</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ runs: { label: 'Runs' } }} className="h-64 w-full">
            <BarChart
              data={teamRuns}
              layout="vertical"
              margin={{ left: 10, right: 30 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="team"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <XAxis dataKey="runs" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="runs" fill="hsl(var(--chart-1))" radius={5}>
                <LabelList dataKey="runs" position="right" offset={8} className="fill-foreground" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
