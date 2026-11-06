import { Suspense } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.imsolutions.co"),
  title: "IM Solutions",
  description:
    "IM Solutions is an integrated marketing and advertising agency in Bangalore, offering SEO, digital marketing, branding, AI advertising and creative solutions.",
  keywords:
    "integrated marketing agency in Bangalore, digital marketing agency in Bangalore, advertising agency in Bangalore",
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
