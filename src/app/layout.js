import "./globals.css";

import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AuthContextProvider from "./store/auth-context";

const inter = Inter({ subsets: ["latin"] });

config.autoAddCss = false;

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en" data-theme="light">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContextProvider>
  );
}
