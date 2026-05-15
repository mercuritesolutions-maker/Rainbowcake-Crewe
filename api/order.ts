import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  // Vercel serverless functions handle body parsing automatically for JSON
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, cakeType, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required fields" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return res.status(500).json({ error: "Email service not configured (Missing API Key)" });
  }

  const recipientEnv = process.env.RECIPIENT_EMAIL;
  if (!recipientEnv) {
    console.error("Missing RECIPIENT_EMAIL");
    return res.status(500).json({ error: "Recipient email not configured. Please check environment variables." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
  const recipients = recipientEnv.split(",").map(e => e.trim()).filter(Boolean);

  try {
    const { data, error } = await resend.emails.send({
      from: `Rainbow Cake <${fromEmail}>`,
      to: recipients,
      replyTo: email,
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
      console.error("Resend error:", error);
      return res.status(400).json({ error: error.message || "Resend API error" });
    }

    return res.status(200).json({ message: "Inquiry sent successfully", id: data?.id });
  } catch (err: any) {
    console.error("Unhandled error:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}
