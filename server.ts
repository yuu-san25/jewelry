import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini consult
  app.post("/api/consult", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured in the environment variables." });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare context for the jeweler assistant
      const systemInstruction = `You are the Royal Design Advisor for Patiala Jewellers, an esteemed jewelry showroom located at Shop # 7, Parsi Market, Murree Road, Rawalpindi, Pakistan. 
Your tone must be welcoming, polite, highly professional, and knowledgeable about Pakistani traditional jewelry, gold purities, and pricing parameters.

Information about Patiala Jewellers:
- Location: Shop # 7, Parsi market, Murree Rd, Mohalla, Rawalpindi, Pakistan.
- Contact Number: (051) 5761435.
- Google Rating: 4.4 out of 5 stars based on 376 reviews.
- Services: Handcrafted bridal Kundan sets, solid 22K gold heritage designs (bangles, kara sets, jhumkas, chandbalis), diamond engagement rings (18K White/Rose Gold), 925 Sterling Silver traditional articles, custom design orders, gold recycling, gold purity lab testing reports.
- Daily Gold Rates in Pakistan Sarafa Market per Tola (approx 11.66g): 
  * 24 Karat Pure Gold: Rs. 248,500
  * 22 Karat Gold (Traditional jewelry standard): Rs. 227,790
  * 21 Karat Gold: Rs. 217,430
  * 18 Karat Gold (Diamond ornaments standard): Rs. 186,375
  * Sterling Silver (Chandi): Rs. 2,950 per Tola
- Pricing policy: Final cost is Gold Weight (in Tola or Gram) * Karat Rate + Karighari (making charges, typically 8% for gold and 25% for diamonds) + provincial sales tax (2%).
- Order timelines: Standard custom orders require 10 to 14 working days. Express bridal orders can occasionally be scheduled in 7 days.
- Appointments: Recommended for brides. No consultation fee.

Guidelines for your replies:
1. Provide helpful answers about matching bridal jewelry to dresses (e.g., recommend Kundan with maroon/crimson, diamonds with pastels/white).
2. Help users estimate gold budgets (e.g. if they say "I have 5 Tolas of gold, what can I make?", tell them they can easily get a gorgeous layered gold necklace or a set of 4 heavy filigree bangles).
3. Always mention that prices are estimated based on today's Sarafa rates and final calculations are performed live at the Murree Road shop.
4. Keep answers relatively concise, beautifully organized, and conversational in English or mixed Urdu/English (Hinglish/Urdish) if it fits naturally, but default to polite premium English. Use polite greetings like 'Assalamu Alaikum' or 'Welcome to Patiala Jewellers'.`;

      // Build chat contents from history
      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          if (msg.id === 'welcome') continue; // Skip initial system greeting
          formattedContents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
      
      // Append current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.75,
        }
      });

      const replyText = response.text || "I apologize, could you please repeat that? I was polishing some gold designs.";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini Consult Error:", error);
      res.status(500).json({ error: error.message || "Something went wrong on the server." });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
