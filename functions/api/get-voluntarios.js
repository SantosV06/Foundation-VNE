export async function onRequestGet(context) {

  const { env } = context;

  const data = await env.DB.prepare(
    "SELECT * FROM voluntarios ORDER BY id DESC"
  ).all();

  return new Response(
    JSON.stringify(data.results),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

}
