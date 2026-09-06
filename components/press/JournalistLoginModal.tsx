import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, Key, AlertCircle, Sparkles, User } from 'lucide-react';
import { newsService } from '../../services/newsService';
import { JournalistUser } from '../../types';

interface JournalistLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: JournalistUser) => void;
}

export const JournalistLoginModal: React.FC<JournalistLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = newsService.loginJournalist(credential, password);
      setIsLoading(false);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.error || 'Login ou senha incorretos.');
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#03005c] via-[#050080] to-[#03005c] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#fecc00] text-[#03005c] rounded-2xl shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#fecc00] block">
                Área Restrita da Imprensa
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Acesso do Jornalista
              </h3>
            </div>
          </div>
          <p className="text-xs text-white/80 leading-relaxed mt-1">
            Entre com suas credenciais de imprensa para postar reportagens e gerenciar os jornais em PDF da XX SINU.
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Login
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder="Digite o login de imprensa"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all placeholder:text-slate-400"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all placeholder:text-slate-400"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-5 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white font-bold text-sm shadow-lg shadow-[#03005c]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#fecc00]" />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
