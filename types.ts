export interface Committee {
  id: string;
  name: string;
  topic: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  iconName: string;
  description: string;
  images: string[]; // Array de URLs para o carrossel
  guideUrl?: string; // URL para o arquivo no S3 (PDF do Guia de Estudos)
}

export interface ScheduleItem {
  time: string;
  activity: string;
  location: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}