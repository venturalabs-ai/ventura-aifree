export const BASE_PATH = process.env.NODE_ENV === "production" ? "/ventura-aifree" : "";
export const pathFor = (path: string) => `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
