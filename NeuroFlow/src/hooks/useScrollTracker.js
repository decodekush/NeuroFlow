import { useEffect } from "react";
import useActivityStore from "../store/useActivityStore";

const useScrollTracker = () => {
  const setScrollSpeed = useActivityStore((state) => state.setScrollSpeed);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();

      const distance = Math.abs(currentScrollY - lastScrollY);
      const time = now - lastTime;
      const speed = time > 0 ? distance / time : 0;

      setScrollSpeed(speed.toFixed(3));

      lastScrollY = currentScrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollSpeed]);
};

export default useScrollTracker;
