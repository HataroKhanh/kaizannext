import clientPromise from "@/lib/mongodb";
import { BiBook } from "react-icons/bi";
import ProgressBar from "@/app/components/vocabulary/Progress-bar";
import CharacterCard, {
  Character,
} from "@/app/components/vocabulary/Character";
import Widget from "@/app/components/vocabulary/Widget";
import Header from "@/app/components/header/Header";
export default async function BlogPostPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  const client = await clientPromise;
  const db = await client.db("hsk")
  const collection = db.collection("characters")

  const characterData = await collection.find({ vocabulary: Number(id) }).toArray()


  return (
    <>
      <Header></Header>

      <section className="max-w-7xl">
        <div className="inline-flex mt-5 ">
          <BiBook className="inline h-10 w-10" />
          <h1 className="iconify i-ph:book-open text-3xl text-gray-950">
            {" "}
            Từ Vựng Tiếng Trung
          </h1>
        </div></section>


      <section className="mt-5 p-5  mx-auto max-w-7xl">
        <ProgressBar className="w-full text-center justify-center m-auto " done={1} doing={12} total={20} />
      </section>


      <section className="flex gap-6 mx-auto p-5 max-w-7xl flex-row">
        <div className="flex-1">
          {characterData ? (
            characterData.map((items) => (
              <CharacterCard
                key={items._id.toString()}
                character={JSON.parse(JSON.stringify(items))}

              />
            ))
          ) : (
            <div></div>
          )}

        </div>
        <div className="flex-1">
          {/* <Widget vocabularyData={vocabularyData} /> */}
          123
        </div>
      </section>
    </>
  );
}
