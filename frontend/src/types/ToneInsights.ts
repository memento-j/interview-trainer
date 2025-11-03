export interface ToneInsights {
    mostCommonTone: string;
    mostCommonCount: number;
    frequencies: Record<string, number>;
}