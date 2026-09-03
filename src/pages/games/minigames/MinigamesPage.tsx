import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { SectionIntro } from '../../../components/SectionIntro'

export function MinigamesPage() {
  return (
    <div className="page listing-page">
      <Breadcrumbs items={[{ label: 'Games', to: '/games' }, { label: 'Minigames' }]} />
      <SectionIntro eyebrow="Games / Minigames" title="Tiny games, ready to play." description="No accounts, no setup. Just pick something and begin." />
      <div className="listing-grid">
        <Link className="listing-card listing-card-accent" to="/games/minigames/tic-tac-toe"><span className="card-kicker">01 / Classic</span><strong>Tic-tac-toe</strong><span>Two players or you versus the computer.</span><span className="card-arrow" aria-hidden="true">↗</span></Link>
      </div>
    </div>
  )
}
