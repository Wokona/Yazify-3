
'use server';

/**
 * @fileOverview Provides personalized study schedule recommendations based on user patterns and preferences.
 *
 * - personalizedRecommendations - A function that generates personalized study schedule recommendations.
 * - PersonalizedRecommendationsInput - The input type for the personalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the personalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  studyHabits: z
    .string()
    .describe(
      'A detailed description of the user’s study habits, including preferred study times, subjects, perceived difficulty of subjects, and methods.'
    ),
  wellnessData: z
    .string()
    .describe(
      'Data related to the user’s wellness, including sleep patterns (e.g., average hours, quality), mood (e.g., generally good, stressed), and water intake (e.g., liters per day). This helps assess overall well-being and capacity for cognitive load.'
    ),
  energyPatterns: z
    .string()
    .optional()
    .describe(
      'User’s typical energy levels throughout the day (e.g., "High energy in mornings 9am-12pm, feel a dip mid-afternoon around 3pm, second wind in early evening 6pm-8pm"). Helps in scheduling demanding tasks during peak energy times and suggesting breaks or lighter tasks during dips.'
    ),
  schedulePreferences: z
    .string()
    .describe(
      'The user’s preferences for scheduling, including desired study duration per session, break frequency and duration (e.g., "prefer 45-min study blocks with 10-min breaks"), and preferred activities during breaks or specific times to keep free.'
    ),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  studySchedule: z.string().describe('A personalized study schedule, formatted clearly (e.g., as a list, table, or daily breakdown).'),
  recommendations: z
    .string()
    .describe(
      'Additional recommendations for balancing study time with breaks and wellness activities, including justifications for key schedule decisions and tips for maintaining focus and well-being.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function personalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized study schedule recommendations for students, optimizing for both learning efficiency and mental well-being. Your advice should be practical and actionable.

  Based on the following information about the student, create a study schedule and provide additional recommendations.

  Student Profile:
  - Study Habits: {{{studyHabits}}} (Note any subjects the student finds particularly difficult and their preferred learning methods)
  - Wellness Data: {{{wellnessData}}} (Consider how sleep, mood, and hydration might impact cognitive load and focus)
  {{#if energyPatterns}}
  - Typical Energy Patterns: {{{energyPatterns}}} (Use this to schedule demanding tasks during peak energy times and lighter work or breaks during low-energy periods)
  {{/if}}
  - Schedule Preferences: {{{schedulePreferences}}} (Pay attention to preferred session lengths, break times, and any fixed commitments)

  Your Recommendations Should:
  1.  **Align with Energy Levels & Preferences:**
      - If energy patterns are provided, schedule more demanding subjects or longer study blocks during periods the student identifies as high-energy. Schedule lighter tasks or breaks during low-energy periods.
      - Respect stated schedule preferences regarding session length and break frequency.
      - If the student prefers longer study sessions but also reports energy dips or if wellness data suggests potential fatigue, consider suggesting micro-scheduling techniques like focused work intervals (e.g., 25-45 minutes) followed by short breaks (e.g., 5-10 minutes) to maintain concentration and manage energy.

  2.  **Promote Load Balancing & Well-being:**
      - If wellness data (e.g., poor sleep, low mood, inadequate hydration) suggests potential fatigue or reduced cognitive capacity, strongly recommend shorter study sessions, more frequent breaks, or scheduling lighter cognitive tasks.
      - Advise against over-scheduling. If wellness indicators are very low, gently suggest prioritizing rest or incorporating restorative activities.
      - Integrate wellness activities (e.g., short walks, stretching, hydration reminders) into the schedule, especially aligning with preferred break activities.

  3.  **Incorporate Spaced Review (Conceptually):**
      - If the student mentions finding certain subjects difficult, suggest revisiting those challenging topics briefly a day or two after the initial study session to aid retention (e.g., "Consider a quick 15-20 minute review of [difficult subject] tomorrow or the day after to help solidify your understanding."). This is not about creating a full SRS system, but a general tip for difficult material.

  4.  **Justify Key Decisions:**
      - Briefly explain *why* certain schedule items are placed as they are, linking back to the student's input (e.g., "Your [Subject] block is scheduled for [Time] as you mentioned feeling most alert then," or "Given your preference for shorter breaks, I've added 10-minute pauses after each hour of study.").

  5.  **Emphasize Desirable Difficulty & Effective Strategies:**
      - For challenging subjects, encourage engagement by suggesting methods to break them into smaller, manageable parts or tackling them with proven study techniques mentioned in their habits. The goal is to foster a sense of progress and maintain motivation, aligning with the principle of desirable difficulty where tasks are challenging but achievable.
      - If specific study methods are mentioned (e.g., flashcards, practice problems), try to incorporate time for these activities within the schedule for relevant subjects.

  Provide the study schedule (as a list, timetable, or daily breakdown – choose a clear format) and additional recommendations in a supportive and actionable manner.
  The 'recommendations' output field should contain the justifications, conceptual advice, and wellness tips.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
