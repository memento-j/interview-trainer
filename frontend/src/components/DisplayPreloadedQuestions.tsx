import { usePreloadedQuestions } from "@/hooks/usePreloadedQuestions";

export default function DisplayPreloadedQuestions() {
    const { data: preloadedQuestions } = usePreloadedQuestions();    

    return(
        <div>
            <p>Ego</p>
        </div>
    );
}