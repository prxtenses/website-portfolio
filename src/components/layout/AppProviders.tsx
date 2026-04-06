"use client";

import { ReactLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={hasMounted ? { opacity: 0, y: 10, scale: 0.98 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="w-full origin-top"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ReactLenis>
  );
}
