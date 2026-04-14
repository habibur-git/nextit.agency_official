"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const pathname = usePathname();
  const isLoadingRef = useRef(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [, startTransition] = useTransition();
  const initialLoadRef = useRef(true);

  // Handle route changes and initial page load
  useEffect(() => {
    // Only show loader on route changes, not initial load
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      // Check if page loads fast - if so, don't show loader
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        return; // Don't show loader on fast initial load
      }
      // Only show if page is still loading after a brief check
      const checkDelay = setTimeout(() => {
        if (document.readyState === "loading") {
          isLoadingRef.current = true;
          startTransition(() => {
            setIsVisible(true);
            setProgress(0);
          });
        }
      }, 50); // Very short delay to check if page loads fast

      return () => clearTimeout(checkDelay);
    }

    // Show loader on route changes
    isLoadingRef.current = true;
    startTransition(() => {
      setIsVisible(true);
      setProgress(0);
    });

    // Clear any existing progress interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Track actual page loading progress
    const updateProgress = () => {
      const readyState = document.readyState;
      let currentProgress = 0;

      if (readyState === "loading") {
        currentProgress = 20; // Initial loading
      } else if (readyState === "interactive") {
        currentProgress = 50; // DOM is ready
      } else if (readyState === "complete") {
        currentProgress = 80; // Page is loaded, waiting for resources
      }

      startTransition(() => {
        setProgress(currentProgress);
      });
    };

    // Update progress based on readyState
    updateProgress();

    // Listen for readyState changes
    const handleStateChange = () => {
      updateProgress();
    };

    document.addEventListener("readystatechange", handleStateChange);

    // Handle page load completion (fallback)
    const handleLoadComplete = () => {
      if (isLoadingRef.current) {
        startTransition(() => {
          setProgress(100);
        });
        isLoadingRef.current = false;
        setTimeout(() => {
          setIsVisible(false);
        }, 100); // Minimal delay for faster LCP
      }
    };

    // Optimized: Hide loader faster to improve LCP
    // Don't wait for all resources, just DOM ready
    const handleDOMReady = () => {
      if (
        document.readyState === "interactive" ||
        document.readyState === "complete"
      ) {
        startTransition(() => {
          setProgress(100);
        });
        isLoadingRef.current = false;
        // Hide immediately after DOM is ready for better LCP
        setTimeout(() => {
          setIsVisible(false);
        }, 100);
      }
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      // Page is already ready, hide loader immediately
      if (isLoadingRef.current) {
        handleDOMReady();
      }
      return () => {
        document.removeEventListener("readystatechange", handleStateChange);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else {
      // Listen for DOM ready (interactive) - don't wait for all resources
      document.addEventListener("readystatechange", handleDOMReady);

      // Also listen for load event as fallback
      window.addEventListener("load", handleLoadComplete, { once: true });

      return () => {
        document.removeEventListener("readystatechange", handleDOMReady);
        document.removeEventListener("readystatechange", handleStateChange);
        window.removeEventListener("load", handleLoadComplete);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [pathname, startTransition]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center h-screen w-full max-w-full min-w-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {/* Logo with fade animation */}
        <motion.div
          className="mb-6 w-24 h-24 sm:w-32 sm:h-32"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/assets/img/p-logo.svg"
            alt="Loading"
            width={120}
            height={120}
            priority
            className="w-full h-full"
          />
        </motion.div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center w-full max-w-full px-4 sm:px-12">
        {/* Loading Text with countdown */}
        <div className="flex items-center justify-between w-full">
          <div className="w-1/2">
            <p className="text-white/80 w-max">Loading...</p>
          </div>
          {/* Number countdown from 0-100 */}
          <div>
            <h1 className="text-white">{Math.round(progress)}%</h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
