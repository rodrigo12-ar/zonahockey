import { createHmac } from "crypto";

export const AUTH_COOKIE_NAME = "zona_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 24 horas

const SECRET = process.env.AUTH_SECRET ?? "zona-hockey-secret-dev";

type AdminUser = {
  email: string;
  password: string;
  name: string;
};

const ADMIN_USERS: AdminUser[] = [
  {
    email: process.env.ADMIN_EMAIL ?? "admin@zona.com",
    password: process.env.ADMIN_PASSWORD ?? "ZonaHockey123",
    name: process.env.ADMIN_NAME ?? "Administrador"
  }
];

type AdminSession = {
  email: string;
  name: string;
  expires: number;
};

function signValue(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

function encodeSession(session: AdminSession) {
  const data = Buffer.from(JSON.stringify(session)).toString("base64");
  const signature = signValue(data);
  return `${data}.${signature}`;
}

function decodeSession(cookieValue: string) {
  const [data, signature] = cookieValue.split(".");
  if (!data || !signature) return null;
  if (signValue(data) !== signature) return null;

  try {
    const session = JSON.parse(Buffer.from(data, "base64").toString("utf8")) as AdminSession;
    if (!session?.email || !session?.expires) return null;
    if (Date.now() > session.expires) return null;
    return session;
  } catch {
    return null;
  }
}

export function verifyAdminCredentials(email: string, password: string) {
  return ADMIN_USERS.find((user) => user.email === email && user.password === password) ?? null;
}

export function createSessionToken(email: string, name: string) {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return encodeSession({ email, name, expires });
}

export function getSession(cookieValue: string | undefined) {
  if (!cookieValue) return null;
  return decodeSession(cookieValue);
}
