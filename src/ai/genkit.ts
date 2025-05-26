import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkitNext} from '@genkit-ai/next'; // Import the Next.js plugin for Genkit

export const ai = genkit({
  plugins: [
    googleAI(),
    genkitNext(), // Add the Next.js plugin
  ],
  model: 'googleai/gemini-2.0-flash',
});
