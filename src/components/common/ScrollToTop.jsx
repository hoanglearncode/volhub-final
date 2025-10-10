// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ behavior = "smooth", top = 0 }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Nếu URL có hash (#id) thì cố gắng cuộn tới phần tử tương ứng
    if (hash) {
      // đợi 0ms để DOM render xong (nếu cần)
      const id = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior });
        } else {
          window.scrollTo({ top, behavior });
        }
      }, 0);
      return () => clearTimeout(id);
    }

    // Với route bình thường, cuộn lên đầu trang
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top, behavior });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, behavior, top]);

  return null; // không render gì cả
}
