"use client";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Link from "next/link";
import {
  GraduationCap,
  Baby,
  UserRound,
  Medal,
  Crown,
  Trophy,
  Home,
  BookOpen,
  Clock,
  Star,
  Lightbulb,
  Repeat,
  Volume2,
  ChevronRight,
  Book,
  Play,
} from "lucide-react";

/**
 * HSK Curriculum Page
 * - Converted from provided HTML into idiomatic React/Next.js + Tailwind
 * - Split into small, reusable components
 * - Uses lucide-react icons (already available in this environment)
 */

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HSKCardData = {
  level: Level;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  difficulty: "Cơ bản" | "Trung bình" | "Nâng cao" | "Chuyên gia";
  href: string;
};

const HSK_DATA: HSKCardData[] = [
  {
    level: 1,
    title: "HSK 1",
    description: "Cấp độ cơ bản nhất, học 150 từ vựng thiết yếu",
    lessons: 15,
    duration: "2-3 tháng",
    difficulty: "Cơ bản",
    href: "/vocabulary/1",
  },
  {
    level: 2,
    title: "HSK 2",
    description: "Mở rộng từ vựng lên 300 từ, học ngữ pháp cơ bản",
    lessons: 15,
    duration: "3-4 tháng",
    difficulty: "Cơ bản",
    href: "/vocabulary/16",
  },
  {
    level: 3,
    title: "HSK 3",
    description: "Nâng cao với 600 từ vựng và ngữ pháp phức tạp hơn",
    lessons: 10,
    duration: "4-5 tháng",
    difficulty: "Trung bình",
    href: "/vocabulary/31",
  },
  {
    level: 4,
    title: "HSK 4",
    description: "Thành thạo 1200 từ vựng, có thể giao tiếp tự nhiên",
    lessons: 10,
    duration: "6-8 tháng",
    difficulty: "Trung bình",
    href: "/vocabulary/41",
  },
  {
    level: 5,
    title: "HSK 5",
    description: "Trình độ cao với 2500 từ vựng và văn bản phức tạp",
    lessons: 13,
    duration: "8-12 tháng",
    difficulty: "Nâng cao",
    href: "/vocabulary/295",
  },
  {
    level: 6,
    title: "HSK 6",
    description: "Cấp độ cao nhất với 5000+ từ vựng và văn học",
    lessons: 13,
    duration: "12+ tháng",
    difficulty: "Chuyên gia",
    href: "/vocabulary/308",
  },
];

export default function HSKEducationPage() {
  const totalLessons = HSK_DATA.reduce((sum, item) => sum + item.lessons, 0);

  return (
    <>
      <Header />
      <div className="hsk-curriculum min-h-screen bg-white text-gray-900">
        <PageHeader totalLessons={totalLessons} />
        <Breadcrumb />
        <main className="main-content py-8">
          <div className="container mx-auto px-4">
            <HSKGrid items={HSK_DATA} />
          </div>
        </main>
        <TipsSection />
      </div>
      <Footer />
    </>
  );
}

/* ----------------------------- Subcomponents ---------------------------- */

function PageHeader({ totalLessons }: { totalLessons: number }) {
  return (
    <header className="page-header bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 text-white">
      <div className="container mx-auto px-4">
        <div className="header-content flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-10">
          <div className="header-left">
            <div className="header-info">
              <h1 className="page-title flex items-center gap-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                <GraduationCap className="w-8 h-8" aria-hidden="true" />
                Giáo Trình Hán Ngữ
              </h1>
              <p className="page-subtitle mt-2 text-white/90">
                Từ cấp độ 1 đến 6
              </p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-item bg-white/10 backdrop-blur rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
              <div>
                <div className="stat-number text-2xl font-bold leading-none">
                  {totalLessons}
                </div>
                <div className="stat-label text-sm opacity-80">Bài học</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="breadcrumb-container bg-gray-50 border-y">
      <nav className="breadcrumb container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-600">
        <Link
          href="/"
          className="breadcrumb-item flex items-center gap-1 hover:text-gray-900"
          title="Trang chủ"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span className="breadcrumb-text">Trang chủ</span>
        </Link>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <div
          className="breadcrumb-item flex items-center gap-1 text-gray-900"
          title="Giáo Trình Hán Ngữ"
        >
          <Book className="w-4 h-4" aria-hidden="true" />
          <span className="breadcrumb-text">Giáo Trình Hán Ngữ</span>
        </div>
      </nav>
    </div>
  );
}

function HSKGrid({ items }: { items: HSKCardData[] }) {
  return (
    <div className="hsk-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((card) => (
        <HSKCard key={card.level} data={card} />
      ))}
    </div>
  );
}

function HSKCard({ data }: { data: HSKCardData }) {
  return (
    <div className="hsk-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="card-header p-4 border-b">
        <LevelBadge level={data.level} />
      </div>

      <div className="card-content p-5">
        <div className="level-info space-y-2">
          <h3 className="level-title text-xl font-bold">{data.title}</h3>
          <p className="level-description text-gray-600">{data.description}</p>

          <div className="level-stats mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700">
            <div className="stat inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{data.lessons} bài học</span>
            </div>
            <div className="stat inline-flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{data.duration}</span>
            </div>
            <div className="stat inline-flex items-center gap-2">
              <Star className="w-4 h-4" aria-hidden="true" />
              <span>{data.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      <Link href={data.href} className="block">
        <div className="card-footer p-4 border-t">
          <button className="action-btn start w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700">
            <Play className="w-4 h-4" aria-hidden="true" />
            <span>Bắt đầu học</span>
          </button>
        </div>
      </Link>
    </div>
  );
}

function LevelBadge({ level }: { level: Level }) {
  const styleMap: Record<Level, string> = {
    1: "bg-green-100 text-green-800",
    2: "bg-emerald-100 text-emerald-800",
    3: "bg-yellow-100 text-yellow-800",
    4: "bg-orange-100 text-orange-800",
    5: "bg-fuchsia-100 text-fuchsia-800",
    6: "bg-blue-100 text-blue-800",
  };

  const icon = {
    1: <Baby className="w-4 h-4" aria-hidden="true" />,
    2: <UserRound className="w-4 h-4" aria-hidden="true" />,
    3: <GraduationCap className="w-4 h-4" aria-hidden="true" />,
    4: <Medal className="w-4 h-4" aria-hidden="true" />,
    5: <Crown className="w-4 h-4" aria-hidden="true" />,
    6: <Trophy className="w-4 h-4" aria-hidden="true" />,
  } as const;

  return (
    <div
      className={`level-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${styleMap[level]}`}
    >
      {icon[level]}
      <span>HSK {level}</span>
    </div>
  );
}

function TipsSection() {
  return (
    <section className="tips-section py-12 bg-gray-50 mt-8">
      <div className="container mx-auto px-4">
        <div className="tips-card rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
          <div className="tips-header flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <h3 className="text-lg md:text-xl font-bold">
              Mẹo học HSK hiệu quả
            </h3>
          </div>

          <div className="tips-content grid gap-4 md:grid-cols-3">
            <TipItem
              icon={<Clock className="w-5 h-5" aria-hidden="true" />}
              title="Học đều đặn"
              desc="Dành 30 phút mỗi ngày để học từ vựng và ngữ pháp"
            />
            <TipItem
              icon={<Repeat className="w-5 h-5" aria-hidden="true" />}
              title="Lặp lại thường xuyên"
              desc="Ôn tập từ vựng cũ trong khi học từ vựng mới"
            />
            <TipItem
              icon={<Volume2 className="w-5 h-5" aria-hidden="true" />}
              title="Luyện nghe nói"
              desc="Sử dụng tính năng phát âm để cải thiện khả năng nghe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TipItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="tip-item flex items-start gap-3">
      <span className="mt-1">{icon}</span>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
