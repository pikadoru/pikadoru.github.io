export type CatalogItem = {
  title: string
  description: string
  path: string
  category: 'game' | 'tool' | 'info'
  status: 'available' | 'coming-soon'
}

export const siteCatalog: CatalogItem[] = [
  {
    title: 'Tic-tac-toe',
    description: 'A classic game for two players or one player versus the computer.',
    path: '/games/minigames/tic-tac-toe',
    category: 'game',
    status: 'available',
  },
]
