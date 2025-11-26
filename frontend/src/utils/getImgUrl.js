// utils/getImgUrl.js
export function getImgUrl(filename) {
  if (!filename) return "/placeholder.png"; // optional fallback
  return `http://localhost:3000/uploads/${filename}`;
}
