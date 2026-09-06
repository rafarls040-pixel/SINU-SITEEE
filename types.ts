export interface Committee {
  id: string;
  name: string;
  topic: string;
  iconName: string;
  logoUrl?: string;
  description: string;
  images: string[]; // Array de URLs para o carrossel
  guideUrl?: string; // URL para o arquivo no S3 (PDF do Guia de Estudos)
  pageUrl?: string; // URL para a página de detalhes do comitê
  gradientFrom?: string;
  gradientTo?: string;
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

export type NewspaperPublisher = 'O UFANISTA' | 'SANS CULOTTES';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  category: 'Comitês' | 'Geral' | 'Bastidores' | 'Declarações' | 'Entrevistas' | 'Crise';
  committee?: string;
  publisher?: NewspaperPublisher;
  author: string;
  authorRole?: string;
  imageUrl?: string;
  date: string;
  time?: string;
  readingTime?: string;
  tags?: string[];
  isPinned?: boolean;
}

export interface PdfNewspaper {
  id: string;
  title: string;
  edition: string; // e.g., "1ª Edição - Matutino"
  date: string;
  description: string;
  pdfUrl: string; // URL web ou base64 Data URL
  fileName?: string;
  coverImageUrl?: string;
  author?: string;
  publisher?: NewspaperPublisher;
  pageCount?: number;
}

export interface JournalistUser {
  id: string;
  name: string;
  email: string;
  role: 'Jornalista' | 'Editor-Chefe' | 'Coordenador de Imprensa';
  avatar?: string;
  badgeCode: string;
}