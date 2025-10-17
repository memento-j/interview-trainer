import { create } from "zustand";

interface SessionState {
    //attribute types
    createdSessionID: string;
    setupCompleted: boolean;
    questionsSubmitted: boolean[];
    selectedPremadeQuestions: string[];
    //functionality for the store
    setCreatedSessionID: (id: string) => void;
    setSetupCompleted: (value: boolean) => void;
    setQuestionsSubmitted: (arr: boolean[]) => void;
    updateQuestionSubmitted: (index: number, value: boolean) => void;
    toggleQuestion: (question: string) =>  void;
    resetSession: () => void;
}

export const useSessionStore = create<SessionState>()(
    (set) => ({
        //default values
        createdSessionID: "",
        setupCompleted: false,
        questionsSubmitted: [],
        selectedPremadeQuestions: [],
        //actions for variables
        setCreatedSessionID: (id: string) => set({ createdSessionID: id }),
        setSetupCompleted: (value: boolean) => set({ setupCompleted: value }),
        setQuestionsSubmitted: (arr: boolean[]) => set({ questionsSubmitted: arr }),
        updateQuestionSubmitted: (index: number, value: boolean) =>
            set((state: any) => {
                const updated = [...state.questionsSubmitted];
                updated[index] = value;
                return { questionsSubmitted: updated };
            }),
        //if question is already included, then remove it, otherwise append to the array
        toggleQuestion: (question) => set((state) => ({
            selectedPremadeQuestions: state.selectedPremadeQuestions.includes(question)
            ? state.selectedPremadeQuestions.filter(q => q !== question)
            : [...state.selectedPremadeQuestions, question]
        })),        
        //sets all back to default (for creating a new intereview session)
        resetSession: () =>
            set({
                createdSessionID: "",
                setupCompleted: false,
                questionsSubmitted: [],
                selectedPremadeQuestions: []
            }),
    }),
);