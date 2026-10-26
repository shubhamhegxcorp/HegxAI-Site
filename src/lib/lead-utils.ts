export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function redactLead(name: string, email: string): string {
  const safeName = name ? `${name.charAt(0)}***` : "Unknown";
  let safeEmail = "hidden";
  if (email && email.includes("@")) {
    const [user, domain] = email.split("@");
    safeEmail = `${user.charAt(0)}***@${domain}`;
  }
  return `${safeName} <${safeEmail}>`;
}
