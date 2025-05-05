import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-[url(/bg.jpg)] bg-black/50 bg-blend-overlay backdrop-blur-2xl backdrop-contrast-75 bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
}
