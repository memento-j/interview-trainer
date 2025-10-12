import { usePreloadedQuestions } from "@/hooks/usePreloadedQuestions";

export default function DisplayPreloadedQuestions() {
    const { data: preloadedQuestions } = usePreloadedQuestions();

    console.log(preloadedQuestions);
    
    return(
        <div>
            <p>Ego</p>
        </div>
    );
}