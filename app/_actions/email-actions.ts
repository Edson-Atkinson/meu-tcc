"use server";

import React from "react";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
resend.domains.create({ name: "edson.atk@gmail.com" });

interface Email {
  to: string[];
  subject: string;
  react: React.ReactElement;
}

export const sendEmail = async (payload: Email) => {
  const { error } = await resend.emails.send({
    from: "My Delivery <onboarding@resend.dev>",
    ...payload,
  });

  if (error) {
    console.error("Erro ao enviar o email", error);
    return null;
  }

  console.log("Email enviado com sucesso!");
  return true;
};
