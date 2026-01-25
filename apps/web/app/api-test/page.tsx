export const dynamic = "force-dynamic";

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_API_URL;

  let result: any = { base };

  if (!base) {
    result.error = "NEXT_PUBLIC_API_URL missing on Vercel env vars";
  } else {
    try {
      const res = await fetch(`${base}/health`, { cache: "no-store" });
      const text = await res.text();
      result.status = res.status;
      try { result.body = JSON.parse(text); } catch { result.body = text; }
    } catch (e: any) {
      result.error = String(e?.message || e);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>API Test</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
