import Contact from "@/app/components/header/Contact";
import Logo from "@/app/components/header/Logo";
import Search from "@/app/components/header/Search";
import NavBar from "@/app/components/header/Nav-menu";
import Account from "./Account";

export default function Header() {
  return (
    <header className="w-full bg-white pt-4 border-1 border-[#e0edf9]">
      <div className="max-w-[1230px] mx-auto flex flex-col items-center">
        {/* Hàng trên: Logo + Search + Contact */}
        <div className="flex items-center justify-between w-full">
          <Logo />
          <div className="flex items-center gap-6">
            <Search />s
            <Contact />
            <Account />
          </div>
        </div>

        {/* Hàng dưới: Nav */}
        <div className="w-full mt-4">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
