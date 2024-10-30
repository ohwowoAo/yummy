import Header from "@/components/header/Header";
import RecipesList from "./components/RecipesList";

export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <RecipesList />;
    </div>
  );
}
