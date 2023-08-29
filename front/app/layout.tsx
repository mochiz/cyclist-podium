"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "urql";
import client from "@/src/gql/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider value={client}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
