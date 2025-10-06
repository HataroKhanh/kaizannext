import clientPromise from "@/lib/mongodb";
export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  const client = await clientPromise;
  const db = await client.db("characters");
  const characterCol = db.collection("character");
  const character = await characterCol.findOne({ id: id });

  return new Response(JSON.stringify(JSON.parse(JSON.stringify(character))), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
