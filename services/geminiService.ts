import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize conditionally to prevent crashes if key is missing during dev, 
// though strict adherence requires process.env.API_KEY usage.
const ai = new GoogleGenAI({ apiKey });

export const streamDiplomaticAdvice = async (
  userMessage: string, 
  onChunk: (text: string) => void
): Promise<void> => {
  if (!apiKey) {
    onChunk("Erro: Chave de API não configurada. Por favor, configure a API_KEY.");
    return;
  }

  try {
    const model = 'gemini-3-flash-preview';
    
    // Using chat to maintain a bit of context if needed, but here simple content gen is fine.
    // We use generateContentStream for a single turn response.
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: `Você é um "Diplomata Sênior" e mentor da SINU (Simulação Interna das Nações Unidas). 
        Seu objetivo é ajudar estudantes do ensino médio a entenderem como funciona uma simulação da ONU.
        Seja formal, encorajador, mas acessível. 
        Responda perguntas sobre: Regras de Procedimento, como escrever um DPO (Documento de Posição Oficial), oratória, e termos como 'Ponto de Ordem' ou 'Moção'.
        Mantenha as respostas concisas (máximo 3 parágrafos) para caber num chat widget.`,
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n[Perdão, houve uma falha na comunicação diplomática. Tente novamente.]");
  }
};