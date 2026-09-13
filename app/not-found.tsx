import Link from "next/link";
import { NavigationRail } from "./NavigationRail";
import { Sketch } from "./Sketch";
import { ThemeToggle } from "./ThemeToggle";

export default function NotFound() {
  return <main><header className="site-header not-found-header"><Link className="brand" href="/">CRLNA</Link><ThemeToggle /><NavigationRail disabled /></header><section className="not-found"><p className="not-found-code">404</p><h1>Whoops!</h1><p className="lead">The route you followed does not exist... this is awk.</p><div className="hero-actions"><Link className="button button-dark" href="/">Back home</Link><Link className="button button-secondary" href="/#work">See the work</Link></div></section></main>;
}
