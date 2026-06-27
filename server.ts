import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Dispatch & Moving Assistant endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, language } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Invalid message payload." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured. Please add your API key in the app Settings." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const languageMap: Record<string, string> = {
        en: "English",
        es: "Spanish",
        ru: "Russian",
        ar: "Arabic",
        lt: "Lithuanian"
      };
      const targetLang = languageMap[language] || "English";

      const systemInstruction = `You are Matt's AI Dispatch Assistant for Movers312, Chicago's premier local relocation company (Illinois ICC Dispatch #3280B, US DOT #4893122).
Your role is to assist potential movers across Chicago and Cook County (Loop, Lincoln Park, Logan Square, Wicker Park, Lakeview, West Loop, Bucktown, Evanston, Oak Park, etc.).

CRITICAL LANGUAGE REQUIREMENT: The customer is browsing the site in ${targetLang}. You MUST write your entire response strictly and fluently in ${targetLang}.

Company & Service Guidelines:
- Base Rates: Starting around $360 for 2 professional movers and a fully equipped truck.
- Pricing Estimator: Customers can configure their exact move parameters on this webpage (distance, labor size, packing kits, heavy items like pianos/safes) for a 100% guaranteed binding quote instantly.
- Travel & Gas Fee: $0 local travel fee promotion currently active!
- Packing Kits: Optional studio/1-bed ($110), 2-3 bed ($190), or 4+ bed ($280) packing material add-ons.
- Heavy Items: $150 specialized surcharge for items over 300 lbs (pianos, gun safes, marble tables).
- Stairs & Docks: Our local Chicago crew specializes in tight 312 corridors, 3rd floor walkups, and downtown loading dock COI reservations.
- Contact: Phone dispatch is available 24/7 at (312) 385-9229.

Tone: Professional, warm, confident, trustworthy, and helpful. Keep answers concise (1-3 paragraphs max) and encourage customers to use the instant quote tool on the page or book online.`;

      // Build conversation transcript for prompt
      const historyText = messages.map((m: any) => {
        const role = m.sender === 'user' ? 'Customer' : 'Movers312 AI';
        return `${role}: ${m.text}`;
      }).join('\n');

      const fullPrompt = `${historyText}\nMovers312 AI:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: error.message || "An error occurred while generating the AI response." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
