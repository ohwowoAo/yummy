import Header from "@/components/header/Header";
import RecipesList from "./components/RecipesList";
import Category from "./components/Category";

export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <Category />
        <RecipesList />
      </main>
    </div>
  );
}
