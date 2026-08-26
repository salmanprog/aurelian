import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

/**
 * MySQL connection.
 *
 * Resolves the connection from either a single `DATABASE_URL`
 * (`mysql://user:pass@host:port/db`) or individual `MYSQL_*` variables so it
 * works identically on managed MySQL (PlanetScale, Railway, Clever Cloud)
 * and self-hosted servers (including XAMPP's default root / no-password).
 */

type ResolvedCredentials = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: mysql.SslOptions | string | undefined;
};

function sslOption(): mysql.SslOptions | undefined {
  if (process.env.MYSQL_SSL === "true" || process.env.MYSQL_SSL === "1") {
    return {};
  }
  return undefined;
}

function resolvedCredentials(): ResolvedCredentials {
  const url = process.env.DATABASE_URL;
  const ssl = sslOption();

  if (url && url.startsWith("mysql://")) {
    const parsed = new URL(url);
    const database =
      decodeURIComponent(parsed.pathname.replace(/^\//, "")) ||
      process.env.MYSQL_DATABASE ||
      "aurelian";

    return {
      host: parsed.hostname || "127.0.0.1",
      port: Number(parsed.port || 3306),
      user: decodeURIComponent(parsed.username) || "root",
      password: decodeURIComponent(parsed.password),
      database,
      ssl,
    };
  }

  return {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "aurelian",
    ssl,
  };
}

function buildConfig(): mysql.PoolOptions {
  const creds = resolvedCredentials();
  const config: mysql.PoolOptions = {
    host: creds.host,
    port: creds.port,
    user: creds.user,
    password: creds.password,
    database: creds.database,
    charset: "utf8mb4",
  };

  if (creds.ssl) {
    config.ssl = creds.ssl;
  }

  return config;
}

const globalForDb = globalThis as typeof globalThis & {
  __aurelianMysqlPool?: mysql.Pool;
};

export const pool =
  globalForDb.__aurelianMysqlPool ??
  mysql.createPool(buildConfig());

if (process.env.NODE_ENV !== "production") {
  globalForDb.__aurelianMysqlPool = pool;
}

export const db = drizzle(pool);

/** Creates the target schema if the server has it but the database does not. */
export async function ensureDatabaseExists() {
  const creds = resolvedCredentials();
  const database = creds.database.replace(/[^a-zA-Z0-9_]/g, "") || "aurelian";

  const conn = await mysql.createConnection({
    host: creds.host,
    port: creds.port,
    user: creds.user,
    password: creds.password,
    ...(creds.ssl ? { ssl: creds.ssl } : {}),
  });

  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } finally {
    await conn.end();
  }
}
