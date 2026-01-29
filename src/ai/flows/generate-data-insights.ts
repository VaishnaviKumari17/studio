'use server';

/**
 * @fileOverview A data insights AI agent that identifies and presents interesting correlations within the IPL data.
 *
 * - generateDataInsights - A function that handles the data insights generation process.
 * - GenerateDataInsightsInput - The input type for the generateDataInsights function.
 * - GenerateDataInsightsOutput - The return type for the generateDataInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDataInsightsInputSchema = z.object({
  iplDataSummary: z
    .string()
    .describe("A summary of the IPL data, including match results, team statistics, and player performances."),
});
export type GenerateDataInsightsInput = z.infer<typeof GenerateDataInsightsInputSchema>;

const GenerateDataInsightsOutputSchema = z.object({
  insights: z.array(z.string()).describe("A list of interesting correlations and insights found within the IPL data."),
});
export type GenerateDataInsightsOutput = z.infer<typeof GenerateDataInsightsOutputSchema>;

export async function generateDataInsights(input: GenerateDataInsightsInput): Promise<GenerateDataInsightsOutput> {
  return generateDataInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDataInsightsPrompt',
  input: {schema: GenerateDataInsightsInputSchema},
  output: {schema: GenerateDataInsightsOutputSchema},
  prompt: `You are an expert sports data analyst specializing in the Indian Premier League (IPL).

You will analyze the provided IPL data summary to identify interesting correlations and insights, such as the impact of weather conditions on match scores, the performance of specific players under pressure, or the strategic advantages of certain teams based on their player composition.

Use statistical tools and reasoning to determine these correlations. Present your findings as a list of insights.

IPL Data Summary: {{{iplDataSummary}}}`,
});

const generateDataInsightsFlow = ai.defineFlow(
  {
    name: 'generateDataInsightsFlow',
    inputSchema: GenerateDataInsightsInputSchema,
    outputSchema: GenerateDataInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
