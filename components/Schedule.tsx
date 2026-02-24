import React from 'react';
import { DaySchedule } from '../types';
import { motion } from 'framer-motion';

const scheduleData: DaySchedule[] = [
  {
    day: "Dia 1",
    date: "14 de Outubro",
    items: [
      { time: "18:00", activity: "Cerimônia de Abertura", location: "Auditório Principal" },
      { time: "19:30", activity: "Coquetel de Boas-vindas", location: "Pátio Central" },
      { time: "20:30", activity: "Primeira Sessão de Debates", location: "Salas de Aula" }
    ]
  },
  {
    day: "Dia 2",
    date: "15 de Outubro",
    items: [
      { time: "08:00", activity: "Segunda Sessão", location: "Salas de Aula" },
      { time: "12:00", activity: "Almoço", location: "Refeitório" },
      { time: "13:30", activity: "Terceira Sessão (Crise)", location: "Salas de Aula" },
      { time: "17:00", activity: "Coffee Break", location: "Pátio" }
    ]
  },
  {
    day: "Dia 3",
    date: "16 de Outubro",
    items: [
      { time: "09:00", activity: "Última Sessão & Votação", location: "Salas de Aula" },
      { time: "11:30", activity: "Encerramento e Premiação", location: "Auditório Principal" },
      { time: "13:00", activity: "Festa de Encerramento", location: "Quadra Poliesportiva" }
    ]
  }
];

const Schedule: React.FC = () => {
  return (
    <section id="agenda" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-un-blue font-bold tracking-wide uppercase mb-2">Agenda</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Programação do Evento</h3>
        </motion.div>

        <div className="space-y-12">
          {scheduleData.map((day, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <div className="sticky top-20 bg-white/95 backdrop-blur z-10 py-4 border-b-2 border-slate-100 mb-6 rounded-lg px-4 shadow-sm">
                 <h4 className="text-2xl font-bold text-un-dark flex items-center gap-3">
                   <span className="bg-un-blue text-white text-sm px-3 py-1 rounded-full uppercase tracking-wider">{day.day}</span>
                   {day.date}
                 </h4>
              </div>
              
              <div className="space-y-6 ml-4 border-l-2 border-slate-300 pl-8 pb-4">
                {day.items.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-un-blue group-hover:scale-125 transition-transform"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 bg-white/50 p-3 rounded-lg hover:bg-white/80 transition-colors">
                      <span className="font-mono font-bold text-slate-500 w-16">{item.time}</span>
                      <div>
                        <p className="font-bold text-lg text-slate-800">{item.activity}</p>
                        <p className="text-slate-500 text-sm">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;