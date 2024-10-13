import "./globals.css";
import ReactQueryProviders from "@/utils/react-query-provider";
import { Noto_Sans_KR } from "next/font/google"; // 한글 NotoSans를 사용.

// Noto Sans Korean
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR" className={notoSansKr.className}>
      <body className="">
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
