import { type OverallAverages } from "./OverallAverages";
import { type ToneInsights } from "./ToneInsights";

export interface UserAnalysis {
    totalSessions: number;
    totalAnswers: number;
    overallAverages: OverallAverages;
    toneInsights: ToneInsights;
    mostCommonStrengths: string[];
    mostCommonWeaknesses: string[];
    suggestions: string[];
}