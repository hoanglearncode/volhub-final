// tokenParser.nolib.js
function base64UrlDecode(str) {
  // replace URL-safe chars, pad if cần
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  // atob trả về latin1, xử lý unicode
  const decoded = atob(str);
  try {
    // convert percent-encoded bytes to string
    return decodeURIComponent(
      decoded
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return decoded; // fallback
  }
}

export function parseJwtNoLib(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload;
  } catch (e) {
    console.error("Invalid JWT payload", e);
    return null;
  }
}

export default parseJwtNoLib;
