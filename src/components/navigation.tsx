import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Navigation({ path }: { path: string }) {
  return (
    <div className="sticky flex items-center text-xl gap-4 top-0 z-50 col-span-12 mx-auto py-2 bg-blue-900 text-white w-full px-2 md:px-16">
      <Link to="/" className="relative group">
      <span className="absolute border-b-3 inset-y-0 border-yellow-300 group-hover:animate-grow-width"></span>
      Inicio
      </Link>
      <LuChevronRight />
      <h2>{path}</h2>
    </div>
  );
}
