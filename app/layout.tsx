import { PT_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Интернет-магазин автозапчастей в Сургуте",
  description:
    "Быстрый и удобный способ покупки автозапчастей в Сургуте. Широкий ассортимент запчастей для всех марок автомобилей.",
};

const ptSans = PT_Sans({
  subsets: ["latin", "cyrillic"], // Поддержка латиницы и кириллицы
  weight: ["400", "700"], // Настройка веса шрифта
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={ptSans.className}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
