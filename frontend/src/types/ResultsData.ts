export interface ResultData {
    id: string;
    sessionId: string;
    userId: string;       
    question: string;
    answer: string;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    tone: string[];
    scores: {
      clarity: number;
      relevance: number;
      confidence: number;
    };
    createdat: string;
    updatedat: string | null;
    deletedat: string | null;
}