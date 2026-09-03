import type { PropsWithChildren } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Pikadoru home">
          <span className="brand-mark">P</span>
          <span>pikadoru</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/tools">Tools</NavLink>
          <NavLink to="/info">Info</NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>Small experiments, carefully made.</span>
        <span>© 2026 pikadoru</span>
      </footer>
    </div>
  )
}
