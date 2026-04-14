function parseAdminEmails(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getAllowedAdminEmails() {
  const configuredEmails = parseAdminEmails(process.env.ADMIN_EMAILS);

  if (configuredEmails.length > 0) {
    return configuredEmails;
  }

  return parseAdminEmails(process.env.ADMIN_EMAIL ?? "master@zonahockey.com");
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}
