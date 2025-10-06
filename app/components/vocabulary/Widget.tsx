"use client";
import * as React from "react";
import type { Vocabulary } from "@/app/utils/destination";
import Link from "next/link";

function InfoVocab({ id }: { id: number }) {
  return (
    <ul>
      <li>
        <Link href={`/vocabulary/${id}`}>Từ vựng</Link>
      </li>
      <li>
        <Link href={`/conversation-vocabulary/${id}`}>Nhớ nhanh từ</Link>
      </li>
      <li>
        <Link href={`/vocabulary-quiz-image/${id}`}>Chọn đúng sai</Link>
      </li>
      <li>
        <Link href={`/choose-sentence-image/${id}`}>Chọn đúng sai với câu</Link>
      </li>
      <li>
        <Link href={`/listen-choose-image/${id}`}>Nghe câu chọn hình ảnh</Link>
      </li>
      <li>
        <Link href={`/qa-sentences/${id}`}>Ghép câu</Link>
      </li>
      <li>
        <Link href={`/exercises/fill-blank/${id}`}>Điền từ</Link>
      </li>
      <li>
        <Link href={`/flashcard-vocabulary/${id}`}>Flash card từ vựng</Link>
      </li>
      <li>
        <Link href={`/conversation/${id}`}>Hội thoại</Link>
      </li>
      <li>
        <Link href={`/vocabulary/${id}`}>Đọc hiểu</Link>
      </li>
      <li>
        <Link href={`/grammar/${id}`}>Ngữ pháp</Link>
      </li>
      <li>
        <Link href={`/exercises/word-order/${id}`}>Sắp xếp câu</Link>
      </li>
      <li>
        <Link href={`/translation/${id}`}>Bài tập luyện dịch</Link>
      </li>
      <li>
        <Link href={`/test-all/question/${id}`}>Kiểm tra tổng hợp</Link>
      </li>
    </ul>
  );
}

export default function Widget({
  vocabularyData,
  className,
}: {
  vocabularyData: Vocabulary[];
  className?: string;
}) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  // Toggle theo index; tính `willOpen` trước rồi mới set
  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
    const willOpen = openIdx !== idx; // nếu khác => sắp mở; nếu giống => sắp đóng
    setOpenIdx(willOpen ? idx : null);
    e.currentTarget.setAttribute("data-open", String(willOpen));
  };

  return (
    <div className={className}>
      <ul className="flex flex-col gap-0.5 max-h-[500px] overflow-auto">
        {vocabularyData.map((item, i) => {
          // Lấy index từ data nếu có; fallback về vị trí map
          const idx = (item as any).idx_in_level ?? i;
          const isOpen = openIdx === idx;

          return (
            <li>
              <div className="min-w-0 w-full flex-col text-black bg-blue-300 rounded-2xl p-5 flex cursor-pointer select-none">
                <div
                  key={String((item as any).idx_in_level ?? item._id ?? i)}
                  className="text-black bg-blue-300 rounded-2xl flex cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  data-open={isOpen}
                  onClick={(e) => handleItemClick(e, idx)}
                >
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm opacity-80">{item.topic}</div>
                  </div>
                </div>
                {isOpen && (
                  <div className="mt-3">
                    <InfoVocab id={idx} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
