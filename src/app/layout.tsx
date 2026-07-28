import { Suspense } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IM Solutions - Best Advertising Agency in Bangalore",
  description: "Leading advertising agency in Bangalore offering creative design, 360° digital marketing, and lead generation services. 7+ years of experience with 300+ satisfied clients.",
  keywords: "advertising agency bangalore, digital marketing, creative design, lead generation, brand activation, SEO services",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Script
          src="https://aichatbot-b8883.el.r.appspot.com/static/chatbot-widget.js"
          strategy="afterInteractive"
        />
        <Script id="chatbot-widget-config" strategy="afterInteractive">
          {`(function () {
  if (typeof window === 'undefined') return;

  var config = {
    apiUrl: 'https://aichatbot-b8883.el.r.appspot.com',
    username: 'IMS',
    botId: '7e33b9c8-3252-4f35-99f5-40bf0ccbfb36'
  };

  var attempts = 0;
  var maxAttempts = 50;

  function tryInit() {
    var widget = window.ChatbotWidget;
    if (widget && typeof widget.updateConfig === 'function') {
      widget.updateConfig(config);
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      setTimeout(tryInit, 100);
    }
  }

  tryInit();
})();`}
        </Script>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
