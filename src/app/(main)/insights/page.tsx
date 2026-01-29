'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateDataInsights } from '@/ai/flows/generate-data-insights';
import { players, teams, matches } from '@/lib/data';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function InsightsPage() {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);
    setInsights([]);

    try {
      // Create a comprehensive summary of the IPL data.
      const iplDataSummary = `
        IPL Data Summary:
        - Total Teams: ${teams.length}
        - Total Players: ${players.length}
        - Total Matches in dataset: ${matches.length}
        
        Sample Data:
        - A few teams: ${JSON.stringify(teams.slice(0, 2), null, 2)}
        - A few players: ${JSON.stringify(players.slice(0, 3), null, 2)}
        - A few matches: ${JSON.stringify(matches.slice(0, 2), null, 2)}
        
        The goal is to find interesting correlations and insights from this dataset. 
        For example, does winning the toss impact match results? 
        Are there players who perform exceptionally well at specific venues?
        Do some teams have a significant advantage over others?
      `;

      const result = await generateDataInsights({ iplDataSummary });
      if (result.insights) {
        setInsights(result.insights);
      } else {
        setError('The AI could not generate any insights. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating insights. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Insights"
        description="Discover interesting correlations and insights from the IPL data using AI."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="h-6 w-6" />
            Generate New Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4">
            <p className="text-muted-foreground">
              Click the button below to ask our AI data analyst to find interesting patterns in the IPL data.
              This may take a few moments.
            </p>
            <Button onClick={handleGenerateInsights} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <p className="text-card-foreground">{insight}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
