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
      structure: number;
      impact: number;
      conciseness: number;
    };
    scoresSummary: string;
    deliveryTone: {
      positive: number,
      neutral: number,
      negative: number,
      summary: string
    };
    skillsDetected: string[];
    averageScore: number;
    overallSummary: string;
    createdat: string;
    updatedat: string | null;
    deletedat: string | null;
}