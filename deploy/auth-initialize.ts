import { client } from "../src/lib/gel/client";

const baseUrl = process.env.VITE_GEL_BASE_URL ?? "http://localhost:5173";
const authRoute = process.env.VITE_GEL_AUTH_ROUTE ?? "auth";

const stringToBool = (str) => {
  if (str === undefined) { return false }
  return str.toLowerCase() === "true";
}

const SET_CONFIG = "CONFIGURE CURRENT BRANCH SET";
const RESET_CONFIG = "CONFIGURE CURRENT BRANCH RESET";
const INSERT_CONFIG = "CONFIGURE CURRENT BRANCH INSERT";

const RESET_AUTH_CONFIG = `
${RESET_CONFIG} ext::auth::EmailPasswordProviderConfig;
${RESET_CONFIG} ext::auth::ProviderConfig;
${RESET_CONFIG} ext::auth::AuthConfig;
${RESET_CONFIG} ext::auth::UIConfig;
${RESET_CONFIG} cfg::SMTPProviderConfig;
`;

const SETUP_AUTH_CONFIG = `
${SET_CONFIG} ext::auth::AuthConfig::auth_signing_key := "${process.env.GEL_AUTH_SIGNING_KEY}";
${SET_CONFIG} ext::auth::AuthConfig::app_name := "${process.env.GEL_AUTH_APP_NAME}";
${SET_CONFIG} ext::auth::AuthConfig::brand_color := "${process.env.GEL_AUTH_APP_BRAND_COLOR}";
${SET_CONFIG} ext::auth::AuthConfig::logo_url := "${process.env.GEL_AUTH_LOGO_URL}";
${SET_CONFIG} ext::auth::AuthConfig::dark_logo_url := "${process.env.GEL_AUTH_DARK_LOGO_URL}";
${SET_CONFIG} ext::auth::AuthConfig::allowed_redirect_urls := {
  "${baseUrl}",
};
`;

const SETUP_UI_CONFIG = `
${INSERT_CONFIG} ext::auth::UIConfig {
  redirect_to := "${new URL(authRoute+"/builtin/callback", baseUrl)}",
  redirect_to_on_signup := "${new URL(authRoute+"/builtin/callback?isSignUp=true", baseUrl)}",
};
`;

// https://docs.geldata.com/reference/auth/email_password
const SETUP_EMAIL_PASSWORD_PROVIDER = `
${INSERT_CONFIG} ext::auth::EmailPasswordProviderConfig {
  require_verification := ${stringToBool(process.env.GEL_AUTH_EMAIL_VERIFICATION)},
};
  `;


// https://docs.geldata.com/reference/auth#configuring-smtp
const SETUP_SMTP_CONFIG = process.env.GEL_SMTP_NAME ? `
${INSERT_CONFIG} cfg::SMTPProviderConfig {
  name := "${process.env.GEL_SMTP_NAME}",
  sender := "${process.env.GEL_SMTP_SENDER}",
  host := "${process.env.GEL_SMTP_HOST}",
  port := ${Number(process.env.GEL_SMTP_PORT)},
  security := "${process.env.GEL_SMTP_SECURITY}",
  validate_certs := <bool>${stringToBool(process.env.GEL_SMTP_VALIDATE_CERTS)},
  username := "${process.env.GEL_SMTP_USERNAME}",
  password := "${process.env.GEL_SMTP_PASSWORD}",
};
${SET_CONFIG} current_email_provider_name := "${process.env.GEL_SMTP_NAME}";
` : '';

async function main() {
  await client.execute(`
${RESET_AUTH_CONFIG}
${SETUP_AUTH_CONFIG}
${SETUP_UI_CONFIG}
${SETUP_EMAIL_PASSWORD_PROVIDER}
${SETUP_SMTP_CONFIG}
  `);
  console.log(
    "🎉 NOTE: Auth Reset. Email password provider is configured.",
  );
}

await main();