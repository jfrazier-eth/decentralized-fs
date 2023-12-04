import { config as loadEnv } from "dotenv";

const getEnvVariable = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getOptionalEnvVariable = (key: string, defaultValue: string) => {
  return process.env[key] || defaultValue;
};

let env = getOptionalEnvVariable("ENV", "dev");
if (env === "prod") {
  loadEnv({ path: ".env.production", override: true });
} else {
  loadEnv({ path: ".env" });
}

export const config = {
  env,
  pg: {
    connectionUrl: getEnvVariable("DATABASE_URL"),
  },
  server: {
    port: Number(getOptionalEnvVariable("PORT", "8888")),
  },
};
