// src/hooks/useIsMobile.js
import { useEffect, useState } from "react";

/**
 * Trả về true nếu chiều rộng viewport <= breakpoint (px).
 * Mặc định breakpoint = 768 (tablet/mobile).
 */
export default function useIsMobile(breakpoint = 768) {
  const isClient = typeof window !== "undefined";

  // khởi tạo đồng bộ để tránh flicker: nếu không có window -> default false
  const [isMobile, setIsMobile] = useState(() =>
    isClient ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    if (!isClient) return;

    // dùng matchMedia nếu có, fallback dùng resize
    const mq = window.matchMedia?.(`(max-width: ${breakpoint}px)`);

    const handleChange = (e) => {
      // if event from matchMedia, e.matches; if using resize, compute from innerWidth
      const next = typeof e?.matches === "boolean" ? e.matches : window.innerWidth <= breakpoint;
      setIsMobile(next);
    };

    if (mq && typeof mq.addEventListener === "function") {
      // modern browsers
      mq.addEventListener("change", handleChange);
      // set initial state from mq (more accurate than innerWidth for some cases)
      setIsMobile(mq.matches);
    } else if (mq && typeof mq.addListener === "function") {
      // older browsers
      mq.addListener(handleChange);
      setIsMobile(mq.matches);
    } else {
      // fallback: listen resize
      window.addEventListener("resize", handleChange);
      // ensure initial value
      setIsMobile(window.innerWidth <= breakpoint);
    }

    return () => {
      if (mq && typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handleChange);
      } else if (mq && typeof mq.removeListener === "function") {
        mq.removeListener(handleChange);
      } else {
        window.removeEventListener("resize", handleChange);
      }
    };
  }, [breakpoint, isClient]);

  return isMobile;
}
