"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProviders } from "./chakra-providers";
import { Provider } from "urql";
import client from "@/src/gql/client";
import { Heading, Container } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider value={client}>
      <html lang="en">
        <body className={inter.className}>
          <ChakraProviders>
            <Container maxW="container.lg">
              <Heading as="h1" size="2xl" m={10}>
                Cyclist Podium
              </Heading>
              {children}
            </Container>
          </ChakraProviders>
        </body>
      </html>
    </Provider>
  );
}
