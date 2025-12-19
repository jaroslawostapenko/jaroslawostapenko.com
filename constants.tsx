import { ExperienceItem, Skill } from './types';
import { Code2, Database, Globe, Laptop, Terminal, Wrench } from 'lucide-react';

export const EMAIL = "yaroslav.ostapenko16@gmail.com";
export const PHONE = "+48 513 815 774";
export const ADDRESS = "Kraków, Małopolskie";
export const BIRTHDATE = "06.09.2007";

export const NAV_ITEMS = [
  { label: 'Start', href: '#hero' },
  { label: 'O mnie', href: '#about' },
  { label: 'Umiejętności', href: '#skills' },
  { label: 'Doświadczenie', href: '#experience' },
  { label: 'Kontakt', href: '#contact' },
];

export const SKILLS: Skill[] = [
  { name: 'HTML5', level: 95, category: 'frontend', description: 'Semantyka i struktura' },
  { name: 'CSS3', level: 90, category: 'frontend', description: 'Flexbox, Grid, RWD' },
  { name: 'JavaScript', level: 85, category: 'frontend', description: 'ES6+, DOM API' },
  { name: 'PHP', level: 75, category: 'backend', description: 'Programowanie backendowe' },
  { name: 'MySQL', level: 80, category: 'backend', description: 'Zarządzanie relacyjnymi bazami danych' },
  { name: 'Python', level: 80, category: 'backend', description: 'Skrypty i analiza' },
  { name: 'C', level: 70, category: 'backend', description: 'Programowanie niskopoziomowe' },
  { name: 'C++', level: 75, category: 'backend', description: 'Algorytmy i struktury danych' },
  { name: 'C#', level: 65, category: 'backend', description: 'Aplikacje desktopowe' },
  { name: 'Git', level: 80, category: 'tools', description: 'Kontrola wersji' },
  { name: 'Bootstrap', level: 80, category: 'frontend', description: 'Framework UI' },
  { name: 'React', level: 75, category: 'frontend', description: 'Tworzenie komponentów' },
  { name: 'Polski (C1)', level: 90, category: 'language' },
  { name: 'Angielski (B2)', level: 75, category: 'language' },
  { name: 'Ukraiński (C2)', level: 100, category: 'language' },
  { name: 'Rosyjski (C2)', level: 100, category: 'language' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Full Stack Developer (Praktykant)',
    organization: 'AKTRU sp. z o.o.',
    period: 'Październik 2024 - Obecnie', 
    type: 'work',
    description: [
      'Tworzenie i rozwój aplikacji webowych.',
      'Obsługa backendu w PHP.',
      'Zarządzanie bazami danych MySQL.',
      'Praca z systemem Git.'
    ]
  },
  {
    id: 'edu-1',
    title: 'Technik Programista',
    organization: 'ZESPÓŁ SZKÓŁ TECHNICZNYCH Chemobudowa-Kraków S.A.',
    period: '04.09.2023 - Obecnie',
    type: 'education',
    description: [
      'Profil: Programista',
      'Nauka języków: C, C++, C#, Python, SQL.'
    ]
  }
];

export const ICONS_MAP = {
  frontend: Code2,
  backend: Database,
  tools: Wrench,
  language: Globe,
  default: Laptop,
  education: Terminal
};