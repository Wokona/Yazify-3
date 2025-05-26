
'use server';
/**
 * @fileOverview AI flow to analyze study preferences and provide insights.
 *
 * - analyzeStudySchedule - Analyzes study preferences and provides insights.
 * - StudyScheduleAnalysisInput - Input for the analyzeStudySchedule function.
 * - StudyScheduleAnalysisOutput - Output for the analyzeStudySchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Schema is defined internally in the form component and not exported here.
// The 'StudyScheduleAnalysisInput' type is still exported for use in the function signature.
const StudyScheduleAnalysisInputSchema = z.object({
  peakFocusTime: z
    .enum(['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)', 'Night (10pm onwards)'])
    .describe('The time of day when the user generally feels most focused.'),
  lowFocusTime: z
    .enum(['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)', 'Night (10pm onwards)', 'Varies'])
    .describe('The time of day when the user generally feels least focused or energy dips.'),
  challengingSubjects: z
    .string()
    .optional()
    .describe('A comma-separated list of subjects the user finds most challenging.'),
  easySubjects: z
    .string()
    .optional()
    .describe('A comma-separated list of subjects the user finds easiest.'),
  typicalSessionDuration: z
    .enum(['Less than 30 min', '30-60 min', '1-2 hours', 'More than 2 hours'])
    .describe('The typical length of a study session for the user.'),
  postSessionFeeling: z
    .enum(['Generally Focused', 'Often Tired', 'Usually Energized', 'Often Drained', 'It Varies'])
    .optional()
    .describe('How the user typically feels after a long study session.'),
});
export type StudyScheduleAnalysisInput = z.infer<typeof StudyScheduleAnalysisInputSchema>;

const StudyScheduleAnalysisOutputSchema = z.object({
  optimalStudyTimes: z
    .string()
    .describe('Recommended optimal times for studying based on reported focus and energy levels, considering both peak and low focus periods.'),
  subjectSpecificStrategies: z
    .string()
    .describe('Recommendations for approaching challenging subjects (e.g., study methods, timing, breaking down material) and leveraging easy subjects for balance and momentum.'),
  loadBalancingSuggestions: z
    .string()
    .describe('Suggestions for session length, break frequency (e.g., Pomodoro-like intervals if applicable), and avoiding burnout, based on typical duration, post-session feeling, and focus patterns.'),
  insights: z
    .string()
    .describe('Overall insights into study habits and potential improvements for efficiency and well-being based on the provided preferences. Focus on actionable advice.'),
});
export type StudyScheduleAnalysisOutput = z.infer<typeof StudyScheduleAnalysisOutputSchema>;

export async function analyzeStudySchedule(
  input: StudyScheduleAnalysisInput
): Promise<StudyScheduleAnalysisOutput> {
  return analyzeStudyScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyScheduleAnalysisPrompt',
  input: {schema: StudyScheduleAnalysisInputSchema},
  output: {schema: StudyScheduleAnalysisOutputSchema},
  prompt: `You are an AI study assistant. Based on the student's reported preferences, provide insights on optimal study times, subject-specific strategies, load balancing, and overall improvements for learning efficiency and well-being. Focus on practical and actionable advice.

Student Preferences:
- Peak Focus Time: {{{peakFocusTime}}}
- Low Focus Time: {{{lowFocusTime}}}
{{#if challengingSubjects}}
- Challenging Subjects: {{{challengingSubjects}}}
{{/if}}
{{#if easySubjects}}
- Easy Subjects: {{{easySubjects}}}
{{/if}}
- Typical Session Duration: {{{typicalSessionDuration}}}
{{#if postSessionFeeling}}
- Feeling After Long Session: {{{postSessionFeeling}}}
{{/if}}

Provide your analysis in a structured format, covering:
1.  **Optimal Study Times:**
    - Based on reported peak and low focus times.
    - If peak and low focus times are the same or overlap significantly, acknowledge this and discuss implications, perhaps suggesting varied approaches during those times.
    - Suggest allocating demanding tasks to peak focus times and less demanding tasks or breaks to low focus times.

2.  **Subject-Specific Strategies:**
    - For challenging subjects (if provided): Suggest strategies like breaking them down into smaller, more manageable parts. Recommend identifying and reviewing foundational concepts first if appropriate for the subject type. Suggest active learning techniques like practice testing or self-explanation. Consider if these subjects are best tackled during peak focus times.
    - For easy subjects (if provided): Suggest how to leverage them (e.g., for lighter work during low focus times, to build momentum before tackling harder subjects, or for quick wins to boost confidence).

3.  **Load Balancing Suggestions:**
    - Based on typical session duration, post-session feeling, and focus patterns.
    - If typical sessions are long and post-session feeling is 'Often Tired' or 'Often Drained', strongly suggest shorter, more focused sessions (e.g., 25-50 minute blocks like the Pomodoro technique) with frequent short breaks (e.g., 5-10 minutes).
    - Recommend alternating between demanding and less demanding subjects or tasks to prevent cognitive fatigue.
    - If 'Varies' is selected for low focus or post-session feeling, acknowledge this variability and advise the student to pay close attention to their body's signals to adjust breaks and session lengths dynamically.
    - Emphasize the importance of breaks for cognitive recovery and maintaining overall well-being.

4.  **Overall Insights & Recommendations:**
    - Summarize key observations from the preferences.
    - Provide actionable tips to improve study habits and efficiency, considering both performance and mental well-being. Ensure recommendations are practical and easy to implement.
    - Reinforce the idea of adapting strategies based on personal experience and continuous self-reflection.
`,
});

const analyzeStudyScheduleFlow = ai.defineFlow(
  {
    name: 'analyzeStudyScheduleFlow',
    inputSchema: StudyScheduleAnalysisInputSchema, // Still uses the internal schema definition for the flow
    outputSchema: StudyScheduleAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
