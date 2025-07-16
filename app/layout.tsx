import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const swiss721Extended = localFont({
   variable: "--font-swiss-721-extended",
   src: [
      {
         path: "../public/fonts/swiss-721-bt-bold-extended.woff2",
         weight: "700",
         style: "normal",
      },
      {
         path: "../public/fonts/swiss-721-bt-light-extended.woff2",
         weight: "300",
         style: "normal",
      },
      {
         path: "../public/fonts/swiss-721-bt-roman-extended.woff2",
         weight: "400",
         style: "normal",
      },
   ],
});

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
   title: "RunningMan",
   description: "No such thing as a bad run.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${swiss721Extended.variable} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
