let baseUrl: string | null = null;

export function getBaseUrl(): string {
  if (baseUrl !== null) {
    return baseUrl;
  }
  baseUrl = "http://localhost:5173";

  try {
    const isVercel = import.meta.env.VERCEL === "1";
    if (isVercel) {
      const vercelEnv = import.meta.env.VERCEL_ENV!;
      const vercelPreviewUrl = import.meta.env.VERCEL_BRANCH_URL!;
      const vercelProductionUrl = import.meta.env.VERCEL_PROJECT_PRODUCTION_URL!;

      if (vercelEnv === "preview") {
        baseUrl = `https://${vercelPreviewUrl}`;
      } else if (vercelEnv === "production") {
        baseUrl = `https://${vercelProductionUrl}`;
      }
    }
  } catch (error) {
    console.debug(error);
  }

  return baseUrl;
}
