import Header from "@/app/components/header/Header";
import clientPromise from "@/lib/mongodb";

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // dùng id thật từ URL

  const client = await clientPromise;
  const db = client.db("hsk");
  const characters = db.collection("characters");

  const character = await characters.findOne({ id: id });

  return (
    <>
      <Header />
      {JSON.stringify(character)}
    </>
  );
}
