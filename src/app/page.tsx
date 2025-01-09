import Header from "@/components/header/Header";
import MainContent from "./main/page";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-slate-500">
      <Header />
      <main>
        <MainContent />
      </main>
    </div>
  );
}
