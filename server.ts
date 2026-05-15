import express from "express";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

// Load environment variables at the very beginning
dotenv.config();

const app = express();
app.use(express.json());

// API Routes
app.post("/api/order", async (req, res) => {
  const { name, email, phone, cakeType, message } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return res.status(500).json({ error: "Email service not configured. Please check environment variables." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const recipientEnv = process.env.RECIPIENT_EMAIL || "le.advena08@gmail.com";
  // Support multiple recipients separated by commas
  const recipients = recipientEnv.split(",").map(email => email.trim()).filter(Boolean);

  // Resend requires a verified domain to send from anything other than onboarding@resend.dev
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  try {
    const { data, error } = await resend.emails.send({
      from: `Rainbow Cake <${fromEmail}>`,
      to: ["cesaresmero2@gmail.com"],
      replyTo: email, // This allows you to reply directly to the customer
      subject: `New Order Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: #fdf8f3; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #c85a2a; margin: 0; font-family: serif; font-size: 32px;">Order Inquiry Received</h1>
          </div>
          <div style="padding: 40px; border: 1px solid #f0f0f0; border-top: none; line-height: 1.6;">
            <p><strong>New Inquiry from ${name}</strong></p>
            <p>You have received a new inquiry via the Rainbow Cake website. Details are below:</p>
            
            <div style="background: #fafafa; padding: 25px; margin: 25px 0; border-radius: 4px;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Customer Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ""}
              
              <h3 style="margin-top: 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Inquiry Summary</h3>
              <p style="margin: 5px 0;"><strong>Category:</strong> ${cakeType || "Not specified"}</p>
              <p style="margin: 5px 0;"><strong>Details:</strong></p>
              <p style="margin: 5px 0; white-space: pre-line; font-style: italic;">${message || "No additional details provided."}</p>
            </div>

            <p style="margin-top: 30px;">Warmly,<br/><strong>Rainbow Cake System</strong></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>90 Nantwich Rd, Crewe CW2 6AT | +44 7882 119183</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(400).json({ error: error.message || "Failed to send email via Resend" });
    }

    return res.status(200).json({ message: "Order sent successfully", id: data?.id });
  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "An internal error occurred", details: err.message });
  }
});

// Setup static serving or Vite middleware
async function setupFrontend() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Failed to initialize Vite:", e);
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
          res.status(404).send("Not Found");
        }
      });
    });
  }
}

// Start frontend setup
setupFrontend();

// Only listen if not running as a Vercel Function
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

