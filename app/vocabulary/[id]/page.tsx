import clientPromise from "@/lib/mongodb";
import { BookOpen } from "lucide-react";
import ProgressBar from "@/app/components/vocabulary/Progress-bar";
import { Vocabulary } from "@/app/utils/destination";
import CharacterCard, {
  Character,
} from "@/app/components/vocabulary/Character";
import Widget from "@/app/components/vocabulary/Widget";
export default async function BlogPostPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("characters");
  const characterCol = db.collection("character");
  const vocabCol = db.collection("vocabulary");

  const vocabularyData: Vocabulary[] = await vocabCol
    .find({ hsk_level: 1 })
    .toArray();
  const vocabularySelf: Vocabulary = await vocabCol.findOne({
    idx: Number(id),
  });

  const characterData: Character[] = await characterCol
    .find({ id: { $in: vocabularySelf.characterIds } })
    .toArray();

  return (
    <>
      <div className="inline-flex">
        <BookOpen className="inline h-10 w-10" />
        <h1 className="iconify i-ph:book-open text-3xl">
          {" "}
          Từ Vựng Tiếng Trung
        </h1>
      </div>
      <ProgressBar done={1} doing={12} total={20} />
      <section className="flex gap-6">
        <div className="flex-2">
          {characterData ? (
            characterData.map((items) => (
              <CharacterCard
                key={items.id}
                character={JSON.parse(JSON.stringify(items))}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex-1">
          <Widget vocabularyData={vocabularyData} />
        </div>
      </section>
    </>
  );
}
