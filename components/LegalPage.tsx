export default function LegalPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <main className="lg">
      <article className="lg-card">
        <h1>{title}</h1>
        {updated && <p className="lg-date">Last updated {updated}</p>}
        {children}
      </article>
    </main>
  );
}
