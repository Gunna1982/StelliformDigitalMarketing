export const dynamic = 'force-dynamic';

import fs from 'fs/promises';
import path from 'path';

type Status = {
  updatedAt: string;
  branch?: string;
  lastCommit?: string;
  tasks?: { title: string; status: 'todo' | 'doing' | 'done' }[];
};

async function readStatus(): Promise<Status> {
  try {
    const p = path.join(process.cwd(), 'gray-status.json');
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {
      updatedAt: new Date().toISOString(),
      tasks: [
        { title: 'Homepage improvements (offer, proof, CTA)', status: 'doing' },
        { title: 'Add lightweight /gray-status dashboard', status: 'doing' },
      ],
    };
  }
}

export default async function GrayStatusPage() {
  const s = await readStatus();

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Gray Status</h1>
      <p style={{ opacity: 0.8 }}>Last updated: {new Date(s.updatedAt).toLocaleString()}</p>

      <div style={{ marginTop: 16, padding: 16, border: '1px solid #333', borderRadius: 12 }}>
        <div><b>Branch:</b> {s.branch ?? '(unknown)'}</div>
        <div><b>Last commit:</b> {s.lastCommit ?? '(unknown)'}</div>
      </div>

      <h2 style={{ marginTop: 24, fontSize: 18, fontWeight: 700 }}>Tasks</h2>
      <ul>
        {(s.tasks ?? []).map((t, i) => (
          <li key={i} style={{ marginTop: 8 }}>
            <b>[{t.status}]</b> {t.title}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 24, opacity: 0.7, fontSize: 12 }}>
        This page reads from <code>gray-status.json</code> on the server.
      </p>
    </main>
  );
}
