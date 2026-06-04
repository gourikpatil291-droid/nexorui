"use client";
import React, { useEffect, useState } from "react";

export default function ProjectTemplate({ children }: { children: React.ReactNode }) {
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    // When the page loads, it starts in "reveal" state, so the curtains pull away.
    // The CSS for `.curtain-reveal` animates curtainOut automatically.
    const timer = setTimeout(() => {
      setIsRevealing(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isRevealing && (
        <div className="proj-overlay is-open content-visible curtain-reveal" style={{ zIndex: 9999 }}>
          <div className="proj-curtain proj-curtain--1"></div>
          <div className="proj-curtain proj-curtain--2"></div>
        </div>
      )}
      {children}
    </>
  );
}
