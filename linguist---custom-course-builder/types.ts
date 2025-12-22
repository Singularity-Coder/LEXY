
export type ExerciseType = 'multiple-choice' | 'audio-match' | 'video-lesson' | 'text-translate' | 'word-sort' | 'speech-check';

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  answer: string;
  mediaPath?: string;
  explanation?: string;
  wordBank?: string[]; 
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  status: 'locked' | 'available' | 'completed';
}

export interface Unit {
  id: string;
  title: string;
  color: string;
  lessons: Lesson[];
  level?: ProficiencyLevel;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  translation: string;
  definition?: string;
  example?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  content: string;
  examples: string[];
}

export interface CourseData {
  id: string;
  courseTitle: string;
  language: string;
  units: Unit[];
  dictionary?: DictionaryEntry[];
  grammar?: GrammarLesson[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  currentValue: number;
  unlocked: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  proficiencyLevel: ProficiencyLevel;
  streak: number;
  hearts: number;
  gems: number;
  lastActiveDate: string;
  achievements: Achievement[];
  failedExercises: Exercise[];
  savedWordIds: Record<string, string[]>; // Map of language -> array of word IDs
  currentCourseId: string;
}
