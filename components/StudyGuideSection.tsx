import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileDown, FileText } from 'lucide-react';

export interface StudyGuide {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  category?: string;
}

const DEFAULT_GUIDES: Record<string, StudyGuide[]> = {
  csnu: [
    {
      id: 'csnu-main',
      title: 'Guia de Estudos Oficial - CSNU',
      description: 'Documento completo elaborado pela Mesa Diretora com fundamentação histórica, análise geopolítica e diretrizes para o debate sobre o Corolário Trump à Doutrina Monroe.',
      fileUrl: 'https://drive.google.com/file/d/1oo89twpwLWaJZTKWKDlyx5XXwP1zWf-D/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    },
    {
      id: 'csnu-regras',
      title: 'Regimento Interno & Regras de Procedimento',
      description: 'Manual de regras, dinâmicas de votação e procedimentos de debate para os delegados do Conselho de Segurança.',
      fileUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/guias/Regimento_Interno_CSNU.pdf',
      fileSize: 'PDF • Documento Oficial',
      category: 'Regimento'
    }
  ],
  cn: [
    {
      id: 'cn-main',
      title: 'Guia de Estudos Oficial - Congresso Nacional',
      description: 'Material com contextualização legislativa, análise socioeconômica e a regulação da Indústria de Bets no Brasil.',
      fileUrl: 'https://drive.google.com/file/d/1tsLHu4nRm6t6y3euP_4HHxpGsVis65Th/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    },
    {
      id: 'cn-regras',
      title: 'Regimento Interno e Processo Legislativo',
      description: 'Guia de trâmite de projetos de lei, apresentação de emendas e discursos no Congresso Nacional.',
      fileUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/guias/Regimento_Interno_CN.pdf',
      fileSize: 'PDF • Documento Oficial',
      category: 'Regimento'
    }
  ],
  unodc: [
    {
      id: 'unodc-main',
      title: 'Guia de Estudos Oficial - UNODC',
      description: 'Estudo aprofundado sobre o combate à metanfetamina no Sudeste Asiático e Oceania, rotas de tráfico e cooperação internacional.',
      fileUrl: 'https://drive.google.com/file/d/1Ul1bZTwj_bMnavgFGd5SFK8SVF0NbZ8d/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  cdh: [
    {
      id: 'cdh-main',
      title: 'Guia de Estudos Oficial - CDH',
      description: 'Análise detalhada sobre os Direitos Humanos, detenção em massa e repressão estatal na Ásia.',
      fileUrl: 'https://drive.google.com/file/d/1l_PTH9EkApYyvSWz1q3iPHVFlIyEOplG/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  unifem: [
    {
      id: 'unifem-main',
      title: 'Guia de Estudos Oficial - UNIFEM',
      description: 'Exposição sobre o papel das mulheres no Sahel diante das intervenções militares e direitos fundamentais.',
      fileUrl: 'https://drive.google.com/file/d/1JcXJoB86WP-R1akA3fxCWsOcD08H8MRu/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  to: [
    {
      id: 'to-main',
      title: 'Guia de Estudos Oficial - Teatro de Operações',
      description: 'Dossiê tático, cronologia dos fatos da Guerra das Coreias (1950-1953) e mecânicas de simulação de crise.',
      fileUrl: 'https://drive.google.com/file/d/1td_w6SBFe7FWfzcvmHmg3QEVqKQf-6BG/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  pnuma: [
    {
      id: 'pnuma-main',
      title: 'Guia de Estudos Oficial - PNUMA',
      description: 'Manual de debate sobre neocolonialismo verde, transição energética e justiça ambiental na América Latina.',
      fileUrl: 'https://drive.google.com/file/d/1j4ZU-JRfjDurCnmGdvJhc4xN-4yMHqYZ/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  opep: [
    {
      id: 'opep-main',
      title: 'Guia de Estudos Oficial - OPEP+',
      description: 'Análise do mercado petrolífero, guerras regionais e instrumentalização de recursos naturais.',
      fileUrl: 'https://drive.google.com/file/d/19L-FN_T29BEpQ8m0N72bHcyc9tBWVmaR/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  historic: [
    {
      id: 'historic-main',
      title: 'Guia de Estudos Oficial - CSH (Histórico)',
      description: 'Dossiê histórico sobre a Crise dos Mísseis de Cuba de outubro de 1962 e o contexto geopolítico da Guerra Fria.',
      fileUrl: 'https://drive.google.com/file/d/12jMWYkUfd6v_2XSZhUmVhZcd7QjRNeDi/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ],
  ci: [
    {
      id: 'ci-main',
      title: 'Guia de Estudos e Manual de Imprensa - CI',
      description: 'Diretrizes de cobertura jornalística, redação de notícias e intervenções de imprensa durante a simulação.',
      fileUrl: 'https://drive.google.com/file/d/1U_fa_XDp67cia95Q23zNsSyOyi8S4VHs/view?usp=sharing',
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ]
};

interface StudyGuideSectionProps {
  committeeId: string;
  committeeName: string;
  accentColor?: string;
  guides?: StudyGuide[];
}

export const StudyGuideSection: React.FC<StudyGuideSectionProps> = ({
  committeeId,
  committeeName,
  accentColor = '#0c3e7b',
  guides
}) => {
  const guideList = guides || DEFAULT_GUIDES[committeeId.toLowerCase()] || [
    {
      id: `${committeeId}-default`,
      title: `Guia de Estudos Oficial - ${committeeName}`,
      description: `Acesse o material de preparação e estudos completos elaborados pela Mesa Diretora do ${committeeName} para a XX SINU.`,
      fileUrl: `https://sinu-csl-site.s3.sa-east-1.amazonaws.com/guias/Guia_de_Estudos_${committeeId.toUpperCase()}.pdf`,
      fileSize: 'PDF • XX SINU',
      category: 'Guia Principal'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.28 }}
      className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border border-slate-100 relative overflow-hidden w-full"
    >
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-2.5"
        style={{ backgroundColor: accentColor }}
      />

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div 
              className="p-3.5 md:p-4 rounded-2xl text-white shadow-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <BookOpen className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">Material de Preparação Oficial</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                Guias de Estudo
              </h2>
            </div>
          </div>

          <span className="self-start sm:self-auto text-xs md:text-sm font-bold px-4 py-2 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0 shadow-xs">
            {guideList.length} {guideList.length === 1 ? 'documento disponível' : 'documentos disponíveis'}
          </span>
        </div>

        <div className={`grid grid-cols-1 ${guideList.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {guideList.map((guide) => (
            <div
              key={guide.id}
              className="group relative bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200 hover:border-slate-300 rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div 
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:scale-105 transition-transform shrink-0"
                    style={{ color: accentColor }}
                  >
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {guide.category && (
                      <span 
                        className="text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs"
                        style={{ backgroundColor: accentColor }}
                      >
                        {guide.category}
                      </span>
                    )}
                    {guide.fileSize && (
                      <span className="text-xs md:text-sm text-slate-500 font-semibold bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
                        {guide.fileSize}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-sans leading-snug group-hover:text-slate-950">
                    {guide.title}
                  </h3>
                  {guide.description && (
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {guide.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 pt-4 border-t border-slate-200/80 flex items-center justify-end">
                <a
                  href={guide.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm md:text-base text-white shadow-lg hover:shadow-xl transition-all transform active:scale-95 group/btn"
                  style={{ backgroundColor: accentColor }}
                >
                  <FileDown className="w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform" />
                  <span>Baixar Guia (PDF)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StudyGuideSection;
