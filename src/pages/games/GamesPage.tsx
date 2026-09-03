import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { SectionIntro } from '../../components/SectionIntro'

export function GamesPage() {
  return (
    <div className="page listing-page">
      <Breadcrumbs items={[{ label: 'Games' }]} />
      <SectionIntro eyebrow="Games" title="Small games, big opinions." description="A home for quick matches and longer rematches." />
      <div className="listing-grid">
        <Link className="listing-card" to="/games/minigames"><span className="card-kicker">01 / Minigames</span><strong>Quick plays</strong><span>Short, familiar games for a spare minute.</span><span className="card-arrow" aria-hidden="true">↗</span></Link>
      </div>
    </div>
  )
}
