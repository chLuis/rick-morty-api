import { useState, useEffect } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const GoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón después de desplazarse 100 píxeles
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <LuArrowUp
        className="fixed bottom-2 right-2 w-11 h-11 p-2 cursor-pointer rounded-full bg-blue-800 text-white shadow-lg animate-appearance-in"
        onClick={GoToTop}
      />
    )
  );
}
