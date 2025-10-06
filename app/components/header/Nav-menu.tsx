import { Menu } from "@/app/utils/destination";
import Link from "next/link";

export default function NavBar() {
  const NAV_ITEMS: Menu[] = [
    { title: "Trang chủ", href: "#" },
    { title: "Giáo trình Hán Ngữ", href: "/giaotrinh" },
    { title: "Hội thoại", href: "#hoi-thoai" },
    { title: "Đọc hiểu", href: "#doc-hieu" },
    { title: "Luyện thi", href: "#luyen-thi" },
    { title: "Dịch", href: "#dich" },
    { title: "Phát âm", href: "#phat-am" },
    { title: "Nâng cấp", href: "#nang-cap" },
  ];
  return (
    <nav className="border-t border-neutral-200/70 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center overflow-x-auto justify-center gap-10 ">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-gray-950 justify-center"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
