let baseUrl: string | null = null;

export function getBaseUrl(): string {
  if (baseUrl !== null) {
    return baseUrl;
  }

  baseUrl = import.meta.env.VITE_GEL_BASE_URL ?? "http://localhost:5173";

  // try {
  //   const isVercel = process.env.VERCEL === "1";
  //   if (isVercel) {
  //     const vercelEnv = process.env.VERCEL_ENV!;
  //     const vercelPreviewUrl = process.env.VERCEL_BRANCH_URL!;
  //     const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL!;

  //     if (vercelEnv === "preview") {
  //       baseUrl = `https://${vercelPreviewUrl}`;
  //     } else if (vercelEnv === "production") {
  //       baseUrl = `https://${vercelProductionUrl}`;
  //     }
  //   }
  // } catch (error) {
  //   console.debug(error);
  // }

  return baseUrl;
}