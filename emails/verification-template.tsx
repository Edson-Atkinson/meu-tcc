import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { getBaseUrl } from "@/app/utils";

const baseUrl = getBaseUrl();

interface VerificationTemplateProps {
  username: string;
  emailVerificationToken: string;
}

export const VerificationTemplate = ({
  username,
  emailVerificationToken,
}: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      A melhor plataforma de serviços de delivery para você ou sua empresa!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>My Delivery</Text>
        <Text style={title}>Olá {username}!</Text>
        <Text style={title}>Seja bem vindo ao My Delivery</Text>
        <Text style={paragraph}>
          Por favor verifique seu email através do link abaixo:
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${baseUrl}/verify-email?token=${emailVerificationToken}`}
          >
            Clique aqui para verificar
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Somos gratos pela sua confiança em nossa plataforma!
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationTemplate;

const main = {
  backgroundColor: "#020817",
  color: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
  textAlign: "center" as const,
  fontWeight: "bold" as const,
  fontSize: "24px",
  lineHeight: "34px",
};

const title = {
  textAlign: "center" as const,
  fontWeight: "bold" as const,
  fontSize: "24px",
  lineHeight: "34px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#3576DF",
  borderRadius: "1rem",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
};
