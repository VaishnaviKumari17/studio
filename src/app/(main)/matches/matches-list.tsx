'use client';

import { useState, useMemo } from 'react';
import type { Team } from '@/types';
import { type MatchWithTeams } from './page';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const PAGE_SIZE = 10;

export function MatchesList({ matches, teams }: { matches: MatchWithTeams[], teams: Team[] }) {
  const [search, setSearch] = useState('');
  const [season, setSeason] = useState('all');
  const [team, setTeam] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof MatchWithTeams; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const seasons = useMemo(() => ['all', ...Array.from(new Set(matches.map((m) => m.season.toString())))], [matches]);

  const filteredMatches = useMemo(() => {
    let filtered = matches;

    if (search) {
      filtered = filtered.filter(m =>
        m.venue.toLowerCase().includes(search.toLowerCase()) ||
        m.team1.name.toLowerCase().includes(search.toLowerCase()) ||
        m.team2.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (season !== 'all') {
      filtered = filtered.filter(m => m.season.toString() === season);
    }

    if (team !== 'all') {
      filtered = filtered.filter(m => m.team1Id === team || m.team2Id === team);
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [matches, search, season, team, sortConfig]);
  
  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredMatches.slice(start, end);
  }, [filteredMatches, currentPage]);

  const totalPages = Math.ceil(filteredMatches.length / PAGE_SIZE);

  const requestSort = (key: keyof MatchWithTeams) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <Card>
      <div className="flex flex-wrap items-center gap-4 p-4 border-b">
        <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search by venue or team..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div className="flex gap-4">
            <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                    {seasons.map((s) => (
                        <SelectItem key={s} value={s}>{s === 'all' ? 'All Seasons' : s}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={team} onValueChange={setTeam}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map((t) => (
                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teams</TableHead>
              <TableHead>Winner</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('date')}>
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Venue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMatches.length > 0 ? (
                paginatedMatches.map((match) => (
                    <TableRow key={match.id}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Image src={match.team1.logoUrl} alt={match.team1.name} width={24} height={24} className="rounded-full" data-ai-hint={match.team1.logoHint} />
                                <span className="font-medium">{match.team1.shortName}</span>
                                <span className="text-muted-foreground">vs</span>
                                <Image src={match.team2.logoUrl} alt={match.team2.name} width={24} height={24} className="rounded-full" data-ai-hint={match.team2.logoHint} />
                                <span className="font-medium">{match.team2.shortName}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            {match.winner ? (
                                <div className="flex items-center gap-2">
                                    <Image src={match.winner.logoUrl} alt={match.winner.name} width={24} height={24} className="rounded-full" data-ai-hint={match.winner.logoHint} />
                                    <span className="font-medium">{match.winner.shortName}</span>
                                </div>
                            ) : 'N/A'}
                        </TableCell>
                        <TableCell>{match.result}</TableCell>
                        <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                        <TableCell>{match.venue}</TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        No matches found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </Card>
  );
}
