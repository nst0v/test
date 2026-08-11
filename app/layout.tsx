import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Для Насти — от Никиты",
  description:
    "Личное письмо о любви, важных воспоминаниях и приглашении начать новую главу.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
