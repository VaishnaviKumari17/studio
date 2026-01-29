import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Team } from '@/types';

type TeamWithStats = Team & {
  wins: number;
  totalMatches: number;
};

interface TeamCardProps {
  team: TeamWithStats;
}

export function TeamCard({ team }: TeamCardProps) {
  const winPercentage = team.totalMatches > 0 ? ((team.wins / team.totalMatches) * 100).toFixed(0) : 0;

  return (
    <Card className="shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <Image
          src={team.logoUrl}
          alt={`${team.name} logo`}
          data-ai-hint={team.logoHint}
          width={50}
          height={50}
          className="rounded-full border"
        />
        <CardTitle className="font-headline text-lg">{team.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Matches Played</span>
          <span className="font-medium">{team.totalMatches}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Wins</span>
          <span className="font-medium">{team.wins}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Win Rate</span>
          <Badge variant={parseInt(winPercentage) > 50 ? 'default' : 'secondary'}>{winPercentage}%</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
