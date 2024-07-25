import notFound from "../[locale]/not-found";
import { Manrope } from "next/font/google";
import "tailwindcss/tailwind.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export default function NotFoundCatchAll() {
  return notFound();
}
