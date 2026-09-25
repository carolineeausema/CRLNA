import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <header className="site-header-v2">
        <Link className="brand-v2" href="/">CRLNA</Link>
      </header>
      <section className="not-found">
        <p className="not-found-code">404</p>
        <h1>Whoops!</h1>
        <p className="lead">The route you followed does not exist... this is awk.</p>
        <div className="hero-v2-actions">
          <Link className="pill-button-dark" href="/">Back home</Link>
          <Link className="pill-button-outline" href="/#work">See the work</Link>
        </div>
      </section>
    </main>
  );
}
