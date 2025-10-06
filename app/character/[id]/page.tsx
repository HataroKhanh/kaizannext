"use client";
import CharacterCard from "@/app/components/character/Character";
import { useEffect, useState } from "react";

export default function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = params; // dùng id thật từ URL
  const [characterData, setCharacterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/character", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // đừng hardcode "1"
          cache: "no-store", // tránh cache khi dev
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (alive) setCharacterData(data);
      } catch (e: any) {
        if (alive) setError(e.message || "Fetch failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <>
      <h1 className="text-4xl text-black">Chi tiết từ vựng 一</h1>

      <div className="py-6">
        {loading && <div>Loading…</div>}
        {error && <div className="text-red-500">Error: {error}</div>}

        {!loading && !error && characterData ? (
          <CharacterCard character={characterData} />
        ) : (
          !loading && !error && <div>Coming soon</div>
        )}
      </div>
    </>
  );
}
