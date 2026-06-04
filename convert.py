import re

with open('lesse/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract the body content between <body> and </body>
body_match = re.search(r'<body>(.*?)</body>', html, re.DOTALL)
if body_match:
    content = body_match.group(1)
else:
    content = html

# Remove script tags at the bottom
content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)

# Remove lesse's nav and mobile menu
content = re.sub(r'<!-- -- NAV --.*?</nav>', '', content, flags=re.DOTALL)
content = re.sub(r'<!-- -- MOBILE MENU --.*?</div>', '', content, flags=re.DOTALL)
# Remove custom cursor
content = re.sub(r'<!-- Custom cursor -->.*?</div>\s*</div>', '', content, flags=re.DOTALL)

# Convert class to className
content = re.sub(r'\bclass=', 'className=', content)

# Convert for to htmlFor
content = re.sub(r'\bfor=', 'htmlFor=', content)

# Fix style tags (e.g., style="height: 48px; width: auto; object-fit: contain; display: block;")
def style_to_jsx(match):
    style_str = match.group(1)
    rules = style_str.split(';')
    jsx_style = []
    for rule in rules:
        if ':' not in rule: continue
        k, v = rule.split(':', 1)
        k = k.strip()
        v = v.strip()
        # camelCase keys
        k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
        jsx_style.append(f'{k}: "{v}"')
    return 'style={{' + ', '.join(jsx_style) + '}}'

content = re.sub(r'style="([^"]*)"', style_to_jsx, content)

# Fix empty tags / self-closing tags
content = re.sub(r'<(img|input|br|hr|meta|link)([^>]*?)(?<!/)>', r'<\1\2 />', content)

# Remove comments (some can cause JSX errors)
content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content, flags=re.DOTALL)

jsx = f'''"use client";

import React, {{ useEffect, useState }} from "react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./portfolio.css";

export default function PortfolioPage() {{
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {{
    setIsMounted(true);
  }}, []);

  return (
    <div className="portfolio-theme w-full overflow-x-hidden relative">
      <Navbar />
      
      <main className="flex-grow pt-[80px]">
        {{/* The converted HTML */}}
        {{isMounted && (
            <div dangerouslySetInnerHTML={{{{ __html: {content.replace('', '\\').replace('$', '\\$')} }}}} />
        )}}
      </main>

      <Footer />

      {{isMounted && (
        <>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
          <Script src="/js/script.js" strategy="lazyOnload" />
          <Script src="/js/project.js" strategy="lazyOnload" />
        </>
      )}}
    </div>
  );
}}
'''

with open('src/app/portfolio/page.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx)
