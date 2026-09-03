type SectionIntroProps = { eyebrow: string; title: string; description: string }

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
    </div>
  )
}
