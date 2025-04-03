export function getBaseUrl(baseUrl: string | null | undefined = null): string {
  try {
    const isVercel = process.env.VERCEL === "1";
    if (isVercel) {
      console.log("isVercel");
      const vercelEnv = process.env.VERCEL_ENV!;
      const vercelPreviewUrl = process.env.VERCEL_BRANCH_URL!;
      const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL!;

      if (vercelEnv === "preview") {
        baseUrl = `https://${vercelPreviewUrl}`;
      } else if (vercelEnv === "production") {
        baseUrl = `https://${vercelProductionUrl}`;
      }
    }
  } catch (error) {
    console.debug(error);
  }

  // Read the .env Configuration or Cloud provider configuration
  if (typeof baseUrl === 'string') {
    return baseUrl;
  }
  
  // fallback to default development server
  return "http://localhost:5173";
}