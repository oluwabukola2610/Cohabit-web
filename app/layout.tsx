import "./globals.css";
import type { Metadata } from "next";
import 'react-phone-input-2/lib/style.css'
import { Ubuntu } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ReduxProvider } from "@/redux/provider";
const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cohabit App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} overflow-x-hidden `}>
        <ReduxProvider>
          <StyledComponentsRegistry >{children}</StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
