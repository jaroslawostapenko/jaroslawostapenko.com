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
  { name: 'HTML5', level: 90, category: 'frontend', description: 'Semantyka, SEO' },
  { name: 'CSS3', level: 85, category: 'frontend', description: 'Flexbox, Grid, RWD' },
  { name: 'JavaScript (ES6+)', level: 80, category: 'frontend', description: 'DOM, Eventy, Async' },
  { name: 'React', level: 75, category: 'frontend', description: 'Hooks, Components' },
  { name: 'PHP', level: 60, category: 'backend', description: 'Podstawy, Skrypty' },
  { name: 'MySQL', level: 70, category: 'backend', description: 'Relacyjne bazy danych' },
  { name: 'Python', level: 50, category: 'backend', description: 'Podstawy' },
  { name: 'C / C++', level: 40, category: 'backend', description: 'Podstawy algorytmiki' },
  { name: 'Git', level: 75, category: 'tools', description: 'Kontrola wersji' },
  { name: 'Bootstrap', level: 80, category: 'frontend', description: 'Framework CSS' },
  { name: 'Angielski (B2)', level: 75, category: 'language' },
  { name: 'Polski (C1)', level: 90, category: 'language' },
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
      'Tworzenie i rozwój aplikacji webowych z wykorzystaniem HTML, CSS, JavaScript, jQuery oraz PHP, MySQL.',
      'Projektowanie, implementacja i zarządzanie relacyjnymi bazami danych.',
      'Aktywna praca z systemem kontroli wersji Git w środowisku zespołowym.',
      'Współpraca przy optymalizacji i utrzymaniu istniejących projektów.'
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
      'Nauka zaawansowanych technologii webowych i inżynierii oprogramowania.'
    ]
  },
  {
    id: 'edu-2',
    title: 'Liceum Ogólnokształcące',
    organization: 'Liceum nr. 3 miasto Mikołajów, Ukraina',
    period: '01.09.2022 - 16.06.2025',
    type: 'education',
    description: [
      'Nauczanie online',
      'Profil ogólny z naciskiem na nauki ścisłe.'
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