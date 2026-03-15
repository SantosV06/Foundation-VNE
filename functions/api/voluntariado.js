export async function onRequestPost(context) {

  const { request, env } = context;

  const data = await request.json();

  const nombre = data.nombre;
  const apellido = data.apellido;
  const correo = data.correo;
  const telefono = data.telefono;

  if (!nombre || !apellido || !correo || !telefono) {
    return new Response("Faltan datos", { status: 400 });
  }

  await env.DB.prepare(`
    INSERT INTO voluntarios (nombre, apellido, correo, telefono)
    VALUES (?, ?, ?, ?)
  `)
    .bind(nombre, apellido, correo, telefono)
    .run();

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { "Content-Type": "application/json" } }
  );
}
