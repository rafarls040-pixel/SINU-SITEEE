import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Briefcase, 
  FileText, 
  Download, 
  Smartphone, 
  Check, 
  Copy, 
  User, 
  QrCode, 
  AlertTriangle, 
  Info, 
  Printer, 
  DollarSign,
  HeartHandshake
} from 'lucide-react';

export const DelegateSection: React.FC = () => {
  // PIX state and Copy function
  const [copied, setCopied] = useState(false);
  const pixKey = "contato.sinucsl@gmail.com";

  // Authorization Form pre-fill states
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('CDH');

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to trigger printing of a clean, official legal authorization page
  const handlePrintAuthorization = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Por favor, permita pop-ups para gerar a autorização impressa!");
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AUTORIZAÇÃO - SINU XX</title>
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }
          * {
            box-sizing: border-box;
          }
          body {
            font-family: "Times New Roman", Times, Georgia, serif;
            color: #1a1a1a;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            width: 100%;
            max-width: 650px;
            margin: 0 auto;
            text-align: center;
            padding: 10px;
          }
          .logo-anniversary {
            margin: 10px auto 10px auto;
            display: block;
            max-width: 110px;
            height: auto;
          }
          .sub-header {
            font-size: 13pt;
            font-weight: bold;
            color: #0c3e7b;
            text-align: center;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
            font-family: "Times New Roman", Times, Georgia, serif;
          }
          .title-auth {
            font-size: 14pt;
            font-weight: bold;
            color: #0c3e7b;
            text-align: center;
            letter-spacing: 1px;
            margin-bottom: 30px;
            font-family: "Times New Roman", Times, Georgia, serif;
          }
          .content-text {
            text-align: justify;
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 12.5pt;
            line-height: 1.6;
            margin-bottom: 25px;
            text-indent: 0;
          }
          .inline-field {
            border-bottom: 1px solid #000000;
            display: inline-block;
            text-align: center;
            font-weight: normal;
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 12.5pt;
            vertical-align: bottom;
            line-height: 1.2;
            padding: 0 4px;
            max-width: 100%;
            word-wrap: break-word;
          }
          .guardian-field {
            border-bottom: 1px solid #000000;
            display: inline-block;
            text-align: center;
            font-weight: normal;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5pt;
            vertical-align: bottom;
            line-height: 1.2;
            padding: 0 4px;
            max-width: 100%;
            word-wrap: break-word;
          }
          .phone-section {
            text-align: left;
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 12.5pt;
            margin-top: 25px;
            margin-bottom: 50px;
          }
          .signature-section {
            margin-top: 35px;
            margin-bottom: 35px;
            text-align: center;
          }
          .signature-line {
            width: 280px;
            max-width: 100%;
            border-top: 1px solid #000000;
            margin: 0 auto 5px auto;
          }
          .signature-label {
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 10.5pt;
            color: #333;
          }
          .warning-text {
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 8pt;
            font-weight: bold;
            color: #111;
            text-align: center;
            line-height: 1.4;
            margin-top: 35px;
            margin-bottom: 25px;
            text-transform: uppercase;
            letter-spacing: 0.2px;
          }
          .footer-section {
            border-top: 1px solid #cbd5e1;
            padding-top: 12px;
            margin-top: 15px;
            text-align: center;
          }
          .footer-section img {
            height: 32px;
            width: auto;
            display: block;
            margin: 0 auto;
          }
          @media print {
            body {
              background-color: transparent;
            }
            .container {
              max-width: 100%;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Official Anniversary 20 SINU Logo -->
          <img class="logo-anniversary" src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/LOGO+DA+SINU+OFC.png" alt="Logo Oficial SINU" />

          <!-- Headline -->
          <div class="sub-header">XX SIMULAÇÃO INTERNA DAS NAÇÕES UNIDAS</div>
          
          <!-- Document Title -->
          <div class="title-auth">AUTORIZAÇÃO</div>

          <!-- Document Text with precise fields and proportional underline blanks -->
          <div class="content-text">
            Eu, <span class="guardian-field" style="width: 440px;">${guardianName || '&nbsp;'}</span>, responsável por 
            <span class="inline-field" style="width: 410px;">${studentName || '&nbsp;'}</span>, autorizo-o(a) a participar da XX Simulação Interna das Nações Unidas (XX SINU), que acontecerá nos dias 28, 29 e 30 de agosto de 2026, nas dependências do Colégio São Luís.
          </div>

          <!-- Tel do Responsável Section -->
          <div class="phone-section">
            Tel. do Responsável: <span class="guardian-field" style="width: 250px;">${guardianPhone || '&nbsp;'}</span>
          </div>

          <!-- Signature block exactly centered -->
          <div class="signature-section">
            <div class="signature-line"></div>
            <div class="signature-label">Assinatura do Responsável</div>
          </div>

          <!-- Delivery Instruction Deadline Banner -->
          <div class="warning-text">
            ESTA AUTORIZAÇÃO DEVERÁ SER ENTREGUE ATÉ O DIA 26 DE JUNHO DE 2026 PARA BEATRIZ PIMENTEL (EMI) OU PYETRA KUMAR (EMN).
          </div>

          <!-- Bottom Partner Logos mimicking the official layout -->
          <div class="footer-section">
            <img src="https://static.saoluis.org/wp-content/uploads/2020/04/colegio-saoluis.png" alt="Colégio São Luís logo" />
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section id="delegado" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative vectors in UN colors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-un-light/40 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-un-blue/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-black text-un-dark tracking-tight uppercase">
            Seção do Delegado
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Prezado diplomata, sua presença foi formalmente convocada para a SINU XX. Prepare seus pareceres.
          </p>
        </motion.div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT HEADER CARD: Official Call (Span 8) */}
          <motion.div 
            className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-un-blue/10 rounded-2xl text-un-dark">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-serif font-bold text-un-dark">Orientações do Diplomata</h4>
                  <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase font-sans">SINU XX • Colégio São Luís</p>
                </div>
              </div>
              
              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                <p>
                  Na vigésima edição da SINU, temos a honra de receber os delegados convocados para esta simulação diplomática, reafirmando nosso compromisso com o diálogo, a cooperação internacional e a promoção dos direitos humanos. O evento reitera que o espírito de união, a resolução pacífica de disputas e a excelência oratória serão os pilares que conduzirão os debates ao longo das assembleias. Por ora, atentem-se aos requisitos necessários para o prosseguimento de sua delegação: o pagamento da taxa de inscrição e o envio da autorização.
                </p>
              </div>
            </div>

            {/* Event Dates Sub-Block */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-un-accent shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wide font-sans block">Datas dos Debates</span>
                  <span className="text-sm font-bold text-un-dark">28, 29 e 30 de Agosto de 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-un-blue shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wide font-sans block">Localização</span>
                  <span className="text-sm font-bold text-un-dark">Colégio São Luís</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT TOP CARD: Taxas & Prazos (Span 5) */}
          <motion.div 
            className="lg:col-span-5 bg-un-dark rounded-3xl p-6 md:p-8 shadow-xl text-white flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl text-un-accent">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-serif font-bold text-white">Taxa de Inscrição</h4>
                  <p className="text-xs text-white/50 font-semibold tracking-wider uppercase font-sans">Valores por Período</p>
                </div>
              </div>

              {/* Fee Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-xs text-un-accent font-black tracking-widest uppercase block mb-1">Diurno</span>
                  <span className="text-2xl md:text-3xl font-serif font-black text-white">R$ 150</span>
                  <span className="text-[10px] text-white/50 block font-semibold mt-1">por delegado</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-xs text-un-accent font-black tracking-widest uppercase block mb-1">Noturno</span>
                  <span className="text-2xl md:text-3xl font-serif font-black text-white">R$ 80</span>
                  <span className="text-[10px] text-white/50 block font-semibold mt-1">por delegado</span>
                </div>
              </div>

              {/* Info limits list */}
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-un-accent mt-0.5 shrink-0" />
                  <span>Dinheiro Presencial aceito até <strong>27/06</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-un-accent mt-0.5 shrink-0" />
                  <span>Chave PIX válida até <strong>30/06</strong></span>
                </li>
              </ul>
            </div>

            <div className="mt-8 bg-[#fecc00]/10 border border-[#fecc00]/20 rounded-2xl p-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-un-accent shrink-0" />
              <p className="text-[11px] md:text-xs text-slate-300">
                Os valores arrecadados viabilizam a infraestrutura completa das assembleias diplomáticas da SINU XX.
              </p>
            </div>
          </motion.div>

          {/* FULL CARD: FECHAMENTO PIX & DINHEIRO COMPROVANTES (Span 12) */}
          <motion.div 
            className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Payment columns: Left 6 columns for PIX copy key */}
            <div className="md:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#fecc00]/10 rounded-xl text-un-dark">
                  <QrCode className="w-5 h-5" />
                </div>
                <h5 className="font-serif font-bold text-un-dark text-base md:text-lg">Pagamento via PIX</h5>
              </div>
              
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-between gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-inner">
                  <span className="font-mono text-xs md:text-sm text-slate-600 truncate">{pixKey}</span>
                  <button 
                    onClick={handleCopyPix}
                    className="p-2 bg-un-dark hover:bg-un-blue text-white rounded-lg transition-colors shrink-0"
                    title="Copiar chave"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-slate-500 font-medium">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Beneficiária</span>
                    <span className="text-un-dark font-bold font-sans">Rafaela Oliveira dos Santos</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Instituição</span>
                    <span className="text-un-dark font-bold font-sans">Nubank</span>
                  </div>
                </div>
              </div>

              {copied && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 justify-center md:justify-start">
                  <Check className="w-3.5 h-3.5" /> Chave PIX copiada com sucesso!
                </p>
              )}
            </div>

            {/* Right 6 columns for Proof, Contacts, Cash */}
            <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-un-blue/10 rounded-xl text-un-dark">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif font-bold text-un-dark text-base md:text-lg">Envio de Comprovante</h5>
                </div>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
                  O comprovante do PIX deve ser enviado obrigatoriamente contendo <strong>Nome Completo</strong>, <strong>Turma</strong> e <strong>Comitê</strong> do delegado participante.
                </p>
              </div>

              {/* Interactive Contact Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <a 
                  href="https://wa.me/5511953742495"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-50 border border-slate-200 hover:border-un-blue rounded-xl p-3 flex items-center gap-3 group transition-all"
                >
                  <div className="w-10 h-10 bg-un-blue/5 rounded-lg flex items-center justify-center text-un-blue font-bold shrink-0">D</div>
                  <div className="truncate">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Diurno — Arthur</span>
                    <span className="text-xs font-bold text-slate-700 font-mono group-hover:text-un-blue transition-colors">(11) 95374-2495</span>
                  </div>
                </a>

                <a 
                  href="https://wa.me/5511982056721"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-50 border border-slate-200 hover:border-un-blue rounded-xl p-3 flex items-center gap-3 group transition-all"
                >
                  <div className="w-10 h-10 bg-[#fecc00]/5 rounded-lg flex items-center justify-center text-un-accent font-bold shrink-0">N</div>
                  <div className="truncate">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Noturno — Rafaela</span>
                    <span className="text-xs font-bold text-slate-700 font-mono group-hover:text-un-blue transition-colors">(11) 98205-6721</span>
                  </div>
                </a>
              </div>
            </div>

          </motion.div>

          {/* EXCLUSIVE SECTION: AUTHORIZATION PDF GENERATOR (Span 12) */}
          <motion.div 
            className="lg:col-span-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-dashed border-slate-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Form & text fields */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-un-blue/15 rounded-2xl text-un-blue">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-serif font-bold text-un-dark">Autorização do Responsável</h4>
                    <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase font-sans">Documento Obrigatório para Participação</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                  Todos os delegados devem entregar a autorização devidamente preenchida e assinada por seus respectivos responsáveis. Você pode preencher os dados abaixo diretamente no site para gerar o documento pronto ou simplesmente clicar em baixar para as preencher à mão!
                </p>

                {/* Interactive pre-fill inputs */}
                <div className="bg-slate-50/55 p-5 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-500 uppercase font-black tracking-wide font-sans block mb-1">Nome Completo do Responsável Legal</label>
                    <input 
                      type="text" 
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      placeholder="Ex: Maria de Souza Silva"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-un-blue focus:ring-1 focus:ring-un-blue/30 transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-black tracking-wide font-sans block mb-1">Nome Completo do Estudante (Delegado)</label>
                    <input 
                      type="text" 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ex: João da Silva Santos"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-un-blue focus:ring-1 focus:ring-un-blue/30 transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-black tracking-wide font-sans block mb-1">Telefone do Responsável</label>
                    <input 
                      type="text" 
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      placeholder="Ex: (11) 98765-4321"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-un-blue focus:ring-1 focus:ring-un-blue/30 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Action columns & deadlines details */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                {/* Print/Download Button */}
                <button 
                  onClick={handlePrintAuthorization}
                  className="w-full bg-un-blue text-white shadow-md hover:bg-un-dark py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer select-none border border-transparent hover:border-un-accent"
                >
                  <Printer className="w-5 h-5 animate-bounce" />
                  <span>Baixar Autorização Impressa (PDF)</span>
                </button>

                <div className="space-y-4">
                  <div className="flex gap-2.5 items-start">
                    <AlertTriangle className="w-5 h-5 text-un-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-normal">
                      A autorização impressa deve ser entregue presencialmente às responsáveis: <strong className="text-un-dark font-sans">Beatriz Pimentel (EMI)</strong> ou <strong className="text-un-dark font-sans">Pyetra Kumar (EMN)</strong> até o dia <strong>26 de Junho de 2026</strong>.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start border-t border-slate-200 pt-3">
                    <Info className="w-5 h-5 text-un-blue shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-normal">
                      Em caso de pagamento realizado de forma presencial em espécie (dinheiro), este deve ser anexado e entregue obrigatoriamente junto à autorização física assinada.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
