import Link from "next/link";
export default function Contact() {
  return (
    <div className="flex items-center space-x-2 flex-col">
      <Link
        href="/contact"
        className="hover:bg-[#e0edfa] text-gray-900 px-5 py-2 rounded-2xl
"
      >
        Liên hệ
      </Link>
    </div>
  );
}
