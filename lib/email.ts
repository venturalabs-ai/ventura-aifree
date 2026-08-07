import emailjs from "@emailjs/browser";

interface WelcomeEmailInput {
  name: string;
  email: string;
}

const emailEnabled = process.env.NEXT_PUBLIC_EMAILJS_ENABLED === "true";

export async function sendWelcomeEmail({
  name,
  email,
}: WelcomeEmailInput): Promise<boolean> {
  if (!emailEnabled) {
    return false;
  }

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return false;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        user_name: name,
        user_email: email,
        product_name: "Ventura AI Free",
      },
      {
        publicKey,
      }
    );

    return true;
  } catch {
    return false;
  }
}
