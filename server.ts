import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Client (Lazy Initialization)
let resendClient: Resend | null = null;
function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY environment variable is required");
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Gemini Client (Server-side)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is required");
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors({ origin: process.env.VITE_FRONTEND_URL || "*" }));
  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Gemini API Proxy (Prevents API key exposure)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const gemini = getGeminiClient();
      
      const systemInstruction = `
        You are V-AI, the advanced intelligence of Velgorex Technologies.
        Velgorex is a premium software company specializing in:
        - UI/UX Design (Immersive interfaces in Bangalore)
        - Web Development (React, Next.js, 3D web)
        - App Development (Mobile solutions in Bangalore)
        - Business Automation
        
        Company Tone: Premium, futuristic, confident, and helpful.
        Location: Indiranagar, Bangalore, serving globally.
        If asked how to start a project, tell them to use the 'Contact' section.
      `;

      const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...(history || []).map((h: any) => ({ role: h.role, parts: [{ text: h.parts }] })), { role: "user", parts: [{ text: message }] }],
        config: { systemInstruction, temperature: 0.7 }
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "AI Connection Error" });
    }
  });

  // Rate Limiting for Contact Form
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Too many requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // API Route for Contact Form
  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { name, email, projectIdea, timestamp } = req.body;
    
    // Simple Validation
    if (!name || !email || !projectIdea) return res.status(400).json({ error: "Missing required fields" });

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #D4AF37;">New Project Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="white-space: pre-wrap;">${projectIdea}</p>
        </div>
      </div>
    `;
    
    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [process.env.CONTACT_SEND_TO || 'admin@velgorex.com'],
        subject: `New Project Request: ${name}`,
        html: emailHtml,
      });
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Email Error:", error);
      res.status(500).json({ error: error.message || "Failed to deliver request" });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
