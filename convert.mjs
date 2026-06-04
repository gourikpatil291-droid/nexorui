import fs from 'fs';

let html = fs.readFileSync('lesse/index.html', 'utf-8');

const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let content = bodyMatch ? bodyMatch[1] : html;

// Remove scripts
content = content.replace(/<script[\s\S]*?<\/script>/g, '');
// Remove Nav
content = content.replace(/<!-- -- NAV --[\s\S]*?<\/nav>/g, '');
// Remove Mobile Menu
content = content.replace(/<div class="mobile-menu" id="mobileMenu">[\s\S]*?<\/ul>\s*<\/div>/g, '');
// Remove custom cursor
content = content.replace(/<div class="cursor-dot" id="cursorDot"><\/div>\s*<div class="cursor-ring" id="cursorRing"><\/div>/g, '');

const jsx = "use client";\n\nimport React, { useEffect, useState } from "react";\nimport Script from "next/script";\nimport Navbar from "@/components/Navbar";\nimport Footer from "@/components/Footer";\nimport "./portfolio.css";\n\nexport default function PortfolioPage() {\n  const [isMounted, setIsMounted] = useState(false);\n\n  useEffect(() => {\n    setIsMounted(true);\n  }, []);\n\n  return (\n    <div className="portfolio-theme w-full overflow-x-hidden relative flex flex-col min-h-screen">\n      <Navbar />\n      \n      <main className="flex-grow">\n        {isMounted && (\n            <div dangerouslySetInnerHTML={{ __html: \${content.replace(//g, '\\').replace(/\$/g, '\\$')}\ }} />\n        )}\n      </main>\n\n      <Footer />\n\n      {isMounted && (\n        <>\n          <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="lazyOnload" />\n          <Script src="/js/script.js" strategy="lazyOnload" />\n          <Script src="/js/project.js" strategy="lazyOnload" />\n        </>\n      )}\n    </div>\n  );\n};

fs.writeFileSync('src/app/portfolio/page.tsx', jsx);
console.log('Done');
