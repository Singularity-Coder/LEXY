
import { CourseData, ProficiencyLevel } from './types';

export const COLORS = {
  primary: '#58cc02',
  primaryDark: '#46a302',
  secondary: '#1cb0f6',
  accent: '#ffc800',
  error: '#ff4b4b',
  text: '#4b4b4b',
  border: '#e5e5e5',
};

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export interface LevelInfo {
  level: ProficiencyLevel;
  name: string;
  description: string;
  imageUrl: string;
}

export const PROFICIENCY_LEVELS: LevelInfo[] = [
  {
    level: 1,
    name: 'Beginner',
    description: 'Recognize words',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop'
  },
  {
    level: 2,
    name: 'Survival',
    description: 'Get by',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop'
  },
  {
    level: 3,
    name: 'Functional',
    description: 'Work/study',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop'
  },
  {
    level: 4,
    name: 'Professional',
    description: 'Argue, explain',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop'
  },
  {
    level: 5,
    name: 'Academic',
    description: 'Analyze & write',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop'
  },
  {
    level: 6,
    name: 'Near-native',
    description: 'Think in language',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop'
  }
];

export const DUMMY_COURSE: CourseData = {
  id: "default-english",
  courseTitle: "English Mastery",
  language: "English",
  units: [
    {
      id: "unit-1",
      title: "Essential Greetings",
      color: "bg-[#58cc02]",
      level: 1,
      lessons: [
        {
          id: "lesson-1",
          title: "First Encounters",
          description: "Learn basic greetings",
          status: 'available',
          exercises: [
            {
              id: "ex-1",
              type: "multiple-choice",
              question: "How do you say 'Hello'?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              answer: "Hello"
            }
          ]
        }
      ]
    }
  ],
  dictionary: [
    { id: 'w1', word: 'Hello', translation: 'Hola', definition: 'A common greeting used to begin a conversation.', example: 'Hello, how are you today?' },
    { id: 'w2', word: 'Apple', translation: 'Manzana', definition: 'A round fruit with red or green skin.', example: 'She ate a sweet red apple.' },
    { id: 'w3', word: 'Library', translation: 'Biblioteca', definition: 'A place where books are kept for people to read or borrow.', example: 'I went to the library to study.' }
  ],
  grammar: [
    { id: 'g1', title: 'Present Simple', content: 'Use the present simple to talk about things that are generally true or happen regularly.', examples: ['I drink coffee every morning.', 'She lives in London.'] },
    { id: 'g2', title: 'Personal Pronouns', content: 'Words used to replace nouns like people or things.', examples: ['I, You, He, She, It, We, They'] }
  ]
};
