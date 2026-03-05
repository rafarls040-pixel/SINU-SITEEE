import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Coins, GraduationCap, CalendarHeart, Megaphone, Palette, User, AlertCircle } from 'lucide-react';

interface Member {
  name: string;
  shift: string;
  image?: string;
}

interface Team {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  members: Member[];
}

const teams: Team[] = [
  {
    id: 'geral',
    title: 'Secretaria Geral',
    icon: Globe,
    description: 'A secretaria geral é responsável pela coordenação global do evento, abrangendo a gestão de recursos, espaços, cronograma e equipes. Seu trabalho é essencial para assegurar a organização, o planejamento e o bom funcionamento da comissão organizadora, garantindo a realização do evento da melhor forma possível.',
    members: [
      { name: 'Beatriz Pimentel Siqueira', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Beatriz+Pimentel.png' },
      { name: 'Pyetra Vitoria Kumar', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Pyetra.png' }
    ]
  },
  {
    id: 'financeira',
    title: 'Secretaria Financeira',
    icon: Coins,
    description: 'A secretaria financeira é responsável por arrecadar e coordenar os recursos necessários para a realização do evento. Seu trabalho é essencial para garantir que tudo seja planejado da melhor forma possível, evitando imprevistos e assegurando que não faltem fundos ao longo do processo.',
    members: [
      { name: 'Alice Antunes Guaraná', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Alice.png' },
      { name: 'Arthur Ferreira de André', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Arthur.png' },
      { name: 'Rafaela Oliveira dos Santos', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Rafaela.png' }
    ]
  },
  {
    id: 'academica',
    title: 'Secretaria Acadêmica',
    icon: GraduationCap,
    description: 'A secretaria acadêmica é responsável pela organização e acompanhamento dos conteúdos do evento, incluindo a produção e revisão de textos e o suporte acadêmico aos participantes. Atua em conjunto com as demais secretarias ao longo de todas as etapas do evento garantindo seu rigor acadêmico.',
    members: [
      { name: 'Gabriel Piantavini Ferrari', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Gabriel.png' },
      { name: 'Giulia Borella Pachoalin', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Giulia.png' },
      { name: 'Isabella Cristina Silva Nascimento', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Isabella.png' },
      { name: 'Laura Maria Simão dos Santos', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Laura.png' }
    ]
  },
  {
    id: 'cultural',
    title: 'Secretaria Cultural',
    icon: CalendarHeart,
    description: 'A secretaria cultural é responsável pelo planejamento e pela logística do evento, desde a preparação até a sua realização. Compete a essa secretaria a organização das atividades centrais do evento e a coordenação dos staffs ao longo de todas as etapas.',
    members: [
      { name: 'Beatriz Malta Stirnberg', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Beatriz.png' },
      { name: 'Erick Henrique da Silva Andrade', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Erick.png' },
      { name: 'Lucas Aranha Ferraz', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/lucas.png' },
      { name: 'Mario Arnaldo Muniz Kozilek', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Mario.png' }
    ]
  },
  {
    id: 'comunicacao',
    title: 'Secretaria de Comunicação',
    icon: Megaphone,
    description: 'A secretaria de comunicação é responsável pela coordenação das redes sociais da SINU, bem como pela produção e organização dos materiais audiovisuais divulgados antes e após o evento. Também é de sua responsabilidade a gestão e atualização do site oficial.',
    members: [
      { name: 'Mauricio Eduardo Lira Casimiro', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Mauricio.png' },
      { name: 'Rafael Souza Santos', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Rafael.png' },
      { name: 'Rubem Pilotto Rodrigues Alves', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Rubem.png' }
    ]
  },
  {
    id: 'criativa',
    title: 'Secretaria Criativa',
    icon: Palette,
    description: 'A secretaria criativa é responsável pela identidade visual da SINU, definindo cores, padrões e modelos de todos os materiais utilizados antes e durante o evento. Além disso, atua de forma integrada com as demais secretarias, contribuindo para a inovação nos processos de preparação do evento.',
    members: [
      { name: 'Henrique do Prado Valladares Seixas Maia', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Henrique+Maia.png' },
      { name: 'Thomas Henry de Sousa Oliveira', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Thomas.png' },
      { name: 'Valentina Maria Colombo Bagnolesi', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Valentina.png' },
      { name: 'Vinícius Porfirio de Souza', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Vinicios.png' }
    ]
  },
  {
    id: 'crise',
    title: 'Secretaria de Crise',
    icon: AlertCircle,
    description: 'A secretaria de crise é responsável pela criação e gestão de situações emergenciais e dinâmicas que desafiam os delegados durante o evento. Seu trabalho é essencial para garantir o realismo e a imprevisibilidade das discussões, exigindo dos participantes soluções rápidas e estratégicas diante de novos cenários.',
    members: [
      { name: 'Bethânia Labate Mellis', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Beth%C3%A2nia.png' },
      { name: 'Maria Eduarda Seixas Ferreira', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Maria+Eduarda.png' }
    ]
  }
];

const MemberCarousel: React.FC<{ members: Member[] }> = ({ members }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (members.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, [members.length]);

  const member = members[currentIndex];

  return (
    <div className="relative w-full h-[450px] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full flex flex-col items-center p-4"
        >
          <div className="w-full max-w-[240px] aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl relative group/member bg-white">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-un-light flex items-center justify-center">
                <User className="w-16 h-16 text-un-accent/60" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-un-dark/40 to-transparent opacity-0 group-hover/member:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div className="text-center w-full mt-auto pt-2">
            <p className="text-xl font-serif font-bold text-slate-900 leading-tight mb-3 px-1 tracking-tight">
              {member.name}
            </p>
            <div className="flex justify-center">
              <span className="text-[10px] text-un-dark font-bold uppercase tracking-[0.2em] bg-un-accent/15 px-4 py-1.5 rounded-full border border-un-accent/10">
                {member.shift}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      {members.length > 1 && (
        <div className="absolute bottom-2 flex gap-1.5">
          {members.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-un-accent w-4' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Secretariat: React.FC = () => {
  // Separate General from others to highlight it
  const generalTeam = teams.find(t => t.id === 'geral');
  const otherTeams = teams.filter(t => t.id !== 'geral');

  return (
    <section id="secretariado" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-un-accent font-bold tracking-wide uppercase mb-2">Equipe</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 drop-shadow-sm">Secretariado SINU <span className="text-un-accent">XX</span></h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Conheça as mentes e corações que trabalham nos bastidores para fazer a simulação acontecer.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* General Secretariat Highlight */}
          {generalTeam && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-un-accent relative">
                {/* Gold glow effect at top */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-un-accent/5 to-transparent pointer-events-none"></div>

                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                    <div className="p-4 bg-un-accent/10 rounded-full text-un-accent shrink-0 border border-un-accent/20">
                      <generalTeam.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif font-bold text-slate-900">{generalTeam.title}</h4>
                      <p className="text-slate-500 mt-1 text-justify">{generalTeam.description}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-100">
                    <h5 className="text-xs font-bold text-un-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-un-accent"></span> Membros
                    </h5>
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                      {generalTeam.members.map((member, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-8 p-8 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 group/card">
                          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shrink-0 shadow-2xl group-hover/card:scale-[1.02] transition-all duration-700 bg-white">
                            {member.image ? (
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full bg-un-dark text-white flex items-center justify-center text-7xl font-bold">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-grow text-center flex flex-col justify-center">
                            <div className="inline-flex items-center justify-center gap-3 mb-4">
                              <span className="h-px w-6 bg-un-accent/40"></span>
                              <h5 className="text-un-accent text-[10px] font-bold uppercase tracking-[0.4em] opacity-90">Secretaria Geral</h5>
                              <span className="h-px w-6 bg-un-accent/40"></span>
                            </div>
                            <h3 className="font-serif font-bold text-slate-900 text-3xl md:text-4xl group-hover/card:text-un-dark transition-all duration-500 leading-tight tracking-tight mb-6">
                              {member.name}
                            </h3>
                            <div className="flex justify-center">
                              <div className="flex items-center gap-2 bg-un-accent/10 px-6 py-2 rounded-full border border-un-accent/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-un-accent animate-pulse"></span>
                                <span className="text-[10px] text-un-dark font-bold tracking-[0.2em] uppercase">
                                  {member.shift}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Secretariats Grid - Alterado para Flexbox para centralizar itens "órfãos" */}
          <div className="flex flex-wrap justify-center gap-8">
            {otherTeams.map((team, idx) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-un-accent/30 group flex flex-col h-full w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-un-light/50 rounded-lg text-un-blue group-hover:bg-un-accent group-hover:text-un-dark transition-all duration-300 shadow-sm">
                      <team.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-un-dark transition-colors">{team.title}</h4>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed text-justify">
                    {team.description}
                  </p>

                  <MemberCarousel members={team.members} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Secretariat;