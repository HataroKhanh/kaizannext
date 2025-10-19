"use client";
import React from "react";
import Link from "next/link";
export type Character = {
  _id: string;
  id: string;
  tu_vung: string;
  phien_am: string;
  han_viet: string;
  tu_loai: string;
  nghia_tieng_viet: string;
  vi_du_su_dung?: string;
  from?: string;
};

type Props = { character: Character; className?: string };

export default function CharacterCard({ character, className }: Props) {
  const idCharacter = character.id;
  const zh = character.tu_vung?.trim();
  const pinyin = (character.phien_am || "").replace(/\s*[/|｜]+$/g, "").trim();
  const vi = (character.nghia_tieng_viet || "").trim();
  const hskNum = parseInt(String(character.from || "").replace(/\D/g, ""), 10);
  const hskLabel =
    Number.isFinite(hskNum) && hskNum > 0 ? `HSK ${hskNum}` : null;

  return (
    <div
      className={[
        "relative rounded-2xl p-[1px] bg-gradient-to-tr",
        // LIGHT: sáng, nhã với #4299e1 làm accent
        "from-[#eaf5ff] via-[#bfe2ff] to-[#4299e1]",
        // DARK: giữ gradient rực
        "dark:from-emerald-500 dark:via-amber-500 dark:to-blue-500",
        className || "",
      ].join(" ")}
    >
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
        <div className="grid gap-2">
          <div className="flex flex-row ">
            <div className="flex-1">
              <div className="text-5xl font-extrabold leading-none tracking-wide text-black dark:text-white">
                {zh}
              </div>

              <div className="flex flex-wrap items-baseline gap-2 text-gray-600 dark:text-gray-300">
                {pinyin && (
                  <span className="text-lg font-semibold text-[#4299e1] dark:text-blue-400">
                    {pinyin}
                  </span>
                )}
                {pinyin && vi && <span className="opacity-40">·</span>}
                {vi && (
                  <span className="text-sm text-gray-900 dark:text-gray-200">
                    {vi}
                  </span>
                )}
              </div>

              <div className="mt-1 flex flex-wrap gap-2">
                {hskLabel && (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-medium
                               border-[#4299e1]/30 bg-[#4299e1]/10 text-[#2b7fc7]
                               dark:border-blue-900/40 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {hskLabel}
                  </span>
                )}
                {character.tu_loai && (
                  <span
                    className="rounded-full border border-[#dfeaf7] bg-[#f5f9ff] px-2.5 py-1 text-xs text-[#4b5563]
                               dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {character.tu_loai}
                  </span>
                )}
                {character.from && (
                  <span
                    className="rounded-full border border-[#dfeaf7] bg-[#f5f9ff] px-2.5 py-1 text-xs text-[#4b5563]
                               dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {character.from}
                  </span>
                )}
              </div>
            </div>{" "}
            <div className="flex-1 self-center">
              <ul className="grid-cols-2 grid  gap-5 ">
                <li
                  className="py-3 text-center border-[#ededed] border-2 rounded-2xl text-gray-800 dark:text-amber-50
                "
                >
                  <button>
                    <Link href="/">Nghe</Link>
                  </button>
                </li> 
                <li className="py-3 text-center border-[#ededed] border-2 rounded-2xl text-gray-800 dark:text-amber-50">
                  <button>
                    <Link href="/">Luyện Viết</Link>
                  </button>
                </li>
                <li className="py-3 text-center border-[#ededed] border-2 rounded-2xl text-gray-800 dark:text-amber-50">
                  <button>
                    <Link href={`/character/${idCharacter}`}>Chi Tiết</Link>
                  </button>
                </li>
                <li className="py-3 text-center border-[#ededed] border-2 rounded-2xl text-gray-800 dark:text-amber-50">
                  <button>Chưa học</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
