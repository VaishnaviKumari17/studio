'use client';

import { useState, useMemo } from 'react';
import type { Team } from '@/types';
import { type PlayerWithTeam } from './page';
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

type SortableKeys = keyof PlayerWithTeam['stats'] | 'name';

export function PlayersList({ players, teams }: { players: PlayerWithTeam[], teams: Team[] }) {
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('all');
  const [role, setRole] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'asc' | 'desc' } | null>({ key: 'runs', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);

  const roles = useMemo(() => ['all', ...Array.from(new Set(players.map((p) => p.role)))], [players]);

  const filteredPlayers = useMemo(() => {
    let filtered = players;

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (team !== 'all') {
      filtered = filtered.filter(p => p.teamId === team);
    }

    if (role !== 'all') {
      filtered = filtered.filter(p => p.role === role);
    }
    
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = sortConfig.key === 'name' ? a.name : a.stats[sortConfig.key as keyof PlayerWithTeam['stats']];
        const bValue = sortConfig.key === 'name' ? b.name : b.stats[sortConfig.key as keyof PlayerWithTeam['stats']];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [players, search, team, role, sortConfig]);
  
  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredPlayers.slice(start, end);
  }, [filteredPlayers, currentPage]);

  const totalPages = Math.ceil(filteredPlayers.length / PAGE_SIZE);

  const requestSort = (key: SortableKeys) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };
  
  const getSortIndicator = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortConfig.direction === 'asc' ? '🔼' : '🔽';
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-4 p-4 border-b">
        <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search by player name..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
        </div>
        <div className="flex gap-4">
            <Select value={team} onValueChange={value => { setTeam(value); setCurrentPage(1); }}>
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
            <Select value={role} onValueChange={value => { setRole(value); setCurrentPage(1); }}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                    {roles.map((r) => (
                        <SelectItem key={r} value={r}>{r === 'all' ? 'All Roles' : r}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Button variant="ghost" onClick={() => requestSort('name')}>Player {getSortIndicator('name')}</Button></TableHead>
              <TableHead>Role</TableHead>
              <TableHead><Button variant="ghost" onClick={() => requestSort('matches')}>Matches {getSortIndicator('matches')}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => requestSort('runs')}>Runs {getSortIndicator('runs')}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => requestSort('wickets')}>Wickets {getSortIndicator('wickets')}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => requestSort('average')}>Average {getSortIndicator('average')}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => requestSort('strikeRate')}>Strike Rate {getSortIndicator('strikeRate')}</Button></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPlayers.length > 0 ? (
                paginatedPlayers.map((player) => (
                    <TableRow key={player.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Image src={player.team.logoUrl} alt={player.team.name} width={24} height={24} className="rounded-full" data-ai-hint={player.team.logoHint} />
                                <div className="font-medium">{player.name}</div>
                            </div>
                        </TableCell>
                        <TableCell>{player.role}</TableCell>
                        <TableCell>{player.stats.matches}</TableCell>
                        <TableCell className="font-semibold">{player.stats.runs}</TableCell>
                        <TableCell className="font-semibold">{player.stats.wickets}</TableCell>
                        <TableCell>{player.stats.average.toFixed(2)}</TableCell>
                        <TableCell>{player.stats.strikeRate.toFixed(2)}</TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={7} className="text-center h-24">
                        No players found.
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
