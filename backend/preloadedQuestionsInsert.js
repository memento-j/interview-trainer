import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);

const preloadedQuestions = [
    //35 behavioral questions
    { question: "Tell me about yourself", category: "behavioral", role: null },
    { question: "How will your skills contribute to our company's growth?", category: "behavioral", role: null },
    { question: "What is one weakness you're trying to improve?", category: "behavioral", role: null },
    { question: "How would your coworkers describe you?", category: "behavioral", role: null },
    { question: "What kind of personal projects are you working on currently?", category: "behavioral", role: null },
    { question: "Tell me about a time when you were asked to do something you had never done before. How did you react? What did you learn?", category: "behavioral", role: null },
    { question: "Describe a situation in which you embraced a new system, process, technology, or idea at work that was a major departure from the old way of doing things.", category: "behavioral", role: null},
    { question: "Recall a time when you were assigned a task outside of your job description. How did you handle the situation? What was the outcome?", category: "behavioral", role: null },
    { question: "Tell me about the biggest change you've had to deal with? How did you adapt to that change? ", category: "behavioral", role: null },
    { question: "Tell me about a time when you had to adjust to a colleague’s working style in order to complete a project or achieve your outcomes.", category: "behavioral", role: null },
    { question: "What are the three things that are most important to you in a job?", category: "behavioral", role: null },
    { question: "Tell me about a time in the last week when you’ve been satisfied, energized, and productive at work. What were you doing?", category: "behavioral", role: null },
    { question: "What’s the most interesting thing about you that’s not on your resume?", category: "behavioral", role: null },
    { question: "What would make you choose our company over others?", category: "behavioral", role: null },
    { question: "What’s the biggest misconception your coworkers have about you, and why do they think that?", category: "behavioral", role: null },
    { question: "Give an example of when you had to work with someone who was difficult to get along with. How did you handle interactions with that person?", category: "behavioral", role: null },
    { question: "Tell me about a time when you were communicating with someone and they did not understand you. What did you do?", category: "behavioral", role: null },
    { question: "Tell me about one of your favorite experiences working with a team and the contributions you made.", category: "behavioral", role: null },
    { question: "Describe the best partner or supervisor you’ve worked with. What part of their management style appealed to you?", category: "behavioral", role: null },
    { question: "Can you share an experience where a project dramatically shifted direction at the last minute? What did you do?", category: "behavioral", role: null },
    { question: "Tell me about the last time something significant didn’t go according to plan at work. What was your role? What was the outcome?", category: "behavioral", role: null },
    { question: "Describe a situation where you needed to persuade someone to see things your way. What steps did you take? What were the results?", category: "behavioral", role: null },
    { question: "Tell me about a time when you led by example. What did you do and how did others react?", category: "behavioral", role: null },
    { question: "Tell me about the toughest decision you had to make in the last six months.", category: "behavioral", role: null },
    { question: "Recall a time when your manager was unavailable when a problem arose. How did you handle the situation? Who did you consult with?", category: "behavioral", role: null },
    { question: "Describe a time when you volunteered to expand your knowledge at work, as opposed to being directed to do so.", category: "behavioral", role: null },
    { question: "What would motivate you to make a move from your current role?", category: "behavioral", role: null },
    { question: "When was the last time you asked for direct feedback from a superior? Why?", category: "behavioral", role: null },
    { question: "Have you ever had to “sell” an idea to your coworkers or group? How did you do it? What were the results?", category: "behavioral", role: null },
    { question: "What’s the biggest career goal you’ve achieved?", category: "behavioral", role: null },
    { question: "Tell me about a time when you had to juggle several projects at the same time. How did you organize your time? What was the result?", category: "behavioral", role: null },
    { question: "Tell me about a project that you planned. How did you organize and schedule the tasks?", category: "behavioral", role: null },
    { question: "Describe a time when you felt stressed or overwhelmed. How did you handle it?", category: "behavioral", role: null },
    { question: "Give an example of a time when you delegated an important task successfully.", category: "behavioral", role: null },
    { question: "How do you determine what amount of time is reasonable for a task?", category: "behavioral", role: null },
    //behavioral questions specifically for developers
    { question: "What project are you currently working on?", category: "behavioral", role: "software developer" },
    { question: "What is the most challenging aspect of your current project?", category: "behavioral", role: "software developer" },
    { question: "What was the most difficult bug that you fixed in the past 6 months?", category: "behavioral", role: "software developer" },
    { question: "How do you tackle challenges? Name a difficult challenge you faced while working on a project, how you overcame it, and what you learned.", category: "behavioral", role: "software developer" },
    { question: "Imagine it is your first day here at the company. What do you want to work on? What features would you improve on?", category: "behavioral", role: "software developer" },
    { question: "What are the most interesting projects you have worked on and how might they be relevant to this company's environment?", category: "behavioral", role: "software developer" },
    { question: "Talk about a project you are most passionate about, or one where you did your best work.", category: "behavioral", role: "software developer" },
    { question: "What is the most constructive feedback you have received in your career?", category: "behavioral", role: "software developer" },
    { question: "What is something you had to persevere at for multiple months?", category: "behavioral", role: "software developer" },
    { question: "Time management has become a necessary factor in productivity. Give an example of a time-management skill you've learned and applied at work.", category: "behavioral", role: "software developer" },
    { question: "Tell me why you will be a good fit for the position.", category: "behavioral", role: "software developer" },
    { question: "What aspects of your work are most often criticized?", category: "behavioral", role: "software developer" },
    { question: "What would you hope to achieve in the first six months after being hired?", category: "behavioral", role: "software developer" },
];

async function seedQuestions() {
  const { data, error } = await supabase
    .from('preloaded_questions')
    .insert(preloadedQuestions);

  if (error) {
    console.error(error);
  }
  else {
    console.log('Questions inserted');
  }
}

seedQuestions();