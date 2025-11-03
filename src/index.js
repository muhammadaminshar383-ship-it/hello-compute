/**
 * Temp Mail API Proxy — runs on Fastly Edge (Glitch Compute)
 * No signup required. Uses 1secmail.com public API.
 */

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const url = new URL(event.request.url);

  // ✅ Check if user requested Temp Mail API
  if (url.pathname.startsWith("/api/")) {
    const apiUrl = "https://www.1secmail.com/" + url.pathname.replace("/api/", "");
    try {
      const response = await fetch(apiUrl);
      const text = await response.text();
      return new Response(text, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "API fetch failed", details: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // ✅ Default homepage for testing
  return new Response(
    `
    <html>
      <head><title>TempU Mail Proxy ✅</title></head>
      <body style="font-family:sans-serif;text-align:center;padding-top:50px;">
        <h2>🚀 TempU Mail API Proxy is running</h2>
        <p>Try this test link:</p>
        <p><a href="/api/api/v1/domains/" target="_blank">/api/api/v1/domains/</a></p>
      </body>
    </html>
    `,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}
