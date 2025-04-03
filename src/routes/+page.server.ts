export const load = async ({ url }) => {
  const message = {
    info: url.searchParams.get("info"),
    error: url.searchParams.get("error"),
  };

  return { message };
};
