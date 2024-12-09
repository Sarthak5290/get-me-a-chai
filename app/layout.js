import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./componenets/Navbar";
import SessionWrapper from "./componenets/SessionWrapper";
import Script from "next/script";
import Head from "next/head"; // Import Head from next/head

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description: "This website is a fundraiser platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <SessionWrapper>
          <Navbar />

          {/* Page Wrapper */}
          <div className="flex flex-col min-h-full">
            {/* Main Content */}
            <main className="flex-grow relative z-10 overflow-auto bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
              <div className="relative z-10"></div>
            </main>
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
