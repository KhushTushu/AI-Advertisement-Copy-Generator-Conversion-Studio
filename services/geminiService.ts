
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationConfig, AdCopy } from "../types";

export const generateAds = async (config: GenerationConfig): Promise<AdCopy[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are a conversion-focused senior advertising copywriter and marketing technologist. 
    Your goal is to generate 3 distinct, high-performing advertisement variations.
    Each ad must include a compelling headline, persuasive body text (primary text), and a strong call to action.
    Crucially, identify one "persuasivePhrase" within the body text that acts as the primary conversion trigger (e.g., social proof, scarcity, benefit-led).
    The persuasivePhrase must be an exact substring of the primaryText.
    
    Platform Context: ${config.platform}
    Target Audience: ${config.targetAudience}
    Tone: ${config.tone}
    Product/Service: ${config.productName}
    Key Benefits: ${config.benefits}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate 3 ad variations based on the system instructions.",
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            primaryText: { type: Type.STRING },
            callToAction: { type: Type.STRING },
            persuasivePhrase: { type: Type.STRING }
          },
          required: ["headline", "primaryText", "callToAction", "persuasivePhrase"]
        }
      }
    }
  });

  const rawResults = JSON.parse(response.text);
  return rawResults.map((item: any, index: number) => ({
    ...item,
    id: `ad-${Date.now()}-${index}`,
    platform: config.platform
  }));
};
