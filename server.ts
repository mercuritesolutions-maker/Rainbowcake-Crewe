import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/order", async (req, res) => {
    const { name, email, phone, cakeType, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipient = process.env.RECIPIENT_EMAIL || "le.advena08@gmail.com";

    try {
      const { data, error } = await resend.emails.send({
        from: "Rainbow Cake Orders <onboarding@resend.dev>",
        to: [recipient],
        subject: `New Cake Order from ${name}`,
        html: `
          <h1>New Order Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Cake Type:</strong> ${cakeType}</p>
          <p><strong>Message/Details:</strong></p>
          <p>${message}</p>
          <hr />
          <p>Sent from Rainbow Cake Website</p>
        `,
      });

      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({ message: "Order sent successfully", id: data?.id });
    } catch (err) {
      res.status(500).json({ error: "Failed to send email" });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
