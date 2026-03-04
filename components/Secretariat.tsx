import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Coins, GraduationCap, CalendarHeart, Megaphone, Palette, User } from 'lucide-react';

interface Member {
  name: string;
  shift: string;
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
      { name: 'Beatriz Pimentel Siqueira', shift: 'Integral' },
      { name: 'Pyetra Vitoria Kumar', shift: 'Noturno' }
    ]
  },
  {
    id: 'financeira',
    title: 'Secretaria Financeira',
    icon: Coins,
    description: 'A secretaria financeira é responsável por arrecadar e coordenar os recursos necessários para a realização do evento. Seu trabalho é essencial para garantir que tudo seja planejado da melhor forma possível, evitando imprevistos e assegurando que não faltem fundos ao longo do processo.',
    members: [
      { name: 'Alice Antunes Guaraná', shift: 'Integral' },
      { name: 'Arthur Ferreira de André', shift: 'Integral' },
      { name: 'Rafaela Oliveira dos Santos', shift: 'Noturno' }
    ]
  },
  {
    id: 'academica',
    title: 'Secretaria Acadêmica',
    icon: GraduationCap,
    description: 'A secretaria acadêmica é responsável pela organização e acompanhamento dos conteúdos do evento, incluindo a produção e revisão de textos e o suporte acadêmico aos participantes. Atua em conjunto com as demais secretarias ao longo de todas as etapas do evento garantindo seu rigor acadêmico.',
    members: [
      { name: 'Gabriel Piantavini Ferrari', shift: 'Integral' },
      { name: 'Giulia Borella Pachoalin', shift: 'Integral' },
      { name: 'Isabella Cristina Silva Nascimento', shift: 'Noturno' },
      { name: 'Laura Maria Simão dos Santos', shift: 'Noturno' }
    ]
  },
  {
    id: 'cultural',
    title: 'Secretaria Cultural',
    icon: CalendarHeart,
    description: 'A secretaria cultural é responsável pelo planejamento e pela logística do evento, desde a preparação até a sua realização. Compete a essa secretaria a organização das atividades centrais do evento e a coordenação dos staffs ao longo de todas as etapas.',
    members: [
      { name: 'Beatriz Malta Stirnberg', shift: 'Integral' },
      { name: 'Erick Henrique da Silva Andrade', shift: 'Noturno' },
      { name: 'Lucas Aranha Ferraz', shift: 'Integral' },
      { name: 'Mario Arnaldo Muniz Kozilek', shift: 'Noturno' }
    ]
  },
  {
    id: 'comunicacao',
    title: 'Secretaria de Comunicação',
    icon: Megaphone,
    description: 'A secretaria de comunicação é responsável pela coordenação das redes sociais da SINU, bem como pela produção e organização dos materiais audiovisuais divulgados antes e após o evento. Também é de sua responsabilidade a gestão e atualização do site oficial.',
    members: [
      { name: 'Mauricio Eduardo Lira Casimiro', shift: 'Noturno' },
      { name: 'Rafael Souza Santos', shift: 'Noturno' },
      { name: 'Rubem Pilotto Rodrigues Alves', shift: 'Integral' }
    ]
  },
  {
    id: 'criativa',
    title: 'Secretaria Criativa',
    icon: Palette,
    description: 'A secretaria criativa é responsável pela identidade visual da SINU, definindo cores, padrões e modelos de todos os materiais utilizados antes e durante o evento. Além disso, atua de forma integrada com as demais secretarias, contribuindo para a inovação nos processos de preparação do evento.',
    members: [
      { name: 'Thomas Henry de Sousa Oliveira', shift: 'Noturno' },
      { name: 'Valentina Maria Colombo Bagnolesi', shift: 'Integral' },
      { name: 'Vinícius Porfirio de Souza', shift: 'Noturno' }
    ]
  }
];

const Secretariat: React.FC = () => {
  // Separate General from others to highlight it
  const generalTeam = teams.find(t => t.id === 'geral');
  const otherTeams = teams.filter(t => t.id !== 'geral');

  return (
    <section id="secretariado" className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-un-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-un-accent/5 rounded-full blur-3xl"></div>
      </div>

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
                    <div className="grid md:grid-cols-2 gap-4">
                      {generalTeam.members.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                          <div className="w-8 h-8 rounded-full bg-un-dark text-white border border-un-accent flex items-center justify-center text-xs font-bold shadow-sm">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{member.name}</p>
                            <span className="text-xs text-un-dark font-medium bg-un-accent/20 px-2 py-0.5 rounded-full">
                              {member.shift}
                            </span>
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

                  <div className="space-y-3">
                    {team.members.map((member, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-0">
                        <User className="w-4 h-4 text-un-accent/60" />
                        <div className="flex-grow">
                          <p className="text-sm font-semibold text-slate-700">{member.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wide">{member.shift}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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