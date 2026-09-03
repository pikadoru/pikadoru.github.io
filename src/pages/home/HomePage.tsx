import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="page home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">A corner of the internet</p>
          <h1>Playful things,<br /><em>made slowly.</em></h1>
          <p className="lede">A growing shelf of small games, useful tools, and curious pages by Pikadoru.</p>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>01</span><small>explore<br />at your pace</small></div>
      </section>
      <section className="home-section" aria-labelledby="start-heading">
        <div className="section-label"><span>01</span><span id="start-heading">Start exploring</span></div>
        <div className="catalog-grid">
          <Link className="catalog-card catalog-card-featured" to="/games/minigames/tic-tac-toe">
            <span className="card-kicker">Games / Minigames</span>
            <span className="card-title">Tic-tac-toe</span>
            <span className="card-description">A familiar little duel. Play together or challenge the computer.</span>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="catalog-card" to="/games">
            <span className="card-kicker">Collection</span>
            <span className="card-title">All games</span>
            <span className="card-description">Find the next small distraction.</span>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </Link>
          <div className="catalog-card catalog-card-muted">
            <span className="card-kicker">Coming into focus</span>
            <span className="card-title">Tools & info</span>
            <span className="card-description">Useful experiments and API-powered pages will land here.</span>
          </div>
        </div>
      </section>
    </div>
  )
}
