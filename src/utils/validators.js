// Kiểm tra định dạng email hợp lệ
export const isValidEmail = (email) => {
  if (!email) return false;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email.trim());
};

// Kiểm tra định dạng số điện thoại Việt Nam
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const regex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
  return regex.test(phone.trim());
};

// Kiểm tra URL hợp lệ (dùng cho website hoặc avatar)
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Hàm sanitize chuỗi đầu vào (chống SQL injection và XSS)
export const sanitize = (value) => {
  if (typeof value !== "string") return value;
  return value
    .replace(/'/g, "&#39;")     // tránh SQL injection
    .replace(/"/g, "&quot;")    // tránh XSS
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/--/g, "")
    .trim();
};
