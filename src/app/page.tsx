import Header from "@/components/header/Header";
import RecipesList from "./components/RecipesList";
import Category from "./components/Category";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-slate-500">
      <Header />
      <main>
        <Category />
        <RecipesList />
      </main>
    </div>
  );
}
