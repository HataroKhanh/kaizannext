// app/components/character/Character.tsx
"use client";
import type { Character } from "@/app/utils/destination";

type Props = { character: Character; className?: string };

export default function CharacterCard({ character, className = "" }: Props) {
  const zh = (character.tu_vung ?? "").trim();
  const pinyin = (character.phien_am ?? "").replace(/\s*[/|｜]+$/g, "").trim();
  const vi = (character.nghia_tieng_viet ?? "").trim();
  const hv = (character.han_viet ?? "").trim();
  const pos = (character.tu_loai ?? "").trim();

  const hskNum = parseInt(String(character.from ?? "").replace(/\D+/g, ""), 10);
  const hskLabel =
    Number.isFinite(hskNum) && hskNum > 0 ? `HSK ${hskNum}` : null;

  return (
    <section className={`w-full ${className}`}>
      <div className="w-full rounded-2xl bg-white border border-[#cfe3f5] shadow-sm">
        <div className="p-6">
          <h1 className="text-5xl font-extrabold leading-none tracking-wide text-slate-900">
            {zh || "—"}
          </h1>

          {pinyin && (
            <p className="mt-2 text-base tracking-wide text-slate-600">
              {pinyin}
            </p>
          )}

          {vi && <p className="mt-3 text-lg text-slate-700">{vi}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {hv && (
              <span className="inline-flex items-center rounded-full border border-[#cfe3f5] bg-[#e0edf9] px-3 py-1 text-xs font-medium text-slate-800">
                Hán-Việt: {hv}
              </span>
            )}
            {pos && (
              <span className="inline-flex items-center rounded-full border border-[#cfe3f5] bg-[#e0edf9] px-3 py-1 text-xs font-medium text-slate-800">
                {pos}
              </span>
            )}
            {hskLabel && (
              <span className="inline-flex items-center rounded-full border border-[#cfe3f5] bg-[#e0edf9] px-3 py-1 text-xs font-medium text-slate-800">
                {hskLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
